<script>
import { getName } from "@services/nostr/identities";
//import { getEvents } from "@services/nostr/EventManager/getEvents";
import { getAllEvents } from "@services/nostr/EventManager";
import { getPubkeys } from "@services/nostr/identities";

let isLoading = true;
let nostrEvents = [];
let nostrEventNames = [];

const relay = "wss://nostr.wine";
/*
const relay = "wss://nos.lol";
const relay = "wss://lightningrelay.com";
const relay = "wss://nostr.wine";
const relay = "wss://at.nostrworks.com";
const relay = "wss://btc.klendazu.com";
const relay = "wss://deschooling.us";
const relay = "wss://knostr.neutrine.com";
const relay = "wss://node01.nostress.cc";
*/

$: {
  fetchData();
}

async function fetchData() {
  isLoading = true;
  nostrEvents = await getAllEvents(relay, getPubkeys());

  nostrEvents.forEach((x) => {
    nostrEventNames.push({
      name: getName(x.pubkey),
      date: new Date(x.created_at * 1000).toLocaleDateString("de-DE"),
      content: x.content,
    });
  });

  isLoading = false;
}
</script>

<div class="m-auto max-w-screen-md p-6">
  {#if isLoading}
    <p>Loading...</p>
  {:else}
    Len: {nostrEventNames.length}
    {#each nostrEventNames as event}
      <li>
        {event.date} - {event.name}
        <br />
        {event.content}
      </li>
    {/each}
  {/if}
</div>
