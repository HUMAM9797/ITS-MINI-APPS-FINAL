<script>
  import { onMount } from "svelte";
  import {
    chosenPlan,
    currentPage,
    subscription,
  } from "../stores/subscription.js";
  import { setSubscription } from "../lib/storage.js";

  export let sessionToken; 

  let plan = null;
  let loading = false;
  let message = "";

  onMount(() => {
    plan = $chosenPlan;
  });

  async function startPayment() {
    if (!sessionToken) {
      message = "You should login first.";
      return;
    }

    if (!plan) {
      message = "No plan chosen!";
      return;
    }

    loading = true;
    message = "";

    try {
      const res = await fetch("https://its.mouamle.space/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionToken,
        },
        body: JSON.stringify({
          plan: plan.id, 
        }),
      });

      if (!res.ok) {
        throw new Error(`Payment API error: ${res.status}`);
      }

      const data = await res.json();

      if (!data.url) {
        throw new Error("Payment URL not found.");
      }

      if (!window.my || typeof window.my.tradePay !== 'function') {
        message = "Payment system not available.";
        loading = false;
        return;
      }

      window.my.tradePay({
        paymentUrl: data.url,
        success: async (res) => {
          if (res.resultCode === "9000") {
            await setSubscription({
              plan: plan.id,
              active: true,
            });
            subscription.set({
              plan: plan.id,
              active: true,
            });
            currentPage.set("dashboard");
          } else if (res.resultCode === "6001") {
            message = "Payment canceled by user.";
          } else {
            message = "Payment failed.";
          }
          loading = false;
        },
        fail: (err) => {
          message = `Payment window can't open. ${err?.message || ''}`;
          loading = false;
        },
      });
    } catch (err) {
      message = `Error while paying: ${err.message || err}`;
      loading = false;
    }
  }
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div class="bg-white w-full max-w-sm rounded-lg shadow p-6 text-center">
    <h2 class="text-xl font-bold mb-4">
      pay {plan ? plan.name : ""}
    </h2>

    {#if message}
      <p class="text-red-500 mb-3">{message}</p>
    {/if}

    <button
      on:click={startPayment}
      disabled={loading}
      class="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded disabled:opacity-50"
    >
      {#if loading}
        processing...
      {:else}
        pay ${plan ? plan.price : ""}
      {/if}
    </button>

    <button
      class="mt-4 text-sm text-gray-500"
      on:click={() => currentPage.set("confirm")}
    >
      ← back
    </button>
  </div>
</div>
