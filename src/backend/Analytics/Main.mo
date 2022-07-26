import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Map "mo:base/TrieMap";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";

import Env "../env";
import Types "../Types";

actor {
    stable var analytics_stable_0: [(Text, Types.Analytics)] = [];
    var analytics = Map.fromEntries<Text, Types.Analytics>(analytics_stable_0.vals(), Text.equal, Text.hash);

    system func preupgrade() {
        analytics_stable_0 := Iter.toArray(analytics.entries());
    };

    system func postupgrade() {
        analytics_stable_0 := [];
    };

    let nameActor = actor(Env.NAME_CANISTER): actor {
        verifyNameAndCaller: (name: Text, caller: Principal) -> async Bool;
        getLinksAnalytics: (name: Text) -> async [Types.Link]
    };

    public shared({ caller }) func getAnalytics(name: Text): async Result.Result<Types.Analytics, Text> {
        let hasPermission = await nameActor.verifyNameAndCaller(name, caller);
        if(not hasPermission) return #err("You have no access to analytics.");

        switch(analytics.get(name)) {
            case(null) return #err("Analytics does not exists.");
            case(?a) return #ok(a);
        }
    };

    public shared({ caller }) func createAnalytics(name: Text): async Result.Result<Types.Analytics, Text> {
        let hasPermission = await nameActor.verifyNameAndCaller(name, caller);
        if(not hasPermission) return #err("You have no access to analytics.");

        switch(analytics.get(name)) {
            case(?a) return #err("Analytics already exists.");
            case(null) {
                let newAnalytics = { views = []; clicks = [] };
                analytics.put(name, newAnalytics);
                return #ok(newAnalytics);
            };
        }
    };

    public func onView(name: Text, view: Types.View): async Result.Result<Text, Text> {
        switch(analytics.get(name)) {
            case(null) return #err("Analytics does not exists.");
            case(?a) {
                let buffer = Buffer.Buffer<Types.View>(a.views.size());
                for (entry in a.views.vals()) {
                    buffer.add(entry)
                };

                buffer.add(view);

                let updateAnalytics = { views = buffer.toArray(); clicks = a.clicks };
                analytics.put(name, updateAnalytics);
                return #ok("View was recorded.");
            } 
        }
    };

    public func onClick(name: Text, click: Types.Click): async Result.Result<Text, Text> {
        switch(analytics.get(name)) {
            case(null) return #err("Analytics does not exists.");
            case(?a) {
                let links = await nameActor.getLinksAnalytics(name);
                let noLink = Option.isNull(Array.find(links, func(c: Types.Link): Bool { c.id == click.id }));

                if(noLink) {
                    let updateAnalytics = {
                        clicks = Array.filter(a.clicks, func(c: Types.Click): Bool { c.id != click.id });
                        views = a.views;
                    };

                    analytics.put(name, updateAnalytics);
                    return #err("Link does not exists.");
                };

                let buffer = Buffer.Buffer<Types.Click>(a.clicks.size());
                for (entry in a.clicks.vals()) {
                    buffer.add(entry)
                };

                buffer.add(click);

                let updateAnalytics = {
                    clicks = buffer.toArray();
                    views = a.views;
                };

                analytics.put(name, updateAnalytics);
                return #ok("Click was recorded.");
            } 
        }
    };
};