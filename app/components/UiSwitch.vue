<template>
  <button
    type="button"
    role="switch"
    :aria-checked="isOn"
    :disabled="disabled"
    @click="toggle"
    @keydown.space.prevent="toggle"
    @keydown.enter.prevent="toggle"
    class="relative inline-flex items-center transition-colors duration-300 focus:outline-none"
    :class="[
      sizeClasses.track,
      isOn ? activeColor : inactiveColor,
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    ]">
    <span
      class="absolute transition-transform duration-300 bg-white rounded-full shadow"
      :class="[
        sizeClasses.thumb,
        isOn ? sizeClasses.translateOn : sizeClasses.translateOff,
      ]" />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [Boolean, String, Number],
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "md",
    validator: (v) => ["sm", "md", "lg"].includes(v),
  },
  activeColor: {
    type: String,
    default: "bg-emerald-500",
  },
  inactiveColor: {
    type: String,
    default: "bg-neutral-400",
  },
  trueValue: {
    default: true,
  },
  falseValue: {
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOn = computed(() => props.modelValue === props.trueValue);

const toggle = () => {
  if (props.disabled) return;

  emit("update:modelValue", isOn.value ? props.falseValue : props.trueValue);
};

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return {
        track: "w-8 h-4 rounded-full",
        thumb: "w-3 h-3 left-0.5",
        translateOn: "translate-x-4",
        translateOff: "translate-x-0",
      };
    case "lg":
      return {
        track: "w-14 h-8 rounded-full",
        thumb: "w-6 h-6 left-1",
        translateOn: "translate-x-6",
        translateOff: "translate-x-0",
      };
    default:
      return {
        track: "w-11 h-6 rounded-full",
        thumb: "w-5 h-5 left-0.5",
        translateOn: "translate-x-5",
        translateOff: "translate-x-0",
      };
  }
});
</script>
