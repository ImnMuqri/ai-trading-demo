<template>
  <div class="mt-3 flex justify-end w-full">
    <div class="flex items-center gap-2">
      <!-- Previous -->
      <div
        class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-[#1C1C1C] transition"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
        @click="currentPage > 1 && goToPage(currentPage - 1)"
      >
        <UiIcon
          icon="ic:round-chevron-left"
          custom-class="w-6 h-6 text-[#218863]"
        />
      </div>

      <!-- Pages -->
      <template v-for="(page, index) in pagesToShow" :key="index">
        <div
          v-if="page !== '...'"
          class="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer transition"
          :class="
            currentPage === page
              ? 'bg-[#00BDA7] text-black font-bold'
              : 'bg-transparent text-[#A3A3A3] hover:bg-[#1C1C1C]'
          "
          @click="goToPage(page)"
        >
          {{ page }}
        </div>

        <div
          v-else
          class="w-8 h-8 flex items-center justify-center text-gray-400 text-sm"
        >
          …
        </div>
      </template>

      <!-- Next -->
      <div
        class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-[#1C1C1C] transition"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
        @click="currentPage < totalPages && goToPage(currentPage + 1)"
      >
        <UiIcon
          icon="ic:round-chevron-right"
          custom-class="w-6 h-6 text-[#218863]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  totalItems: Number,
  currentPage: Number,
  rowsPerPage: Number,
  simple: Boolean,
  minimal: {
    type: Boolean,
    default: false,
  },
});

/**
 * @page-changed
 * - On each page change will call to parent to update
 *
 * @rows-per-page-changed - RPP
 * - On changing the RPP, will call to parent to update
 */
const emit = defineEmits(["page-changed", "rows-per-page-changed"]);

const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.rowsPerPage)
);

const startEntry = computed(() =>
  props.totalItems === 0 ? 0 : (props.currentPage - 1) * props.rowsPerPage + 1
);

const endEntry = computed(() =>
  Math.min(props.currentPage * props.rowsPerPage, props.totalItems)
);

const rowsPerPageOptions = [
  { label: "5", value: 5 },
  { label: "8", value: 8 },
  { label: "10", value: 10 },
  { label: "25", value: 25 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
];

/**
 * Pass back to parent if change rows
 */
const rowsPerPage = computed({
  get() {
    return props.rowsPerPage;
  },
  set(value) {
    if (value !== undefined && value !== props.rowsPerPage) {
      emit("rows-per-page-changed", value);
    }
  },
});

const pagesToShow = computed(() => {
  const total = totalPages.value;
  const current = props.currentPage;
  const pages = [];

  if (current <= 3) {
    for (let i = 1; i <= Math.min(5, total); i++) {
      pages.push(i);
    }
    if (total > 5) {
      pages.push("...", total);
    }
  } else if (current > total - 3) {
    pages.push(1, "...");
    for (let i = Math.max(total - 4, 2); i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1, "...");
    for (let i = current - 1; i <= current + 1; i++) {
      pages.push(i);
    }
    pages.push("...", total);
  }

  return pages;
});

const pageInput = ref(props.currentPage);

watch(
  () => props.currentPage,
  (val) => (pageInput.value = val)
);

/**
 * Pass back to parent if change pages
 */
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    emit("page-changed", page);
  }
}
</script>
