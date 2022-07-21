import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Map "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";

import Env "./env/lib";
import Types "types";


actor {
    stable var linkEntries: [(Text, Types.Link)] = [];
    var links = Map.fromIter<Text, Types.Link>(linkEntries.vals(), 10, Text.equal, Text.hash);

    stable var userEntries: [(Principal, Types.User)] = [];
    var users = Map.fromIter<Principal, Types.User>(userEntries.vals(), 10, Principal.equal, Principal.hash);

    public query func getSecret(): async Text {
        return Env.SECRET;
    };

    public shared({ caller }) func getUser(): async Types.User {
        Debug.print(Principal.toText(caller));
        let user = users.get(caller);
        
        switch(users.get(caller)) {
            case(null) {
                let userObj = { links = []; premium = false };
                users.put(caller, userObj);
                return userObj;
            };
            case(?user) return user
        }
    };

    public shared({ caller }) func createLink(name: Text): async Result.Result<Text, Text> {
        Debug.print(Principal.toText(caller));
        let user = users.get(caller);

        if(user == null) return #err("You need to log in.");
        if(links.get(name) != null) return #err("Link with the name " #name# " already exists.");
        if(Text.size(name) < 3) return #err("Link name has to have at least 3 charactes.");

        links.put(name, { name });
        users.put(caller, { links = [name]; premium = false });

        return #ok("Link was created.");
    };

    public query func getLinks(): async [Types.Link] {
        Iter.toArray<Types.Link>(links.vals());
    };

    public query func getLink(name: Text): async Result.Result<(), Text> {
        let link: ?Types.Link = links.get(name);

        switch(links.get(name)) {
            case (?link) return #err("Link with the name " #name# " already exists.");
            case(null) return #ok();
        }
    };

    system func preupgrade() {
        linkEntries := Iter.toArray(links.entries());
        userEntries := Iter.toArray(users.entries());
    };

    system func postupgrade() {
        linkEntries := [];
        userEntries := [];
    };
};
