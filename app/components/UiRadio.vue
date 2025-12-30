<template>
  <div class="flex flex-col gap-2" :class="['', customClass]">
    <div
      class="flex flex-row gap-3 items-center cursor-pointer select-none"
      @click="toggle"
    >
      <input type="checkbox" class="sr-only" :checked="isSelected" />

      <div
        :class="[
          'flex flex-col w-3 h-3 rounded-full border-1 border-white ',
          isSelected ? 'bg-green-500' : 'bg-white',
        ]"
      >
        <UiIcon v-if="isSelected" icon="icon:ai-check" custom-class="w-3 h-3" />
      </div>

      <span class="font-light text-">{{ currentLabel }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Boolean],
    default: "",
  },
  items: {
    type: Array,
    default: () => ["Active", "Inactive"],
  },
  title: {
    type: String,
    default: "",
  },
  customClass: {
    type: String,
    default: "",
  },
  asBoolean: {
    type: Boolean,
    default: false, // false = return string, true = return boolean
  },
});

const emit = defineEmits(["update:modelValue"]);

// true if current value equals first item OR true in boolean mode
const isSelected = computed(() => {
  if (props.asBoolean) return !!props.modelValue;
  return props.modelValue === props.items[0];
});

// show label based on items (string mode) or simple true/false (boolean mode)
const currentLabel = computed(() => {
  if (props.asBoolean)
    return isSelected.value ? props.items[0] : props.items[1];
  return isSelected.value ? props.items[0] : props.items[1];
});

// toggle value
const toggle = () => {
  if (props.asBoolean) {
    emit("update:modelValue", !isSelected.value); // return boolean
  } else {
    emit(
      "update:modelValue",
      isSelected.value ? props.items[1] : props.items[0] // return string
    );
  }
};
</script>
