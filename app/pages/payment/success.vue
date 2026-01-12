<template>
  <div class="flex flex-col h-full w-full text-center py-40 text-white">
    <h1 class="text-xl font-bold">Payment completed</h1>
    <p>Your subscription will be updated shortly.</p>

    <button class="mt-6 px-4 py-2 bg-green-600 rounded" @click="goBack">
      Return to app
    </button>
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
  showToast("Payment successful. Returning to app in 5 seconds…", "success");

  setTimeout(() => {
    goBack();
  }, 5000);
}
</script>
