<template>
  <div class="max-h-[400px] overflow-y-auto grid gap-2 pr-2">
    <div v-for="(group, date) in groupedNews" :key="date">
      <!-- Date header -->
      <div class="flex items-center justify-between gap-2 pb-2">
        <p class="text-sm text-[#00BDA7] whitespace-nowrap">{{ date }}</p>
        <span
          class="block h-[1px] w-full bg-gradient-to-r from-[#737373] to-[#D9D9D900]"></span>
      </div>

      <!-- News items for this date -->
      <div
        v-for="(news, index) in group"
        :key="index"
        :class="[
          'px-4 py-3 rounded-lg transition mb-3',
          impactBorder(news.severity),
        ]">
        <div class="flex items-center justify-between">
          <span class="flex gap-2">
            <p class="text-[12px] text-gray-400">{{ news.country }}</p>
            <p class="text-[12px] text-gray-400">
              {{ formatTime(news.publishedAt) }}
            </p>
          </span>
          <div
            class="border-[2px] border-gray-500 rounded-full p-1 cursor-pointer">
            <UiIcon
              icon="meteor-icons:robot"
              custom-class="h-3 w-3 text-[#00BDA7]"></UiIcon>
          </div>
        </div>
        <h3 class="text-md font-medium text-white mb-1">{{ news.title }}</h3>
        <p
          :class="[
            'text-sm',
            news.severity === 'high'
              ? 'text-red-500'
              : news.severity === 'medium'
              ? 'text-yellow-500'
              : 'text-[#00BDA7]',
          ]">
          Possible Impact:
        </p>

        <p class="text-[11px] text-gray-400 mb-1">{{ news.impact }}</p>
      </div>
    </div>

    <div v-if="newsList.length === 0" class="p-4 text-gray-500">
      No news available.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Example news array
const newsList = ref([
  {
    title: "US GDP Growth Beats Expectations",
    impact:
      "US GDP growth influences USD strength and inflation expectations, directly affecting gold prices.",
    country: "US",
    severity: "high",
    publishedAt: "2025-10-07T08:30:00Z",
  },
  {
    title: "China Manufacturing PMI Falls Slightly",
    impact:
      "A slower PMI may signal softer economic growth, impacting commodity demand globally.",
    country: "China",
    severity: "medium",
    publishedAt: "2025-10-07T09:45:00Z",
  },
  {
    title: "Oil Supply Agreement Reached",
    impact:
      "OPEC+ agreement may stabilize oil prices, reducing volatility in energy markets.",
    country: "Global",
    severity: "low",
    publishedAt: "2025-10-06T14:00:00Z",
  },
]);

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
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
  return groups;
});

// Border color based on severity
function impactBorder(severity) {
  switch (severity) {
    case "low":
      return "border border-[#00BDA7]";
    case "medium":
      return "border border-yellow-500";
    case "high":
      return "border border-red-500";
    default:
      return "border border-[#1C1C1C]";
  }
}
</script>

<style scoped>
/* Scrollbar styling */
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
