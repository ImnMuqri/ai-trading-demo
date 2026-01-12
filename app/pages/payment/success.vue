<template>
  <div
    class="flex flex-col h-full w-full text-center items-center py-40 text-white"
  >
    <div class="flex flex-col gap-2">
      <h1 class="text-xl font-bold">Payment completed</h1>
      <p>Your subscription will be updated shortly.</p>
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
  showToast("Payment successful. Returning to page...", "success");

  setTimeout(() => {
    goBack();
  }, 5000);
}
</script>
