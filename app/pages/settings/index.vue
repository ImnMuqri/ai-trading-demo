<template>
  <div
    class="mt-2 py-4 px-4 rounded-t-md border border-[#2D2D2D] bg-[#111111] text-[#008E7E]">
    Edit Account, Preferences, Subscription
  </div>

  <!-- Responsive navigation -->
  <div
    class="bg-[#111111] md:border-b border-l border-r border-[#2D2D2D] md:hidden px-4 py-4 overflow-x-auto">
    <nav class="flex gap-2 text-sm">
      <NuxtLink
        to="/settings/basicInfo"
        :class="mobileLinkClass('/settings/basicInfo')">
        Basic Information
      </NuxtLink>
      <NuxtLink
        to="/settings/subscription"
        :class="mobileLinkClass('/settings/subscription')">
        Subscription
      </NuxtLink>
    </nav>
  </div>

  <div
    class="flex flex-col md:flex-row border-b border-l border-r border-[#2D2D2D] bg-[#111111]">
    <!-- Sidebar for desktop -->
    <aside class="hidden md:block w-64 p-6 border-r border-[#2D2D2D]">
      <nav class="flex flex-col gap-2 text-sm">
        <NuxtLink
          to="/settings/basicInfo"
          :class="linkClass('/settings/basicInfo')">
          Basic Information
        </NuxtLink>
        <NuxtLink
          to="/settings/subscription"
          :class="linkClass('/settings/subscription')">
          Subscription
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="flex-1 px-8 py-6 overflow-y-auto">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

definePageMeta({
  title: "Settings",
  layout: "layout",
  // // middleware: "auth",
  middleware: "auth-client",
});

const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (route.path === "/settings" || route.path === "/settings/") {
    router.replace("/settings/basicInfo");
  }
});

const linkClass = (path) => {
  const base =
    "p-2 rounded text-white transition duration-500 ease-in-out hover:bg-gray-700 hover:text-gray-200";
  const active = "bg-gray-700 font-semibold";
  return route.path === path ? `${base} ${active}` : base;
};

// Mobile pill-style links
const mobileLinkClass = (path) => {
  const base =
    "px-4 py-2 rounded-full border border-[#2D2D2D] text-white whitespace-nowrap transition duration-300";
  const active = "bg-[#008E7E] text-[#111111] font-semibold";
  return route.path === path ? `${base} ${active}` : base;
};
</script>

<style scoped>
/* Smooth hover/fade */
nav a {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
