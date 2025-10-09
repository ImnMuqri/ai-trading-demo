<template>
  <div class="flex flex-col relative w-full" ref="wrapper">
    <label v-if="label" class="mb-2 text-sm font-medium text-gray-300">
      {{ label }}
    </label>

    <!-- Input area -->
    <div class="relative w-full">
      <input
        type="text"
        v-model="search"
        :placeholder="placeholder"
        class="w-full bg-[#2A2A2A] border border-[#1C1C1C] text-white rounded-lg px-4 py-[11px] pr-10 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00BDA7] transition-all"
        @focus="isOpen = true" />

      <!-- Chevron icon -->
      <svg
        :class="[
          'absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-200 pointer-events-none',
          isOpen ? 'rotate-180' : 'rotate-0',
        ]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#00BDA7"
        stroke-width="3"
        width="16"
        height="16">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7" />
      </svg>

      <!-- Dropdown options -->
      <ul
        v-if="isOpen"
        class="absolute z-50 mt-1 w-full max-h-60 overflow-auto bg-[#2A2A2A] border border-[#1C1C1C] rounded-lg shadow-lg text-white text-sm">
        <li
          v-for="option in filteredOptions"
          :key="option.value"
          @click="selectOption(option)"
          class="px-4 py-2 hover:bg-[#00BDA7] hover:text-black cursor-pointer transition">
          {{ option.label }}
        </li>
        <li v-if="filteredOptions.length === 0" class="px-4 py-2 text-gray-500">
          No results found
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";

const props = defineProps({
  label: String,
  modelValue: [String, Number],
  placeholder: String,
  options: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const selectedValue = ref(props.modelValue || "");
const isOpen = ref(false);
const search = ref("");

const wrapper = ref(null);

// Watch external modelValue
watch(
  () => props.modelValue,
  (newVal) => {
    selectedValue.value = newVal;
    const selectedOption = props.options.find((o) => o.value === newVal);
    if (selectedOption) search.value = selectedOption.label;
  }
);

// Filter options based on search
const filteredOptions = computed(() =>
  props.options.filter((o) =>
    o.label.toLowerCase().includes(search.value.toLowerCase())
  )
);

// Select an option
function selectOption(option) {
  selectedValue.value = option.value;
  search.value = option.label;
  emit("update:modelValue", option.value);
  isOpen.value = false;
}

onMounted(() => {
  if (process.client) {
    document.addEventListener("click", (event) => {
      if (wrapper.value && !wrapper.value.contains(event.target)) {
        isOpen.value = false;
      }
    });
  }
});
</script>
<style scoped>
/* Scrollbar track (the background of the scrollbar) */
ul::-webkit-scrollbar {
  width: 8px; /* scrollbar width */
}

/* Track */
ul::-webkit-scrollbar-track {
  background: #2a2a2a; /* container color behind scrollbar */
  border-radius: 4px;
}

/* Handle (the draggable part) */
ul::-webkit-scrollbar-thumb {
  background-color: #00bda7; /* scrollbar color */
  border-radius: 4px;
  border: 2px solid #2a2a2a; /* space around thumb */
}

/* Optional: Hover effect for scrollbar thumb */
ul::-webkit-scrollbar-thumb:hover {
  background-color: #00e0c0;
}
</style>
