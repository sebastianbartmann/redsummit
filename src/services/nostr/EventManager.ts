import { getEvents } from "@services/nostr/EventManager/getEvents";
import { getPubkeys } from "@services/nostr/identities";

//get all Events from all identities
export async function getAllEvents(): Promise<NostrEvent[]> {
  let nostrEvents = [];

  let identities = await getPubkeys();

  await Promise.all(
    identities.map(async (pubKey) => {
      let events = await getEvents("wss://relay.damus.io", [pubKey]);
      nostrEvents.push(...events);
    })
  );

  nostrEvents.sort((b, a) => a.created_at - b.created_at); // Sort by date

  return nostrEvents;
}
