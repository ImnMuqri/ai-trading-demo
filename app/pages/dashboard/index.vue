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
          <UiButton @click="refreshTokenManually" 
          >
          Refresh Token
        </UiButton>

      </div>
    </div>
    <div class="flex flex-col-reverse lg:flex-row gap-6 lg:gap-4 w-full h-full">
      <!-- @set-analysis-data="analysisData = $event" -->
      <RequestSignal
        :symbol="selectedSymbol"
        :interval="selectedInterval"
        @open-analysis-modal="openDetailedAnalysis = true" />
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
      <ContextualFactors
        :selectedSymbol="selectedSymbol"
        @sentimentIndex="SentimentIndex" />
    </div>
    <div class="flex flex-col lg:flex-row gap-4 mt-4">
      <UiCard class="px-2 py-2 max-h-[600px] w-full overflow-hidden">
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
          <div class="px-4 w-full max-h-[600px]">
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
          <div class="px-4 w-full max-h-[600px]">
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
      <UiCard is-gradient class="border p-4 w-full lg:w-[40%]">
        <div class="grid grid-cols-1 gap-2">
          <div>
            <div class="flex items-center gap-1">
              <p>AI Sentiment Index</p>
              <UiIcon icon="material-symbols:info-outline-rounded"></UiIcon>
            </div>
            <p class="text-gray-400 text-sm">
              {{ sentimentIndex.explanation }}
            </p>
          </div>

          <div class="h-[450px] flex flex-col items-center justify-center">
            <svg
              width="200"
              height="200"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              class="mb-2 mx-auto">
              <!-- background ring -->
              <path
                d="M20 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#323232"
                stroke-width="3.8"
                stroke-linecap="round" />

              <!-- progress ring -->
              <path
                d="M20 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10B981"
                stroke-width="3"
                stroke-linecap="round"
                :stroke-dasharray="`${sentimentIndex.percentage} 100`" />

              <!-- centered text -->
              <text
                x="20"
                y="11"
                text-anchor="middle"
                font-family="Inter, Arial, sans-serif">
                <tspan x="20.5" dy="1" font-size="2.8" fill="#10B981">
                  Index
                </tspan>
                <tspan
                  x="20"
                  dy="8"
                  font-size="8"
                  font-weight="700"
                  fill="#10B981">
                  {{ sentimentIndex.percentage }}
                </tspan>
                <tspan x="20.4" dy="3.4" font-size="2.5" fill="#6B7280">
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
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const { $api } = useNuxtApp();
definePageMeta({
  title: "Dashboard",
  layout: "layout",
  middleware: "auth-client",
});

const openDetailedAnalysis = ref(false);

const tabs = ["Live News", "Upcoming Catalysts"];
const activeTab = ref(tabs[0]);

const selectedInterval = ref("15"); // minutes, e.g., "1", "5", "15", "60", "D"

const symbols = ref([]);
const selectedSymbol = ref(""); // initially empty

const sentimentIndex = ref({
  percentage: 0,
  explanation: "",
});

const intervalOptions = [
  { label: "1 Minute", value: "1" },
  { label: "5 Minutes", value: "5" },
  { label: "15 Minutes", value: "15" },
  { label: "1 Hour", value: "60" },
  { label: "Daily", value: "D" },
  { label: "Weekly", value: "W" },
  { label: "Monthly", value: "M" },
];

const SentimentIndex = (value) => {
  sentimentIndex.value = value;
};

//Symbols fetching
// const resCurrency = await $api.get(`api/contextual-factors/available-pairs`);
// const pairs = resCurrency.data.data.currencyPairs || [];
// symbols.value = pairs.map((pair) => {
//   let label = pair;
//   if (!pair.includes("/") && pair.length === 6) {
//     label = pair.slice(0, 3) + "/" + pair.slice(3);
//   }
//   return { label, value: pair };
// });
// selectedSymbol.value = symbols.value[0]?.value || "";

const fetchSymbols = async () => {
  try {
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
  } catch (error) {
    console.error('[Dashboard] Error fetching symbols:', error);
  }
}

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


async function refreshTokenManually() {
  try {
    const success = await auth.refreshTokens();
    if (success) {
      console.log("Token refreshed manually");
    } else {
      console.log("Failed to refresh token manually");
    }
  } catch (error) {
    console.error("Error refreshing token manually:", error);
  }
}



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

// onMounted(async () => {
//   if (process.client) {
//     await nextTick();
//     loadTickerTape();

//     await loadTradingViewScript();
//     initWidgetSafe(selectedSymbol.value, selectedInterval.value);
//   }
// });

onMounted(async () => {
  if (process.client) {
    await fetchSymbols();
    
    await nextTick();
    loadTickerTape();

    await loadTradingViewScript();
    if (selectedSymbol.value) {
      initWidgetSafe(selectedSymbol.value, selectedInterval.value);
    }
  }
});

// Watch the selected symbol and interval but **debounce it** to avoid multiple recreations
let updateTimeout;

watch([selectedSymbol, selectedInterval], ([symbol, interval]) => {
  clearTimeout(updateTimeout);
  updateTimeout = setTimeout(() => initWidgetSafe(symbol, interval), 300);
});
watch(selectedSymbol, (newVal) => {
  if (newVal) fetchSymbols();
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
