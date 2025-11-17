<template>
  <div class="flex flex-col relative w-full" ref="wrapper">
    <label v-if="label" class="mb-2 text-sm font-medium text-gray-300">
      {{ label }}
    </label>

    <div class="relative w-full">
      <!-- Input area -->
      <input
        type="text"
        :value="displayValue"
        :placeholder="placeholder"
        class="w-full bg-[#2A2A2A] border border-[#1C1C1C] text-white rounded-lg px-4 py-[11px] pr-10 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00BDA7] transition-all"
        @focus="openDropdown"
        @input="search = $event.target.value" />

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
const search = ref("");
const isOpen = ref(false);
const userCleared = ref(false); // track if user manually cleared input
const wrapper = ref(null);

// Compute the display value for the input
const displayValue = computed(() => {
  // If user manually cleared input, show empty
  if (userCleared.value) return search.value;
  // If user is typing, show what they type
  if (isOpen.value) return search.value;
  // Otherwise show selected option label
  const selectedOption = props.options.find(
    (o) => o.value === selectedValue.value
  );
  return selectedOption ? selectedOption.label : "";
});

// Filter options based on search
const filteredOptions = computed(() =>
  props.options.filter((o) =>
    o.label.toLowerCase().includes(search.value.toLowerCase())
  )
);

// Open dropdown
function openDropdown() {
  isOpen.value = true;
  if (!userCleared.value) {
    search.value = ""; // show all options if user hasn’t cleared manually
  }
}

// Detect input changes
function onInput(e) {
  search.value = e.target.value;
  userCleared.value = search.value === ""; // mark if input cleared
}

// Select an option
function selectOption(option) {
  selectedValue.value = option.value;
  search.value = option.label;
  userCleared.value = false;
  emit("update:modelValue", option.value);
  isOpen.value = false;
}

// Watch for external modelValue changes
watch(
  () => props.modelValue,
  (newVal) => {
    selectedValue.value = newVal;
    if (!newVal) {
      search.value = "";
      userCleared.value = true;
    }
  }
);

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
ul::-webkit-scrollbar {
  width: 8px;
}
ul::-webkit-scrollbar-track {
  background: #2a2a2a;
  border-radius: 4px;
}
ul::-webkit-scrollbar-thumb {
  background-color: #00bda7;
  border-radius: 4px;
  border: 2px solid #2a2a2a;
}
ul::-webkit-scrollbar-thumb:hover {
  background-color: #00e0c0;
}
</style>
