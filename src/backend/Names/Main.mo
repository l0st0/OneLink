import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Map "mo:base/TrieMap";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";

import Env "../env";
import Types "../Types";
import Utils "../Utils";

actor {
    stable var user_stable_0: [(Principal, Types.User)] = [];
    stable var name_stable_0: [(Text, Types.Name)] = [];
    stable var links_stable_0: [(Text, Types.LinkStore)] = [];
    stable var about_stable_0: [(Text, Types.AboutStore)] = []; 
    stable var look_stable_0: [(Text, Types.LookStore)] = [];

    var users = Map.fromEntries<Principal, Types.User>(user_stable_0.vals(), Principal.equal, Principal.hash);
    var names = Map.fromEntries<Text, Types.Name>(name_stable_0.vals(), Text.equal, Text.hash);
    var links = Map.fromEntries<Text, Types.LinkStore>(links_stable_0.vals(), Text.equal, Text.hash);
    var about = Map.fromEntries<Text, Types.AboutStore>(about_stable_0.vals(), Text.equal, Text.hash);
    var look = Map.fromEntries<Text, Types.LookStore>(look_stable_0.vals(), Text.equal, Text.hash);

    system func preupgrade() {
        name_stable_0 := Iter.toArray(names.entries());
        user_stable_0 := Iter.toArray(users.entries());
        links_stable_0 := Iter.toArray(links.entries());
        about_stable_0 := Iter.toArray(about.entries());
        look_stable_0 := Iter.toArray(look.entries());
    };

    system func postupgrade() {
        name_stable_0 := [];
        user_stable_0 := [];
        links_stable_0 := [];
        about_stable_0 := [];
        look_stable_0 := [];
    };

    var MAX_NAMES = 1_000;

    public query func getStats(): async Types.Stats {
        { names = names.size() };
    };

    public shared({ caller }) func getUser(): async Result.Result<Types.User, Text> {
        assert not Principal.isAnonymous(caller);

        switch(users.get(caller)) {
            case(?user) return #ok(user);
            case(null) {
                let newUser = Utils.createUser(caller);
                users.put(caller, newUser);
                return #ok(newUser);
            };
        }
    };

    public shared({ caller }) func getName(): async Result.Result<Types.Name, Text> {
        assert not Principal.isAnonymous(caller);

        switch(users.get(caller)) {
            case(null) return #err("You have no account.");
            case(?u) {
                switch(names.get(u.name)) {
                    case(null) return #err("Sorry, '" #u.name# "' does not exists.");
                    case(?name) return #ok(name);
                }
            }
        }
    };

    public query func verifyName(name: Text): async Result.Result<Text, Text> {
        if(Text.size(name) < 3) return #err("Sorry, name needs to have at least 3 characters.");

        switch(names.get(name)) {
            case(null) return #ok("Congratulations, '" #name# "' is available.");
            case(?n) return #err("Sorry, '" #name# "' already exists.");
        }
    };

    public shared({ caller }) func verifyUser(callSecret: Text, principalId: Text): async Result.Result<Text, Text> {
        if(callSecret != Env.CALL_SECRET) return #err("Sorry, something went wrong.");
        let principal = Principal.fromText(principalId);

        switch(users.get(principal)) {
            case(null) return #err("Sorry, user was not found.");
            case(?u) {
                let updateUser = Utils.updateUser(u.name, u.principal, u.assignNames, true);
                users.put(principal, updateUser);
                return #ok("Congratulations, you are verified."); 
            }
        }
    };

    public query func getNameData(key: Text): async Result.Result<Types.NameData, Text> {
        var name = "";
        var linkItems: [Types.Link] = [];
        var aboutObj: ?Types.About = null;
        var lookObj: ?Types.Look = null;

        switch(names.get(key)) {
            case(null) return #err("Sorry, '" #key# "' does not exists.");
            case(?n) name := n.name;
        };
        switch(links.get(key)) {
            case(null) {};
            case(?l) linkItems := l.links;
        };
        switch(about.get(key)) {
            case(null) {};
            case(?a) aboutObj := ?a.about;
        };
        switch(look.get(key)) {
            case(null) {};
            case(?l) lookObj := ?l.look;
        };

        return #ok({ name; links = linkItems; about = aboutObj; look = lookObj });
    };

    public shared({ caller }) func createName(name: Text): async Result.Result<Text, Text> {
        assert not Principal.isAnonymous(caller);
        if(Text.size(name) < 3) return #err("Sorry, name needs to have at least 3 characters.");
        if(MAX_NAMES < names.size()) return #err("Sorry we have maximum number of names :/");

        switch(users.get(caller)) {
            case(null) return #err("You have no account.");
            case(?u) {
                if(u.name.size() > 0) return #err("You already have one name.");
                if(not u.isVerified) return #err("You are not verified.");

                switch(names.get(name)) {
                    case(?n) return #err("Sorry, '" #name# "' already exists.");
                    case(null) {
                        let updateUser = Utils.updateUser(name, Principal.toText(caller), u.assignNames, u.isVerified);
                        let createName = Utils.createName(name, caller);
                        let createLink = Utils.createLink(caller);
                        let createAbout = Utils.createAbout(caller);
                        let createLook = Utils.createLook(caller);

                        users.put(caller, updateUser);
                        names.put(name, createName);
                        links.put(name, createLink);
                        about.put(name, createAbout);
                        look.put(name, createLook);
                        
                        return #ok("Name was created.");
                    };
                }
            }
        };
    };

    public shared({ caller }) func getLinks(): async Result.Result<[Types.Link], Text> {
        assert not Principal.isAnonymous(caller);

        switch(users.get(caller)) {
            case(null) return #err("You have no account.");
            case(?u) {
                switch(links.get(u.name)) {
                    case(null) return #err("Links does not exists for this name.");
                    case(?l) {
                        let controller = await Utils.getController(l.controllers, caller);
                        if(not controller) return #err("You have no permissions.");
                        return #ok(l.links);
                    };
                }
            }
        }
    };

    public shared({ caller }) func saveLinks(linkArr: [Types.Link]): async Result.Result<Text, Text> {
        assert not Principal.isAnonymous(caller);

        switch(users.get(caller)) {
            case(null) return #err("You have no account.");
            case(?u) {
                switch(links.get(u.name)) {
                    case(null) return #err("Links does not exists for this name.");
                    case(?l) {
                        let controller = await Utils.getController(l.controllers, caller);
                        if(not controller) return #err("You have no permissions.");

                        let updatedLinks = Utils.updateLinks(linkArr, l.controllers);

                        links.put(u.name, updatedLinks);
                        return #ok("Links were saved.");
                    };
                }
            }
        }
    };

    public shared({ caller }) func getAbout(): async Result.Result<Types.About, Text> {
        assert not Principal.isAnonymous(caller);

        switch(users.get(caller)) {
            case(null) return #err("You have no account.");
            case(?u) {
                switch(about.get(u.name)) {
                    case(null) return #err("About does not exists for this name.");
                    case(?a) {
                        let controller = await Utils.getController(a.controllers, caller);
                        if(not controller) return #err("You have no permissions.");
                        return #ok(a.about);
                    };
                }
            }
        }
    };

    public shared({ caller }) func saveAbout(aboutObj: Types.About): async Result.Result<Text, Text> {
        assert not Principal.isAnonymous(caller);

        switch(users.get(caller)) {
            case(null) return #err("You have no account.");
            case(?u) {
                switch(about.get(u.name)) {
                    case(null) return #err("About does not exists for this name.");
                    case(?a) {
                        let controller = await Utils.getController(a.controllers, caller);
                        if(not controller) return #err("You have no permissions.");

                        let updatedAbout = Utils.updateAbout(aboutObj, a.controllers);

                        about.put(u.name, updatedAbout);
                        return #ok("About was saved.");
                    };
                }
            }
        }
    };

    public shared({ caller }) func getLook(): async Result.Result<Types.Look, Text> {
        assert not Principal.isAnonymous(caller);

        switch(users.get(caller)) {
            case(null) return #err("You have no account.");
            case(?u) {
                switch(look.get(u.name)) {
                    case(null) return #err("Look does not exists for this name.");
                    case(?l) {
                        let controller = await Utils.getController(l.controllers, caller);
                        if(not controller) return #err("You have no permissions.");
                        return #ok(l.look);
                    };
                }
            }
        }
    };

    public shared({ caller }) func saveLook(lookObj: Types.Look): async Result.Result<Text, Text> {
        assert not Principal.isAnonymous(caller);
        
        switch(users.get(caller)) {
            case(null) return #err("You have no account.");
            case(?u) {
                switch(look.get(u.name)) {
                    case(null) return #err("Look does not exists for this name.");
                    case(?l) {
                        let controller = await Utils.getController(l.controllers, caller);
                        if(not controller) return #err("You have no permissions.");

                        let updatedLook = Utils.updateLook(lookObj, l.controllers);

                        look.put(u.name, updatedLook);
                        return #ok("Look was saved.");
                    };
                }
            }
        }
    };

    /*** Analytics functions ***/
    public func verifyNameAndCaller(name: Text, caller: Principal): async Bool {
        switch(names.get(name)) {
            case(null) return false;
            case(?n) {
                let controller = await Utils.getController(n.controllers, caller);
                if(not controller) return false;
                return true;
            }
        };
    };

    public func getLinksAnalytics(name: Text): async [Types.Link] {
        switch(links.get(name)) {
            case(null) return [];
            case(?n) return n.links;
        };
    };
};