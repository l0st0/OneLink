module BaseTypes {
  public type Link = {
    id: Text;
    title: Text;
    url: Text;
    show: Bool;
    icon: Text;
  };

  public type Profile = {
    title: Text;
    bio: Text;
    image: Text;
  };

  public type Look = {
    theme: Text;
    background: { #color: Text };
    gradient: {
        show: Bool;
        color: Text;
        position: { #top: Bool; #bottom: Bool };
      };
  };

  public type Controller = {
    principal: Text;
    profile: Bool;
    look: Bool;
    links: Bool;
    settings: Bool;
    owner: Bool;
  };

  public type UName = {
    primary: Bool;
    name: Text;
  };

public type Name = {
    name: Text;
    profile: Profile;
    look: Look;
    links: [Link];
    controllers: [Controller];
  };

  public type User = {
    names: [UName];
    principal: Text;
  };

  public type Stats = {
    names: Nat;
  };

  public type View = {
    date: Text;
    address: Text;
  };

  public type Click = {
    id: Text;
    date: Text;
    address: Text;
  };

  public type Analytics = {
    views: [View];
    clicks: [Click];
  }
}