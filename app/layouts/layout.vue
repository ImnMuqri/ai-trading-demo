<template>
  <div class="flex min-h-screen bg-[#0D0D0D] relative">
    <!-- Mobile overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/50 z-40 md:hidden"
      @click="toggleMobileMenu"
      aria-hidden="true"
    ></div>

    <!-- Sidebar -->
    <aside :class="asideClasses">
      <!-- Header -->
      <div class="flex items-center gap-2 p-4 border-b border-[#1C1C1C]">
        <button
          @click="toggleSidebarOrMenu"
          class="text-gray-500 hover:text-blue-600 transition"
          :aria-expanded="isMobile ? isMobileMenuOpen : !isCollapsed"
          aria-label="Toggle menu"
        >
          <UiIcon
            v-if="isMobile && isMobileMenuOpen"
            icon="meteor-icons:xmark"
            custom-class="text-white w-[25px] h-[40px]"
          />
          <UiIcon
            v-else-if="isMobile && !isMobileMenuOpen"
            icon="stash:burger-classic-duotone"
            custom-class="text-white w-[25px] h-[40px]"
          />
          <UiIcon
            v-else
            icon="stash:burger-classic-duotone"
            custom-class="text-white w-[25px] h-[40px]"
          />
        </button>

        <span
          class="inline-block transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap"
          :class="
            !isCollapsed
              ? 'opacity-100 translate-x-0 max-w-[180px]'
              : 'opacity-0 -translate-x-4 max-w-0 '
          "
        >
          <UiIcon icon="icon:tpt-logo" custom-class="w-[180px] h-[40px]" />
        </span>
      </div>

      <nav class="flex-1 p-3 space-y-2 pt-4 overflow-hidden">
        <!-- Dashboard -->
        <NuxtLink
          to="/dashboard"
          class="flex items-center gap-3 px-3 py-2 rounded-md transition"
          :class="[
            isActive('/dashboard') ? activeClass : inactiveClass,
            isCollapsed ? 'justify-start' : 'justify-start',
          ]"
          @click="toggleMobileMenu"
        >
          <UiIcon
            icon="material-symbols:dashboard-outline-rounded"
            custom-class="w-4 h-4"
          />

          <!-- Smooth slide/fade text -->
          <span
            class="inline-block text-[12px] whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out"
            :class="
              !isCollapsed
                ? 'opacity-100 translate-x-0 max-w-[120px]'
                : 'opacity-0 -translate-x-2 max-w-0 pointer-events-none'
            "
          >
            Dashboard
          </span>
        </NuxtLink>
        <!-- Admin Panel -->
        <NuxtLink
          to="/admin/dashboard"
          class="flex items-center gap-3 px-3 py-2 rounded-md transition"
          :class="[
            isActive('/admin/dashboard') ||
            isActive('/admin/subsmanagement') ||
            isActive('/admin/referralmanagement')
              ? activeClass
              : inactiveClass,
            isCollapsed ? 'justify-start' : 'justify-start',
          ]"
          @click="toggleMobileMenu"
        >
          <UiIcon icon="hugeicons:user" custom-class="w-4 h-4" />

          <!-- Smooth slide/fade text -->
          <span
            class="inline-block text-[12px] whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out"
            :class="
              !isCollapsed
                ? 'opacity-100 translate-x-0 max-w-[120px]'
                : 'opacity-0 -translate-x-2 max-w-0 pointer-events-none'
            "
          >
            Admin Panel
          </span>
        </NuxtLink>
        <!-- Signal History -->
        <NuxtLink
          to="/signalhistory"
          class="flex items-center gap-3 px-3 py-2 rounded-md transition"
          :class="[
            isActive('/signalhistory') ? activeClass : inactiveClass,
            isCollapsed ? 'justify-start' : 'justify-start',
          ]"
          @click="toggleMobileMenu"
        >
          <UiIcon icon="hugeicons:transaction-history" custom-class="w-4 h-4" />

          <!-- Smooth slide/fade text -->
          <span
            class="inline-block text-[12px] whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out"
            :class="
              !isCollapsed
                ? 'opacity-100 translate-x-0 max-w-[120px]'
                : 'opacity-0 -translate-x-2 max-w-0 pointer-events-none'
            "
          >
            Signal History
          </span>
        </NuxtLink>
        <!-- Affiliate Management -->
        <NuxtLink
          to="/affiliate"
          class="flex items-center gap-3 px-3 py-2 rounded-md transition"
          :class="[
            isActive('/affiliate') ? activeClass : inactiveClass,
            isCollapsed ? 'justify-start' : 'justify-start',
          ]"
          @click="toggleMobileMenu"
        >
          <UiIcon icon="humbleicons:users" custom-class="w-4 h-4" />

          <!-- Smooth slide/fade text -->
          <span
            class="inline-block text-[12px] whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out"
            :class="
              !isCollapsed
                ? 'opacity-100 translate-x-0 max-w-[200px]'
                : 'opacity-0 -translate-x-2 max-w-0 pointer-events-none'
            "
          >
            Affiliate Management
          </span>
        </NuxtLink>
      </nav>

      <div class="p-3">
        <div
          class="border border-[#0D0D0D] rounded-xl p-4 text-center bg-gradient-to-r from-[#2A8E9E] to-[#00BDA7] shadow-sm overflow-hidden transform origin-bottom-left transition-all duration-500 ease-out"
          :class="
            isCollapsed
              ? 'max-h-0 opacity-10 scale-y-0'
              : 'max-h-[500px] opacity-100 scale-y-100'
          "
        >
          <p class="text-[12px] text-white mb-3">
            Feels Limited? Upgrade to Ai Pro to unlock more exciting features!
          </p>

          <NuxtLink
            to="/settings/subscription"
            class="flex items-center justify-center gap-2 bg-black rounded-lg py-2.5 px-2 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            exact
            @click="toggleMobileMenu"
          >
            <UiIcon icon="heroicons:bolt" class="w-5 h-5"></UiIcon>
            <span class="text-[11px]">Upgrade to Ai Pro</span>
          </NuxtLink>
        </div>
        <!-- <div
          class="border border-[#4C4B4B] rounded-xl p-4 text-center bg-[#1C1C1C] shadow-sm overflow-hidden transform origin-bottom-left transition-all duration-500 ease-out"
          :class="
            isCollapsed
              ? 'max-h-0 opacity-10 scale-y-0'
              : 'max-h-[500px] opacity-100 scale-y-100'
          "
        >
          <UiIcon
            icon="material-symbols:diamond-outline-rounded"
            custom-class="w-10 h-10 text-white"
          ></UiIcon>
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
            @click="toggleMobileMenu"
          >
            <span class="text-[14px]">Upgrade</span>
          </NuxtLink>
        </div> -->
        <NuxtLink to="/settings/subscription">
          <div
            class="flex justify-center border border-[#0D0D0D] rounded-xl bg-gradient-to-r from-[#2A8E9E] to-[#00BDA7] overflow-hidden transform transition-all duration-300 ease-out w-fit"
            :class="
              isCollapsed
                ? 'max-h-[48px] opacity-100 scale-20 p-2'
                : 'max-h-0 opacity-0 scale-10 p-0'
            "
          >
            <UiIcon
              icon="heroicons:bolt"
              class="w-5 h-5 text-white"
            ></UiIcon></div
        ></NuxtLink>
      </div>
    </aside>
    <!-- Main Content -->
    <main
      :style="mainStyle"
      class="flex-1 p-6 overflow-y-auto transition-all duration-300"
    >
      <div class="flex justify-between items-start">
        <div>
          <div class="flex gap-2">
            <!-- show burger on small screens -->
            <button
              class="md:hidden text-white"
              @click="toggleMobileMenu"
              aria-label="Open mobile menu"
            >
              <UiIcon
                icon="stash:burger-classic-duotone"
                custom-class="w-6 h-6"
              />
            </button>
            <h2 class="text-2xl font-semibold text-[#00BDA7]">
              {{ currentTitle }}
            </h2>
          </div>
          <p class="text-gray-200 mt-2 mb-2 text-sm">Welcome to Ai Trading</p>
        </div>

        <div class="flex gap-4 items-center">
          <UiIcon
            icon="solar:bell-line-duotone"
            custom-class="text-white w-5 h-5"
          />

          <UiPopover position="bottom">
            <template #trigger>
              <div
                class="p-4 border bg-white rounded-full cursor-pointer"
              ></div>
            </template>

            <div class="text-[#BCBBBB] w-32 flex flex-col justify-start">
              <div class="hover:bg-gray-800 rounded-md group cursor-pointer">
                <NuxtLink
                  to="/settings/basicinfo"
                  class="flex items-center gap-2 px-3 py-2 rounded-md transition"
                  @click="closePopover"
                >
                  <UiIcon icon="hugeicons:user-03" custom-class="w-4 h-4" />

                  <span
                    class="inline-block text-[12px] whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out"
                  >
                    User Profile
                  </span>
                </NuxtLink>
              </div>
              <div class="h-[2px]" />
              <div class="hover:bg-red-500 rounded-md group cursor-pointer">
                <UiButton
                  variant="text"
                  @click="confirmLogout = true"
                  class="w-full !justify-start inline-block text-red-500 group-hover:text-white !border-none"
                >
                  Logout
                  <template #icon-left>
                    <UiIcon
                      icon="solar:exit-linear"
                      custom-class="w-3 h-3" /></template
                ></UiButton>
              </div>
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
      @close="confirmLogout = false"
    />
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
const confirmLogout = ref(false);

const pageTitles = {
  "/dashboard": "Dashboard",
  "/dailybias": "Daily Bias",
  "/admin/dashboard": "Admin Panel - Dashboard",
  "/admin/referralmanagement": "Admin Panel - Referral Management",
  "/admin/subsmanagement": "Admin Panel - Subscription Management",
  "/signalhistory": "Signal History",
  "/affiliate": "Affiliate Dashboard",
  "/settings/subscription": "Subscription",
  // add other routes here
};

const currentTitle = computed(() => pageTitles[route.path] || "Dashboard");

// detect mobile client side only, keep reactive on resize
const updateIsMobile = () => {
  if (typeof window === "undefined") return;
  isMobile.value = window.innerWidth < 768;
  // if switching to desktop, ensure mobile menu is closed
  if (!isMobile.value) isMobileMenuOpen.value = false;
};

const closePopover = () => {
  document.dispatchEvent(new MouseEvent("click", { bubbles: true }));
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
    "fixed top-0 left-0 h-full bg-[#0D0D0D] shadow-md border-r border-[#1C1C1C] flex flex-col z-50 transition-all transition-discrete duration-300 md:translate-x-0";
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
  await logout();
};
</script>

<style scoped>
/* no extra styles required, tailwind handles layout and transitions */
</style>
