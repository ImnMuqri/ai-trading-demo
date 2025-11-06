<template>
  <!-- <img
    src="/bg/Background-02.svg"
    alt="Background"
    class="absolute inset-0 w-full h-full object-cover" /> -->

  <div class="custom-background-image h-20">Content with background here</div>

  <div class="min-h-screen flex flex-col bg-gray-50">
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
<style scoped>
.custom-background-image {
  background-image: url(/public/BG.svg);
}
</style>
