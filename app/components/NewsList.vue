<template>
  <div>
    <div class="max-h-[400px] overflow-y-auto grid gap-2 pr-2 mb-4">
      <div v-if="!isLoading" v-for="(group, date) in groupedNews" :key="date">
        <div class="flex items-center justify-between gap-2 pb-2">
          <p class="text-sm text-[#00BDA7] whitespace-nowrap">{{ date }}</p>
          <span
            class="block h-[1px] w-full bg-gradient-to-r from-[#737373] to-[#D9D9D900]"
          ></span>
        </div>
        <!-- News items for this date -->
        <div
          v-for="(news, index) in group"
          :key="index"
          class="px-4 pt-4 pb-2 mb-4 mt-2 rounded-lg bg-[#0D0D0D] transition"
          :class="impactBorder(news.tag)"
        >
          <a
            :href="news.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex flex-col md:flex-row gap-6 items-center mb-4"
          >
            <!-- Show image if available -->
            <img
              v-if="news.image"
              :src="news.image"
              alt="news image"
              :class="[
                'h-auto rounded-md mb-2 col-span-1',
                index === 0 ? 'w-full md:w-[20vw]' : 'w-full md:w-[10vw]',
              ]"
            />
            <div class="grid grid-cols-1 gap-2">
              <p class="text-[12px] text-gray-500 capitalize">
                {{ formatTime(news.publishedAt) }}
              </p>

              <h3 class="text-sm font-medium text-white">
                {{ news.title }}
              </h3>
              <p class="text-[12px] text-gray-400 text-left mb-3">
                {{ news.source }}
              </p>
              <p
                class="text-[11px] px-3 py-1 w-fit rounded-full"
                :class="[
                  news.tag == 'Positive'
                    ? 'bg-[#00BDA7]'
                    : news.tag == 'Negative'
                    ? 'bg-red-500'
                    : 'bg-gray-500',
                ]"
              >
                {{ news.tag }}
              </p>
            </div>
          </a>
          <div
            class="overflow-hidden transition-[max-height] duration-300 ease-in"
            :style="{ maxHeight: openAnalysis === news.id ? '1000px' : '0px' }"
          >
            <!-- Loading state -->
            <div
              class="flex items-center justify-center bg-[#1C1C1C] text-sm rounded-md mt-2 py-2"
              v-show="isAnalysing"
            >
              <iframe
                src="https://lottie.host/embed/421ff970-c655-4968-8fe0-06c734cea089/6aVQU0cIOG.lottie"
                class="border-0 !w-16 !h-14"
              >
              </iframe>
              <p
                class="text-[11px] font-semibold inline-block text-gray-400 shimmer-text"
              >
                Generating Ai Analysis
              </p>
            </div>
            <!-- Analysis content -->
            <div
              v-if="analysisData"
              v-show="!isAnalysing"
              class="bg-[#1C1C1C] text-sm rounded-md mt-2"
            >
              <div
                class="flex items-center px-2 py-2 border-b border-[#2A2A2A] gap-2"
              >
                <UiIcon
                  icon="icon:ai-icon"
                  custom-class="h-9 w-8 text-[#00BDA7]"
                ></UiIcon>
                AI Analysis
              </div>
              <div class="flex flex-col gap-2 p-4 text-[12px] text-gray-300">
                <div>
                  <p class="font-semibold">Analysis</p>
                  <p>{{ analysisData.analysis?.analysis }}</p>
                </div>
                <div>
                  <p class="font-semibold">Summary</p>
                  <p>{{ analysisData.analysis?.summary }}</p>
                </div>
                <div>
                  <p class="font-semibold">Trading Signal</p>
                  <p>{{ analysisData.analysis?.tradingSignal }}</p>
                </div>
                <div class="flex gap-2 py-2">
                  <UiChip
                    :custom-class="[
                      'px-3 py-1 text-xs border rounded-full',
                      analysisData.analysis.sentiment === 'Positive'
                        ? 'bg-[#00BDA7]/15 text-[#00BDA7] border-[#00BDA7]'
                        : analysisData.analysis.sentiment === 'Negative'
                        ? 'bg-red-500/15 text-red-500 border-red-500'
                        : 'bg-gray-500/15 text-gray-400 border-gray-600',
                    ]"
                  >
                    {{ analysisData.analysis?.sentiment }}
                  </UiChip>

                  <UiChip
                    :custom-class="[
                      'px-3 py-1 text-xs border rounded-full',
                      analysisData.analysis.impact === 'Low'
                        ? 'bg-[#00BDA7]/15 text-[#00BDA7] border-[#00BDA7]'
                        : analysisData.analysis.impact === 'High'
                        ? 'bg-red-500/15 text-red-500 border-red-500'
                        : 'bg-gray-500/15 text-gray-400 border-gray-600',
                    ]"
                  >
                    {{ analysisData.analysis.impact }}
                  </UiChip>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex gap-[1px] items-center justify-end text-gray-500 border-t border-[#1C1C1C] pt-1"
          >
            <div
              v-if="openAnalysis === news.id"
              @click="closeAnalysis()"
              class="flex gap-1 items-center cursor-pointer"
            >
              <UiIcon
                icon="icon:ai-icon"
                custom-class="h-9 w-8 text-[#00BDA7]"
              ></UiIcon>

              <span class="flex gap-1 text-[12px]"
                >Hide analysis
                <UiIcon
                  icon="ic:round-chevron-right"
                  custom-class="w-4 h-4 text-[#00BDA7]"
                ></UiIcon
              ></span>
            </div>
            <div
              v-else
              @click="newAnalysis(news.id)"
              class="flex gap-1 items-center cursor-pointer"
              :ref="(el) => setAnalysisButton(el, news.id)"
            >
              <UiIcon
                icon="icon:ai-icon"
                custom-class="h-9 w-8 text-[#00BDA7]"
              ></UiIcon>

              <span class="flex gap-1 text-[12px]"
                >See analysis
                <UiIcon
                  icon="ic:round-chevron-right"
                  custom-class="w-4 h-4 text-[#00BDA7]"
                ></UiIcon
              ></span>
            </div>
          </div>
        </div>
      </div>
      <!-- Shimmer when loading -->
      <div v-if="isLoading">
        <div v-for="n in 3" :key="n" class="mb-4">
          <!-- Date header shimmer -->
          <div class="flex items-center justify-between gap-2 pb-2">
            <p class="h-4 w-20 bg-gray-700 rounded animate-pulse"></p>
            <span class="block h-px w-full bg-gray-800"></span>
          </div>

          <!-- Shimmer news card -->
          <div class="px-4 pt-4 pb-3 mb-3 rounded-lg bg-gray-800 animate-pulse">
            <div class="flex flex-row gap-6 items-center mb-3">
              <!-- Image shimmer -->
              <div
                class="rounded-md bg-gray-700"
                :class="n === 1 ? 'w-[350px] h-24' : 'w-[200px] h-20'"
              ></div>

              <!-- Text shimmer -->
              <div class="grid grid-cols-1 gap-2 flex-1">
                <div class="h-3 w-16 bg-gray-600 rounded"></div>
                <div class="h-4 w-40 bg-gray-700 rounded"></div>
                <div class="h-3 w-24 bg-gray-600 rounded"></div>
                <div class="h-4 w-20 bg-gray-700 rounded mt-1"></div>
              </div>
            </div>

            <!-- Footer shimmer -->
            <div
              class="border-t border-gray-700 pt-2 flex items-center justify-end gap-3"
            >
              <div class="h-10 w-10 bg-gray-700 rounded-full"></div>
              <div class="h-4 w-24 bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="newsList.length === 0" class="p-4 text-gray-500">
        No news available.
      </div>
    </div>

    <div class="flex text-[12px] gap-4 items-center justify-center mt-3">
      <div class="flex gap-1 items-center">
        <UiIcon
          icon="healthicons:chart-line-24px"
          custom-class="text-[#00BDA7]"
        ></UiIcon>
        View Market History
      </div>
      <div class="flex items-center">
        <UiIcon
          icon="ic:round-chevron-right"
          custom-class="w-4 h-4 text-[#00BDA7]"
        ></UiIcon>
        View Recent Headline
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
const { $api } = useNuxtApp();

const isLoading = ref(false);
const isAnalysing = ref(false);
const analysisData = ref(null);
const openAnalysis = ref(false);
const newsList = ref([]);

const analysisButtons = ref([]);

const setAnalysisButton = (el, id) => {
  if (el) {
    analysisButtons.value.push({ id, el });
  }
};

const getFirstAnalysisButton = () => {
  return analysisButtons.value.length ? analysisButtons.value[0].el : null;
};

defineExpose({
  getFirstAnalysisButton,
});

// Format time
const formatTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const difference = now - date;
  const minutes = Math.floor(difference / 60000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;

  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Fetch news
const fetchNews = async () => {
  isLoading.value = true;

  try {
    const response = await $api.get("api/forex-news");
    const raw = response.data.data || [];

    newsList.value = raw.map((item) => ({
      id: item.id,
      publishedAt: item.date,
      title: item.title,
      text: item.text,
      url: item.news_url,
      source: item.source_name,
      tag: item.sentiment,
      topics: item.topics,
      image: item.image_url,
    }));
  } catch (error) {
    console.error("Failed to load news", error);
  } finally {
    isLoading.value = false;
  }
};
const newAnalysis = async (newsId) => {
  openAnalysis.value = newsId;
  isAnalysing.value = true;

  const minLoadingTime = 4000;
  const startTime = Date.now();

  try {
    const response = await $api.post("/api/ai/analyze-news", { newsId });
    const raw = response.data.data || [];
    analysisData.value = raw;
  } catch (error) {
    console.error("Analyze news route failed", error);
  } finally {
    const elapsed = Date.now() - startTime;
    const remaining = minLoadingTime - elapsed;

    if (remaining > 0) {
      await new Promise((resolve) => setTimeout(resolve, remaining));
    }

    // Only set isAnalysing = false if the same news is still open
    if (openAnalysis.value === newsId) {
      isAnalysing.value = false;
    }
  }
};

const closeAnalysis = () => {
  openAnalysis.value = false;
  analysisData.value = null;
  isAnalysing.value = false;
};

// Group news by date
const groupedNews = computed(() => {
  const groups = {};

  newsList.value.forEach((news) => {
    const dateKey = new Date(news.publishedAt).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(news);
  });

  Object.keys(groups).forEach((key) => {
    groups[key].sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );
  });

  return Object.fromEntries(
    Object.entries(groups).sort(
      ([dateA], [dateB]) => new Date(dateB) - new Date(dateA)
    )
  );
});
// Border colors based on severity
const impactBorder = (severity) => {
  if (severity === "Negative") return "border-[2px] border-red-500/50";
  if (severity === "Neutral") return "border-[2px] border-gray-500/50";
  if (severity === "Positive") return "border-[2px] border-[#00BDA7]/50  ";
  return "border border-[#1C1C1C]";
};
// Run fetch on mount
onMounted(() => {
  fetchNews();
});
</script>

<style scoped>
/* Scrollbar styles */
div::-webkit-scrollbar {
  width: 8px;
}
div::-webkit-scrollbar-track {
  background: #2a2a2a;
  border-radius: 4px;
}
div::-webkit-scrollbar-thumb {
  background-color: #00bda7;
  border-radius: 4px;
  border: 2px solid #2a2a2a;
}
div::-webkit-scrollbar-thumb:hover {
  background-color: #00e0c0;
}

.shimmer-text {
  background: linear-gradient(90deg, #bbb 20%, #fff 50%, #bbb 90%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer-text 2s infinite linear;
}

@keyframes shimmer-text {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
