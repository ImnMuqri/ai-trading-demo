<template>
  <UiCard
    is-gradient
    class="flex flex-col justify-between p-4 w-full lg:w-[430px] lg:h-[630px] rounded-lg">
    <div>
      <div class="flex gap-1 items-center">
        <p class="text-md">Signal & Insights</p>
        <UiIcon icon="material-symbols:info-outline-rounded"></UiIcon>
      </div>
      <div class="grid grid-cols-1 h-fit">
        <div class="h-fit grid grid-cols-1 gap-2 mt-4">
          <div
            class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
            <p class="text-[#BCBBBB]">Trend</p>
            <p
              :class="
                tradingAnalysis?.trend === 'Bullish'
                  ? 'text-emerald-500'
                  : 'text-red-500'
              ">
              {{ analysisData?.trend ?? "No Info" }}
            </p>
          </div>
          <div
            class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
            <p class="text-[#BCBBBB]">Volatility</p>
            <p class="text-yellow-500">
              {{ analysisData?.volatility ?? "No Info" }}
            </p>
          </div>
          <!-- <div
            class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
            <p class="text-[#BCBBBB]">Volume Analysis</p>
            <p class="text-red-500">Decreasing</p>
          </div>
          <div
            class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
            <p class="text-[#BCBBBB]">Market Sentiment</p>
            <p class="text-emerald-500">Cautious</p>
          </div>  -->
        </div>
        <div
          v-if="tradingAnalysis != null"
          class="h-fit grid grid-cols-1 gap-2 mt-4">
          <div class="flex gap-1 items-center">
            <UiIcon icon="hugeicons:ai-idea"></UiIcon>
            <p class="text-sm">Trade Idea</p>
          </div>
          <div class="flex flex-wrap gap-1">
            <p class="text-[10px] text-gray-400">Signal generated at:</p>
            <p class="text-[10px] text-gray-400 mb-1">
              {{ formatDateTime(tradingAnalysis.createdAt) }}
            </p>
          </div>
          <!-- Signal -->
          <div
            class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
            <p class="text-[#BCBBBB]">Signal</p>
            <p
              :class="
                tradingAnalysis?.signal === 'BUY'
                  ? 'text-emerald-500'
                  : 'text-red-500'
              ">
              {{ tradingAnalysis?.signal ?? "No Info" }}
            </p>
          </div>

          <!-- Timeframe -->
          <div
            class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
            <p class="text-[#BCBBBB]">Timeframe</p>
            <p class="text-emerald-500">
              {{ tradingAnalysis.timeframe ?? "No Info" }}
            </p>
          </div>

          <!-- Entry Zone -->
          <div
            class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
            <p class="text-[#BCBBBB]">Entry Zone</p>
            <p class="text-yellow-500">
              {{ tradingAnalysis?.entryLower ?? "--" }}
              to
              {{ tradingAnalysis?.entryUpper ?? "--" }}
            </p>
          </div>
          <div
            class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
            <p class="text-[#BCBBBB]">Stop Loss</p>
            <p class="text-red-500">
              {{ tradingAnalysis?.stopLoss ?? "No Info" }}
            </p>
          </div>
          <div
            class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
            <p class="text-[#BCBBBB]">Take Profit</p>
            <p class="text-emerald-500">
              {{ tradingAnalysis?.takeProfit ?? "No Info" }}
            </p>
          </div>
          <!-- Risk Level -->
          <div
            class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
            <p class="text-[#BCBBBB]">Risk Level</p>
            <p
              :class="
                tradingAnalysis?.risk === 'High'
                  ? 'text-red-500'
                  : tradingAnalysis?.risk === 'Medium'
                  ? 'text-yellow-500'
                  : 'text-emerald-500'
              ">
              {{ tradingAnalysis?.risk ?? "No Info" }}
            </p>
          </div>
        </div>
        <div
          class="flex flex-col items-center justify-center gap-1 h-fit mt-2 mb-2 lg:mt-10"
          :class="tradingAnalysis ? 'lg:mt-2' : 'lg:mt-10'">
          <div v-if="!tradingAnalysis" class="relative">
            <UiIcon
              icon="icon:ai-icon"
              custom-class="h-28 w-48 text-[#00BDA7]"></UiIcon>
            <p class="absolute bottom-0 left-8 text-[11px] text-center">
              Need more information?
            </p>
            <p
              class="absolute -bottom-3.5 left-10 text-[10px] text-[#B4B5B7] text-center italic">
              Click the button below
            </p>
          </div>
          <UiButton
            v-if="!tradingAnalysis"
            @click="requestSignal"
            class="mt-5 mb-1 !text-[12px] !px-8 !rounded-full"
            :isLoading="isRequestingSignal"
            >Request Signal</UiButton
          >
          <div class="flex gap-1 text-[11px] text-center text-[#B4B5B7]">
            <p>Signal Left:</p>
            <p class="text-[#00BDA7]">1000</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="tradingAnalysis" class="flex flex-col md:flex-row gap-2">
      <UiCard
        @click="requestSignal"
        class="relative flex items-center justify-center text-[12px] h-full w-full text-gray-400 text-center !bg-[#00BDA7] !text-black p-2.5 cursor-pointer">
        <p :class="['text-white', { 'opacity-0': isRequestingSignal }]">
          Request Signal
        </p>
        <div
          v-if="isRequestingSignal"
          class="absolute inset-0 flex items-center justify-center">
          <UiIcon
            icon="svg-spinners:blocks-shuffle-3"
            class="text-lg text-white" />
        </div> </UiCard
      ><UiCard
        @click="openModal"
        class="flex items-center justify-center text-[12px] py-2 md:py-0 w-full text-gray-400 text-center bg-[#0D0D0D] hover:border-[#00BDA7] transition-colors px-1.5 cursor-pointer">
        <p>See detailed analysis</p>
      </UiCard>
    </div>
  </UiCard>
  <UiModal
    :show="openDetailedAnalysis"
    :title="analysisData?.symbol"
    description="Here's a detailed analysis of the trading signal."
    :isGradient="false"
    width="max-w-[800px]"
    @close="openDetailedAnalysis = false">
    <template #body>
      <div class="text-gray-300">
        <div
          class="flex gap-2 items-center justify-around py-3 border rounded-xl">
          <div class="flex flex-col gap-1 items-center justify-center text-sm">
            <p>Risk Level</p>
            <p
              class="font-semibold"
              :class="{
                'text-yellow-500': analysisData.riskLevel === 'Medium',
                'text-[#00BDA7]': analysisData.riskLevel === 'Low',
                'text-red-500': analysisData.riskLevel === 'High',
              }">
              {{ analysisData.riskLevel }}
            </p>
          </div>
          <div class="flex flex-col gap-1 items-center justify-center text-sm">
            <p>Risk Reward</p>
            <p class="font-semibold">
              {{ analysisData.riskRewardRatio }}
            </p>
          </div>
          <div class="flex flex-col gap-1 items-center justify-center text-sm">
            <p>Confidence Level</p>
            <p
              class="font-semibold"
              :class="{
                'text-red-500': analysisData.confidenceLevel < 0.5,
                'text-yellow-500':
                  analysisData.confidenceLevel >= 0.5 &&
                  analysisData.confidenceLevel <= 0.79,
                'text-emerald-500': analysisData.confidenceLevel > 0.79,
              }">
              {{ formatScore(analysisData.confidenceLevel) }}
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-2 text-sm">
          <div
            class="flex flex-col gap-2 p-3 border border-[#00BDA7] rounded-lg mt-4 mb-2">
            <div class="flex items-center gap-1">
              <UiIcon icon="hugeicons:ai-idea" custom-class="h-4 w-4"></UiIcon>
              <h3 class="text-lg font-semibold">AI Analysis</h3>
            </div>
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-1">
                <p class="font-semibold">Validation Criteria</p>
                <p>
                  {{ analysisData.validationCriteria }}
                </p>
              </div>
              <div class="flex flex-col gap-1">
                <p class="font-semibold">Invalidation Criteria</p>
                <p>
                  {{ analysisData.invalidationCriteria }}
                </p>
              </div>
              <div class="flex flex-col gap-1">
                <p class="font-semibold">Overall Trend Bias</p>
                <p>
                  {{ analysisData.overallTrendBias }}
                </p>
              </div>
              <div class="flex flex-col gap-1">
                <p class="font-semibold">Market Structure</p>
                <p>
                  {{ analysisData.marketStructure }}
                </p>
              </div>
              <div class="flex flex-col gap-1">
                <p class="font-semibold">Price Action Analysis</p>
                <p>
                  {{ analysisData.priceActionAnalysis }}
                </p>
              </div>
              <div class="flex flex-col gap-1">
                <p class="font-semibold">Indicator Analysis</p>
                <p>
                  {{ analysisData.indicatorAnalysis }}
                </p>
              </div>

              <div class="flex flex-col gap-1">
                <p class="font-semibold">Additional Tips</p>
                <p>
                  {{ analysisData.additionalTips }}
                </p>
              </div>
              <div class="flex flex-col gap-1">
                <p class="font-semibold">Market Structure</p>
                <p>
                  {{ analysisData.analysisSummary }}
                </p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div class="flex items-center gap-2">
                <UiIcon
                  icon="hugeicons:book-open-01"
                  custom-class="h-3.5 w-3.5"></UiIcon>
                <p>Key Insight</p>
              </div>
              <div class="flex flex-col gap-2 mt-2">
                <div
                  class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                  <p class="text-[#BCBBBB]">Trend</p>
                  <p
                    :class="
                      analysisData?.trend == 'Bullish'
                        ? 'text-emerald-500'
                        : 'text-red-500'
                    ">
                    {{ analysisData?.trend ?? "No Info" }}
                  </p>
                </div>
                <div
                  class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                  <p class="text-[#BCBBBB]">Volatility</p>
                  <p class="text-emerald-500">
                    {{ analysisData?.volatility ?? "No Info" }}
                  </p>
                </div>
                <div
                  class="flex flex-col justify-between gap-1 text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                  <p class="text-[#BCBBBB] uppercase">Volume Analysis</p>
                  <p>
                    {{ analysisData.volumeAnalysis }}
                  </p>
                </div>
                <div
                  class="flex flex-col justify-between gap-1 text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                  <p class="text-[#BCBBBB] uppercase">Market Sentiment</p>
                  <p>
                    {{ analysisData.marketSentiment }}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div class="flex items-center gap-1">
                <UiIcon
                  icon="hugeicons:ai-idea"
                  custom-class="h-3.5 w-3.5"></UiIcon>
                <p>Trade Idea</p>
              </div>
              <div class="flex flex-col gap-2 mt-2">
                <div
                  class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                  <p class="text-[#BCBBBB]">Signal</p>
                  <p
                    :class="
                      tradingAnalysis?.signal === 'BUY'
                        ? 'text-emerald-500'
                        : 'text-red-500'
                    ">
                    {{ tradingAnalysis?.signal ?? "No Info" }}
                  </p>
                </div>
                <div
                  class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                  <p class="text-[#BCBBBB]">Entry Zone</p>
                  <p class="text-yellow-500">
                    {{ analysisData?.entryZone.upper ?? "No Info" }}-
                    {{ analysisData?.entryZone.lower ?? "No Info" }}
                  </p>
                </div>
                <div
                  class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                  <p class="text-[#BCBBBB]">Stop Loss</p>
                  <p class="text-red-500">
                    {{ analysisData?.stopLoss ?? "No Info" }}
                  </p>
                </div>
                <div
                  class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                  <p class="text-[#BCBBBB]">Take Profit</p>
                  <p class="text-emerald-500">
                    {{ analysisData.takeProfit }}
                  </p>
                </div>
                <div
                  class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                  <p class="text-[#BCBBBB]">Take Profit 1</p>
                  <p class="text-emerald-500">
                    {{ analysisData.takeProfit1 }}
                  </p>
                </div>
                <div
                  class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                  <p class="text-[#BCBBBB]">Take Profit 2</p>
                  <p class="text-emerald-500">
                    {{ analysisData.takeProfit2 }}
                  </p>
                </div>
                <div
                  class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                  <p class="text-[#BCBBBB]">Take Profit 3</p>
                  <p class="text-emerald-500">
                    {{ analysisData.takeProfit3 }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { showToast } from "~/composables/useToastMessage";
const { $api } = useNuxtApp();

const tradingAnalysis = ref(null);
const isRequestingSignal = ref(false);
const openDetailedAnalysis = ref(false);
const analysisData = ref(null);
const intervalMap = {
  1: "M1",
  5: "M5",
  15: "M15",
  30: "M30",
  60: "H1",
  240: "H4",
  D: "D1",
  W: "W1",
  M: "MN1",
};
const props = defineProps({
  symbol: {
    type: String,
    default: null,
  },
  interval: {
    type: String,
    default: null,
  },
});

const formatScore = (score) => `${Math.round(score * 100)}%`;
const formatDateTime = (isoString) => {
  if (!isoString) return "";

  const date = new Date(isoString);

  return date.toLocaleString("en", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const openModal = () => {
  openDetailedAnalysis.value = true;
};

const SIGNAL_LIFETIME = 5 * 60 * 1000;
let expiryTimeout = null;

const clearTradingAnalysis = () => {
  tradingAnalysis.value = null;
  analysisData.value = null;
};

const getSignalHistory = async (limit = 1, offset = 0) => {
  try {
    const res = await $api.get("/api/ai/trading-history", {
      params: { limit, offset },
    });

    const analysis = res.data.data || {};
    const history = analysis.history?.[0];

    if (!history) {
      clearTradingAnalysis();
      return;
    }

    const createdAt = new Date(history.createdAt).getTime();
    const now = Date.now();
    const timePassed = now - createdAt;

    if (timePassed >= SIGNAL_LIFETIME) {
      clearTradingAnalysis();
      return;
    }

    tradingAnalysis.value = {
      trend: history.trend,
      signal: history.signal,
      risk: history.riskLevel,
      entryLower: history.entryZone?.lower,
      entryUpper: history.entryZone?.upper,
      stopLoss: history.stopLoss,
      takeProfit: history.takeProfit,
      symbol: history.symbol,
      createdAt: history.createdAt,
      timeframe: history.timeframe,
    };

    analysisData.value = history;

    if (expiryTimeout) {
      clearTimeout(expiryTimeout);
    }

    expiryTimeout = setTimeout(() => {
      clearTradingAnalysis();
    }, SIGNAL_LIFETIME - timePassed);
  } catch (error) {
    console.error("Unable to load trading history", error);
    clearTradingAnalysis();
  }
};

const requestSignal = async () => {
  if (isRequestingSignal.value) return; // prevent multiple calls
  isRequestingSignal.value = true;
  try {
    const apiTimeframe = intervalMap[props.interval] || "No Timeframe Selected";

    const res = await $api.post(`api/ai/analyze-trading`, {
      symbol: props.symbol,
      timeframe: apiTimeframe,
    });

    const analysis = res.data.data || {};
    tradingAnalysis.value = {
      trend: analysis.analysis.trend,
      signal: analysis.analysis.signal,
      risk: analysis.analysis.riskLevel,
      entryLower: analysis.analysis.entryZone?.lower,
      entryUpper: analysis.analysis.entryZone?.upper,
      stopLoss: analysis.analysis.stopLoss?.toFixed(2),
      takeProfit: analysis.analysis.takeProfit?.toFixed(2),
      symbol: analysis.symbol,
      timeframe: analysis.timeframe,
      createdAt: Date.now(),
    };
    analysisData.value = analysis.analysis;
  } catch (error) {
    showToast(error.response?.data?.message || error.message, "error");
  } finally {
    isRequestingSignal.value = false;
  }
};

onMounted(() => {
  getSignalHistory(1, 0);
});
</script>

<style scoped></style>
