import type { NostrEvent } from "@services/nostr/types";
import { getEvents } from "@services/nostr/EventManager/getEvents";

//get all Events from all identities
export async function getAllEvents(
  relay: object,
  authors: string[] = undefined
): Promise<NostrEvent[]> {
  let nostrEvents = [];

  await Promise.all(
    authors.map(async (pubKey) => {
      let events = await getEvents(relay, [pubKey]);

      nostrEvents.push(...events);
    })
  );

  nostrEvents.sort((b, a) => a.created_at - b.created_at); // Sort by date

  return nostrEvents;
}
