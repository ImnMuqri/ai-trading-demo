<template>
  <UiCard class="flex flex-col gap-2 border px-4 pt-4 flex-1">
    <div
      class="flex flex-wrap space-y-2 min-[450px]:space-y-0 items-center justify-between">
      <div class="flex gap-1 items-center">
        <span class="text-[#00BDA7] text-md">Contextual Factors </span>
        <UiIcon icon="material-symbols:info-outline-rounded"></UiIcon>
      </div>
      <div class="flex gap-4">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span class="text-[12px]">Bullish</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-red-500"></div>
          <span class="text-[12px]">Bearish</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-white"></div>
          <span class="text-[12px]">Neutral</span>
        </div>
      </div>
    </div>
    <p class="text-sm text-gray-300">{{ CFsummary }}</p>
    <div class="grid grid-cols-1 mt-2 flex-1 overflow-hidden hide-scrollbar">
      <div
        class="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center px-10 py-6 mb-4">
        <template v-if="isLoadingContextual">
          <div
            v-for="i in 4"
            :key="i"
            class="flex flex-col items-center animate-pulse">
            <div
              class="w-[100px] h-[100px] rounded-full bg-gray-700/30 mb-2"></div>
            <div class="h-3 w-20 bg-gray-700/30 rounded"></div>
          </div>
        </template>
        <template v-else>
          <!-- <div
            v-for="(meter, index) in meters"
            :key="index"
            class="!hidden flex flex-col items-center">
            <svg width="100" height="100" viewBox="0 0 36 36" class="mb-2">
              <path
                class="text-gray-700/20"
                stroke="currentColor"
                stroke-width="3"
                fill="none"
                d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0 -31.831" />
              <path
                :stroke="meter.fillColor"
                stroke-width="3"
                :stroke-dasharray="`${meter.value}, 100`"
                stroke-linecap="round"
                fill="none"
                d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0 -31.831" />

              <text
                x="19"
                y="21"
                class="text-[8px] font-semibold"
                :fill="meter.fillColor"
                text-anchor="middle">
                {{ meter.value }}%
              </text>
            </svg>
            <p class="text-sm text-gray-300 text-center">{{ meter.label }}</p>
          </div> -->
          <div
            v-for="(meter, index) in meters"
            :key="index"
            class="flex flex-col items-center">
            <UiProgress
              type="circle"
              :progress="[meter.value]"
              :color="[meter.fillColor]"
              custom-class="max-w-[130px]"
              title-class="!text-[10px]"
              stroke="2.5"
              :title="meter.label" />
          </div>
        </template>
      </div>

      <!-- Toggle Button -->
      <div
        class="w-full h-fit py-3 text-center border-t border-b border-[#1C1C1C] flex gap-2 items-center justify-center cursor-pointer"
        :class="[isLoadingContextual ? 'pointer-events-none opacity-50' : '']"
        @click="showKeyFactors = !showKeyFactors">
        <UiIcon
          :icon="
            showKeyFactors ? 'mdi:eye-off-outline' : 'meteor-icons:robot'
          "></UiIcon>
        <p class="text-sm text-gray-400">
          {{ showKeyFactors ? "Hide details" : "See key takeaways" }}
        </p>
      </div>

      <!-- Key Factors -->
      <div
        class="w-full overflow-hidden transition-all duration-500 ease-in-out"
        :style="{ maxHeight: showKeyFactors ? '1000px' : '0px' }">
        <div class="flex gap-1 items-center py-4 border-[#1C1C1C]">
          <span class="text-[#00BDA7] text-md">Key Factors </span>
          <UiIcon icon="material-symbols:info-outline-rounded"></UiIcon>
        </div>
        <div
          v-for="(item, idx) in CFexp"
          :key="item.title"
          class="flex flex-col lg:grid grid-cols-4 gap-2 lg:gap-6 items-start justify-end mt-4 mb-4 pb-4 border-b border-[#1C1C1C]">
          <div class="grid grid-cols-1 gap-3 text-md col-span-1">
            <p
              class="text-end font-semibold"
              :class="{
                'text-[#00BDA7]': item.sentiment === 'bullish',
                'text-red-500': item.sentiment === 'bearish',
                'text-gray-400': item.sentiment === 'neutral',
              }">
              {{ item.name }}
            </p>
          </div>
          <div
            class="text-sm lg:text-md col-span-3"
            :class="{
              'text-[#00BDA7]': item.sentiment === 'bullish',
              'text-red-500': item.sentiment === 'bearish',
              'text-gray-400': item.sentiment === 'neutral',
            }">
            {{ item.explanation }}
          </div>
        </div>
      </div>
    </div></UiCard
  >
</template>

<script setup>
import { onMounted, watch } from "vue";

const { $api } = useNuxtApp();
const props = defineProps({
  selectedSymbol: {
    type: String,
    default: null,
  },
});

const contextualFactors = ref([]);
const CFsummary = ref("");
const CFexp = ref([]);
const showKeyFactors = ref(false);
const SentimentIndex = ref({
  percentage: 0,
  explanation: "",
});
const isLoadingContextual = ref(true);

const emit = defineEmits(["sentimentIndex"]);

// Fetch contextual factors
const fetchContextual = async () => {
  try {
    isLoadingContextual.value = true;

    const resContextual = await $api.post(`api/contextual-factors/analyze`, {
      currencyPair: props.selectedSymbol,
    });

    contextualFactors.value = resContextual.data.data.analysis.factors || [];
    CFsummary.value = resContextual.data.data.analysis.summary || "";
    CFexp.value = resContextual.data.data.analysis.factors || [];

    SentimentIndex.value = {
      percentage:
        resContextual.data.data.analysis.sentimentIndex?.percentage || 0,
      explanation:
        resContextual.data.data.analysis.sentimentIndex?.explanation || null,
    };

    emit("sentimentIndex", SentimentIndex.value);
  } catch (err) {
    console.error(err);
  } finally {
    isLoadingContextual.value = false;
  }
};

// Map sentiment to color
const sentimentColor = (sentiment) => {
  switch (sentiment.toLowerCase()) {
    case "bullish":
      return "#10B981"; // emerald-400
    case "bearish":
      return "#F87171"; // red-400
    case "neutral":
      return "#EFEFEFFF"; // yellow-400
    default:
      return "#9CA3AF"; // gray-400
  }
};

const meters = computed(() =>
  contextualFactors.value.map((factor) => ({
    label: factor.name,
    value: factor.weight,
    strokeColor: sentimentColor(factor.sentiment),
    fillColor: sentimentColor(factor.sentiment), // use this for <text>
  }))
);

// onMounted(() => {
//   fetchContextual();
// });

watch(
  () => props.selectedSymbol,
  (newSymbol) => {
    if (newSymbol) {
      fetchContextual();
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped></style>
