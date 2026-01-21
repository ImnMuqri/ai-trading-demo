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
        class="absolute z-50 w-44 o bg-[#2A2A2A] border border-[#1C1C1C] rounded-lg shadow-lg text-white text-sm"
        :class="positionClass"
      >
        <li
          v-if="searchable"
          class="p-2 border-b border-[#1C1C1C] sticky top-0 z-10 bg-[#2A2A2A] rounded-t-lg rounded-b-none"
        >
          <UiInput
            v-model="search"
            dark
            :placeholder="props.placeholder"
            ref="searchInput"
          />
        </li>

        <div class="dropdown-scroll max-h-60 overflow-y-auto">
          <li
            v-for="(option, index) in filteredOptions"
            :key="option.value"
            @click="selectOption(option)"
            :class="[
              'px-4 py-2 cursor-pointer transition hover:bg-white hover:text-black',
              option.value === props.modelValue && 'font-semibold',
              !props.searchable && index === 0 && 'rounded-t-lg',
            ]"
          >
            {{ option.label }}
          </li>

          <li
            v-if="filteredOptions.length === 0"
            class="px-4 py-4 text-gray-500 text-center"
          >
            No options
          </li>
        </div>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  watch,
  nextTick,
} from "vue";

const props = defineProps({
  modelValue: [String, Number],
  icon: { type: String, default: "heroicons:magnifying-glass-plus-20-solid" },
  options: { type: Array, required: true },
  position: { type: String, default: "bottom-left" },
  searchable: { type: Boolean, default: false },
  placeholder: { type: String, default: "Type to search" },
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const wrapper = ref(null);
const search = ref("");
const searchInput = ref(null);

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

const filteredOptions = computed(() => {
  if (!props.searchable || !search.value) return props.options;

  const q = search.value.toLowerCase();
  return props.options.filter((o) => o.label.toLowerCase().includes(q));
});

const handleClickOutside = (event) => {
  if (wrapper.value && !wrapper.value.contains(event.target)) {
    open.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

watch(open, async (v) => {
  if (v && props.searchable) {
    search.value = "";

    await nextTick();

    searchInput.value?.focus?.();
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

.dropdown-scroll::-webkit-scrollbar {
  width: 8px;
}

.dropdown-scroll::-webkit-scrollbar-track {
  background: #2a2a2a;
  border-radius: 4px;
}

.dropdown-scroll::-webkit-scrollbar-thumb {
  background-color: #00bda7;
  border-radius: 4px;
  border: 2px solid #2a2a2a;
}

.dropdown-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #00e0c0;
}
</style>
