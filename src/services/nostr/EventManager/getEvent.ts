export async function getEvent(
  relay: object,
  eventId: string[] = undefined
): Promise<NostrEvent[]> {
  let event = await relay.get({ ids: [eventId] });

  return event;
}
