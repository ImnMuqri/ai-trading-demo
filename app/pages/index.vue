<template>
  <section
    class="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">
    <!-- Glowing floating spheres -->

    <div class="flex relative gap-4 w-full md:w-[55%] px-8 md:px-6">
      <div class="">
        <div class="mb-4 grid grid-cols-1 gap-4">
          <div class="flex items-center justify-center md:justify-start gap-2">
            <div class="text-sky-500 text-[12px] capitalize">
              powered by TrueProTech
            </div>
            <span class="relative flex size-2">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span
                class="relative inline-flex size-2 rounded-full bg-sky-400"></span
            ></span>
          </div>
          <h1 class="text-xl md:text-4xl font-bold text-white md:text-left">
            Welcome to AI Trading App
          </h1>
        </div>

        <p class="text-gray-200 mb-2 md:text-left">
          A modern app built with trusted technologies to help you trade
          smarter.
        </p>
        <div class="flex flex-wrap justify-start gap-4 mt-4">
          <NuxtLink
            to="/login"
            class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition w-full sm:w-auto">
            Get Started
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
definePageMeta({
  layout: "default",
});

const notifications = ref([
  { id: 1, text: "Market dip detected, ideal entry at RM 45,646" },
  { id: 2, text: "Momentum rising, consider selling at RM 45,700" },
  { id: 3, text: "Smart buy zone spotted near RM 45,500" },
  { id: 4, text: "Quick surge! Secure profits at RM 45,800" },
  { id: 5, text: "Breakout forming, buy early around RM 46,000" },
]);

const cardCount = notifications.value.length;
const frontIndex = ref(0);

// smoother interval cycling
onMounted(() => {
  setInterval(() => {
    frontIndex.value = (frontIndex.value + 1) % cardCount;
  }, 2500);
});
</script>
<style scoped>
.glass-card {
  /* background: rgba(255, 255, 255, 0.15); */
  /* backdrop-filter: blur(10px); */
  /* border: 1px solid rgba(255, 255, 255, 0.2); */
  transition: transform 0.7s ease-in-out, opacity 0.7s ease-in-out,
    backdrop-filter 0.7s ease-in-out;
}

.glow {
  position: absolute;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  filter: blur(130px);
  opacity: 0.85;
  pointer-events: none;
}

.notif-stack {
  position: relative;
  width: 100%;
  height: 11rem;
  display: flex;
  padding-top: 3rem;
  align-items: start;
  justify-content: center;
  overflow: hidden;
}

.notif-card {
  position: absolute;
  width: 100%;
  text-align: left;
  padding: 1rem;
  color: white;
  border-radius: 1rem;
  transition: transform 1s ease-in-out, opacity 1s ease-in-out,
    backdrop-filter 1s ease-in-out;
}
</style>
