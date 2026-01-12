<template>
  <div
    class="flex flex-col h-full w-full text-center items-center py-40 text-white"
  >
    <div class="flex flex-col gap-2">
      <h1 class="text-xl font-bold">Payment failed</h1>
      <p>Try subscription payment again or contact us for troubleshooting.</p>
    </div>

    <UiButton class="mt-6 py-2 rounded max-w-[300px]" @click="goBack">
      Return to app
    </UiButton>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "layout",
  middleware: "auth-client",
});

const goBack = () => {
  navigateTo("/settings/subscription");
};

if (process.client) {
  showToast("Payment failed. Returning to page...", "error");

  setTimeout(() => {
    goBack();
  }, 5000);
}
</script>
