module BaseTypes {
  type ProposalId = Nat32;

  public type Link = {
    name: Text;
  };

  public type User = {
    links: [Text];
    premium: Bool;
  };
}