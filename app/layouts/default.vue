<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <div class="custom-background-image flex-1">
      <main class="flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>
<style scoped>
.custom-background-image {
  background-image: url("~/assets/bg/background-02.svg");
  background-repeat: no-repeat;
  background-size: cover; /* makes it fill the background */
  background-position: center; /* centers the image */
}
</style>
