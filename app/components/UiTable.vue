<template>
  <div>
    <UiCard
      class="w-full flex flex-col justify-between mt-4 py-2 text-[12px] bg-[#0F0F0F] !border-none !p-0 !mt-0"
      :style="{ display: windowWidth <= props.tableBreakPoints ? 'none' : '' }"
      :class="['', customClass]"
    >
      <div class="flex-1 h-full">
        <h2
          v-if="title"
          class="flex items-center gap-2 px-4 border-b border-[#1C1C1C] pb-2 text-lg font-semibold text-gray-100"
        >
          {{ title }}
        </h2>

        <div v-if="$slots.tableHeader" class="pb-3">
          <slot name="tableHeader" />
        </div>

        <div
          v-if="isLoading"
          class="flex h-full w-full !text-white place-items-center justify-center"
          :class="[classModal ? 'flex-1 h-full w-full' : emptyClass]"
        >
          <UiIcon icon="svg-spinners:blocks-shuffle-3" class="text-4xl" />
        </div>

        <div
          v-else-if="allItems.length != 0 && !isLoading"
          class="overflow-hidden w-full h-full flex-1 border-b rounded-b-none border-[#1C1C1C]"
          :class="[classModal, $slots.total ? 'rounded-t-md' : 'rounded-md']"
        >
          <!-- Header -->
          <div
            class="px-4 grid grid-cols-[60px_1fr] gap-2 text-gray-300 font-bold rounded-t-md bg-gradient-to-b from-[#111111] to-[#1C1C1C] h-10"
            :class="[isModal ? (rowsPerPage > 10 ? 'pr-2' : '') : '']"
            @click="sortCol"
          >
            <div
              class="flex flex-col col-span-1 justify-center border-r border-[#1C1C1C]"
            >
              No.
            </div>
            <div class="!h-10">
              <slot
                name="header"
                :handle-sort="handleSort"
                :sort-key="sortKey"
                :sort-dir="sortDir"
                :applyBorder="
                  (idx, total) =>
                    idx < total - 1
                      ? 'border-r border-[#1C1C1C] pr-2 h-10 flex items-center justify-center'
                      : 'h-10 flex items-center justify-center'
                "
              />
            </div>
          </div>

          <!-- Add wrap to fix overflow issue -->
          <div class="flex flex-col overflow-auto flex-1" :class="rowClass">
            <div
              v-for="(allItems, index) in pagedItems"
              :key="index"
              class="px-4 grid grid-cols-[60px_1fr] gap-2 items-center transition hover:bg-[#111111] text-gray-300"
              :class="[index < allItems.length - 1 || !$slots.total ? '' : '']"
            >
              <div class="border-r border-[#1C1C1C] h-full grid items-center">
                <div
                  class="flex justify-center items-center h-5 w-5 rounded-full text-black bg-gradient-to-b from-[#00BDA7] to-[#A3D0E6]"
                >
                  {{ (currentPage - 1) * rowsPerPage + index + 1 }}
                </div>
              </div>

              <div class="col-span-1 white">
                <slot
                  name="row"
                  :item="allItems"
                  :index="index"
                  :applyBorder="
                    (idx, total) =>
                      idx < total - 1
                        ? 'border-r border-[#1C1C1C] pr-2 h-10 flex items-center justify-center truncate'
                        : 'h-10 flex items-center justify-center truncate'
                  "
                />
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="w-full h-full text-white grid justify-center items-center rounded-md"
          :class="[classModal ? 'flex-1 h-full' : emptyClass]"
        >
          <span>Empty Table</span>
        </div>
      </div>

      <div v-if="$slots.total">
        <slot name="total"></slot>
      </div>

      <!-- Pagination -->
      <div v-if="$slots.pagination" class="h-full">
        <slot name="pagination">
          <UiPagination
            :totalItems="totalItems"
            :currentPage="currentPage"
            :rowsPerPage="rowsPerPage"
            @page-changed="(page) => emit('page-changed', page)"
            @rows-per-page-changed="(rpp) => emit('rows-per-page-changed', rpp)"
          />
        </slot>
      </div>
    </UiCard>

    <div v-if="$slots.card">
      <UiCard
        class="bg-white p-4 flex flex-col h-full"
        :style="{
          display: props.tableBreakPoints < windowWidth ? 'none' : '',
        }"
      >
        <!-- Header -->
        <div class="pb-3">
          <slot name="tableHeader" />
        </div>

        <div class="flex-1" :class="rowsPerPage > 9 ? 'pr-2' : 'pr-0'">
          <slot name="card" :item="pagedItems" />

          <div
            v-if="allItems.length === 0 && !isLoading"
            class="text-black grid justify-center items-center border border-gray-200 rounded-md h-[350px]"
          >
            <span>Empty Table</span>
          </div>
        </div>

        <div v-if="$slots.subtotal">
          <slot name="subtotal"></slot>
        </div>

        <div v-if="$slots.pagination" class="bg-white pt-2 shrink-0">
          <slot name="pagination">
            <UiPagination
              :totalItems="totalItems"
              :currentPage="currentPage"
              :rowsPerPage="rowsPerPage"
              @page-changed="(page) => emit('page-changed', page)"
              @rows-per-page-changed="
                (rpp) => emit('rows-per-page-changed', rpp)
              "
            />
          </slot>
        </div>
      </UiCard>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  items: {
    type: Array,
    default: () => [],
  },
  currentPage: { type: Number, default: 1 },
  rowsPerPage: { type: Number, default: 5 },
  totalItems: { type: Number, required: false, default: 10 },
  isLoading: { type: Boolean, default: false },
  class: { type: String, default: "" },
  tableBreakPoints: { type: Number, default: null },
  customClass: { type: String, default: "" },
  rowClass: { type: String, default: "" },
  isModal: { type: Boolean, default: false },
  emptyClass: { type: String, default: "" },
  allItems: { type: Array, default: () => [] },
});

const emit = defineEmits([
  "page-changed",
  "rows-per-page-changed",
  "update:items",
  "update:paginated-items",
]);

const sortKey = ref(null);
const sortDir = ref(null);

const hasLoaded = ref(false);

const handleSort = (col) => {
  if (sortKey.value !== col.key) {
    // first click → descending
    sortKey.value = col.key;
    sortDir.value = "desc";
  } else if (sortDir.value === "desc") {
    // second click → ascending
    sortDir.value = "asc";
  } else if (sortDir.value === "asc") {
    // third click → default (reset)
    sortKey.value = null;
    sortDir.value = null;
  }
};

// Determine if border should be applied based on column index

const baseItems = computed(() => props.allItems);

const sortedItems = computed(() => {
  if (!sortKey.value || !sortDir.value) return baseItems.value;

  const data = [...baseItems.value];
  const dir = sortDir.value === "asc" ? 1 : -1;

  return data.sort((a, b) => {
    const A = a[sortKey.value];
    const B = b[sortKey.value];

    // Handle nulls first
    if (A == null && B == null) return 0;

    if (A == null) {
      return sortDir.value === "desc" ? -1 : 1; // nulls top for desc
    }

    if (B == null) {
      return sortDir.value === "desc" ? 1 : -1;
    }

    // Normal compare
    if (typeof A === "number" && typeof B === "number") {
      return (A - B) * dir;
    }

    return String(A).localeCompare(String(B)) * dir;
  });
});

const pagedItems = computed(() => {
  const start = (props.currentPage - 1) * props.rowsPerPage;
  return sortedItems.value.slice(start, start + props.rowsPerPage);
});

const shadowNone = ref("");
const classModal = computed(() => {
  shadowNone.value = "!shadow-none";
  return props.class;
});

// const windowWidth = ref(window.innerWidth);
const windowWidth = ref(null);

function updateWidth() {
  windowWidth.value = window.innerWidth;
}

onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

watch(pagedItems, (newVal) => {
  emit("update:paginated-items", newVal);
});

watch(
  () => props.isLoading,
  (loading) => {
    if (loading === false) {
      hasLoaded.value = true;
    }
  },
  { immediate: true }
);
</script>
