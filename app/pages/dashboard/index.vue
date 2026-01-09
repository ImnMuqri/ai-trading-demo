<template>
  <div class="text-white">
    <div
      class="flex flex-wrap items-center justify-between gap-2 py-2 px-1 w-full mb-2">
      <div class="flex items-center gap-2">
        <UiSelect
          v-model="selectedSymbol"
          :options="symbols"
          placeholder="Select Instrument"
          ref="symbolSelect"
          class="symbolSelect" />
        <UiSelect
          v-model="selectedInterval"
          :options="intervalOptions"
          placeholder="Select Timeframe"
          ref="intervalSelect"
          class="intervalSelect" />
      </div>
      <div
        @click="openAffiliatorModal = true"
        class="h-7 w-7 flex items-center justify-center bg-[#00BDA7]/50 border-[2px] border-[#00BDA7] rounded-full cursor-pointer">
        <UiIcon icon="ic:baseline-link"></UiIcon>
      </div>
    </div>
    <div class="flex flex-col-reverse lg:flex-row gap-6 lg:gap-4 w-full h-full">
      <!-- @set-analysis-data="analysisData = $event" -->
      <RequestSignal
        :symbol="selectedSymbol"
        :interval="selectedInterval"
        @open-analysis-modal="openDetailedAnalysis = true"
        ref="requestSignalRef" />
      <client-only class="w-full lg:h-[630px]">
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
              <NewsList ref="analysisRef" />
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
              width="220"
              height="300"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              class="mb-2 mx-auto">
              <!-- background ring -->
              <path
                d="M20 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#1C1C1C"
                stroke-width="6.5"
                stroke-linecap="round" />

              <!-- progress ring -->

              <path
                d="M20 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#8DADA2"
                stroke-width="3"
                stroke-linecap="round" />
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
                  font-size="7"
                  font-weight="700"
                  fill="#10B981">
                  {{ sentimentIndex.percentage }}
                </tspan>
                <tspan x="20.4" dy="3.4" font-size="2.2" fill="#6B7280">
                  Cautious Optimism
                </tspan>
              </text>
            </svg>
          </div>
        </div>
      </UiCard>
    </div>
    <UiModal
      :show="openAffiliatorModal"
      :isGradient="true"
      width="max-w-[400px]"
      @close="openAffiliatorModal = false">
      <template #body>
        <div class="flex flex-col text-center gap-4 w-full">
          <img src="assets/bg/LinkPic.svg" class="w-full h-[20vh]" />
          <div class="grid grid-cols-1 gap-2">
            <p
              class="text-2xl font-semibold bg-gradient-to-r from-[#00AAFF] to-[#00BDA7] bg-clip-text text-transparent">
              Iman Muqri
            </p>
            <p>Id: 66666</p>
          </div>
          <div class="flex flex-row gap-4 justify-evenly items-center">
            <div
              class="h-[2px] w-full bg-gradient-to-l from-[#838383] to-[#1D1D1D00]"></div>
            <p class="text-[12px] whitespace-nowrap">Affiliator's Link</p>
            <div
              class="h-[2px] w-full bg-gradient-to-r from-[#838383] to-[#1D1D1D00]"></div>
          </div>
          <div v-for="link in externalLinks.externalLinks">
            <div
              class="flex justify-between items-center py-2 px-4 bg-[#323232] rounded-lg text-left">
              <div>
                <a :href="link.url" target="_blank" class="w-full text-sm"
                  >{{ link.name }}
                </a>
                <p class="text-[11px]">{{ link.description }}</p>
              </div>
              <div
                class="flex items-center justify-center h-6 w-6 rounded-full bg-[#00AAFF]">
                <UiIcon
                  icon="solar:copy-bold"
                  custom-class="h-3 w-3  cursor-pointer"
                  :class="
                    copied ? 'text-[#00BDA7]' : 'text-white hover:text-white/80'
                  "
                  @click="copyLink" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </UiModal>
  </div>
</template>
<script setup>
import { onMounted, watch, ref, nextTick } from "vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const { $api } = useNuxtApp();
const { startTour } = useGuidedTour();

definePageMeta({
  title: "Dashboard",
  layout: "layout",
  middleware: "auth-client",
});

const openDetailedAnalysis = ref(false);
const openAffiliatorModal = ref(false);

const tabs = ["Live News", "Upcoming Catalysts"];
const activeTab = ref(tabs[0]);

const selectedInterval = ref("15"); // minutes, e.g., "1", "5", "15", "60", "D"

const symbols = ref([]);
const selectedSymbol = ref(""); // initially empty

const symbolSelect = ref(null);
const intervalSelect = ref(null);
const requestSignalRef = ref(null);
const analysisRef = ref(null);

const sentimentIndex = ref({
  percentage: 0,
  explanation: "",
});

const intervalOptions = [
  { label: "1 Minutes", value: "1" },
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

const fetchSymbols = async () => {
  try {
    const resCurrency = await $api.get(
      `api/contextual-factors/available-pairs`
    );
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
    console.error("[Dashboard] Error fetching symbols:", error);
  }
};

const externalLinks = ref([]);
const externalLinksLoading = ref(false);

const getExternalLinks = async () => {
  externalLinksLoading.value = true;

  try {
    const res = await $api.get("/api/affiliate/external-links");
    externalLinks.value = res.data?.data ?? [];
  } catch (error) {
    console.error("Failed to fetch external links", error);
    showToast(
      error.response?.data?.message || "Unable to fetch external links",
      "error"
    );
  } finally {
    externalLinksLoading.value = false;
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

const loadTickerTape = () => {
  if (!tickerContainer.value) return;

  tickerContainer.value.innerHTML = "";

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
  script.async = true;

  const excludedSymbols = [
    "USOIL",
    "UKOIL",
    "NATGAS",
    "SPX500",
    "NAS100",
    "DJI30",
  ];

  const tickerSymbols = symbols.value
    .filter((s) => !excludedSymbols.includes(s.value))
    .map((s) => ({
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

function waitForElement(getElFn, timeout = 3000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      const el = getElFn();
      if (el) {
        resolve(el);
      } else if (Date.now() - start > timeout) {
        reject(`Element not found after ${timeout}ms`);
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  });
}

onMounted(async () => {
  await nextTick();

  if (process.client) {
    await fetchSymbols();
    await getExternalLinks();
    await nextTick();
    loadTickerTape();
    await loadTradingViewScript();
    if (selectedSymbol.value) {
      initWidgetSafe(selectedSymbol.value, selectedInterval.value);
    }
  }

  startTour([
    {
      element: symbolSelect.value?.$el || symbolSelect.value,
      popover: {
        description:
          "Select symbol to generate market prediction based on the selected symbol",
      },
    },
    {
      element: intervalSelect.value?.$el || intervalSelect.value,
      popover: {
        description:
          "Select timeframe to generate market prediction based on desired time",
        side: "right",
      },
    },
    {
      element:
        requestSignalRef.value?.requestSignalButton?.$el ||
        requestSignalRef.value?.requestSignalButton,
      popover: {
        description:
          "View signal & insights here. \n Select the 'Request Signal' button to view detailed analysis of the symbol",
        side: "right",
      },
    },
    {
      element: await waitForElement(
        () => analysisRef.value?.getFirstAnalysisButton(),
        5000
      ),
      popover: {
        description:
          "Generate detail analysis \n Select the icon to generate detail analysis of the section",
      },
    },
  ]);
});

// Watch the selected symbol and interval but **debounce it** to avoid multiple recreations
let updateTimeout;

watch([selectedSymbol, selectedInterval], ([symbol, interval]) => {
  clearTimeout(updateTimeout);
  updateTimeout = setTimeout(() => initWidgetSafe(symbol, interval), 300);
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
