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
        return { names = []; hasName = false };
    };

    public func createName(caller: Principal): Types.Name {
        let controllers: [Types.Controller] = [
            {
                principal = Principal.toText(caller);
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
            icon = "";
        }];

        return { profile; look; links; controllers };
    };
}