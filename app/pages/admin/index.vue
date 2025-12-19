<template>
  <div>
    <div>
      <UiCard isGradient class="p-40">Admin</UiCard
      ><UiCard isGradient class="p-40">User Summary</UiCard>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "layout",
  middleware: "auth-client",
});
</script>

<style lang="scss" scoped></style>
