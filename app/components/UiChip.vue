<template>
  <span
    class="inline-flex items-center border px-2.5 py-0.5 rounded-full select-none cursor-pointer"
    :class="customClass"
    @click="$emit('click')">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  customClass: {
    type: [String, Array, Object],
    default: "",
  },
});

defineEmits(["click"]);
</script>
