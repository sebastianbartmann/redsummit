<script>
import { IdentityService } from "@services/nostr/IdentityService";
import { makeLinksClickable } from "@services/utility/urlUtility";

const identityService = IdentityService.getInstance();
export let eventManager;
export let eventId;
</script>

<div>
  {#await eventManager.getQuote(eventId)}
    <p>Loading quote...</p>
  {:then quote}
    {#if quote != null}
      <div class="rounded-xl border-2 p-2">
        {new Date(quote?.created_at * 1000).toLocaleString("de-DE")} -
        <span class="font-bold">{identityService.getName(quote?.pubkey)}</span>
        <p>{@html makeLinksClickable(quote?.content)}</p>
      </div>
    {/if}
  {:catch error}
    <p>Error: {error.message}</p>
  {/await}
</div>
