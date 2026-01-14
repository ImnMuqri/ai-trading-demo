<template>
  <div id="modal-body" class="flex flex-col gap-2 h-full w-full">
    <div v-if="title">
      <div class="flex flex-col px-5 py-1 w-full">
        <span class="font-semibold text-center">{{ title }}</span>
      </div>
    </div>

    <div v-if="props.title" class="pb-2 w-full">
      <hr />
    </div>

    <!-- LOADING -->
    <div v-if="isLoading" class="grid place-items-center mb-5 h-full w-full">
      <UiIcon icon="svg-spinners:blocks-shuffle-3" class="text-4xl" />
    </div>

    <!-- DATA -->
    <div
      v-else-if="parameters.length > 0"
      class="flex flex-col w-full text-[15px] overflow-y-auto"
    >
      <div
        v-if="!$slots.parameters"
        v-for="(parameter, index) in paginatedParameters"
        :key="parameter.id || index"
        class="w-full px-5"
      >
        <div class="flex items-center justify-center gap-5 w-full">
          <UiIcon
            v-if="showMedals && globalIndex(index) <= 2"
            :icon="`icon:ai-medal-${globalIndex(index) + 1}`"
            custom-class="w-6 h-6 flex-shrink-0"
          />

          <div
            v-else
            class="text-[13px] h-6 w-6 pt-[3px] bg-gradient-to-b from-[#00BDA7] to-[#A3D0E6] rounded-full text-[#1C1C1C] flex items-center justify-center !shadow-xl"
          >
            {{ globalIndex(index) + 1 }}
          </div>

          <div class="flex w-full gap-4">
            <div class="flex w-full">
              <div class="flex flex-col justify-center flex-1">
                <span class="text-white font-semibold">
                  {{ parameter.text }}
                </span>
                <span class="text-[#838383] text-sm">
                  {{ parameter.desc }}
                </span>
              </div>
            </div>

            <div class="flex-shrink-0 self-start">
              <span class="font-semibold text-white whitespace-nowrap">
                {{ Number(parameter.value).toLocaleString() }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <slot
          name="parameters"
          :parameters="paginatedParameters"
          :getIndex="globalIndex"
        />
      </div>

      <div>
        <slot name="footer" />
      </div>

      <div v-if="$props.pagination" class="w-full flex justify-center">
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
    </div>

    <!-- EMPTY -->
    <div v-else class="grid place-items-center h-full w-full">
      <div class="flex flex-col gap-[2px] items-center justify-center py-20">
        <UiIcon
          icon="ph:files-duotone"
          custom-class="w-[70px] h-[70px] bg-gradient-to-r from-[#00AAFF] to-[#00BDA7]"
        />
        <p>No records found</p>
        <p class="italic text-[10px] text-[#626262]">
          New data will appear here once it becomes available.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  customClass: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  parameters: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  totalItems: {
    type: Number,
    default: 10,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  rowsPerPage: {
    type: Number,
    default: 5,
  },
  pagination: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["page-changed", "rows-per-page-changed"]);

// Need to pass pagination boolean for paginated list to show in list
const paginatedParameters = computed(() => {
  const start = displayStartIndex.value;
  const end = start + rowsPerPageForDisplay.value;

  return props.parameters.slice(start, end);
});

const currentPageForDisplay = computed(() =>
  Math.max(1, Number(props.currentPage || 1))
);

const rowsPerPageForDisplay = computed(() =>
  Math.max(1, Number(props.rowsPerPage || 5))
);

const displayStartIndex = computed(() =>
  props.pagination
    ? (currentPageForDisplay.value - 1) * rowsPerPageForDisplay.value
    : 0
);

const globalIndex = (localIndex) =>
  displayStartIndex.value + Number(localIndex || 0);

const showMedals = computed(() =>
  props.pagination ? currentPageForDisplay.value === 1 : true
);
</script>
