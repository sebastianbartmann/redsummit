<script>
import { EventManager } from "@services/nostr/EventManager";
import { getNames } from "@services/nostr/identities";
import NostrEvent from "@components/nostr/NostrEvent.svelte";

let isLoading = true;
let nostrEvents = [];
const eventManager = new EventManager();

async function fetchData() {
  isLoading = true;
  nostrEvents = await eventManager.getAllEvents();
  isLoading = false;
}

$: {
  fetchData();
}
</script>

<div>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div tabindex="0" class="collapse-plus rounded-box collapse border">
    <div class="collapse-title text-xl font-medium">Config</div>
    <div class="collapse-content">
      Fetching identities...
      <ul>
        {#each getNames() as name}
          <li>{name}</li>
        {/each}
      </ul>
    </div>
  </div>

  {#if isLoading}
    <p>Loading...</p>
  {:else}
    <div>
      <ul>
        {#each nostrEvents as nostrEvent}
          <li>
            <NostrEvent
              nostrEvent="{nostrEvent}"
              eventManager="{eventManager}" />
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
