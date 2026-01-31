<script>
  import { onMount } from "svelte";
  import { chosenPlan, currentPage } from "../stores/subscription.js";

  let plan = null;

  onMount(() => {
    plan = $chosenPlan;
  });

  function cancel() {
    currentPage.set("plans");
  }

  function proceedToPay() {
    currentPage.set("pay");
  }
</script>

<div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
  {#if plan}
    <div class="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-3">
        confirm subscribe
      </h2>

      <p class="text-gray-700 text-lg mb-4">
        your about subscribe
        <span class="font-semibold text-indigo-600">{plan.name}</span>
      </p>

      <p class="text-gray-600 mb-6">
        price <span class="font-semibold">${plan.price}</span> / monthly
      </p>

      <div class="flex gap-3 justify-center">
        <button
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
          on:click={cancel}
        >
          cancel
        </button>

        <button
          class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
          on:click={proceedToPay}
        >
          cnofirm and subscibe
        </button>
      </div>
    </div>
  {:else}
    <p class="text-gray-600">you do not choose a plan !!</p>
  {/if}
</div>
