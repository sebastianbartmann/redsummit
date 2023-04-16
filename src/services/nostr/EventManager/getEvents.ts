import {
  relayInit,
  generatePrivateKey,
  getPublicKey,
  getEventHash,
  signEvent,
} from "nostr-tools";

import { NostrEvent } from "@services/nostr/types";

import "websocket-polyfill";

const queryLimit = 25;

let nostrEvents: NostrEvent[] = [];

export async function getEvents(
  relayAddress: string = "wss://relay.damus.io",
  authors: string[] = undefined
): Promise<NostrEvent[]> {
  const relay = relayInit(relayAddress);
  relay.on("connect", () => {
    console.log(`connected to ${relay.url}`);
  });
  relay.on("error", () => {
    console.log(`failed to connect to ${relay.url}`);
  });

  await relay.connect();

  let query = {
    kinds: [1],
    limit: queryLimit,
  };

  if (authors) query.authors = authors;

  let events = await relay.list([query]);

  return events;
}
