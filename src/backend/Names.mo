import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Map "mo:base/HashMap";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";

import Types "Types";

actor {
    private func verifyPermission(controllers: [Types.Controller], caller: Principal, pType: { #links; #settings; #appearance; #analytics }): async Bool {
        let isEqual = func(c: Types.Controller): Bool { Principal.equal(c.principal, caller) };
        let controller = Array.find(controllers, isEqual);

        switch(controller) {
            case(null) return false;
            case(?c) {
                if(c.owner) return true;

                switch(pType) {
                    case(#analytics) return true;
                    case(#links) return c.links;
                    case(#settings) return c.settings;
                    case(#appearance) return c.appearance;
                };
            }
        }
    };

    stable var userEntries: [(Principal, Types.User)] = [];
    stable var nameEntries: [(Text, Types.Name)] = [];

    var users = Map.fromIter<Principal, Types.User>(userEntries.vals(), 0, Principal.equal, Principal.hash);
    var names = Map.fromIter<Text, Types.Name>(nameEntries.vals(), 0, Text.equal, Text.hash);

    var defaultProfile: Types.Profile = {
        title = "";
        bio = "";
        image = "";
    };

    var defaultLook: Types.Look = {
        theme =  "0";
        background = #color("000000");
        gradient = {
            show = true;
            position = #top(true);
            color = "FFFFFF";
        };
    };

    public query func getStats(): async Types.Stats {
        return {
            names = names.size();
        };
    };

    public shared({ caller }) func getUser(): async Result.Result<Types.User, Text> {
        // if(Principal.isAnonymous(caller)) return #err("You can't continue as anonymous user.");

        switch(users.get(caller)) {
            case(?user) return #ok(user);
            case(null) {
                let userObj = { names = [] };
                users.put(caller, userObj);
                return #ok(userObj);
            };
        }
    };

    public query func getName(name: Text): async Result.Result<Types.Name, Text> {
        if(Text.size(name) < 3) return #err("Sorry, name needs to have at least 3 characters.");

        switch(names.get(name)) {
            case(null) return #err("Sorry, '" #name# "' does not exists.");
            case(?name) return #ok(name);
        }
    };

    public query func verifyName (name: Text): async Result.Result<Text, Text> {
        if(Text.size(name) < 3) return #err("Sorry, name needs to have at least 3 characters.");
        
        switch(names.get(name)) {
            case (?link) return #err("Sorry, '" #name# "' already exists.");
            case(null) return #ok("Congratulations, '" #name# "' is available.");
        }
    };

    public shared({ caller }) func createName(name: Text): async Result.Result<Types.User, Text> {
        if(Text.size(name) < 3) return #err("Sorry, name needs to have at least 3 characters.");

        switch(users.get(caller)) {
            case(null) return #err("You need to log in.");
            case(?u) {
                if(u.names.size() > 0) return #err("You already have one name.");
            }
        };

        switch(names.get(name)) {
            case(?n) return #err("Sorry, '" #name# "' already exists.");
            case(null) {                
                let user = { names = [name] };
                let controllers: [Types.Controller] = [
                    {
                        principal = caller;
                        appearance = true;
                        links = true;
                        settings = true;
                        owner = true;
                    }
                ];
                let profile: Types.Profile = defaultProfile;
                let look: Types.Look = defaultLook;
                let links: [Types.Link] = [{
                    id = "1";
                    title = "";
                    url = "";
                    show = false;
                    clicks = [];
                    icon = "";
                }];

                users.put(caller, user);
                names.put(name, { profile; look; links; controllers });
                
                return #ok(user);
            };
        }
    };

    public shared({ caller }) func updatePermissions(name: Text, controllers: [Types.Controller]): async Result.Result<Types.Name, Text> {
        if(Option.isNull(users.get(caller))) return #err("Sorry, you need to log in.");

        switch(names.get(name)) {
            case(null) return #err("Name does not exists.");
            case(?n) {
                let hasPermission = await verifyPermission(n.controllers, caller, #settings);
                if(not hasPermission) return #err("Sorry, you are not authorized to update controllers.");

                let updatedName = { 
                    controllers;
                    links = n.links;
                    profile = n.profile; 
                    look = n.look
                };

                names.put(name, updatedName);
                return #ok(updatedName);
            }
        };
    };

    public shared({ caller }) func updateLinks(name: Text, links: [Types.Link]): async Result.Result<Types.Name, Text> {
        if(Option.isNull(users.get(caller))) return #err("Sorry, you need to log in.");

        switch(names.get(name)) {
            case(null) return #err("Name does not exists.");
            case(?n) {
                let hasPermission = await verifyPermission(n.controllers, caller, #links);
                if(not hasPermission) return #err("Sorry, you are not authorized to update links.");
                
                let updatedName = { 
                    links;
                    controllers = n.controllers; 
                    profile = n.profile; 
                    look = n.look
                };

                names.put(name, updatedName);
                return #ok(updatedName);
            }
        };
    };

    public shared({ caller }) func updateAppearance(name: Text, appearance: { profile: Types.Profile; look: Types.Look }): async Result.Result<Types.Name, Text> {
        if(Option.isNull(users.get(caller))) return #err("Sorry, you need to log in.");

        switch(names.get(name)) {
            case(null) return #err("Name does not exists.");
            case(?n) {
                let hasPermission = await verifyPermission(n.controllers, caller, #appearance);
                if(not hasPermission) return #err("You are not authorized to update appearance.");
                
                let updatedName = {
                    profile = appearance.profile;
                    look = appearance.look;
                    links = n.links;
                    controllers = n.controllers;
                };

                names.put(name, updatedName);
                return #ok(updatedName);
            }
        };
    };

    system func preupgrade() {
        nameEntries := Iter.toArray(names.entries());
        userEntries := Iter.toArray(users.entries());
    };

    system func postupgrade() {
        nameEntries := [];
        userEntries := [];
    };

    /*** Analytics functions ***/
    public func verifyNameAndCaller(name: Text, caller: Principal): async Bool {
        if(Option.isNull(users.get(caller))) return false;

        switch(names.get(name)) {
            case(null) return false;
            case(?n) {
                let hasPermission = await verifyPermission(n.controllers, caller, #analytics);
                if(not hasPermission) return false;
                
                return true;
            }
        };
    };

    public func getLinks(name: Text): async [Types.Link] {
        switch(names.get(name)) {
            case(null) return [];
            case(?n) return n.links;
        };
    };
};