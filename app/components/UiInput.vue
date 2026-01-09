<template>
  <div class="flex flex-col w-full">
    <label v-if="label" class="mb-1 text-[12px] font-medium text-white">
      {{ label }}
    </label>
    <div class="relative w-full">
      <!-- Left icon slot -->
      <div
        v-if="$slots['icon-left']"
        class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
      >
        <slot name="icon-left"></slot>
      </div>

      <!-- Right icon slot -->
      <div
        v-if="$slots['icon-right']"
        class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <slot name="icon-right"></slot>
      </div>

      <!-- Input -->
      <input
        :type="type"
        v-model="inputValue"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :readonly="isReadonly"
        :class="[
          'w-full h-10 rounded-lg text-white !text-[11px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00BDA7]',
          isDisabled
            ? 'opacity-50 cursor-not-allowed'
            : 'border-gray-300 focus:border-[#00BDA7]',
          $slots['icon-left'] ? 'pl-10' : 'px-4',
          $slots['icon-right'] ? 'pr-10' : 'px-4',
          'py-2',
          customClass,
          dark
            ? 'bg-[#1A1C20] border-[#2A2A2A] text-white'
            : 'bg-white border !text-black',
        ]"
      />
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
  isReadonly: Boolean,
  customClass: String, // new prop for custom classes
  dark: Boolean,
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
:deep input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px #1a1c20 inset;
  -webkit-text-fill-color: white;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
