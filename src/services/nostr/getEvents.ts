import {
  relayInit,
  generatePrivateKey,
  getPublicKey,
  getEventHash,
  signEvent,
} from "nostr-tools";

import { NostrEvent } from "@services/nostr/types";
import { getPubkeys } from "@services/nostr/identities";

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
      authors: getPubkeys(),
      kinds: [1],
      limit: 50,
    },
  ]);

  return events;
}
