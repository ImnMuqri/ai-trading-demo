<template>
  <ClientOnly>
    <NuxtLink
      v-if="canAccess"
      :to="link.path"
      class="flex items-center gap-3 px-3 py-2 rounded-md transition"
      :class="[
        isActive ? activeClass : inactiveClass,
        isCollapsed ? 'justify-start' : 'justify-start',
      ]"
      @click="$emit('click')"
    >
      <UiIcon :icon="link.icon" custom-class="w-4 h-4" />

      <span
        class="inline-block text-[12px] whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out"
        :class="
          !isCollapsed
            ? 'opacity-100 translate-x-0 max-w-[200px]'
            : 'opacity-0 -translate-x-2 max-w-0 pointer-events-none'
        "
      >
        {{ link.label }}
      </span>
    </NuxtLink>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  link: {
    type: Object,
    required: true,
  },
  isCollapsed: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();

const canAccess = computed(() => {
  if (!props.link.roles) return true; // no restriction
  if (!auth.userRole) return false; // role not loaded yet
  return props.link.roles.includes(auth.userRole);
});

// Tailwind helper classes
const activeClass = "bg-[#A0CCE740] text-white font-medium";
const inactiveClass = "text-[#BCBBBB] hover:bg-blue-50 hover:text-black";
</script>
