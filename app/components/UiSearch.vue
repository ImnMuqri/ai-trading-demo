<template>
  <div
    ref="wrapperRef"
    class="relative flex items-center"
    :class="expand === 'left' ? 'justify-end' : 'justify-start'"
    @click.stop>
    <!-- Expand button -->
    <div
      v-if="!expanded"
      class="h-8 w-8 flex items-center justify-center rounded-lg bg-[#1A1C20] border border-[#2A2A2A] cursor-pointer hover:!ring-white hover:ring-1 transition"
      @click="expandSearch">
      <UiIcon
        icon="heroicons:magnifying-glass-16-solid"
        custom-class="w-4 h-4 text-white" />
    </div>

    <!-- Search input -->
    <div
      class="overflow-hidden transition-all duration-300 ease-out"
      :style="{ width: expanded ? '220px' : '0px', opacity: expanded ? 1 : 0 }">
      <UiInput
        ref="inputRef"
        v-model="localValue"
        :placeholder="placeholder"
        :dark="dark"
        :customClass="`${customClass ?? ''} h-8  !ring-0 `">
        <template #icon-left>
          <UiIcon
            icon="heroicons:magnifying-glass-16-solid"
            custom-class="w-4 h-4 text-white" />
        </template>
      </UiInput>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  modelValue: String,
  placeholder: { type: String, default: "Search..." },
  expand: { type: String, default: "right" },
  dark: Boolean,
  customClass: String,
});

const emit = defineEmits(["update:modelValue"]);

const expanded = ref(false);
const localValue = ref(props.modelValue || "");
const inputRef = ref(null);
const wrapperRef = ref(null);

watch(localValue, (v) => emit("update:modelValue", v));
watch(
  () => props.modelValue,
  (v) => (localValue.value = v)
);

const expandSearch = async () => {
  expanded.value = true;
  await nextTick();
  inputRef.value?.$el?.querySelector("input")?.focus();
};

// Collapse if clicking outside
const handleClickOutside = (event) => {
  if (
    expanded.value &&
    wrapperRef.value &&
    !wrapperRef.value.contains(event.target)
  ) {
    expanded.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped></style>
