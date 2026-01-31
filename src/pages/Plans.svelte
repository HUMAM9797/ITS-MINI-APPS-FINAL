<script>
  import { currentPage, chosenPlan } from "../stores/subscription.js";

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 2.99,
      description: "remove adds only",
    },
    {
      id: "pro",
      name: "Pro",
      price: 5.99,
      description: "remove adds + addtional ",
    },
  ];

  function selectPlan(plan) {
    chosenPlan.set(plan);
    currentPage.set("confirm");
  }
</script>

<div class="min-h-screen bg-gray-100 flex flex-col items-center p-4">
  <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">
    choose your plan
  </h2>

  <div class="grid gap-4 w-full max-w-md">
    {#each plans as plan}
      <div class="bg-white border border-gray-300 rounded-lg shadow p-5">
        <h3 class="text-xl font-semibold text-gray-700 mb-2">
          {plan.name}
        </h3>
        <p class="text-gray-600 mb-4">{plan.description}</p>
        <p class="text-lg font-bold text-indigo-600 mb-4">
          ${plan.price} / monthly
        </p>
        <button
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full transition"
          on:click={() => selectPlan(plan)}
        >
          choose {plan.name}
        </button>
      </div>
    {/each}
  </div>

  <button
    class="mt-6 text-sm text-gray-500 hover:text-gray-700"
    on:click={() => currentPage.set("home")}
  >
    ← back
  </button>
</div>
