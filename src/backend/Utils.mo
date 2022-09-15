import Array "mo:base/Array";
import Principal "mo:base/Principal";

import Types "./Types";

module {
    public func getController(controllers: [Types.Controller], caller: Principal): async Bool {
        let controller = Array.find(controllers, func(c: Types.Controller): Bool { Principal.equal(Principal.fromText(c.principal), caller) });
        switch(controller) {
            case(null) return false;
            case(?c) return true;
        }
    };

    public func createUser(caller: Principal): Types.User {
        { name = ""; principal = Principal.toText(caller); assignNames = []; isVerified = false };
    };

    public func updateUser(name: Text, principal: Text, assignNames: [Text], isVerified: Bool): Types.User {
        { name; principal; assignNames; isVerified };
    };

    public func createName(name: Text, caller: Principal): Types.Name {
        { name; owner = Principal.toText(caller); controllers = [{ principal = Principal.toText(caller); owner = true }] };
    };

    public func createLink(caller: Principal): Types.LinkStore {
        { links = [defaultLink]; controllers = [{ principal = Principal.toText(caller); owner = true }] };
    };

    public func updateLinks(links: [Types.Link], controllers: [Types.Controller]): Types.LinkStore {
        { links; controllers };
    };

    public func createAbout(caller: Principal): Types.AboutStore {
        { about = defaultAbout; controllers = [{ principal = Principal.toText(caller); owner = true }] }
    };

    public func updateAbout(about: Types.About, controllers: [Types.Controller]): Types.AboutStore {
        { about; controllers };
    };

    public func createLook(caller: Principal): Types.LookStore {
        { look = defaultLook; controllers = [{ principal = Principal.toText(caller); owner = true }] };
    };

    public func updateLook(look: Types.Look, controllers: [Types.Controller]): Types.LookStore {
        { look; controllers };
    };

    let defaultLink = {
        id = "1";
        title = "";
        url = "";
        show = false;
        icon = "";
    };

    let defaultAbout = {
        title = "";
        bio = "";
        image = "";
    };

    let defaultLook = {
        theme = "0"; backgroundColor = "000000"; 
        gradient = {
            show = false;
            position = "top";
            color = "FFFFFF";
        };
    };
}