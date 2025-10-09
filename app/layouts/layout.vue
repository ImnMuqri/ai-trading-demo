<template>
  <div class="flex min-h-screen bg-[#0D0D0D]">
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-[#0D0D0D] shadow-md border-r border-[#1C1C1C] flex flex-col transition-all duration-300 ',
        isCollapsed ? 'w-16' : 'w-60',
      ]">
      <div class="flex items-center gap-2 p-4 border-b border-[#1C1C1C]">
        <button
          @click="toggleSidebar"
          class="text-gray-500 hover:text-blue-600 transition">
          <UiIcon
            icon="stash:burger-classic-duotone"
            custom-class="text-white w-[25px] h-[40px]"></UiIcon>
        </button>
        <UiIcon
          v-show="!isCollapsed"
          icon="icon:tpt-logo"
          custom-class="w-[180px] h-[40px]" />
      </div>

      <nav class="flex-1 p-3 space-y-2 pt-10">
        <NuxtLink
          to="/dashboard"
          class="flex items-center gap-3 px-3 py-2 rounded-md transition"
          :class="[
            route.path === '/dashboard'
              ? 'bg-[#A0CCE740] text-white font-medium '
              : 'text-[#BCBBBB] hover:bg-blue-50 hover:text-black',
            isCollapsed ? 'justify-center' : 'justify-start',
          ]">
          <UiIcon
            icon="material-symbols:dashboard-outline-rounded"
            custom-class="w-5 h-5" />
          <span v-if="!isCollapsed">Dashboard</span>
        </NuxtLink>
        <NuxtLink
          to="/dailybias"
          class="flex items-center gap-3 px-3 py-2 rounded-md transition"
          :class="[
            route.path === '/dailybias'
              ? 'bg-[#A0CCE740] text-white font-medium'
              : 'text-[#BCBBBB] hover:bg-blue-50 hover:text-black',
            isCollapsed ? 'justify-center' : 'justify-start',
          ]">
          <UiIcon icon="solar:bag-broken" custom-class="w-5 h-5" />
          <span v-if="!isCollapsed" class="whitespace-nowrap">Daily Bias</span>
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-[#1C1C1C]">
        <button
          @click="logout"
          class="flex items-center gap-3 w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-md transition">
          <UiIcon icon="solar:exit-linear" custom-class="w-5 h-5" />
          <span v-if="!isCollapsed">Logout</span>
        </button>
      </div>
    </aside>
    <!-- Main content -->
    <main class="flex-1 p-6 overflow-y-auto">
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-2xl font-semibold text-[#00BDA7]">Dashboard</h2>
          <p class="text-gray-200 mt-2 mb-2 text-sm">
            Welcome to Ai Trading Dashboard
          </p>
        </div>
        <div class="flex gap-4 items-center">
          <UiIcon
            icon="solar:bell-line-duotone"
            custom-class="text-white w-6 h-6"></UiIcon>
          <div class="p-4 border bg-white rounded-full"></div>
        </div>
      </div>
      <slot />
    </main>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "#app";

const isCollapsed = ref(false);
const route = useRoute();

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value;
}

function logout() {
  useCookie("authToken").value = null;
  navigateTo("/login");
}
</script>
