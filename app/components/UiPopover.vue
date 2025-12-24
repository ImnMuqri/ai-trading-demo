<template>
  <div ref="wrapper" class="relative inline-block">
    <div @click="toggle">
      <slot name="trigger" />
    </div>

    <transition name="fade">
      <div
        v-if="open"
        class="absolute z-50 mt-2 rounded-md shadow-lg bg-[#1C1C1C] border border-[#2A2A2A] p-3 text-sm"
        :class="positionClass">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const open = ref(false);
const wrapper = ref(null);

const props = defineProps({
  position: {
    type: String,
    default: "bottom",
  },
});

const toggle = () => {
  open.value = !open.value;
};

const close = () => {
  open.value = false;
};

const handleClickOutside = (event) => {
  if (wrapper.value && !wrapper.value.contains(event.target)) {
    close();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const positionClass = computed(() => {
  if (props.position === "top") return "bottom-full mb-2";
  if (props.position === "left") return "right-full mr-2";
  if (props.position === "right") return "left-full ml-2";
  return "top-full right-0";
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
