<template>
  <div
    class="border border-[#1C1C1C] rounded-lg"
    :class="
      isGradient
        ? 'bg-[radial-gradient(76.25%_76.25%_at_50%_0%,rgba(0,142,126,0.5)_0%,rgba(0,0,0,0)_100%)]'
        : 'bg-[#121212]'
    ">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  isGradient: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>
