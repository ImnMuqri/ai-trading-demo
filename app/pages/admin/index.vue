<template>
  <!-- Top tabs for admin -->
  <div class="pt-4 pb-4 px-2 overflow-x-auto flex gap-2">
    <UiChip
      v-for="tab in adminTabs"
      :key="tab.path"
      :isActive="route.path === tab.path"
      class="text-white text-[12px] py-1.5 px-3 mx-[2px] rounded border transition-all duration-300 ease-in-out"
      :class="[
        route.path === tab.path
          ? 'bg-[#00BDA780] border-[#00BDA7] scale-105'
          : 'bg-[#0D0D0D] border-[#1C1C1C] scale-100 hover:scale-105 hover:bg-[#1A1A1A]',
      ]"
      @click="goTo(tab.path)">
      {{ tab.label }}
    </UiChip>
  </div>

  <!-- Main content -->
  <main class="flex-1 transition-opacity duration-300 ease-in-out">
    <NuxtPage />
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

definePageMeta({
  title: "Admin Panel",
  layout: "layout",
  middleware: "auth-client",
});

const router = useRouter();
const route = useRoute();

const adminTabs = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Subscription Management", path: "/admin/subsmanagement" },
  { label: "Referral Management", path: "/admin/referralmanagement" },
];

const goTo = (path) => {
  if (route.path !== path) {
    router.push(path);
  }
};

onMounted(() => {
  if (route.path === "/admin" || route.path === "/admin/") {
    router.replace("/admin/dashboard");
  }
});
</script>

<style scoped>
/* Optional: smooth fading effect for NuxtPage when switching tabs */
main {
  transition: opacity 0.3s ease-in-out;
}
</style>
