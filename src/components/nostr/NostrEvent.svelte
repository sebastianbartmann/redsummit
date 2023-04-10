<script>
import { getName } from "@services/nostr/identities";

export let nostrEvent;

let nostrTags = nostrEvent.tags;

console.log(nostrTags);
</script>

<div class="card-compact card m-2 bg-white shadow-xl">
  <div class="card-body m-2 text-mainred">
    <h2 class="card-title"
      >{new Date(nostrEvent.created_at * 1000).toLocaleDateString("de-DE")}</h2>
    <p>{getName(nostrEvent.pubkey)}</p>
    <p>
      {nostrEvent.content}
    </p>
    <ul>
      {#each nostrTags as tag}
        <li>
          {tag[0]}: {tag[1]} <br> {tag[2]}
        </li>
      {/each}
    </ul>
  </div>
</div>
