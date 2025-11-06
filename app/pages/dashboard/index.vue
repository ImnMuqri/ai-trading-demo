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

    <div class="flex flex-wrap-reverse w-full gap-4">
      <UiCard
        is-gradient
        class="p-4 lg:h-[560px] w-full lg:w-[350px] rounded-lg"
        ><div class="flex gap-1 items-center">
          <p class="text-md">Signal & Insights</p>
          <UiIcon icon="material-symbols:info-outline-rounded"></UiIcon></div
      ></UiCard>
      <client-only>
        <UiCard class="border flex-1 p-4">
          <p class="font-semibold text-[#00BDA7] pb-2 text-lg">Market Trend</p>
          <div id="tradingview-container"></div>
        </UiCard>
      </client-only>
    </div>
    <div class="flex flex-wrap w-full gap-4 mt-4">
      <UiCard class="flex flex-col gap-2 border p-4 h-80 flex-1 h-[540px]">
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
          Gold is rising due to expected Fed rate cuts, geopolitical risks, and
          central banks diversifying from the dollar, but a stronger dollar and
          profit-taking may cause short-term dips.
        </p>
        <div class="grid grid-cols-1 gap-4 mt-2 flex-1 overflow-y-auto">
          <template>
            <div
              class="grid grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
              <!-- Meter 1 -->
              <div class="flex flex-col items-center">
                <svg width="100" height="100" viewBox="0 0 36 36" class="mb-2">
                  <path
                    class="text-gray-700/20"
                    stroke="currentColor"
                    stroke-width="3"
                    fill="none"
                    d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path
                    class="text-emerald-400"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-dasharray="65, 100"
                    stroke-linecap="round"
                    fill="none"
                    d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <text
                    x="18"
                    y="20.35"
                    class="text-sm fill-emerald-400 font-semibold"
                    text-anchor="middle">
                    65%
                  </text>
                </svg>
                <p class="text-sm text-gray-300">Performance</p>
              </div>

              <!-- Meter 2 -->
              <div class="flex flex-col items-center">
                <svg width="100" height="100" viewBox="0 0 36 36" class="mb-2">
                  <path
                    class="text-gray-700/20"
                    stroke="currentColor"
                    stroke-width="3"
                    fill="none"
                    d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path
                    class="text-yellow-400"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-dasharray="45, 100"
                    stroke-linecap="round"
                    fill="none"
                    d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <text
                    x="18"
                    y="20.35"
                    class="text-sm fill-yellow-400 font-semibold"
                    text-anchor="middle">
                    45%
                  </text>
                </svg>
                <p class="text-sm text-gray-300">Volatility</p>
              </div>

              <!-- Meter 3 -->
              <div class="flex flex-col items-center">
                <svg width="100" height="100" viewBox="0 0 36 36" class="mb-2">
                  <path
                    class="text-gray-700/20"
                    stroke="currentColor"
                    stroke-width="3"
                    fill="none"
                    d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path
                    class="text-sky-400"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-dasharray="80, 100"
                    stroke-linecap="round"
                    fill="none"
                    d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <text
                    x="18"
                    y="20.35"
                    class="text-sm fill-sky-400 font-semibold"
                    text-anchor="middle">
                    80%
                  </text>
                </svg>
                <p class="text-sm text-gray-300">Sentiment</p>
              </div>

              <!-- Meter 4 -->
              <div class="flex flex-col items-center">
                <svg width="100" height="100" viewBox="0 0 36 36" class="mb-2">
                  <path
                    class="text-gray-700/20"
                    stroke="currentColor"
                    stroke-width="3"
                    fill="none"
                    d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path
                    class="text-red-400"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-dasharray="25, 100"
                    stroke-linecap="round"
                    fill="none"
                    d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <text
                    x="18"
                    y="20.35"
                    class="text-sm fill-red-400 font-semibold"
                    text-anchor="middle">
                    25%
                  </text>
                </svg>
                <p class="text-sm text-gray-300">Risk Index</p>
              </div>
            </div>
          </template>

          <div class="w-full col-span-4">
            <p class="pb-4">Key Factor</p>
            <div
              v-for="item in keyFactors"
              :key="item.title"
              class="grid grid-cols-4 gap-6 items-start justify-end mb-4 pb-4 border-b border-[#1C1C1C]">
              <div class="grid grid-cols-1 gap-3 text-sm col-span-1">
                <p class="text-end">{{ item.title }}</p>
                <p
                  class="text-2xl text-end"
                  :class="{
                    'text-[#00BDA7]': item.sentiment === 'bullish',
                    'text-red-500': item.sentiment === 'bearish',
                    'text-gray-400': item.sentiment === 'neutral',
                  }">
                  {{ item.value }}
                </p>
              </div>
              <div
                class="text-sm col-span-3"
                :class="{
                  'text-[#00BDA7]': item.sentiment === 'bullish',
                  'text-red-500': item.sentiment === 'bearish',
                  'text-gray-400': item.sentiment === 'neutral',
                }">
                {{ item.description }}
              </div>
            </div>
          </div>
        </div></UiCard
      >
    </div>
    <div class="flex flex-wrap w-full gap-4 mt-4">
      <UiCard is-gradient class="px-2 py-2">
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
          <div class="p-4 h-[500px] w-full lg:w-[450px]">
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
          <div class="p-4 w-full lg:w-[450px] h-full">
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

      <UiCard class="border w-full p-4 flex-1">
        <div class="grid grid-cols-1 gap-2">
          <div class="flex items-center gap-1">
            <p>AI Sentiment Index</p>
            <UiIcon icon="material-symbols:info-outline-rounded"></UiIcon>
          </div>
          <p class="text-gray-400 text-sm">
            Markets show selective risk-taking with modest equity declines,
            sector rotation into energy and stable tech, amid mixed macro and
            geopolitical signals.
          </p>
        </div></UiCard
      >
    </div>
  </div>
</template>
<script setup>
import { onMounted, watch, ref, nextTick } from "vue";
import UiCard from "~/components/UiCard.vue";
import { useTradingViewSymbols } from "~/composables/useTradingViewSymbols";

definePageMeta({
  title: "Dashboard",
  layout: "layout",
  middleware: "auth",
});

const tabs = ["Live News", "Upcoming Catalysts"];
const activeTab = ref(tabs[0]);

const selectedInterval = ref("15"); // minutes, e.g., "1", "5", "15", "60", "D"

const { symbols } = useTradingViewSymbols();
const selectedSymbol = ref(symbols.value[0].value);

const intervalOptions = [
  { label: "1 Minute", value: "1" },
  { label: "5 Minutes", value: "5" },
  { label: "15 Minutes", value: "15" },
  { label: "1 Hour", value: "60" },
  { label: "Daily", value: "D" },
  { label: "Weekly", value: "W" },
  { label: "Monthly", value: "M" },
];

const keyFactors = [
  {
    title: "Fed rate cuts",
    value: "40%",
    description:
      "Expectations of additional Federal Reserve rate cuts this year, following the first cut and dovish signals, have boosted gold demand as lower rates reduce opportunity costs for holding non-yielding bullion.",
    sentiment: "bullish", // text-[#00BDA7]
  },
  {
    title: "Dollar strength rebound",
    value: "25%",
    description:
      "A rebound in the US dollar reduces the appeal of gold, putting short-term pressure on prices.",
    sentiment: "bearish", // text-red-500
  },
  {
    title: "Geopolitical tension",
    value: "35%",
    description:
      "Ongoing geopolitical risks support gold as a safe-haven asset, maintaining steady demand.",
    sentiment: "neutral", // text-gray-400
  },
];

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
    interval,
    timezone: "Etc/UTC",
    theme: "dark",
    style: "1",
    locale: "en",
    toolbar_bg: "#f1f3f6",
    allow_symbol_change: false,
    timeframes: [],
  });
}

onMounted(() => {
  if (process.client) {
    initWidgetSafe(selectedSymbol.value, selectedInterval.value);
  }
});

// Watch the selected symbol and interval but **debounce it** to avoid multiple recreations
let updateTimeout;
watch([selectedSymbol, selectedInterval], ([symbol, interval]) => {
  clearTimeout(updateTimeout);
  updateTimeout = setTimeout(() => initWidgetSafe(symbol, interval), 300);
});
</script>

<style scoped></style>
