<template>
  <div class="grid grid-cols-1 gap-4 text-white">
    <h1>Current Subscription</h1>

    <!-- Current subscription info -->
    <div
      class="flex flex-col lg:flex-row justify-around p-4 border border-[#00BDA7] rounded-md"
    >
      <div class="text-lg">
        {{ currentPlan.name }}
        <p class="text-[12px] text-gray-400">Current plan</p>
      </div>
      <div class="text-lg">
        {{ currentPlan.storageUsed }}
        <p class="text-[12px] text-gray-400">Storage Used</p>
      </div>
      <div class="text-lg">
        {{ currentPlan.requestRemaining }}
        <p class="text-[12px] text-gray-400">Request Remaining</p>
      </div>
      <div class="text-lg">
        {{ currentPlan.nextBilling }}
        <p class="text-[12px] text-gray-400">Next Billing Date</p>
      </div>
    </div>

    <!-- Subscription plans -->
    <div class="flex flex-col xl:flex-row gap-4">
      <div
        v-for="plan in subscriptionPlans"
        :key="plan.id"
        class="flex flex-col items-center gap-4 h-[400px] p-6 border border-[#2D2D2D] rounded-md overflow-hidden"
      >
        <div class="flex flex-col gap-1 px-16 pb-2 w-fit items-center">
          <UiIcon icon="lucide:coffee" custom-class="w-8 h-8"></UiIcon>
          <p class="text-lg text-center py-2">{{ plan.name }}</p>
          <p class="text-[12px] text-gray-400 text-center">
            {{ plan.description }}
          </p>
        </div>
        <div class="h-fit w-full flex flex-col gap-2">
          <p class="text-md">Request Limit: {{ plan.requestLimit }}</p>
          <p class="text-md">{{ plan.currency }} {{ plan.price }}</p>
        </div>
        <div class="h-full w-full flex flex-col justify-between">
          <div class="grid grid-cols-1 gap-4 text-left text-sm text-gray-400">
            <p v-for="feature in plan.features" :key="feature">{{ feature }}</p>
          </div>
          <UiButton
            v-if="plan.isActive"
            isDisabled
            variant="outline"
            class="w-full"
            >Current Plan</UiButton
          >
          <UiButton v-else class="w-full">Get Started</UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

definePageMeta({
  title: "Subscriptions",
  layout: "layout",
  // middleware: "auth",
  middleware: "auth-client",
});

const { $api } = useNuxtApp();
const subscriptionPlans = ref([]);
const currentPlan = ref({
  name: "Basic Plan",
  storageUsed: 192,
  requestRemaining: 32,
  nextBilling: "Sept 24, 2025",
});

const fetchPlans = async () => {
  try {
    const res = await $api.get("/api/subscription/plans");
    if (res.data.success && res.data.data.subscriptionPlans) {
      subscriptionPlans.value = res.data.data.subscriptionPlans.map((plan) => ({
        id: plan.id,
        name: plan.name,
        description: plan.description,
        requestLimit: plan.requestLimit || 0,
        price: plan.price || 0,
        currency: plan.currency || "No Data",
        features: plan.features || [],
        isActive: plan.isActive || false,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch subscription plans:", error);
  }
};

onMounted(() => {
  fetchPlans();
});
</script>

<style scoped></style>
