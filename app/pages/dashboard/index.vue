<template>
  <div class="text-white">
    <div
      class="flex flex-wrap items-center justify-between gap-2 py-2 px-1 w-full mb-2">
      <div class="flex items-center gap-2">
        <UiSelect
          v-model="selectedSymbol"
          :options="symbols"
          placeholder="Select Instrument" />
        <UiSelect
          v-model="selectedInterval"
          :options="intervalOptions"
          placeholder="Select Timeframe" />
      </div>
      <UiButton
        variant="outline"
        size="md"
        :is-loading="false"
        class="py-[10px]"
        >Market History<template #icon-right
          ><UiIcon
            icon="heroicons-outline:calendar"
            custom-class="w-5 h-5"></UiIcon></template
      ></UiButton>
    </div>

    <div class="flex flex-col-reverse lg:flex-row gap-4 w-full h-full">
      <UiCard is-gradient class="p-4 w-full lg:w-[400px] rounded-lg"
        ><div class="flex gap-1 items-center">
          <p class="text-md">Signal & Insights</p>
          <UiIcon icon="material-symbols:info-outline-rounded"></UiIcon>
        </div>
        <div class="grid grid-cols-1 h-fit">
          <div class="h-fit grid grid-cols-1 gap-2 mt-4">
            <div
              class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
              <p class="text-[#BCBBBB]">Trend</p>
              <p class="text-red-500">Bullish</p>
            </div>
            <div
              class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
              <p class="text-[#BCBBBB]">Volatility</p>
              <p class="text-yellow-500">Medium</p>
            </div>
            <div
              class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
              <p class="text-[#BCBBBB]">Volume Analysis</p>
              <p class="text-red-500">Decreasing</p>
            </div>
            <div
              class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
              <p class="text-[#BCBBBB]">Market Sentiment</p>
              <p class="text-emerald-500">Cautious</p>
            </div>
          </div>
          <div
            v-if="tradingAnalysis"
            class="h-fit grid grid-cols-1 gap-2 mt-4 border p-2.5 rounded-lg border-[#00BDA7]">
            <div class="flex gap-1 items-center">
              <UiIcon icon="hugeicons:ai-idea"></UiIcon>
              <p class="text-sm">Trade Idea</p>
            </div>
            <!-- Trend -->
            <div
              class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
              <p class="text-[#BCBBBB]">Trend</p>
              <p
                :class="
                  tradingAnalysis?.trend === 'Bullish'
                    ? 'text-red-500'
                    : 'text-emerald-500'
                ">
                {{ tradingAnalysis?.trend ?? "No Info" }}
              </p>
            </div>

            <!-- Timeframe -->
            <div
              class="flex justify-between gap-2 uppercase text-[12px] border border-[#6262624D] rounded-md w-full p-2">
              <p class="text-[#BCBBBB]">Timeframe</p>
              <p class="text-emerald-500">
                {{ tradingAnalysis?.timeframe ?? "No Info" }}
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
            <div class="relative">
              <UiIcon
                icon="icon:ai-icon"
                custom-class="h-28 w-48 text-[#00BDA7]"></UiIcon>
              <p class="absolute bottom-0 left-8 text-[11px] text-center">
                Need more information?
              </p>
            </div>
            <UiButton
              v-if="!tradingAnalysis"
              @click="requestSignal"
              class="my-2"
              :isLoading="isRequestingSignal"
              >Request Signal</UiButton
            >
            <UiButton
              v-if="tradingAnalysis"
              @click="requestSignal"
              class="my-2"
              :isLoading="isRequestingSignal"
              >Request Another Signal</UiButton
            >
          </div>
        </div>
      </UiCard>
      <client-only class="w-full">
        <div class="grid grid-cols-1 gap-2">
          <UiCard class="px-2">
            <div class="tradingview-widget-container" ref="tickerContainer">
              <div class="tradingview-widget-container__widget"></div>
            </div>
          </UiCard>
          <UiCard class="border p-4">
            <p class="font-semibold text-[#00BDA7] pb-2 text-lg">
              Market Trend
            </p>
            <div id="tradingview-container"></div>
          </UiCard>
        </div>
      </client-only>
    </div>
    <div class="flex flex-wrap w-full gap-4 mt-4">
      <UiCard class="flex flex-col gap-2 border px-4 pt-4 flex-1">
        <div class="flex items-center justify-between">
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
        <p class="text-sm text-gray-300">
          {{ CFsummary }}
        </p>
        <div
          class="grid grid-cols-1 mt-2 flex-1 overflow-hidden hide-scrollbar">
          <div
            class="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center px-10 py-6 mb-4">
            <div
              v-for="(meter, index) in meters"
              :key="index"
              class="flex flex-col items-center">
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
              <p class="text-sm text-gray-300">{{ meter.label }}</p>
            </div>
          </div>

          <!-- Toggle Button -->
          <div
            class="w-full h-fit py-3 text-center border-t border-b border-[#1C1C1C] flex gap-2 items-center justify-center cursor-pointer"
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
              class="grid grid-cols-4 gap-6 items-start justify-end mt-4 mb-4 pb-4 border-b border-[#1C1C1C]">
              <div class="grid grid-cols-1 gap-3 text-md col-span-1">
                <p
                  class="text-end"
                  :class="{
                    'text-[#00BDA7]': item.sentiment === 'bullish',
                    'text-red-500': item.sentiment === 'bearish',
                    'text-gray-400': item.sentiment === 'neutral',
                  }">
                  {{ item.name }}
                </p>
              </div>
              <div
                class="text-md col-span-3"
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
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <UiCard class="px-2 py-2 col-span-2 max-h-[600px] overflow-hidden">
        <!-- Tabs -->
        <div class="flex mb-4">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            class="px-4 py-2 text-sm font-medium transition"
            :class="[
              activeTab === tab
                ? 'border-b-2 border-emerald-500 text-emerald-600'
                : 'text-gray-500 hover:text-gray-700',
            ]">
            {{ tab }}
          </button>
        </div>

        <!-- Tab Content -->
        <div v-if="activeTab === 'Upcoming Catalysts'">
          <div class="px-4 w-full max-h-[500px]">
            <div class="flex items-center gap-1 mb-2">
              <p>Upcoming Catalysts</p>
              <UiIcon icon="material-symbols:info-outline-rounded" />
            </div>

            <div class="flex gap-2 mb-2">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span class="text-[12px]">Low Impact</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span class="text-[12px]">Medium Impact</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-red-500"></div>
                <span class="text-[12px]">High Impact</span>
              </div>
            </div>

            <client-only>
              <CatalystList />
            </client-only>
          </div>
        </div>

        <div v-else-if="activeTab === 'Live News'">
          <div class="px-4 w-full max-h-[500px]">
            <div class="flex gap-2 items-center pb-2">
              <p>Live News</p>
              <span class="relative flex size-2">
                <span
                  class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-300 opacity-75"></span>
                <span
                  class="relative inline-flex size-2 rounded-full bg-red-500"></span>
              </span>
              <UiIcon icon="material-symbols:info-outline-rounded" />
            </div>

            <div class="flex gap-2 mb-4">
              <div class="w-fit max-w-28">
                <UiInput dark custom-class="h-7" placeholder="Search">
                  <template #icon-left>
                    <UiIcon
                      icon="ic:baseline-search"
                      custom-class="text-gray-300" />
                  </template>
                </UiInput>
              </div>
              <UiIcon icon="carbon:funnel-sort" />
            </div>

            <client-only>
              <NewsList />
            </client-only>
          </div>
        </div>
      </UiCard>
      <UiCard is-gradient class="border p-4">
        <div class="grid grid-cols-1 gap-2">
          <div>
            <div class="flex items-center gap-1">
              <p>AI Sentiment Index</p>
              <UiIcon icon="material-symbols:info-outline-rounded"></UiIcon>
            </div>
            <p class="text-gray-400 text-sm">
              {{ SentimentIndex.explanation }}
            </p>
          </div>

          <div class="h-96 flex flex-col items-center justify-center">
            <svg
              width="180"
              height="180"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              class="mb-2 mx-auto">
              <!-- background ring -->
              <path
                d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#323232"
                stroke-width="3.8"
                stroke-linecap="round" />

              <!-- progress ring -->
              <path
                d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10B981"
                stroke-width="3"
                stroke-linecap="round"
                :stroke-dasharray="`${SentimentIndex.percentage} 100`" />

              <!-- centered text -->
              <text
                x="18"
                y="11"
                text-anchor="middle"
                font-family="Inter, Arial, sans-serif">
                <tspan x="18.5" dy="1" font-size="2.8" fill="#10B981">
                  Index
                </tspan>
                <tspan
                  x="18"
                  dy="8"
                  font-size="8"
                  font-weight="700"
                  fill="#10B981">
                  {{ SentimentIndex.percentage }}
                </tspan>
                <tspan x="18.4" dy="3.4" font-size="2.5" fill="#6B7280">
                  Cautious Optimism
                </tspan>
              </text>
            </svg>
          </div>
        </div>
      </UiCard>
    </div>
  </div>
</template>
<script setup>
import { onMounted, watch, ref, nextTick } from "vue";
import UiCard from "~/components/UiCard.vue";
import NewsList from "@/components/NewsList.vue";
const { $api } = useNuxtApp();
definePageMeta({
  title: "Dashboard",
  layout: "layout",
  middleware: "auth",
});

const tabs = ["Live News", "Upcoming Catalysts"];
const activeTab = ref(tabs[0]);
const showKeyFactors = ref(false);
const selectedInterval = ref("15"); // minutes, e.g., "1", "5", "15", "60", "D"

const symbols = ref([]);
const selectedSymbol = ref(""); // initially empty
const contextualFactors = ref([]);
const CFsummary = ref("");
const CFexp = ref([]);
const SentimentIndex = ref({
  percentage: 0,
  explanation: "",
});

const tradingAnalysis = ref(null);
const isRequestingSignal = ref(false);

const intervalOptions = [
  { label: "1 Minute", value: "1" },
  { label: "5 Minutes", value: "5" },
  { label: "15 Minutes", value: "15" },
  { label: "1 Hour", value: "60" },
  { label: "Daily", value: "D" },
  { label: "Weekly", value: "W" },
  { label: "Monthly", value: "M" },
];

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

//Symbols fetching
const resCurrency = await $api.get(`api/contextual-factors/available-pairs`);
const pairs = resCurrency.data.data.currencyPairs || [];
symbols.value = pairs.map((pair) => {
  let label = pair;
  if (!pair.includes("/") && pair.length === 6) {
    label = pair.slice(0, 3) + "/" + pair.slice(3);
  }
  return { label, value: pair };
});
selectedSymbol.value = symbols.value[0]?.value || "";

// Fetch contextual factors
const fetchContextual = async () => {
  const resContextual = await $api.post(`api/contextual-factors/analyze`, {
    currencyPair: selectedSymbol.value,
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
};
fetchContextual();
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

const requestSignal = async () => {
  isRequestingSignal.value = true;
  try {
    // Map the selected interval to API format
    const apiTimeframe = intervalMap[selectedInterval] || "M15"; // fallback to H1

    const res = await $api.post(`api/ai/analyze-trading`, {
      symbol: selectedSymbol.value,
      timeframe: apiTimeframe,
    });

    const analysis = res.data.data || {};
    tradingAnalysis.value = {
      trend: analysis.analysis.trend,
      risk: analysis.analysis.riskLevel,
      entryLower: analysis.analysis.entryZone?.lower,
      entryUpper: analysis.analysis.entryZone?.upper,
      timeframe: analysis.timeframe,
      symbol: analysis.symbol,
    };
    isRequestingSignal.value = false;
  } catch (error) {
    console.error("Failed to analyze trading:", error);
    isRequestingSignal.value = false;
  }
};
let widget;
let scriptLoaded = false;

function loadTradingViewScript() {
  return new Promise((resolve) => {
    if (window.TradingView) {
      scriptLoaded = true;
      resolve();
    } else {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.onload = () => {
        scriptLoaded = true;
        resolve();
      };
      document.head.appendChild(script);
    }
  });
}

async function initWidgetSafe(symbol, interval) {
  if (!scriptLoaded) await loadTradingViewScript();

  // Only clear the container if the widget already exists
  if (widget) {
    widget.remove(); // safer than innerHTML
  }

  widget = new window.TradingView.widget({
    container_id: "tradingview-container",
    width: "100%",
    height: 500,
    symbol,
    hide_top_toolbar: true,
    interval,
    timezone: "Etc/UTC",
    theme: "dark",
    style: "1",
    locale: "en",
    toolbar_bg: "#f1f3f6",
    gridColor: "rgba(15,15,15,1)",
    allow_symbol_change: false,
    timeframes: [],
  });
}
const tickerContainer = ref(null);
const tickerSymbols = symbols?.value.map((s) => ({
  proName: `OANDA:${s.value}`,
  title: s.value,
}));

const loadTickerTape = () => {
  if (!tickerContainer.value) return;

  tickerContainer.value.innerHTML = "";

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
  script.async = true;

  const tickerSymbols = symbols.value.map((s) => ({
    proName: `OANDA:${s.value}`,
    title: s.label,
  }));

  script.innerHTML = JSON.stringify({
    symbols: tickerSymbols,
    showSymbolLogo: true,
    colorTheme: "dark",
    isTransparent: true,
    displayMode: "adaptive",
    locale: "en",
  });

  tickerContainer.value.appendChild(script);
};

onMounted(async () => {
  console.log('dashboard')

  if (process.client) {
    await nextTick();
    loadTickerTape();

    await loadTradingViewScript();
    initWidgetSafe(selectedSymbol.value, selectedInterval.value);
  }
});

// Watch the selected symbol and interval but **debounce it** to avoid multiple recreations
let updateTimeout;
watch([selectedSymbol, selectedInterval], ([symbol, interval]) => {
  clearTimeout(updateTimeout);
  updateTimeout = setTimeout(() => initWidgetSafe(symbol, interval), 300);
});
watch(selectedSymbol, (newVal) => {
  if (newVal) fetchContextual();
});
</script>

<style scoped>
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
