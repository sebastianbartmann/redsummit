export type NostrIdentity = {
  name: string;
  pubkey: string;
};

let identities: NostrIdentity[] = [
  {
    name: "Dylan LeClaire",
    pubkey: "090254801a7e8e5085b02e711622f0dfa1a85503493af246aa42af08f5e4d2df",
  },
  {
    name: "jack",
    pubkey: "82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2",
  },
  {
    name: "dergigi",
    pubkey: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
  },
  {
    name: "PrestonPysh",
    pubkey: "85080d3bad70ccdcd7f74c29a44f55bb85cbcd3dd0cbb957da1d215bdb931204",
  },
  {
    name: "thecryptoc0up1e",
    pubkey: "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce",
  },
  {
    name: "LynAldenContact",
    pubkey: "eab0e756d32b80bcd464f3d844b8040303075a13eabc3599a762c9ac7ab91f4f",
  },
  {
    name: "lopp",
    pubkey: "f728d9e6e7048358e70930f5ca64b097770d989ccd86854fe618eda9c8a38106",
  },
];

export function getIdentities(): NostrIdentity[] {
  return identities;
}

export function getPubkeys(): string[] {
  return identities.map((identity) => identity.pubkey);
}

export function getNames(): string[] {
  return identities.map((identity) => identity.name);
}

export function getName(pubkey: string): string {
  let name = identities.find((identity) => identity.pubkey == pubkey)?.name;
  return name != undefined ? name : "unknown";
}
