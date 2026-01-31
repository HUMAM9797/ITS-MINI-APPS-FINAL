<script>
  import { subscription, currentPage } from "../stores/subscription.js";
  import { removeSubscription } from "../lib/storage.js";

  let sub = null;

  $: sub = $subscription;

  async function cancelSubscription() {
    await removeSubscription();

    subscription.set(null);
    currentPage.set("home");
  }
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div class="bg-white w-full max-w-sm rounded-lg shadow p-6 text-center">
    <h2 class="text-2xl font-bold text-green-700 mb-3">✅ Ads Removed</h2>

    {#if sub}
      <p class="text-gray-700 mb-2">
        your subscibtion in a plan
        <span class="font-semibold text-blue-700">
          {sub.plan.toUpperCase()}
        </span>
      </p>
    {/if}

    <p class="text-gray-600 text-sm mb-6">
      now you can use your app without adds.
    </p>

    <button
      on:click={cancelSubscription}
      class="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded mb-4"
    >
      cancel subscribe (Demo)
    </button>

    <button
      on:click={() => currentPage.set("home")}
      class="text-sm text-gray-500"
    >
      back to home.
    </button>
  </div>
</div>
