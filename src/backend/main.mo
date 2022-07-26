import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Map "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";

import Types "types";

actor {
    private func hasPermission(controllers: [Types.Controller], caller: Principal): async ?Types.Controller {
        return Array.find<Types.Controller>(controllers, func(c: Types.Controller): Bool { Principal.equal(c.principal, caller) });
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
        switch(names.get(name)) {
            case(null) return #err("Sorry, '" #name# "' does not exists.");
            case(?name) return #ok(name);
        }
    };

    public query func verifyName (name: Text): async Result.Result<Text, Text> {
        switch(names.get(name)) {
            case (?link) return #err("Sorry, '" #name# "' already exists.");
            case(null) return #ok("Congratulations, '" #name# "' is available.");
        }
    };

    public shared({ caller }) func createName(name: Text): async Result.Result<Types.User, Text> {
        if(Text.size(name) < 3) return #err("Name has to have at least 3 characters.");

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
        if(users.get(caller) == null) return #err("You need to log in.");

        switch(names.get(name)) {
            case(null) return #err("Name does not exists.");
            case(?n) {
                let controller = await hasPermission(n.controllers, caller);
                
                switch(controller) {
                    case(null) return #err("You are not authorized to update controllers.");
                    case(?c) {
                        if(c.settings == false) return #err("You are not authorized to update controllers."); 

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
            }
        };
    };

    public shared({ caller }) func updateLinks(name: Text, links: [Types.Link]): async Result.Result<Types.Name, Text> {
        if(users.get(caller) == null) return #err("You need to log in.");

        switch(names.get(name)) {
            case(null) return #err("Name does not exists.");
            case(?n) {
                let controller = await hasPermission(n.controllers, caller);
                
                switch(controller) {
                    case(null) return #err("You are not authorized to update controllers.");
                    case(?c) {
                        if(c.links == false) return #err("You are not authorized to update links."); 

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
            }
        };
    };

    public shared({ caller }) func updateAppearance(name: Text, appearance: { profile: Types.Profile; look: Types.Look }): async Result.Result<Types.Name, Text> {
        if(users.get(caller) == null) return #err("You need to log in.");

        switch(names.get(name)) {
            case(null) return #err("Name does not exists.");
            case(?n) {
                let controller = await hasPermission(n.controllers, caller);
                
                switch(controller) {
                    case(null) return #err("You are not authorized to update controllers.");
                    case(?c) {
                        if(c.appearance == false) return #err("You are not authorized to update appearance."); 

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
};


// public func onLinkClick(name: Text, id: Text, click: Types.Click): async Result.Result<Text, Text> {
    //     switch(linkMap.get(name)) {
    //         case(null) return #err("Name does not exists.");
    //         case(?list) {
    //             let findLink = Array.find<Types.Link>(list.links, func(link: Types.Link): Bool { link.id == id });
    //             if(findLink == null) return #err("Link does not exists.");

    //             let links = Array.map<Types.Link, Types.Link>(list.links, func(link: Types.Link) { 
    //                 if(link.id == id) {
    //                     let buffer = Buffer.Buffer<Types.Click>(link.clicks.size());
    //                     for (entry in link.clicks.vals()) {
    //                         buffer.add(entry)
    //                     };

    //                     buffer.add(click);
    //                     let clicks = buffer.toArray();

    //                     return {
    //                         id = link.id;
    //                         title = link.title;
    //                         url = link.url;
    //                         show = link.show;
    //                         icon = link.icon;
    //                         clicks;
    //                     };
    //                 };

    //                 return link;
    //              });

    //             linkMap.put(name, { links; controllers = list.controllers });
    //             return #ok("Click was updated.");
    //         }
    //     };
    // };


// public func onPageView(name: Text, view: Types.View): async Result.Result<Text, Text> {
    //     switch(names.get(name)) {
    //         case(null) return #err("Name does not exists.");
    //         case(?n) {
    //             let buffer = Buffer.Buffer<Types.Click>(n.views.size());
    //             for (entry in n.views.vals()) {
    //                 buffer.add(entry)
    //             };

    //             buffer.add(view);
    //             let views = buffer.toArray();

    //             names.put(name, { views; controllers = n.controllers });
    //             return #ok("View was updated.");
    //         }
    //     };
    // };