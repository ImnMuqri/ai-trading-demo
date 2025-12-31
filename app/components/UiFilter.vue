<template>
  <div ref="wrapper" class="relative inline-block">
    <div
      class="group h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer transition"
      @click="toggleDropdown"
    >
      <UiIcon
        :icon="icon"
        :class="[
          'transition',
          open ? 'text-[#00BDA7]' : 'text-white',
          'group-hover:text-[#00BDA7]',
        ]"
      />
    </div>

    <transition name="fade">
      <ul
        v-if="open"
        class="absolute z-50 max-h-60 w-44 overflow-auto bg-[#2A2A2A] border border-[#1C1C1C] rounded-lg shadow-lg text-white text-sm"
        :class="positionClass"
      >
        <li
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          class="px-4 py-2 hover:bg-white hover:text-black cursor-pointer transition"
        >
          {{ option.label }}
        </li>
        <li v-if="options.length === 0" class="px-4 py-2 text-gray-500">
          No options
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const props = defineProps({
  modelValue: [String, Number],
  icon: { type: String, default: "heroicons:magnifying-glass-plus-20-solid" },
  options: { type: Array, required: true },
  position: { type: String, default: "bottom-left" },
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);

const toggleDropdown = () => (open.value = !open.value);

const selectOption = (option) => {
  emit("update:modelValue", option.value);
  open.value = false;
};

const positionClass = computed(() => {
  switch (props.position) {
    case "bottom-left":
      return "top-full right-0 mt-2";
    case "bottom-right":
      return "top-full left-0 mt-2";
    case "top-left":
      return "bottom-full right-0 mb-2";
    case "top-right":
      return "bottom-full left-0 mb-2";
    default:
      return "mt-2 left-0";
  }
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
