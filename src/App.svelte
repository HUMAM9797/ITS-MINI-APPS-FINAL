<script>
  import { currentPage } from "./stores/subscription.js";

  import Home from "./pages/Home.svelte";
  import Plans from "./pages/Plans.svelte";
  import Confirm from "./pages/Confirm.svelte";
  import Pay from "./pages/Pay.svelte";
  import Dashboard from "./pages/Dashboard.svelte";


  let sessionToken = "";


  $: sessionToken = window.sessionToken || "";
</script>

<main class="min-h-screen bg-gray-100">
  {#if $currentPage === "home"}
    <Home />
  {:else if $currentPage === "plans"}
    <Plans />
  {:else if $currentPage === "confirm"}
    <Confirm />
  {:else if $currentPage === "pay"}
    <Pay {sessionToken} />
  {:else if $currentPage === "dashboard"}
    <Dashboard />
  {/if}
</main>
