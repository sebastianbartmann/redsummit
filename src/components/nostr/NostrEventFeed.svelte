<script>
import { getEvents } from "@services/nostr/EventManager/getEvents";
import NostrEvent from "@components/nostr/NostrEvent.svelte";

let isLoading = true;
let nostrEvents = [];

async function fetchData() {
  isLoading = true;
  nostrEvents = await getEvents();
  isLoading = false;
}

$: {
  fetchData();
}

function handleClick() {
  isLoading = !isLoading;
  console.log("asdf");
}
</script>

<div>
  {#if isLoading}
    <p>Loading...</p>
  {:else}
    <div>
      <ul>
        {#each nostrEvents as nostrEvent}
          <li>
            <NostrEvent nostrEvent="{nostrEvent}" />
          </li>
        {/each}
      </ul>
    </div>
  {/if}
  <button class="btn" on:click="{handleClick}">test</button>
</div>
