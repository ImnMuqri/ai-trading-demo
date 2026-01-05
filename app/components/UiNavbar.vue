<template>
  <header class="fixed h-28 top-0 left-0 w-full z-50 backdrop-blur">
    <nav class="mx-auto px-20 h-20 flex items-end justify-between">
      <p class="text-lg font-bold italic text-white">SIGNALWISE</p>

      <div class="hidden md:flex items-center gap-8 text-sm text-[#BCBBBB]">
        <!-- Home -->
        <a
          href="https://signalwise.com/"
          class="relative group px-1 transition-colors duration-300">
          Home
          <span
            class="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3CFFE8] transition-all duration-300"></span>
        </a>

        <!-- Features -->
        <a
          href="https://signalwise.com/features"
          class="relative group px-1 transition-colors duration-300">
          Features
          <span
            class="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3CFFE8] transition-all duration-300"></span>
        </a>

        <!-- Contact -->
        <a
          href="https://signalwise.com/contact"
          class="relative group px-1 transition-colors duration-300">
          Contact
          <span
            class="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#3CFFE8] transition-all duration-300"></span>
        </a>
      </div>

      <NuxtLink
        to="/login"
        class="px-4 text-[#BCBBBB] py-2 text-sm font-medium hover:text-white/80 transition">
        Get Started
      </NuxtLink>
    </nav>
  </header>
</template>
<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>
