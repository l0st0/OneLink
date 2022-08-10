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
    appearance: Bool;
    links: Bool;
    settings: Bool;
    owner: Bool;
  };

public type Name = {
    profile: Profile;
    look: Look;
    links: [Link];
    controllers: [Controller];
  };

  public type User = {
    names: [
      {
        primary: Bool;
        name: Text;
      }
    ];
    hasName: Bool;
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