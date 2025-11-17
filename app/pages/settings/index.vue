<template>
  <div
    class="mt-2 py-4 px-4 rounded-t-md border border-[#2D2D2D] bg-[#111111] text-[#008E7E]">
    Edit Account, Preferences, Subscription
  </div>
  <div
    class="flex border-l border-r border-[#2D2D2D] bg-[#111111] h-[70%] overflow-y-hidden">
    <aside class="w-64 p-6 border-r border-[#2D2D2D]">
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

    <main class="flex-1 px-8 py-6">
      <NuxtPage />
    </main>
  </div>
  <div
    class="flex justify-end py-4 px-4 rounded-b-md border border-[#2D2D2D] bg-[#111111] text-[#008E7E]">
    <UiButton>Save</UiButton>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

definePageMeta({
  title: "Settings",
  layout: "layout",
  middleware: "auth",
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
</script>

<style scoped>
/* Optional: additional smooth fade on text color */
nav a {
  transition: background-color 0.5s ease, color 0.5s ease;
}
</style>
