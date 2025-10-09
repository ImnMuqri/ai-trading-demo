<template>
  <div class="flex flex-col w-full">
    <label v-if="label" class="mb-1 text-sm font-medium text-gray-300">
      {{ label }}
    </label>
    <div class="relative w-full">
      <!-- Left icon slot -->
      <div
        v-if="$slots['icon-left']"
        class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <slot name="icon-left"></slot>
      </div>

      <!-- Right icon slot -->
      <div
        v-if="$slots['icon-right']"
        class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <slot name="icon-right"></slot>
      </div>

      <!-- Input -->
      <input
        :type="type"
        v-model="inputValue"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :class="[
          'w-full rounded-lg text-white text-sm bg-[#1C1C1C] border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00BDA7]',
          isDisabled
            ? 'opacity-50 cursor-not-allowed'
            : 'border-[#1C1C1C] focus:border-[#00BDA7]',
          $slots['icon-left'] ? 'pl-10' : 'px-4',
          $slots['icon-right'] ? 'pr-10' : 'px-4',
          'py-2',
          customClass,
        ]" />
    </div>

    <!-- Error message -->
    <p v-if="error" class="mt-1 text-xs text-red-500">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: "text",
  },
  error: String,
  isDisabled: Boolean,
  customClass: String, // new prop for custom classes
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue || "");

watch(inputValue, (val) => {
  emit("update:modelValue", val);
});

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val;
  }
);
</script>

<style scoped>
/* Optional: adjust icon sizes inside input */
</style>
