<template>
  <div class="max-h-[500px] overflow-y-auto grid gap-2 pr-2">
    <div v-if="!isLoading" v-for="(group, date) in groupedNews" :key="date">
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
    <!-- Shimmer when loading -->
    <div v-if="isLoading">
      <div v-for="n in 3" :key="n" class="mb-3">
        <!-- Date header shimmer -->
        <div class="flex items-center justify-between gap-2 pb-2">
          <p class="h-4 w-20 bg-gray-700 rounded animate-pulse"></p>
          <span class="block h-[1px] w-full bg-gray-800"></span>
        </div>

        <!-- Shimmer news card -->
        <div class="px-4 py-3 rounded-lg mb-3 bg-gray-800 animate-pulse">
          <div class="flex items-center justify-between mb-2">
            <span class="flex gap-2">
              <div class="h-3 w-10 bg-gray-600 rounded"></div>
              <div class="h-3 w-12 bg-gray-600 rounded"></div>
            </span>
            <div class="h-5 w-5 bg-gray-700 rounded-full"></div>
          </div>

          <div class="h-4 w-40 bg-gray-600 rounded mb-2"></div>
          <div class="h-3 w-24 bg-gray-700 rounded mb-1"></div>
          <div class="h-3 w-48 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>

    <div v-if="newsList.length === 0" class="p-4 text-gray-500">
      No news available.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
const { $api } = useNuxtApp();

const newsList = ref([]);
const isLoading = ref(false);

// Map backend impact level into readable values
const mapSeverity = (level) => {
  if (level === "1") return "high";
  if (level === "2") return "medium";
  return "low";
};

// Fetch catalyst data
const fetchNews = async () => {
  isLoading.value = true;

  try {
    const res = await $api.get("api/economic-calendar");
    const raw = res.data.data || [];

    newsList.value = raw.map((item) => ({
      country: item.country,
      title: item.translated_name || item.report_name || "Untitled",
      publishedAt: item.event_datetime,
      severity: mapSeverity(item.impact_level),
      impact:
        item.definition || item.short_definition || "No details available",
    }));
  } catch (error) {
    console.error("Failed to load catalyst data", error);
  } finally {
    isLoading.value = false;
  }
};

// Auto run fetch on mount
onMounted(() => {
  fetchNews();
});

// Format to readable time
const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Group catalysts by date and sort them
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

  // Sort date groups from latest to oldest
  return Object.fromEntries(
    Object.entries(groups).sort(([a], [b]) => new Date(b) - new Date(a))
  );
});

// Border colors based on severity
const impactBorder = (severity) => {
  if (severity === "high") return "border border-red-500";
  if (severity === "medium") return "border border-yellow-500";
  if (severity === "low") return "border border-[#00BDA7]";
  return "border border-[#1C1C1C]";
};
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
