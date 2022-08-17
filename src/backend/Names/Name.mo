import Principal "mo:base/Principal";

import Types "../Types";

module {
    let defaultProfile: Types.Profile = {
        title = "";
        bio = "";
        image = "";
    };

    let defaultLook: Types.Look = {
        theme =  "0";
        background = #color("000000");
        gradient = {
            show = true;
            position = #top(true);
            color = "FFFFFF";
        };
    };

    public func createUser(): Types.User {
        return { names = [] };
    };

    public func createName(name: Text, caller: Principal): Types.Name {
        let controllers: [Types.Controller] = [
            {
                principal = Principal.toText(caller);
                profile = true;
                look = true;
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
            icon = "";
        }];

        return { name; profile; look; links; controllers };
    };
}