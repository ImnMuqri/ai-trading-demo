<template>
  <!-- <img
    src="/bg/BG.svg"
    alt="Background"
    class="absolute inset-0 w-full h-full object-cover" /> -->

  <!-- <div class="custom-background-image h-screen w-full">
    Content with background here
  </div> -->

  <div class="min-h-screen flex flex-col bg-gray-50">
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
<style scoped>
/* .custom-background-image {
  background-image: url(/bg/BG.svg);
  width: 100%;
  height: 100%;
  background-size: cover;
} */
</style>
