<template>
  <div>
    <div class="max-h-[400px] overflow-y-auto grid gap-2 pr-2 mb-4">
      <div v-if="!isLoading" v-for="(group, date) in groupedNews" :key="date">
        <div class="flex items-center justify-between gap-2 pb-2">
          <p class="text-sm text-[#00BDA7] whitespace-nowrap">{{ date }}</p>
          <span
            class="block h-[1px] w-full bg-gradient-to-r from-[#737373] to-[#D9D9D900]"></span>
        </div>
        <!-- News items for this date -->
        <div
          v-for="(news, index) in group"
          :key="index"
          class="px-4 pt-4 pb-2 mb-2 rounded-lg border border-[#1C1C1C] bg-[#0D0D0D] transition">
          <a
            :href="news.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex flex-col lg:flex-row gap-6 items-center mb-2">
            <!-- Show image if available -->
            <img
              v-if="news.image"
              :src="news.image"
              alt="news image"
              :class="[
                'h-auto rounded-md mb-2 col-span-1',
                index === 0 ? 'w-full lg:w-[350px]' : 'w-full lg:w-[200px]',
              ]" />
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
              <p class="text-[11px] bg-gray-700 px-3 py-1 w-fit rounded-full">
                {{ news.tag }}
              </p>
            </div>
          </a>

          <div
            class="flex gap-[1px] items-center justify-end text-gray-500 border-t border-[#1C1C1C] pt-1">
            <div
              @click="newAnalysis(news.id)"
              class="flex gap-1 items-center cursor-pointer">
              <UiIcon
                icon="icon:ai-icon"
                custom-class="h-10 w-10 text-[#00BDA7]"></UiIcon>

              <span class="flex gap-1 text-sm"
                >See analysis
                <UiIcon
                  icon="ic:round-chevron-right"
                  custom-class="w-4 h-4 text-[#00BDA7]"></UiIcon
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
                :class="n === 1 ? 'w-[350px] h-24' : 'w-[200px] h-20'"></div>

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
              class="border-t border-gray-700 pt-2 flex items-center justify-end gap-3">
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
          custom-class="text-[#00BDA7]"></UiIcon>
        View Market History
      </div>
      <div class="flex items-center">
        <UiIcon
          icon="ic:round-chevron-right"
          custom-class="w-4 h-4 text-[#00BDA7]"></UiIcon>
        View Recent Headline
      </div>
    </div>
    <UiModal v-model="openAnalysisModal" title="AI Analysis">
      <div class="p-4">
        <p class="text-gray-400">Loading analysis...</p>
      </div>
    </UiModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
const { $api } = useNuxtApp();

const currency = ref("EUR USD");
const dateFilter = ref("2025 11 16");

const isLoading = ref(false);
const openAnalysisModal = ref(false);
const newsList = ref([]);

// Fetch news with arrow function
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
const newAnalysis = async (economicCalendarId) => {
  openAnalysisModal.value = true;
  try {
    const response = await $api.post("api/economic-calendar-predictions", {
      economicCalendarId,
    });
    const raw = response.data.data || [];
    console.log("Analysis data:", raw);
  } catch (error) {
    console.error("Failed to load news", error);
  } finally {
    openAnalysisModal.value = false;
  }
};

// Run fetch on mount
onMounted(() => {
  fetchNews();
});

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
</style>
