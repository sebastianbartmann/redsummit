import {
  relayInit,
  generatePrivateKey,
  getPublicKey,
  getEventHash,
  signEvent,
} from "nostr-tools";

import { NostrEvent } from "@services/nostr/types";

import "websocket-polyfill";

let nostrEvents: NostrEvent[] = [];

export async function getEvents(): Promise<NostrEvent[]> {
  const relay = relayInit("wss://relay.damus.io");
  relay.on("connect", () => {
    console.log(`connected to ${relay.url}`);
  });
  relay.on("error", () => {
    console.log(`failed to connect to ${relay.url}`);
  });

  await relay.connect();

  let events = await relay.list([
    {
      authors: [
        "090254801a7e8e5085b02e711622f0dfa1a85503493af246aa42af08f5e4d2df"
      ],
      kinds: [1],
      limit: 20,
    },
  ]);

  return events;
}
