<template>
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
        class="px-4 py-3 mb-2 rounded-lg border border-[#1C1C1C] bg-[#0D0D0D] transition">
        <a
          :href="news.url"
          target="_blank"
          rel="noopener noreferrer"
          class="grid grid-cols-1 gap-1">
          <p class="text-[12px] text-gray-500 capitalize">
            {{ formatTime(news.publishedAt) }}
          </p>
          <h3 class="text-sm font-medium text-white mb-2">
            {{ news.title }}
          </h3>
          <p class="text-[11px] bg-gray-700 px-3 py-1 w-fit rounded-full">
            {{ news.tag }}
          </p>
          <p class="text-[12px] text-gray-400 text-end">
            {{ news.source }}
          </p>
        </a>
        <div
          class="flex gap-3 items-center justify-center mt-2 text-gray-500 border-t border-[#1C1C1C] pt-2">
          <div
            class="border-[2px] border-gray-500 rounded-full p-1 cursor-pointer">
            <UiIcon
              icon="meteor-icons:robot"
              custom-class="h-3 w-3 text-[#00BDA7]"></UiIcon>
          </div>
          <UiIcon
            icon="ri:heart-line"
            custom-class="w-6 h-6 cursor-pointer"></UiIcon>
        </div>
      </div>
    </div>

    <div v-if="newsList.length === 0" class="p-4 text-gray-500">
      No news available.
    </div>
  </div>
  <div class="flex text-[12px] gap-4 items-center justify-center mt-3">
    <div class="flex gap-1 item-center">
      <UiIcon
        icon="healthicons:chart-line-24px"
        custom-class="text-[#00BDA7]"></UiIcon
      >View Market History
    </div>
    <div class="flex items-center">
      <UiIcon
        icon="ic:round-chevron-right"
        custom-class="w-4 h-4 text-[#00BDA7]"></UiIcon
      >View Recent Headline
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Example static news array
const newsList = ref([
  {
    title: "US Tariffs on China to Increase Next Month",
    source: "Reuters",
    url: "https://www.reuters.com/article/us-usa-tariffs-idUSKBN1",
    tag: "Tariff",
    publishedAt: "2025-10-06T12:15:00Z",
  },
  {
    title: "Dow Jones Hits Record High Amid Tech Rally",
    source: "Bloomberg",
    url: "https://www.bloomberg.com/news/articles/dow-record",
    tag: "US Stock",
    publishedAt: "2025-10-07T11:50:00Z",
  },
  {
    title: "Federal Reserve Signals Rate Cut",
    source: "CNBC",
    url: "https://www.cnbc.com/fed-rate-cut-news",
    tag: "US Politics",
    publishedAt: "2025-10-07T11:30:00Z",
  },
  {
    title: "Oil Prices Surge on Middle East Tensions",
    source: "Financial Times",
    url: "https://www.ft.com/oil-prices-middle-east",
    tag: "Commodities",
    publishedAt: "2025-10-07T10:45:00Z",
  },
  {
    title: "Gold Gains on Global Economic Uncertainty",
    source: "Kitco",
    url: "https://www.kitco.com/gold-news",
    tag: "Metals",
    publishedAt: "2025-10-07T10:20:00Z",
  },
]);

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
  return groups;
});

// Format time for each news item
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
/* Scrollbar track (the background of the scrollbar) */
div::-webkit-scrollbar {
  width: 8px; /* scrollbar width */
} /* Track */
div::-webkit-scrollbar-track {
  background: #2a2a2a; /* container color behind scrollbar */
  border-radius: 4px;
} /* Handle (the draggable part) */
div::-webkit-scrollbar-thumb {
  background-color: #00bda7; /* scrollbar color */
  border-radius: 4px;
  border: 2px solid #2a2a2a; /* space around thumb */
} /* Optional: Hover effect for scrollbar thumb */
div::-webkit-scrollbar-thumb:hover {
  background-color: #00e0c0;
}
</style>
