module BaseTypes {
  public type Stats = {
    names: Nat;
  };

  public type Controller = {
    principal: Text;
    owner: Bool;
  };

  public type Name = {
    name: Text;
    owner: Text;
    controllers: [Controller];
  };

  public type User = {
    name: Text;
    principal: Text;
    assignNames: [Text]
  };

  public type Link = {
    id: Text;
    title: Text;
    url: Text;
    show: Bool;
    icon: Text;
  };

  public type LinkStore = {
    links: [Link];
    controllers: [Controller]
  };

  public type About = {
    title: Text;
    bio: Text;
    image: Text;
  };

  public type AboutStore = {
    about: About;
    controllers: [Controller]
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

  public type LookStore = {
    look: Look;
    controllers: [Controller]
  };

  public type FullName = {
    name: Text;
    links: [Link];
    // about: About;
    // look: Look;
  };

  // Analytics
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