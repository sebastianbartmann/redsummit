<script>
import { EventManager } from "@services/nostr/EventManager";
import { IdentityService } from "@services/nostr/IdentityService";

let isLoading = true;
let nostrEvents = [];
let nostrEventNames = [];
const identityService = IdentityService.getInstance();

const relay = "wss://nostr.wine";

const eventManager = EventManager.getInstance();

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

async function queryQuotedEvent(event) {
  var ret = "";
  // todo: more than one response possible
  if (event.tags && event.tags[0] && event.tags[0][0] == "e") {
    var x = await eventManager.getEvent(event.tags[1]);
    ret = x;
  }
  return ret;
}

let eventX = "x";

async function getX() {
  eventX = JSON.stringify(
    await eventManager.getEvent(
      "20c818b2fd3ec6f3cd8ee00ed84074570427642818e9627c6b5f576d5f1d3145"
    )
  );
  const comment = eventX;
  console.log(eventX);
  return eventX;
}

getX();

async function getComment(event) {
  let ret = "";
  if (event && event[0] && event[0][0] && event[0][0] == "e") {
    ret = JSON.stringify(
      await eventManager.getEvent(
        "20c818b2fd3ec6f3cd8ee00ed84074570427642818e9627c6b5f576d5f1d3145"
      )
    );
  }
  console.log(ret);
  return ret;
}

$: {
  console.log(eventX);
}

async function fetchData() {
  isLoading = true;
  nostrEvents = await eventManager.getAllEvents(relay, getPubkeys());

  nostrEvents.forEach((x) => {
    nostrEventNames.push({
      name: identityService.getName(x.pubkey),
      date: new Date(x.created_at * 1000).toLocaleDateString("de-DE"),
      content: x.content,
      tags: x.tags,
    });
  });

  isLoading = false;
}

async function getEventQuote(event) {
  let ret = "nope";
  if (event && event.tags[0] && event.tags[0][0] && event.tags[0][0] == "e") {
    ret = await eventManager.getEvent(event.tags[0][1]);
  }
  return JSON.stringify(ret);
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
        <br />
      </li>
      {#await getEventQuote(event)}
        <div class="border-2">
          <p>Loading quote...</p>
        </div>
      {:then quote}
        {#if quote != "nope"}
          <div class="border-2">
            <p>{quote}</p>
          </div>
        {/if}
      {:catch error}
        <div class="border-2">
          <p>Error: {error.message}</p>
        </div>
      {/await}
    {/each}
  {/if}
</div>
