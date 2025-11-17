<template>
  <div>
    <div class="max-h-[400px] overflow-y-auto grid gap-2 pr-2">
      <div v-for="(group, date) in groupedNews" :key="date">
        <div class="flex items-center justify-between gap-2 pb-2">
          <p class="text-sm text-[#00BDA7] whitespace-nowrap">{{ date }}</p>
          <span
            class="block h-[1px] w-full bg-gradient-to-r from-[#737373] to-[#D9D9D900]"></span>
        </div>
        <!-- News items for this date -->
        <div
          v-for="(news, index) in group"
          :key="index"
          class="px-4 pt-4 pb-2 mb-2  rounded-lg border border-[#1C1C1C] bg-[#0D0D0D] transition">
          <a
            :href="news.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex flex-row gap-6 items-center mb-2">
            <!-- Show image if available -->
            <img
              v-if="news.image"
              :src="news.image"
              alt="news image"
              :class="[
                'h-auto rounded-md mb-2 col-span-1',
                index === 0 ? 'w-[350px]' : 'w-[200px]',
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
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const { $api } = useNuxtApp();

// Dynamic currency and date (can be made reactive if needed)
const currency = ref("EUR-USD");
const dateFilter = ref("2025-11-16");

const newsList = ref([]);

// Fetch data from API
// `api/forex-news?currency=${currency.value}&date=${dateFilter.value}`
const res = await $api.get(`api/forex-news`);
const apiData = res.data.data || []; // fallback to empty array
newsList.value = apiData.map((item) => ({
  publishedAt: item.date,
  title: item.title,
  text: item.text,
  url: item.news_url,
  source: item.source_name,
  tag: item.sentiment,
  topics: item.topics,
  image: item.image_url,
}));

// Group news by date and sort descending
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

  // Sort each group by publishedAt descending
  Object.keys(groups).forEach((key) => {
    groups[key].sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );
  });

  // Sort the date groups descending
  return Object.fromEntries(
    Object.entries(groups).sort(
      ([dateA], [dateB]) =>
        new Date(dateB).getTime() - new Date(dateA).getTime()
    )
  );
});

// Format time for display
function formatTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}
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
