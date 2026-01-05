<template>
  <div
    class="flex flex-col items-center justify-center h-screen text-center !bg-black"
  >
    <div class="flex flex-col !text-white">
      <span class="text-[100px]">{{ unauthorized ? "403" : "404" }}</span>
      <span class="text-[30px]">{{ errorMsg }}</span>
    </div>
    <NuxtLink
      v-if="!auth.isAuthenticated"
      to="/login"
      class="mt-3 text-blue-600 underline hover:cursor-select"
      >Go back home</NuxtLink
    >
    <NuxtLink
      v-else
      to="/dashboard"
      class="mt-3 text-blue-600 underline hover:cursor-select"
      >Back to dashboard</NuxtLink
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { showToast } from "~/composables/useToastMessage";

const auth = useAuthStore();
const route = useRoute();

const redirectPath = !auth.isAuthenticated ? "/login" : "/dashboard";
const errorMsg = ref("Oops - Page not found");
const unauthorized = route.query.unauthorized === "true";

let timer;

onMounted(async () => {
  if (!auth.isAuthenticated) {
    errorMsg.value = "Oops - Invalid session";
    showToast("Unauthenticated, returning to login page...", "error");
    timer = setTimeout(() => {
      return navigateTo(redirectPath);
    }, 3000);
  } else if (unauthorized) {
    errorMsg.value = "Unauthorized";
    showToast("Unauthorized, returning to dashboard...", "error");
    timer = setTimeout(() => {
      return navigateTo(redirectPath);
    }, 3000);
  } else {
    showToast("Unexpected error, returning to dashboard...", "error");
    timer = setTimeout(() => {
      return navigateTo(redirectPath);
    }, 3000);
  }
});
</script>
