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
            :icon="
              isMobile && isMobileMenuOpen
                ? 'meteor-icons:xmark'
                : 'stash:burger-classic-duotone'
            "
            custom-class="text-white w-[25px] h-[40px]" />
        </button>

        <span
          class="inline-block transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ml-4"
          :class="
            !isCollapsed
              ? 'opacity-100 translate-x-0 max-w-[130px]'
              : 'opacity-0 -translate-x-4 max-w-0'
          ">
          <UiIcon icon="icon:bullise-logo" custom-class="w-[130px] h-[30px]" />
        </span>
      </div>

      <nav class="flex-1 p-3 space-y-2 pt-4 overflow-hidden">
        <SidebarLink
          v-for="link in links"
          :key="link.path"
          :link="link"
          :is-collapsed="isCollapsed"
          :is-active="isActive(link.path)"
          @click="toggleMobileMenu" />
      </nav>

      <!-- Upgrade block -->
      <div
        class="mx-4 my-4 border border-[#4C4B4B] rounded-xl p-4 text-center bg-[#1C1C1C] shadow-sm overflow-hidden transform origin-bottom-left transition-all duration-500 ease-out"
        :class="
          isCollapsed
            ? 'max-h-0 opacity-10 scale-y-0'
            : 'max-h-[500px] opacity-100 scale-y-100'
        ">
        <UiIcon
          icon="material-symbols:diamond-outline-rounded"
          custom-class="w-10 h-10 text-white"></UiIcon>
        <p class="text-[13px] text-white font-medium">
          Need more for your trade?
        </p>
        <p class="text-[12px] text-white mb-3">
          Upgrade now to unlock more features
        </p>

        <NuxtLink
          to="/settings/subscription"
          class="flex items-center justify-center gap-2 bg-gradient-to-r from-[#2A8E9E] to-[#00BDA7] rounded-lg py-2 px-2 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          exact
          @click="toggleMobileMenu">
          <span class="text-[14px]">Upgrade</span>
        </NuxtLink>
      </div>
    </aside>

    <!-- Main Content -->
    <main
      :style="mainStyle"
      class="flex-1 p-6 overflow-y-auto transition-all duration-300">
      <div class="flex justify-between items-start">
        <div>
          <div class="flex gap-2">
            <button
              class="md:hidden text-white"
              @click="toggleMobileMenu"
              aria-label="Open mobile menu">
              <UiIcon
                icon="stash:burger-classic-duotone"
                custom-class="w-6 h-6" />
            </button>
            <h2 class="text-2xl font-semibold text-[#00BDA7]">
              {{ currentPage.title }}
            </h2>
          </div>
          <p class="text-gray-200 mt-2 mb-2 text-sm">
            {{ currentPage.description }}
          </p>
        </div>

        <div class="flex gap-4 items-center">
          <UiIcon
            icon="solar:bell-line-duotone"
            custom-class="text-white w-5 h-5" />

          <UiPopover position="bottom">
            <template #trigger>
              <div class="p-1 border bg-white rounded-full cursor-pointer">
                <UiIcon
                  icon="quill:user-happy"
                  custom-class="text-black w-7 h-7" />
              </div>
            </template>

            <div class="text-[#BCBBBB] w-[150px] flex flex-col justify-start">
              <NuxtLink
                to="/settings/basicinfo"
                class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-800"
                @click="closePopover">
                <UiIcon icon="hugeicons:user-03" custom-class="w-4 h-4" />
                <span class="text-[12px] whitespace-nowrap overflow-hidden">
                  User Profile
                </span>
              </NuxtLink>

              <div class="h-[2px]" />

              <UiButton
                variant="text"
                @click="confirmLogout = true"
                class="w-full !justify-start inline-block text-red-500 hover:text-white !border-none">
                Logout
                <template #icon-left>
                  <UiIcon icon="solar:exit-linear" custom-class="w-3 h-3" />
                </template>
              </UiButton>
            </div>
          </UiPopover>
        </div>
      </div>

      <slot />
    </main>

    <UiModal
      :show="confirmLogout"
      title="Confirm Logout"
      description="Are you sure you want to log out?"
      type="confirmAlert"
      @confirm="handleLogout"
      @close="confirmLogout = false" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "#app";
import { useAuth } from "@/composables/auth";
import { useAuthStore } from "@/stores/auth";
import SidebarLink from "@/components/SidebarLink.vue";

const { logout } = useAuth();
const auth = useAuthStore();
const route = useRoute();

const isCollapsed = ref(false);
const isMobileMenuOpen = ref(false);
const isMobile = ref(false);
const confirmLogout = ref(false);

const updateIsMobile = () => {
  if (typeof window === "undefined") return;
  isMobile.value = window.innerWidth < 768;
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

// Sidebar toggle
function toggleSidebarOrMenu() {
  if (isMobile.value) isMobileMenuOpen.value = !isMobileMenuOpen.value;
  else isCollapsed.value = !isCollapsed.value;
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

const asideClasses = computed(() => {
  const base =
    "fixed top-0 left-0 h-full bg-[#0D0D0D] shadow-md border-r border-[#1C1C1C] flex flex-col z-50 transition-all duration-300";
  const width = isCollapsed.value ? "w-16" : "w-60";
  const mobileTranslate =
    isMobile.value && !isMobileMenuOpen.value
      ? "-translate-x-full"
      : "translate-x-0";
  return [base, width, mobileTranslate].join(" ");
});

const mainStyle = computed(() => {
  if (isMobile.value) return { marginLeft: "0" };
  return { marginLeft: isCollapsed.value ? "4rem" : "15rem" };
});

const pageMeta = {
  "/dashboard": {
    title: "Dashboard",
    description:
      "Overview of your trading performance, signals, and market insights.",
  },
  "/dailybias": {
    title: "Daily Bias",
    description:
      "AI driven market direction analysis to guide your trading decisions.",
  },
  "/signalhistory": {
    title: "Signal History",
    description:
      "Review past AI signals and track their performance over time.",
  },
  "/affiliate": {
    title: "Affiliate Dashboard",
    description:
      "Track referrals, commissions, and affiliate performance metrics.",
  },
  "/settings/subscription": {
    title: "Subscription",
    description:
      "Manage your plan, billing details, and subscription preferences.",
  },
  "/admin/dashboard": {
    title: "Admin Panel",
    description:
      "System overview, platform metrics, and administrative controls.",
  },
  "/admin/referralmanagement": {
    title: "Referral Management",
    description:
      "Manage affiliate referrals, payouts, and referral performance.",
  },
  "/admin/subsmanagement": {
    title: "Subscription Management",
    description: "Monitor active subscriptions, revenue, and plan analytics.",
  },
};

const currentPage = computed(
  () =>
    pageMeta[route.path] || {
      title: "Dashboard",
      description: "Welcome to AI Trading.",
    }
);

const links = [
  {
    path: "/dashboard",
    icon: "material-symbols:dashboard-outline-rounded",
    label: "Dashboard",
  },
  {
    path: "/signalhistory",
    icon: "hugeicons:transaction-history",
    label: "Signal History",
  },
  {
    path: "/affiliate",
    icon: "humbleicons:users",
    label: "Affiliate Management",
    roles: ["affiliate", "admin", "developer"],
  },
  {
    path: "/admin/dashboard",
    icon: "hugeicons:user",
    label: "Admin Panel",
    roles: ["admin", "developer"],
  },
];

const isActive = (path) => {
  if (Array.isArray(path)) return path.includes(route.path);
  return route.path === path;
};

const closePopover = () =>
  document.dispatchEvent(new MouseEvent("click", { bubbles: true }));

const handleLogout = async () => await logout();
</script>
