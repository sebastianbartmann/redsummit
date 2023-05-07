export type NostrIdentity = {
  name: string;
  pubkey: string;
};

export type RelayIdentity = {
  name: string;
  address: string;
};

export class IdentityService {
  private static instance: IdentityService;
  private identities: NostrIdentity[];
  private relays: RelayIdentity[];

  private constructor() {
    this.identities = [
      {
        name: "Dylan LeClaire",
        pubkey:
          "090254801a7e8e5085b02e711622f0dfa1a85503493af246aa42af08f5e4d2df",
      },
      {
        name: "jack",
        pubkey:
          "82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2",
      },
      {
        name: "dergigi",
        pubkey:
          "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
      },
      {
        name: "PrestonPysh",
        pubkey:
          "85080d3bad70ccdcd7f74c29a44f55bb85cbcd3dd0cbb957da1d215bdb931204",
      },
      {
        name: "LynAldenContact",
        pubkey:
          "eab0e756d32b80bcd464f3d844b8040303075a13eabc3599a762c9ac7ab91f4f",
      },
      {
        name: "lopp",
        pubkey:
          "f728d9e6e7048358e70930f5ca64b097770d989ccd86854fe618eda9c8a38106",
      },
    ];

    this.relays = [
      {
        name: "nostr.wine",
        address: "wss://nostr.wine",
      },
      {
        name: "nos.lol",
        address: "wss://nos.lol",
      },
      {
        name: "lightningrelay.com",
        address: "wss://lightningrelay.com",
      },
      {
        name: "at.nostrworks.com",
        address: "wss://at.nostrworks.com",
      },
      {
        name: "btc.klendazu.com",
        address: "wss://btc.klendazu.com",
      },
      {
        name: "deschooling.us",
        address: "wss://deschooling.us",
      },
      {
        name: "knostr.neutrine.com",
        address: "wss://knostr.neutrine.com",
      },
      {
        name: "node01.nostress.cc",
        address: "wss://node01.nostress.cc",
      },
    ];
  }

  public static getInstance(): IdentityService {
    if (!this.instance) {
      this.instance = new IdentityService();
    }
    return this.instance;
  }

  public getIdentities(): NostrIdentity[] {
    return this.identities;
  }

  public getRelays(): RelayIdentity[] {
    return this.relays;
  }

  public getPubkeys(): string[] {
    return this.identities.map((identity) => identity.pubkey);
  }

  public getNames(): string[] {
    return this.identities.map((identity) => identity.name);
  }

  public getName(pubkey: string): string {
    const identity = this.identities.find(
      (identity) => identity.pubkey === pubkey
    );
    return identity?.name ?? "unknown";
  }
}
