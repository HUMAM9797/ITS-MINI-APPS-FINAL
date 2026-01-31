<script>


  let isSubscribed = false;
  let loading = false;
  let errorMessage = "";

  onMount(async () => {
    const sub = await getSubscription();
    if (sub && sub.active) {
      isSubscribed = true;
      subscription.set(sub);
    } else {
      isSubscribed = false;
    }
  });

  async function goToPlans() {
    loading = true;
    errorMessage = "";
    try {
      if (!window.my || typeof window.my.getAuthCode !== 'function') {
        errorMessage = 'Authentication system not available.';
        currentPage.set("plans");
        loading = false;
        return;
      }

      window.my.getAuthCode({
        scopes: ['auth_base', 'USER_ID'],
        success: async (res) => {
          try {
            const authCode = res.authCode;
            if (!authCode) {
              throw new Error('No auth code received');
            }
            const response = await fetch(
              'https://its.mouamle.space/api/auth-with-superQi',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: authCode })
              }
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.token) {
              window.sessionToken = data.token;
              currentPage.set("plans");
            } else {
              throw new Error('No token received from server');
            }
          } catch (error) {
            errorMessage = `Login failed: ${error.message}`;
          } finally {
            loading = false;
          }
        },
        fail: (err) => {
          errorMessage = `Authentication failed: ${err.errorMessage || err.message || 'Unknown error'}`;
          loading = false;
        }
      });
    } catch (e) {
      errorMessage = `Login failed: ${e.message || 'Unknown error'}`;
      currentPage.set("plans");
      loading = false;
    }
  }

</script>

<div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
  {#if !isSubscribed}
    <div class="bg-white border border-gray-300 rounded-lg shadow p-6 w-full max-w-md text-center">
      <p class="text-gray-700 text-lg font-semibold mb-4">
        🚨 test adds
      </p>
      <div class="bg-gray-200 h-28 rounded-md flex items-center justify-center mb-6">
        <p class="text-gray-500 text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, cum?</p>
      </div>

      <button
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full transition"
        on:click={goToPlans}
      >
      remove adds(subscibe now)
      </button>
    </div>
  {:else}
    <div class="bg-white border border-green-300 rounded-lg shadow p-6 w-full max-w-md text-center">
      <p class="text-green-600 text-xl font-bold mb-4">
        ✅ your subscribe is active there is no adds now.
      </p>
      <p class="text-gray-600">
        you can enjoy without adds.
      </p>
    </div>
  {/if}
  {#if !isSubscribed}
    <div class="bg-white border border-gray-300 rounded-lg shadow p-6 w-full max-w-md text-center">
      <p class="text-gray-700 text-lg font-semibold mb-4">
        🚨 test adds
      </p>
      <div class="bg-gray-200 h-28 rounded-md flex items-center justify-center mb-6">
        <p class="text-gray-500 text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, cum?</p>
      </div>

      {#if errorMessage}
        <div class="text-red-600 mb-2">{errorMessage}</div>
      {/if}
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full transition"
        on:click={goToPlans}
        disabled={loading}
      >
        {#if loading}
          <span>Processing...</span>
        {:else}
          <span>remove adds(subscibe now)</span>
        {/if}
      </button>
    </div>
  {:else}
    <div class="bg-white border border-green-300 rounded-lg shadow p-6 w-full max-w-md text-center">
      <p class="text-green-600 text-xl font-bold mb-4">
        ✅ your subscribe is active there is no adds now.
      </p>
      <p class="text-gray-600">
        you can enjoy without adds.
      </p>
    </div>
  {/if}
</div>


