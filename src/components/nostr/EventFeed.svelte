<script>
import { getEvents } from "@services/nostr/getEvents.ts";

let isLoading = true;
let nostrEvents;

async function fetchData() {
  isLoading = true;
  nostrEvents = await getEvents();
  isLoading = false;
}

$: {
  fetchData();
}
</script>

<div class="card-compact card bg-white shadow-xl">
  <div class="card-body m-2 text-mainred">
    <h2 class="card-title">Weekly median apartment prices in vienna</h2>
    <p>
      Crawled directly from apartment listings, twice a week. No filter, just
      the median.
    </p>
    <p>
      For details have a look at <a
        class="text-link"
        href="/projects/weekly-median-apartment-price">the project breakdown</a
      >.
    </p>
    <p>This is live data, updated weekly.</p>
  </div>
  <div class="m-2 flex h-60 min-w-fit justify-center rounded-lg bg-snd">
    {#if isLoading}
      <p>Loading...</p>
    {:else}
      <div class="border">
        {nostrEvents}
      </div>
    {/if}
  </div>
</div>
