<template>
  <div class="flex min-h-screen bg-[#0D0D0D] relative">
    <!-- Mobile overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/50 z-40 md:hidden"
      @click="toggleMobileMenu"
      aria-hidden="true"></div>

    <!-- Sidebar -->
    <aside :class="asideClasses">
      <!-- Header -->
      <div class="flex items-center gap-2 p-4 border-b border-[#1C1C1C]">
        <button
          @click="toggleSidebarOrMenu"
          class="text-gray-500 hover:text-blue-600 transition"
          :aria-expanded="isMobile ? isMobileMenuOpen : !isCollapsed"
          aria-label="Toggle menu">
          <UiIcon
            v-if="isMobile && isMobileMenuOpen"
            icon="meteor-icons:xmark"
            custom-class="text-white w-[25px] h-[40px]" />

          <UiIcon
            v-else-if="isMobile && !isMobileMenuOpen"
            icon="stash:burger-classic-duotone"
            custom-class="text-white w-[25px] h-[40px]" />
          <UiIcon
            v-else
            icon="stash:burger-classic-duotone"
            custom-class="text-white w-[25px] h-[40px]" />
        </button>

        <UiIcon
          v-if="!isCollapsed"
          icon="icon:tpt-logo"
          custom-class="w-[180px] h-[40px]" />
      </div>

      <!-- Nav Links -->
      <nav class="flex-1 p-3 space-y-2 pt-10 overflow-y-auto">
        <NuxtLink
          to="/dashboard"
          class="flex items-center gap-3 px-3 py-2 rounded-md transition"
          :class="[
            isActive('/dashboard') ? activeClass : inactiveClass,
            isCollapsed ? 'justify-center' : 'justify-start',
          ]">
          <UiIcon
            icon="material-symbols:dashboard-outline-rounded"
            custom-class="w-4 h-4" />
          <span v-if="!isCollapsed" class="text-sm">Dashboard</span>
        </NuxtLink>

        <NuxtLink
          to="/dailybias"
          class="flex items-center gap-3 px-3 py-2 rounded-md transition"
          :class="[
            isActive('/dailybias') ? activeClass : inactiveClass,
            isCollapsed ? 'justify-center' : 'justify-start',
          ]">
          <UiIcon icon="solar:bag-broken" custom-class="w-4 h-4" />
          <span v-if="!isCollapsed" class="whitespace-nowrap text-sm"
            >Daily Bias</span
          >
        </NuxtLink>
      </nav>
      <div class="p-3">
        <div
          class="border border-[#0D0D0D] rounded-xl p-4 text-center bg-gradient-to-r from-[#2A8E9E] to-[#00BDA7] shadow-sm">
          <p class="text-[12px] text-white mb-3">
            Feels Limited? Upgrade to Ai Pro to unlock more exciting features!
          </p>
          <NuxtLink
            to="/settings/subscription"
            class="flex items-center justify-center gap-2 bg-black rounded-lg py-2.5 px-2 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            exact>
            <UiIcon icon="heroicons:bolt" class="w-5 h-5"></UiIcon>
            <span class="text-[11px]">Upgrade to Ai Pro</span>
          </NuxtLink>
        </div>
      </div>
      <!-- Logout, anchored bottom -->
      <div class="p-4 border-t border-[#1C1C1C] mt-auto">
        <button
          @click="handleLogout"
          class="flex items-center gap-3 w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-md transition">
          <UiIcon icon="solar:exit-linear" custom-class="w-5 h-5" />
          <span v-if="!isCollapsed">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main
      :style="mainStyle"
      class="flex-1 p-6 overflow-y-auto transition-all duration-300">
      <div class="flex justify-between items-start">
        <div>
          <div class="flex gap-2">
            <!-- show burger on small screens -->
            <button
              class="md:hidden text-white"
              @click="toggleMobileMenu"
              aria-label="Open mobile menu">
              <UiIcon
                icon="stash:burger-classic-duotone"
                custom-class="w-6 h-6" />
            </button>
            <h2 class="text-2xl font-semibold text-[#00BDA7]">Dashboard</h2>
          </div>
          <p class="text-gray-200 mt-2 mb-2 text-sm">
            Welcome to Ai Trading Dashboard
          </p>
        </div>

        <div class="flex gap-4 items-center">
          <UiIcon
            icon="solar:bell-line-duotone"
            custom-class="text-white w-6 h-6" />
          <div class="p-4 border bg-white rounded-full"></div>
        </div>
      </div>

      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "#app";
import { useAuth } from "@/composables/auth";

const { logout } = useAuth();
const route = useRoute();
const isCollapsed = ref(false);
const isMobileMenuOpen = ref(false);
const isMobile = ref(false);

// detect mobile client side only, keep reactive on resize
const updateIsMobile = () => {
  if (typeof window === "undefined") return;
  isMobile.value = window.innerWidth < 768;
  // if switching to desktop, ensure mobile menu is closed
  if (!isMobile.value) isMobileMenuOpen.value = false;
};

onMounted(() => {
  updateIsMobile();
  window.addEventListener("resize", updateIsMobile);
});

onUnmounted(() => {
  if (typeof window !== "undefined")
    window.removeEventListener("resize", updateIsMobile);
});

// helper classes
const activeClass = "bg-[#A0CCE740] text-white font-medium";
const inactiveClass = "text-[#BCBBBB] hover:bg-blue-50 hover:text-black";

// computed classes for aside, prevents conflicting translate classes
const asideClasses = computed(() => {
  const base =
    "fixed top-0 left-0 h-full bg-[#0D0D0D] shadow-md border-r border-[#1C1C1C] flex flex-col z-50 transition-all duration-300 md:translate-x-0";
  const width = isCollapsed.value ? "w-16" : "w-60";
  // on mobile and closed, hide it off-canvas
  const mobileTranslate =
    isMobile.value && !isMobileMenuOpen.value
      ? "-translate-x-full"
      : "translate-x-0";
  return [base, width, mobileTranslate].join(" ");
});

// main content spacing, keep the sidebar space on desktop only
const mainStyle = computed(() => {
  if (isMobile.value) return { marginLeft: "0" };
  return { marginLeft: isCollapsed.value ? "4rem" : "15rem" };
});

// helpers and actions
const isActive = (path) => route.path === path;

function toggleSidebarOrMenu() {
  if (isMobile.value) {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  } else {
    isCollapsed.value = !isCollapsed.value;
  }
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

const handleLogout = async () => {
  const confirmLogout = confirm("Are you sure you want to log out?");
  if (confirmLogout) {
    await logout();
  }
};
</script>

<style scoped>
/* no extra styles required, tailwind handles layout and transitions */
</style>
