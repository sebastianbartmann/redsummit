<script>
  import { Chart, LineSeries } from "svelte-lightweight-charts";
  import { ColorType } from "lightweight-charts";
  import { getWeeklyMedianPrices } from "../../services/gcp-services/getAppartmentWeeklyMedianPrices.js";
  import { onMount } from "svelte";

  let data = [];

  let isLoading = true;

  async function fetchData() {
    isLoading = true;
    const response = await getWeeklyMedianPrices();
    data = JSON.parse(response.body);
    isLoading = false;
  }

  $: {
    fetchData();
  }

  // Create a number format using Intl.NumberFormat
  const myPriceFormatter = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR", // Currency for data points
  }).format;

  let localization;
  $: localization = {
    priceFormatter: myPriceFormatter,
  };

  const options = {
    layout: {
      background: {
        type: ColorType.Solid,
        color: "#860313",
      },
      textColor: "#F48EA3",
    },
    crosshair: {
      horzLine: {
        visible: false,
      },
    },
    grid: {
      vertLines: {
        visible: false,
      },
      horzLines: {
        color: "#F48EA3",
      },
    },
    rightPriceScale: {
      borderVisible: false,
    },
    timeScale: {
      borderVisible: false,
      barSpacing: 20,
    },
  };
</script>

<div class="card-compact card bg-white shadow-xl">
  <div class="card-body m-2 text-mainred">
    <h2 class="card-title">Weekly median appartment prices in vienna</h2>
    <p>
      Crawled directly from appartment listings, twice a week. No filter, just
      the median.
    </p>
    <p>
      For details have a look at <a
        class="text-link"
        href="/projects/weekly-median-appartment-price">the project breakdown</a
      >.
    </p>
    <p>This is live data, updated weekly.</p>
  </div>
  <div class="m-2 flex h-60 min-w-fit justify-center rounded-lg bg-snd">
    {#if isLoading}
      <p>Loading...</p>
    {:else}
      <Chart
        container={{ class: "h-10/12 w-10/12" }}
        autoSize={true}
        {...options}
        {localization}
      >
        <LineSeries {data} color="#eee5f7" lineWidth="2" />
      </Chart>
    {/if}
  </div>
</div>
