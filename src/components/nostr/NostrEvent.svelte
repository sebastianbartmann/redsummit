<script>
import NostrEventQuote from "@components/nostr/NostrEventQuote.svelte";
import { makeLinksClickable } from "@services/utility/urlUtility";
import { IdentityService } from "@services/nostr/IdentityService";

export let nostrEvent;
export let eventManager;

const identityService = IdentityService.getInstance();
let nostrTags = nostrEvent.tags;
</script>

<div class="card-compact card m-2 break-words bg-white shadow-xl">
  <div class="card-body m-2 text-mainred">
    <h2 class="card-title">
      {new Date(nostrEvent.created_at * 1000).toLocaleString("de-DE")}
    </h2>
    <p class="font-bold">{identityService.getName(nostrEvent.pubkey)}</p>
    <p>
      {@html makeLinksClickable(nostrEvent.content)}
    </p>
    {#each nostrTags as tag}
      {#if tag[0] == "e"}
        <NostrEventQuote eventManager="{eventManager}" eventId="{tag[1]}" />
      {/if}
    {/each}
  </div>
</div>
