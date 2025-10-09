<template>
  <button
    :disabled="isDisabled || isLoading"
    @click="$emit('click')"
    class="relative flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus:outline-none"
    :class="[
      sizeClasses,
      variantClasses,
      { 'opacity-60 cursor-not-allowed': isDisabled || isLoading },
    ]">
    <!-- Absolute Loading Spinner -->
    <div
      v-if="isLoading"
      class="absolute inset-0 flex items-center justify-center">
      <UiIcon icon="svg-spinners:blocks-shuffle-3" class="text-lg" />
    </div>

    <!-- Content with reduced opacity when loading -->
    <div
      :class="{ 'opacity-0': isLoading, 'opacity-100': !isLoading }"
      class="flex items-center gap-2 transition-opacity duration-200">
      <slot name="icon-left"></slot>
      <span><slot>Button</slot></span>
      <slot name="icon-right"></slot>
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "primary", // "primary" | "secondary" | "outline"
  },
  size: {
    type: String,
    default: "md", // "sm" | "md" | "lg"
  },
  isDisabled: Boolean,
  isLoading: Boolean,
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case "secondary":
      return "bg-gray-700 hover:bg-gray-600 text-white";
    case "outline":
      return "border border-[#00BDA7] text-[#00BDA7] hover:bg-[#00BDA7] hover:text-white";
    default:
      return "bg-[#00BDA7] hover:bg-[#00BDA7] text-white";
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-3 py-1 text-sm";
    case "lg":
      return "px-6 py-3 text-lg";
    default:
      return "px-4 py-2 text-sm";
  }
});
</script>
