<script>
import { EventManager } from "@services/nostr/EventManager";
import { getNames } from "@services/nostr/identities";
import NostrEvent from "@components/nostr/NostrEvent.svelte";
import { onMount } from "svelte";

let isLoading = true;
let nostrEvents = [];
let auto_load = false;
const eventManager = new EventManager();

async function fetchData() {
  isLoading = true;
  if (auto_load) {
    nostrEvents = await eventManager.getAllEvents();
  }
  isLoading = false;
}

function toggleEnabled() {
  auto_load = !auto_load;
  localStorage.setItem("auto_load", auto_load);
  if (auto_load) fetchData();
}

function loadSetting() {
  const setting = localStorage.getItem("auto_load");
  auto_load = setting === "true";
  fetchData();
}

onMount(loadSetting);
</script>

<div>
  <div class="m-6 {!auto_load ? '' : 'hidden'}">
    This is a project site, not a messenger app.
    <br />
    I assume
    <strong>no liability</strong>
    for messages loaded through this nostr client.
    <br />
    Use of the application at your own risk.
    <br />
    <strong>Within the Config area you can enable loading.</strong>
  </div>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div tabindex="0" class="collapse-plus rounded-box collapse m-2 border">
    <input type="checkbox" />
    <div class="collapse-title bg-snd text-xl font-medium">Config</div>
    <!-- content -->
    <div class="collapse-content flex flex-wrap bg-snd">
      <div class="card m-4 w-full flex-auto bg-mainred shadow-xl lg:w-min">
        <div class="card-body">
          <h2 class="card-title">Configuration:</h2>
          <ul>
            <li>
              <!-- auto-load setting -->
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">auto-load messages</span>
                  <input
                    type="checkbox"
                    checked="{auto_load}"
                    on:change="{toggleEnabled}"
                    value="auto_load"
                    class="checkbox-accent checkbox" />
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="card m-4 w-full bg-mainred shadow-xl lg:w-min">
        <div class="card-body">
          <h2 class="card-title">Identities:</h2>
          <ul class="list-disc pl-4">
            {#each getNames() as name}
              <li>{name}</li>
            {/each}
          </ul>
        </div>
      </div>
      <div class="card m-4 w-full bg-mainred shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Information:</h2>
          <span>
            The identities are hard-coded currently. I was playing around with
            Nostr and built this to get to know the protocol. If you want to
            connect and talk about the protocol or a side project
            <a class="text-c1" href="mailto:hey@redsummit.dev">
              write me an email
            </a>
            . The project breakdown can be found
            <a class="text-c1" href="/projects/building-nostr-client">here</a>
            .
          </span>
        </div>
      </div>
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
