<template>
  <div class="text-white">
    <UiCard class="mt-4 py-2 text-sm">
      <!-- Header -->
      <div class="flex items-center gap-2 px-4 border-b border-[#1C1C1C] pb-2">
        <UiIcon icon="mdi:chart-line" custom-class="w-5 h-5" />
        <p class="text-lg font-semibold py-2">Signal History</p>
      </div>

      <!-- Table Header -->
      <div
        class="px-4 grid grid-cols-6 gap-2 text-gray-300 font-bold p-3 bg-gradient-to-b from-[#111111] to-[#1C1C1C]">
        <div>No.</div>
        <div>Time</div>
        <div>Symbol</div>
        <div>Timeframe</div>
        <div>Signal</div>
        <div>Action</div>
      </div>

      <!-- Rows -->
      <div
        v-for="(item, index) in historyData"
        :key="item.id"
        class="px-4 grid grid-cols-6 gap-2 items-center p-3 border-t border-gray-800 hover:bg-[#111111] text-[#838383]">
        <div
          class="flex justify-center items-center h-6 w-6 rounded-full text-black bg-gradient-to-b from-[#00BDA7] to-[#A3D0E6]">
          {{ index + 1 }}
        </div>

        <div class="text-gray-400">
          {{ new Date(item.createdAt).toLocaleString() }}
        </div>

        <div class="font-semibold">{{ item.symbol }}</div>

        <div>{{ item.timeframe }}</div>

        <div
          class="font-semibold"
          :class="item.signal === 'BUY' ? 'text-green-500' : 'text-red-500'">
          {{ item.signal }}
        </div>

        <div>
          <div
            @click="viewSignal(item)"
            class="flex gap-1 items-center cursor-pointer hover:text-[#00BDA7] underline">
            <p>View Signal</p>
            <UiIcon
              icon="ic:round-chevron-right"
              custom-class="w-4 h-4 hover:text-[#00BDA7]"></UiIcon>
          </div>
        </div>
      </div>
    </UiCard>
    <UiModal
      :show="openDetailedAnalysis"
      :title="selectedHistory?.symbol"
      description="Here's a detailed analysis of the trading signal."
      :isGradient="false"
      width="max-w-[800px]"
      @close="openDetailedAnalysis = false">
      <template #body>
        <div class="text-gray-300">
          <div
            class="flex gap-2 items-center justify-around py-3 border rounded-xl">
            <div
              class="flex flex-col gap-1 items-center justify-center text-sm">
              <p>Risk Level</p>
              <p
                class="font-semibold"
                :class="{
                  'text-yellow-500': selectedHistory.riskLevel === 'Medium',
                  'text-[#00BDA7]': selectedHistory.riskLevel === 'Low',
                  'text-red-500': selectedHistory.riskLevel === 'High',
                }">
                {{ selectedHistory.riskLevel }}
              </p>
            </div>
            <div
              class="flex flex-col gap-1 items-center justify-center text-sm">
              <p>Risk Reward</p>
              <p class="font-semibold">
                {{ selectedHistory.riskRewardRatio }}
              </p>
            </div>
            <div
              class="flex flex-col gap-1 items-center justify-center text-sm">
              <p>Confidence Level</p>
              <p
                class="font-semibold"
                :class="{
                  'text-red-500': selectedHistory.confidenceLevel < 0.5,
                  'text-yellow-500':
                    selectedHistory.confidenceLevel >= 0.5 &&
                    selectedHistory.confidenceLevel <= 0.79,
                  'text-emerald-500': selectedHistory.confidenceLevel > 0.79,
                }">
                {{ formatScore(selectedHistory.confidenceLevel) }}
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-2 text-sm">
            <div
              class="flex flex-col gap-2 p-3 border border-[#00BDA7] rounded-lg mt-4 mb-2">
              <div class="flex items-center gap-1">
                <UiIcon
                  icon="hugeicons:ai-idea"
                  custom-class="h-4 w-4"></UiIcon>
                <h3 class="text-lg font-semibold">AI Analysis</h3>
              </div>
              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                  <p class="font-semibold">Validation Criteria</p>
                  <p>
                    {{ selectedHistory.validationCriteria }}
                  </p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="font-semibold">Invalidation Criteria</p>
                  <p>
                    {{ selectedHistory.invalidationCriteria }}
                  </p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="font-semibold">Overall Trend Bias</p>
                  <p>
                    {{ selectedHistory.overallTrendBias }}
                  </p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="font-semibold">Market Structure</p>
                  <p>
                    {{ selectedHistory.marketStructure }}
                  </p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="font-semibold">Price Action Analysis</p>
                  <p>
                    {{ selectedHistory.priceActionAnalysis }}
                  </p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="font-semibold">Indicator Analysis</p>
                  <p>
                    {{ selectedHistory.indicatorAnalysis }}
                  </p>
                </div>

                <div class="flex flex-col gap-1">
                  <p class="font-semibold">Additional Tips</p>
                  <p>
                    {{ selectedHistory.additionalTips }}
                  </p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="font-semibold">Market Structure</p>
                  <p>
                    {{ selectedHistory.analysisSummary }}
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
                        selectedHistory?.trend == 'Bullish'
                          ? 'text-emerald-500'
                          : 'text-red-500'
                      ">
                      {{ selectedHistory?.trend ?? "No Info" }}
                    </p>
                  </div>
                  <div
                    class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                    <p class="text-[#BCBBBB]">Volatility</p>
                    <p class="text-emerald-500">
                      {{ selectedHistory?.volatility ?? "No Info" }}
                    </p>
                  </div>
                  <div
                    class="flex flex-col justify-between gap-1 text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                    <p class="text-[#BCBBBB] uppercase">Volume Analysis</p>
                    <p>
                      {{ selectedHistory.volumeAnalysis }}
                    </p>
                  </div>
                  <div
                    class="flex flex-col justify-between gap-1 text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                    <p class="text-[#BCBBBB] uppercase">Market Sentiment</p>
                    <p>
                      {{ selectedHistory.marketSentiment }}
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
                        selectedHistory?.signal === 'BUY'
                          ? 'text-emerald-500'
                          : 'text-red-500'
                      ">
                      {{ selectedHistory?.signal ?? "No Info" }}
                    </p>
                  </div>
                  <div
                    class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                    <p class="text-[#BCBBBB]">Entry Zone</p>
                    <p class="text-yellow-500">
                      {{ selectedHistory?.entryZone.upper ?? "No Info" }}-
                      {{ selectedHistory?.entryZone.lower ?? "No Info" }}
                    </p>
                  </div>
                  <div
                    class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                    <p class="text-[#BCBBBB]">Stop Loss</p>
                    <p class="text-red-500">
                      {{ formatPrice(selectedHistory?.stopLoss ?? "No Info") }}
                    </p>
                  </div>
                  <div
                    class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                    <p class="text-[#BCBBBB]">Take Profit</p>
                    <p class="text-emerald-500">
                      {{ formatPrice(selectedHistory.takeProfit) }}
                    </p>
                  </div>
                  <div
                    class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                    <p class="text-[#BCBBBB]">Take Profit 1</p>
                    <p class="text-emerald-500">
                      {{ formatPrice(selectedHistory.takeProfit1) }}
                    </p>
                  </div>
                  <div
                    class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                    <p class="text-[#BCBBBB]">Take Profit 2</p>
                    <p class="text-emerald-500">
                      {{ formatPrice(selectedHistory.takeProfit2) }}
                    </p>
                  </div>
                  <div
                    class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
                    <p class="text-[#BCBBBB]">Take Profit 3</p>
                    <p class="text-emerald-500">
                      {{ formatPrice(selectedHistory.takeProfit3) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </UiModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

definePageMeta({
  layout: "layout",
  middleware: "auth-client",
});

const { $api } = useNuxtApp();
const historyData = ref([]);
const openDetailedAnalysis = ref(false);
const selectedHistory = ref(null);

const formatScore = (score) => `${Math.round(score * 100)}%`;
const formatPrice = (value) => {
  if (!value) return "—";
  return Number(value).toFixed(2);
};

const getSignalHistory = async () => {
  try {
    const res = await $api.get("/api/ai/trading-history");
    historyData.value = res.data.data.history || [];
  } catch (error) {
    console.error("Failed to load signal history", error);
  }
};

const viewSignal = (signal) => {
  selectedHistory.value = signal;
  openDetailedAnalysis.value = true;
};

onMounted(() => {
  getSignalHistory();
});
</script>

<style lang="scss" scoped></style>
