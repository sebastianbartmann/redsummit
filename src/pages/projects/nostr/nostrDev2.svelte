<script>
import { IdentityService } from "@services/nostr/IdentityService";

const identityService = IdentityService.getInstance();
</script>

<div class="m-auto max-w-screen-md p-6">
  {identityService.getName(
    "090254801a7e8e5085b02e711622f0dfa1a85503493af246aa42af08f5e4d2df"
  )}
</div>
