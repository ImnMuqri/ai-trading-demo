<template>
  <section
    class="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">
    <!-- Glowing floating spheres -->

    <div class="flex relative gap-4 w-[55%] px-6">
      <div class="">
        <div class="mb-4 grid grid-cols-1 gap-4">
          <div class="flex items-center gap-2">
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
          <h1 class="text-4xl font-bold text-white text-left">
            Welcome to AI Trading App
          </h1>
        </div>

        <p class="text-gray-200 mb-2 text-left">
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
      <!-- <div class="notif-stack flex-1">
        <div
          v-for="(notif, index) in notifications"
          :key="notif.id"
          class="notif-card !w-[350px]"
          :class="
            notif.id % 2 === 0
              ? 'bg-gradient-to-br from-black to-red-600'
              : 'bg-gradient-to-br from-black to-teal-600'
          "
          :style="getCardStyle(index)">
          {{ notif.text }}
        </div>
      </div> -->
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
const visibleCount = 4;
const frontIndex = ref(0);

const scaleMap = [1, 0.95, 0.9, 0.85, 0.8];
const opacityMap = [1, 0.0, 0.0, 0.0, 0];
const yMap = [0, 15, 30, 45, 60, 80]; // extra buffer for disappearing cards

const getCardStyle = (index) => {
  let pos = (index - frontIndex.value + cardCount) % cardCount;

  // Use extra buffer for smooth cycling
  if (pos >= visibleCount) {
    // position it slightly below the last visible card
    return {
      transform: `translateY(${yMap[yMap.length - 1] + 40}px) scale(${
        scaleMap[scaleMap.length - 1]
      })`,
      opacity: 0,
      zIndex: 0,
      backdropFilter: `blur(0px)`,
      transition: "all 1s ease-in-out",
    };
  }

  const blurAmount = pos * 2;
  return {
    transform: `translateY(${yMap[pos]}px) scale(${scaleMap[pos]})`,
    opacity: opacityMap[pos],
    zIndex: visibleCount - pos,
    backdropFilter: `blur(${blurAmount}px)`,
    transition: "all 1s ease-in-out",
  };
};

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
