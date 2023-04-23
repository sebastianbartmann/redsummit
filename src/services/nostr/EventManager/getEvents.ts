import { NostrEvent } from "@services/nostr/types";

export async function getEvents(
  relay: object,
  authors: string[] = undefined,
  queryLimit: number = 10
): Promise<NostrEvent[]> {
  let query = {
    kinds: [1],
    limit: queryLimit,
  };

  if (authors) query.authors = authors;

  let events = await relay.list([query]);

  return events;
}
