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

    <div
      v-if="parameters.length > 0 && !isLoading"
      class="flex flex-col w-full text-[15px] gap-4 overflow-y-auto">
      <div
        v-if="!$slots.parameters"
        v-for="(parameter, index) in parameters"
        :key="parameter.id || index"
        class="w-full px-5">
        <div class="flex items-center justify-center gap-5 w-full">
          <UiIcon
            v-if="showMedals && globalIndex(index) <= 2"
            :icon="`icon:ai-medal-${globalIndex(index) + 1}`"
            custom-class="w-6 h-6 flex-shrink-0" />

          <div
            v-else
            class="text-[13px] h-6 w-6 pt-[3px] bg-gradient-to-b from-[#00BDA7] to-[#A3D0E6] rounded-full text-[#1C1C1C] flex items-center justify-center !shadow-xl">
            {{ globalIndex(index) + 1 }}
          </div>

          <div class="flex w-full gap-4">
            <div class="flex w-full">
              <div class="flex flex-col justify-center flex-1">
                <span class="text-white font-semibold">{{
                  parameter.text
                }}</span>
                <span class="text-[#838383] text-sm">{{ parameter.desc }}</span>
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
          :parameters="parameters"
          :getIndex="globalIndex"></slot>
      </div>
      <div v-if="pagination" class="mt-4 w-full flex justify-center">
        <slot name="pagination"> </slot>
      </div>
    </div>

    <div
      v-else-if="parameters.length === 0 && !isLoading"
      class="grid place-items-center h-full w-full py-10">
      empty state
    </div>

    <div
      v-else-if="isLoading"
      class="grid place-items-center mb-5 h-full w-full"></div>
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
