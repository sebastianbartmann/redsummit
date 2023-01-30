<script>
  import { onMount } from "svelte";
  import { clickOutside } from "./../services/clickOutside.js";

  // Show mobile icon and display menu
  let showMobileMenu = false;

  // Mobile menu click event handler
  const handleMobileIconClick = () => (showMobileMenu = !showMobileMenu);

  function handleClickOutside(event) {
    showMobileMenu = false;
  }

  // Media match query handler
  const mediaQueryHandler = (e) => {
    // Reset mobile state
    if (!e.matches) {
      showMobileMenu = false;
    }
  };

  // Attach media query listener on mount hook
  onMount(() => {
    const mediaQueryListener = window.matchMedia("(max-width: 767px)");

    mediaQueryListener.addEventListener("change", mediaQueryHandler);
  });
</script>

<nav>
  <div class="mx-auto flex items-center justify-between flex-wrap p-6">
    <a class="flex" href="/">
      <img class="shadow-xl h-8 mr-4" src="/profile_pic.png" alt="redSummit" />
      <span class="font-semibold text-xl tracking-tight text-white"
        >redSummit</span
      ></a
    >

    <!--lg-->
    <div class="hidden lg:flex lg:items-center lg:w-auto text-white">
      <div class="text-sm lg:flex-grow">
        <a
          href="/about"
          class="block mt-4 lg:inline-block lg:mt-0 hover:text-highlight mr-4"
        >
          Other Stuff
        </a>
        <a
          href="/about"
          class="block mt-4 lg:inline-block lg:mt-0 hover:text-highlight"
        >
          About
        </a>
      </div>
    </div>

    <!--mobile button-->
    <div
      class="lg:hidden"
      use:clickOutside
      on:click_outside={handleClickOutside}
    >
      <button
        on:click={handleMobileIconClick}
        class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><title>Menu</title><path
            d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
          />
        </svg>
      </button>
    </div>
  </div>

  <!--mobile submenu-->
  <div
    class="text-right pr-6 pb-6 pl-6 {showMobileMenu
      ? ' visible'
      : 'invisible'}"
  >
    <div>
      <div
        class="{showMobileMenu
          ? ' h-auto'
          : 'h-0'} text-sm bg-secondary text-right p-2"
      >
        <a
          href="/posts"
          class="block mt-4 inline-block mt-0 hover:text-highlight mr-4"
        >
          Posts
        </a>
        <a
          href="/about"
          class="block mt-4 inline-block mt-0 hover:text-highlight "
        >
          About
        </a>
      </div>
    </div>
  </div>
</nav>
