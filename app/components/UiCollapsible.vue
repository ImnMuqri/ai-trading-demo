<template>
  <div class="mb-4 rounded-lg bg-[#1C1C1C] border border-[#00BDA7]">
    <button
      @click="open = !open"
      class="w-full flex justify-between items-center p-3 font-semibold text-left">
      <span class="text-sm">{{ title }}</span>
      <span
        :class="{ 'rotate-90': open }"
        class="transition-transform text-[10px]"
        >▶</span
      >
    </button>
    <div v-show="open" class="px-6 pb-6 pt-2 transition-all duration-300">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
  defaultOpen: {
    type: Boolean,
    default: false, // only this one opens initially if true
  },
});

const open = ref(props.defaultOpen);
</script>
