<template>
  <div class="grid grid-cols-1 gap-4 text-white">
    <h1>Current Subscription</h1>

    <!-- Current subscription info -->
    <div
      v-if="isPlansLoading"
      class="flex flex-wrap text-center items-center justify-center gap-4 p-4 border border-[#00BDA7] rounded-md animate-pulse"
    >
      <div
        v-for="n in 4"
        :key="n"
        class="flex-1 min-w-[120px] flex flex-col gap-2"
      >
        <div class="h-5 bg-gray-700 rounded w-1/4 mx-auto"></div>
        <div class="h-4 bg-gray-700 rounded w-2/4 mx-auto"></div>
      </div>
    </div>

    <div
      v-else
      class="flex flex-wrap text-center items-center justify-center gap-4 p-4 border border-[#00BDA7] rounded-md"
    >
      <div class="flex-1 min-w-[120px]">
        <p class="text-lg">{{ currentPlan.name ?? "Free Plan" }}</p>
        <p class="text-[12px] text-gray-400">Current plan</p>
      </div>
      <div class="flex-1 min-w-[120px]">
        <p class="text-lg">{{ currentPlan.storageUsed ?? "N/A" }}</p>
        <p class="text-[12px] text-gray-400">Requests Used</p>
      </div>
      <div class="flex-1 min-w-[120px]">
        <p class="text-lg">{{ currentPlan.requestRemaining ?? "N/A" }}</p>
        <p class="text-[12px] text-gray-400">Request Remaining</p>
      </div>
      <div class="flex-1 min-w-[120px]">
        <p class="text-lg">
          {{
            $formatDate(currentPlan.nextBilling, { withTime: true }) ?? "N/A"
          }}
        </p>
        <p class="text-[12px] text-gray-400">Next Billing Date</p>
      </div>
    </div>

    <!-- Subscription plans -->
    <div class="flex flex-wrap gap-4">
      <template v-if="isPlansLoading">
        <div
          v-for="n in 4"
          :key="n"
          class="flex-1 min-w-[250px] flex flex-col gap-4 p-6 border border-[#2D2D2D] rounded-md animate-pulse"
        >
          <div class="h-8 w-8 bg-gray-700 rounded-full mx-auto"></div>

          <div class="h-4 w-32 bg-gray-700 rounded mx-auto"></div>
          <div class="h-3 w-36 bg-gray-800 rounded mx-auto"></div>

          <div class="space-y-2 mt-4 flex-1">
            <div class="h-3 w-full bg-gray-800 rounded"></div>
            <div class="h-3 w-5/6 bg-gray-800 rounded"></div>
          </div>
          <div class="space-y-2 py-8 flex-1">
            <div class="h-3 w-2/6 bg-gray-800 rounded"></div>
            <div class="h-3 w-4/6 bg-gray-800 rounded"></div>
          </div>

          <div>
            <div class="h-10 w-full bg-gray-700 rounded"></div>
          </div>
        </div>
      </template>

      <template v-else>
        <div
          v-for="plan in subscriptionPlans"
          :key="plan.id"
          class="flex-1 min-w-[250px] flex flex-col p-6 border border-[#2D2D2D] rounded-md"
          :class="[
            'flex-1 min-w-[250px] flex flex-col p-6 rounded-md',
            isCurrentPlan(plan) ? '!border-[#00BDA7]' : 'border-[#2D2D2D]',
          ]"
        >
          <div class="flex flex-col gap-1 items-center pb-4">
            <UiIcon icon="lucide:coffee" class="w-8 h-8"></UiIcon>
            <p class="text-lg text-center py-2">{{ plan.name }}</p>
            <p class="text-[12px] text-gray-400 text-center">
              {{ plan.description }}
            </p>
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-md">Request Limit : {{ plan.requestLimit }}</p>
            <p class="text-md">{{ plan.currency }} {{ plan.price }}</p>
          </div>

          <div class="flex-1 py-8">
            <div class="grid grid-cols-1 gap-2 text-sm text-gray-400">
              <p v-for="feature in plan.features" :key="feature">
                {{ feature }}
              </p>
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-2 mt-4">
            <UiButton
              class="flex-1"
              variant="outline"
              :isDisabled="isCurrentPlan(plan) || !plan.isActive"
              @click="handlePlanClick(plan)"
            >
              {{ getPlanButtonText(plan) }}
            </UiButton>
            <UiButton
              variant="icon"
              icon="weui:refresh-filled"
              :isDisabled="!isCurrentPlan(plan) || !plan.isActive"
              size="sm"
              class="!border !border-[#00BDA7] !text-[#00BDA7] hover:bg-[#00BDA7] hover:!text-white bg-transparent"
              @click="openActionModal('renew', plan)"
            />
            <UiButton
              v-if="isCurrentPlan(plan)"
              variant="icon"
              icon="bxs:trash"
              size="sm"
              class="!border !border-red-500 !text-red-500 hover:bg-red-500 hover:!text-white bg-transparent"
              @click="openActionModal('cancel', plan)"
            />
          </div>
        </div>
      </template>
    </div>

    <UiModal
      :show="openConfirm"
      title="Confirm subsscription?"
      :description="`Are you sure you want to subscribe to the selected plan`"
      :isLoading="isSubscribing"
      @confirm="openConfirm = !openConfirm"
      @close="openConfirm = !openConfirm"
      type="confirmAlert"
    ></UiModal>
    <UiModal
      :show="openSubscribe"
      @close="openSubscribe = false"
      :title="
        actionType === 'cancel'
          ? 'Cancel subscription'
          : actionType === 'renew'
          ? 'Renew subscription'
          : 'Confirm Subscription'
      "
      custom-body-class="overflow-y-visible"
    >
      <template #body>
        <div class="flex flex-col gap-4 items-center">
          <div v-if="selectedPlan.id" class="text-left w-full">
            <p v-if="actionType !== 'cancel'" class="text-white text-sm">
              Proceed with payment for
              <span class="font-semibold">{{ selectedPlan.name }}</span>
              for
              <span class="font-semibold"
                >{{ selectedPlan.currency }} {{ selectedPlan.price }}</span
              >?
            </p>

            <p v-else class="text-white text-sm py-2">
              Proceed with cancelling
              <span class="font-semibold">{{ selectedPlan.name }}</span
              >?
            </p>
          </div>

          <UiInput
            v-if="actionType === 'cancel'"
            dark
            v-model="cancelReason"
            placeholder="Enter cancellation reason"
          />
        </div>
      </template>

      <template #footer>
        <div class="flex flex-col gap-2.5">
          <UiButton
            class="w-full py-2.5 !rounded-full text-white !text-[12px]"
            :isLoading="isSubscribing"
            @click="handleSubmitClick"
          >
            Confirm
          </UiButton>
          <UiButton
            class="w-full py-2.5 !rounded-full text-white !text-[12px] bg-gray-700 hover:bg-gray-600"
            @click="openSubscribe = false"
          >
            Cancel
          </UiButton>
        </div>
      </template>
    </UiModal>

    <UiModal
      :show="openSuccess"
      title="Success"
      :description="successMsg"
      type="successAlert"
      @close="(openSuccess = false), clearRoute()"
    ></UiModal>
    <UiModal
      :show="openError"
      title="Failed"
      :description="errorMsg"
      type="errorAlert"
      @close="(openError = false), clearRoute()"
    ></UiModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { showToast } from "~/composables/useToastMessage";

definePageMeta({
  title: "Subscriptions",
  layout: "layout",
  middleware: "auth-client",
});

const route = useRoute();

const { $api } = useNuxtApp();
const subscriptionPlans = ref([]);
const currentPlan = ref({});
const selectedPlan = ref({});

const actionType = ref(null);

const selectedPayment = ref(null);
const paymentOptions = [
  { label: "FPX Payment", value: "fpx" },
  { label: "Credit Card", value: "credit_card" },
];

const cancelReason = ref(null);

const openConfirm = ref(false);
const isSubscribing = ref(false);
const openSubscribe = ref(false);

const openError = ref(false);
const errorMsg = ref(null);

const isPlansLoading = ref(true);

const openSuccess = ref(false);
const successMsg = ref(null);

const isCurrentPlan = (plan) => {
  return currentPlan.value?.planId === plan.id;
};

const hasActiveSubscription = computed(() => {
  return !!currentPlan.value?.planId;
});

const getPlanButtonText = (plan) => {
  if (!plan.isActive) return "Unavailable";

  if (!hasActiveSubscription.value) {
    return "Subscribe";
  }

  if (isCurrentPlan(plan)) {
    return "Current Plan";
  }

  return "Switch to this plan";
};

const fetchPlans = async () => {
  isPlansLoading.value = true;
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
  } finally {
    isPlansLoading.value = false;
  }
};

const fetchCurrent = async () => {
  try {
    const res = await $api.get("/api/subscription/status");

    if (res.data.success && res.data.data?.subscription) {
      const sub = res.data.data.subscription;

      currentPlan.value = {
        subscriptionId: sub.id,
        planId: sub.plan.id,
        name: sub.plan.name,
        requestLimit: sub.plan.requestLimit,
        isActive: sub.isActive,
        nextBilling: sub.transaction.endDate,
      };
    } else {
      currentPlan.value = {};
    }
  } catch (error) {
    if (error.response?.status === 404) {
      currentPlan.value = {};
      return;
    }

    console.error("Failed to fetch current subscription:", error);
  }
};

const subscribePlan = async () => {
  if (isSubscribing.value) return;
  isSubscribing.value = true;

  try {
    const payload = {
      planId: selectedPlan.value.id,
    };

    const res = await $api.post("/api/subscription/purchase", payload);

    openConfirm.value = false;
    openSubscribe.value = false;

    if (res.data?.success && res.data.data?.checkoutUrl) {
      window.location.href = res.data.data.checkoutUrl;
      return;
    }

    throw new Error("Checkout URL missing");
  } catch (error) {
    console.error("Error in subscribing to plan", error);
    showToast(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to subscribe to plan",
      "error"
    );
  } finally {
    isSubscribing.value = false;
  }
};

const renewPlan = async () => {
  if (isSubscribing.value) return;
  isSubscribing.value = true;
  try {
    const payload = {
      subscriptionId: selectedPlan.value.id,
      // paymentMethod: selectedPayment.value,
    };
    const res = await $api.post("/api/subscription/renew", payload);
    openConfirm.value = false;
    openSubscribe.value = false;
    successMsg.value =
      res.data?.message ?? "Successfully renewed current plan subscription";
    openSuccess.value = true;
    isSubscribing.value = false;
    await fetchData();
  } catch (error) {
    console.error("Error in renewing current plan subscription", error);
    showToast(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to renew current plan subscription",
      "error"
    );
    openSubscribe.value = false;
    isSubscribing.value = false;
  }
};
const cancelPlan = async () => {
  if (isSubscribing.value) return;
  isSubscribing.value = true;
  try {
    const payload = {
      subscriptionId: selectedPlan.value.id,
      reason: cancelReason.value,
    };
    const res = await $api.post("/api/subscription/cancel", payload);
    openConfirm.value = false;
    openSubscribe.value = false;
    isSubscribing.value = false;
    successMsg.value =
      res.data?.message ?? "Successfully cancelled current plan subscription";
    openSuccess.value = true;
    await fetchData();
  } catch (error) {
    console.error("Error in cancelling current plan subscription", error);
    showToast(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to cancel current plan subscription",
      "error"
    );
    openSubscribe.value = false;
    isSubscribing.value = false;
  }
};

const handleSubmitClick = async () => {
  if (actionType.value === "subscribe") return subscribePlan();
  if (actionType.value === "renew") return renewPlan();
  if (actionType.value === "cancel") return cancelPlan();
};

const handlePlanClick = (plan) => {
  if (!plan.isActive) return;

  selectedPlan.value = plan;
  actionType.value = isCurrentPlan(plan) ? "renew" : "subscribe";
  openSubscribe.value = true;
};

const openActionModal = (type, plan) => {
  actionType.value = type;
  selectedPlan.value = plan;
  openSubscribe.value = true;
};

const clearRoute = () => {
  navigateTo(
    {
      path: route.path,
      query: {},
    },
    { replace: true }
  );
};

const fetchData = async () => {
  await fetchPlans();
  await fetchCurrent();
};

onMounted(async () => {
  if (route.query.payment === "success") {
    successMsg.value = "Subscription payment was successful";
    openSuccess.value = true;
  }

  if (route.query.payment === "failure") {
    errorMsg.value = "Payment failed. Please try again";
    openError.value = true;
  }
  await fetchData();
});
</script>

<style scoped></style>
