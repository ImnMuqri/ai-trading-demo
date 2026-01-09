<template>
  <div class="text-white flex flex-col gap-4">
    <div class="flex flex-col xl:flex-row gap-4">
      <UiCard isGradient class="p-4 flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <UiIcon
            icon="qlementine-icons:money-16"
            custom-class="w-3 h-3"
          ></UiIcon>
          <span class="text-sm">Subscription Breakdown</span>
        </div>

        <div
          class="flex flex-col justify-center items-center w-full xl:w-[350px] h-full gap-6 py-10"
        >
          <div
            class="flex flex-col gap-3 w-full max-w-[220px] border-l-[2px] border-[#D9D9D9] py-3"
          >
            <UiProgress
              :progress="planProgress"
              :gradientColors="[['#00AAFF', '#00BDA7']]"
            />
          </div>

          <div class="flex flex-col gap-2 py-4 w-full max-w-[220px]">
            <div
              v-for="(name, idx) in planNames"
              :key="idx"
              class="flex justify-between text-[12px]"
            >
              <p>{{ name }}</p>
              <p class="text-[#00BDA7]">{{ planProgress[idx] }}</p>
            </div>
          </div>
        </div>
      </UiCard>

      <UiCard is-gradient class="p-4 flex-1 bg-[#0D0D0D]">
        <div class="flex gap-2 items-center mb-4">
          <UiIcon icon="humbleicons:users" custom-class="w-4 h-4"></UiIcon>
          <p class="text-sm">Subscription Summary</p>
        </div>

        <div
          class="flex flex-col lg:flex-row items-center justify-center w-full h-full pb-6 gap-8"
        >
          <UiProgress
            type="circle"
            :progress="progressData"
            title="Subs Revenue"
            custom-class="min-w-[150px] max-w-[200px]"
            title-class="!text-[#838383] text-[16px] "
          />

          <div class="flex flex-col gap-2 text-white">
            <div>
              <p class="text-sm text-[#838383]">Total Revenue</p>
              <p class="text-xl font-semibold text-[#00BDA7]">
                {{ subAnalytics.totalRevenue ?? "0" }}
              </p>
            </div>

            <div>
              <p class="text-[12px] text-[#838383]">Monthly Revenue</p>
              <p class="text-sm">{{ subAnalytics.monthlyRevenue ?? "0" }}</p>
            </div>

            <div
              class="h-[2px] bg-gradient-to-r from-[#626262] to-[#1D1D1D00] my-2"
            ></div>

            <div>
              <p class="text-[12px] text-[#838383]">Subscription Growth</p>
              <p class="text-sm">
                {{ subAnalytics.subscriptionGrowth ?? "0" }}
              </p>
            </div>
          </div>
        </div>
      </UiCard>
    </div>
    <UiCard class="py-2 text-[12px] h-full flex-1">
      <div
        class="flex flex-col sm:flex-row justify-between border-b border-[#1C1C1C] pb-2"
      >
        <div class="flex items-center gap-2 px-4">
          <UiIcon
            icon="mdi:credit-card-outline"
            custom-class="w-4 h-4"
          ></UiIcon>
          <p class="text-sm font-semibold py-2">Package List</p>
        </div>

        <div
          class="flex flex-wrap justify-center sm:justify-end items-center gap-3"
        >
          <span class="text-[#838383]">Filters : </span>
          <div class="flex flex-wrap">
            <UiSearch v-model="search" dark />
            <UiFilter
              v-model="rowsPerPage"
              icon="gg:list"
              :options="rowsPerPageOptions"
            />
            <div
              class="flex flex-col w-8 h-8 items-center justify-center rounded-lg cursor-pointer"
              @click="handleSearchSubmit"
            >
              <UiIcon
                icon="formkit:submit"
                class="!text-[#00BDA7] hover:!text-white"
              />
            </div>
            <div
              class="flex flex-col w-8 h-8 items-center justify-center rounded-lg cursor-pointer"
              @click="clearData()"
            >
              <UiIcon
                icon="weui:refresh-filled"
                class="!text-[#FF9D00] hover:!text-white transform scale-x-[-1]"
              />
            </div>
          </div>
        </div>
      </div>

      <UiTable
        :allItems="isSearching ? filteredPlans : subscriptionPlans"
        :columns="subscriptionColumns"
        :isLoading="plansLoading"
        :currentPage="currentPage"
        :rowsPerPage="rowsPerPage"
        :totalItems="(isSearching ? filteredPlans : subscriptionPlans).length"
        @page-changed="handlePageChange"
        @rows-per-page-changed="handleRowsPerPageChange"
        empty-class="min-h-[400px]"
        :table-break-points="600"
      >
        <template #row="{ item, applyBorder }">
          <div class="grid grid-cols-6 gap-2 items-center">
            <div
              v-for="(col, idx) in subscriptionColumns"
              :key="col.key"
              class="!truncate"
              :class="applyBorder(idx, subscriptionColumns.length)"
              :title="item[col.key]"
            >
              <span v-if="col.key === 'isActive'">
                <span
                  :class="
                    item[col.key]
                      ? 'text-emerald-500 font-semibold'
                      : 'text-red-500 font-semibold'
                  "
                >
                  {{ item[col.key] ? "Active" : "Inactive" }}</span
                >
              </span>
              <span v-else-if="col.key === 'price'">
                <span> {{ item[col.key] }} {{ item.currency }}</span>
              </span>
              <div
                v-else-if="col.key === 'actions'"
                class="flex flex-wrap gap-[2px] justify-center"
              >
                <UiButton
                  variant="icon"
                  icon="cuida:edit-outline"
                  size="sm"
                  custom-class="!px-1 !w-fit !text-[#00BDA7] hover:!text-[#00BDA7]/80 !bg-transparent"
                  @click="openUpdateModal(item)"
                />
                <UiButton
                  variant="icon"
                  icon="bxs:trash"
                  size="sm"
                  custom-class="!px-1 !w-fit !text-red-500 hover:!text-red-600 !bg-transparent"
                  @click="openDeleteConfirm(item)"
                />
              </div>

              <span v-else>
                {{ item[col.key] }}
              </span>
            </div>
          </div>
        </template>
        <template #card="{ item }">
          <div v-for="(card, idx) in item" :key="idx">
            <UiListCard
              :title="card.name"
              :items="card"
              :index="(currentPage - 1) * rowsPerPage + idx"
              :map="subscriptionColumns"
              class="my-2"
            >
              <template #format="{ field, value }">
                <span v-if="field.key === 'price'">
                  {{ card.currency ?? "" }} {{ value ?? "0" }}
                </span>
                <span
                  v-if="field.key === 'isActive'"
                  :class="
                    value
                      ? 'text-emerald-500 font-semibold'
                      : 'text-red-500 font-semibold'
                  "
                >
                  {{ value ? "Active" : "Inactive" }}
                </span>
              </template>
              <template #actions>
                <div class="flex flex-wrap gap-[2px] justify-center">
                  <UiButton
                    variant="icon"
                    icon="cuida:edit-outline"
                    size="sm"
                    custom-class="!px-1 !w-fit !text-[#00BDA7] hover:!text-[#00BDA7]/80 !bg-transparent"
                    @click="openUpdateModal(card)"
                  />
                  <UiButton
                    variant="icon"
                    icon="bxs:trash"
                    size="sm"
                    custom-class="!px-1 !w-fit !text-red-500 hover:!text-red-600 !bg-transparent"
                    @click="openDeleteConfirm(card)"
                  /></div
              ></template>
              <template v-if="card.label"></template>
              <template v-else>
                {{ value ?? "No Data" }}
              </template></UiListCard
            >
          </div></template
        >
        <template v-if="subscriptionPlans.length >= 5" #actions>
          <UiButton
            variant="text"
            class="!text-[11px] !px-2 !mx-2"
            @click="openCreate = true"
          >
            Create Package
            <template #icon-left>
              <UiIcon
                icon="hugeicons:add-01"
                custom-class="w-4 h-4 !text-[#00BDA7]"
              />
            </template>
          </UiButton>
        </template>
        <template #pagination></template>
      </UiTable>
      <div
        v-if="subscriptionPlans.length < 5 && !plansLoading"
        class="flex flex-col gap-[2px] items-center justify-center py-20"
      >
        <UiIcon
          icon="hugeicons:package-open"
          custom-class="w-[70px] h-[70px]  bg-gradient-to-r from-[#00AAFF] to-[#00BDA7]"
        />
        <p>CREATE MORE PACKAGE</p>
        <p class="italic text-[10px] text-[#626262]">
          Click on the button below to create more package
        </p>
        <div class="py-2">
          <UiButton
            label="Create Package"
            variant="primary"
            class="!rounded-full !text-[11px] capitalize"
            @click="clearErrors(), (openCreate = true), resetNewSubs()"
          >
            Create new package
            <template #icon-left>
              <UiIcon
                icon="hugeicons:add-01"
                custom-class="w-4 h-4 !text-white"
              />
            </template>
          </UiButton>
        </div>
      </div>
    </UiCard>

    <!-- Delete Confirmation Modal -->
    <UiModal
      :show="openConfirm"
      title="Confirm Deletion"
      :description="`Are you sure you want to delete ${selectedPlan?.name}? This action cannot be undone.`"
      :isLoading="isDeleteLoading"
      @confirm="handleDeleteConfirmed"
      @close="openConfirm = false"
      type="confirmAlert"
    />

    <!-- Update Plan Modal -->
    <UiModal
      :show="openUpdate"
      @close="openUpdate = false"
      title="Update Plan"
      description="Edit the plan details below. Ensure the information is correct."
    >
      <template #body>
        <div class="flex flex-col gap-4 px-2">
          <div class="">
            <UiInput
              dark
              label="Package Name"
              type="text"
              v-model="selectedPlan.name"
            />
            <p
              v-if="errors.name"
              class="text-red-500 text-[10px] pt-1 pl-2 min-h-[16px]"
            >
              {{ errors.name }}
            </p>
          </div>

          <UiInput
            dark
            label="Description"
            type="text"
            v-model="selectedPlan.description"
          />
          <UiInput
            dark
            label="Request Limit"
            type="number"
            v-model="selectedPlan.requestLimit"
          />
          <UiInput
            dark
            label="Price"
            type="number"
            v-model="selectedPlan.price"
          />
          <UiInput
            dark
            label="Currency"
            type="text"
            v-model="selectedPlan.currency"
          />
          <UiInput
            dark
            label="Duration (days)"
            type="number"
            v-model="selectedPlan.duration"
          />
          <div class="flex items-center gap-2">
            <UiRadio
              v-model="selectedPlan.isActive"
              as-boolean
              :items="['Active', 'Inactive']"
              custom-class="!text-[12px]"
            />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex flex-col gap-2.5">
          <UiButton
            class="w-full py-2.5 !rounded-full text-white !text-[12px]"
            :isLoading="isUpdateLoading"
            @click="handleUpdatePlan"
          >
            Save Changes
          </UiButton>
          <UiButton
            class="w-full py-2.5 !rounded-full text-white !text-[12px] bg-gray-700 hover:bg-gray-600"
            @click="openUpdate = false"
          >
            Cancel
          </UiButton>
        </div>
      </template>
    </UiModal>

    <!-- Create Package Modal -->
    <UiModal
      :show="openCreate"
      title="Create New Package"
      :description="'Fill in the details below to create a new subscription plan.'"
      @close="openCreate = false"
    >
      <template #body>
        <div class="flex flex-col gap-3 px-2">
          <div class="">
            <UiInput dark label="Name" v-model="newPlan.name" />
            <p
              v-if="errors.name"
              class="text-red-500 text-[10px] pt-1 pl-2 min-h-[16px]"
            >
              {{ errors.name }}
            </p>
          </div>

          <UiInput dark label="Description" v-model="newPlan.description" />
          <UiInput
            dark
            label="Request Limit"
            type="number"
            v-model.number="newPlan.requestLimit"
          />
          <div class="">
            <UiInput
              dark
              label="Price"
              type="number"
              step="0.01"
              v-model.number="newPlan.price"
            />
            <p class="text-red-500 text-[10px] pt-1 pl-2 min-h-[16px]">
              {{ errors.price }}
            </p>
          </div>
          <div class="">
            <UiInput dark label="Currency" v-model="newPlan.currency" />
            <p class="text-red-500 text-[10px] pt-1 pl-2 min-h-[16px]">
              {{ errors.currency }}
            </p>
          </div>
          <div class="">
            <UiInput
              dark
              label="Duration (days)"
              type="number"
              v-model.number="newPlan.duration"
            />
            <p class="text-red-500 text-[10px] pt-1 pl-2 min-h-[16px]">
              {{ errors.duration }}
            </p>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-white text-[12px]">Features:</label>
            <div class="flex flex-col gap-1 text-[12px]">
              <UiRadio
                v-model="newPlan.features.ai_analyses"
                :items="['AI Analysis', 'No AI Analysis']"
                custom-class="!text-[12px]"
              />
              <UiRadio
                v-model="newPlan.features.priority_support"
                :items="['Priority Support', 'No Priority Support']"
                custom-class="!text-[12px]"
              />
            </div>
            <UiRadio
              v-model="newPlan.isActive"
              as-boolean
              :items="['Active', 'Inactive']"
              custom-class="!text-[12px]"
            />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex flex-col gap-2.5">
          <UiButton
            class="w-full py-2.5 !rounded-full text-white !text-[12px]"
            :isLoading="isCreating"
            @click="createPlan"
          >
            Create Plan
          </UiButton>
          <UiButton
            class="w-full py-2.5 !rounded-full text-white !text-[12px] bg-gray-700 hover:bg-gray-600"
            @click="openCreate = false"
          >
            Cancel
          </UiButton>
        </div>
      </template>
    </UiModal>
    <UiModal
      :show="successModal"
      title="Success"
      :description="successMsg"
      type="successAlert"
      @close="successModal = false"
    ></UiModal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const { $api } = useNuxtApp();

const subAnalytics = ref({});
const subscriptionPlans = ref([]);
const filteredPlans = ref([]);
const plansLoading = ref(false);
const subscriptionColumns = [
  { label: "Name", key: "name", sortable: true },
  { label: "Request Limit", key: "requestLimit", sortable: true },
  { label: "Price", key: "price", sortable: true },
  { label: "Duration (days)", key: "duration", sortable: true },
  { label: "Active", key: "isActive", sortable: true },
  { label: "Actions", key: "actions" },
];

const successModal = ref(false);
const openCreate = ref(false);
const openConfirm = ref(false);
const openUpdate = ref(false);
const isCreating = ref(false);
const isDeleteLoading = ref(false);
const isUpdateLoading = ref(false);

const currentPage = ref(1);
const rowsPerPage = ref(15);
const rowsPerPageOptions = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 },
];

const isSearching = ref(false);
const search = ref(null);

const selectedPlan = ref(null);
const successMsg = ref("Action successfull");

const newPlan = ref({
  name: "",
  description: "",
  requestLimit: 100,
  price: 0,
  currency: "USD",
  duration: 30,
  features: {
    ai_analyses: "AI Analysis",
    priority_support: "Priority Support",
  },
  isActive: true,
  sortOrder: 1,
});

const errors = ref({
  name: "",
  price: "",
  currency: "",
  duration: "",
});

const resetNewSubs = () => {
  newPlan.value = {
    name: "",
    description: "",
    requestLimit: 100,
    price: 0,
    currency: "USD",
    duration: 30,
    features: {
      ai_analyses: "AI Analysis",
      priority_support: "Priority Support",
    },
    isActive: true,
    sortOrder: 1,
  };
};

const clearErrors = () => {
  errors.value = {
    name: "",
    price: "",
    currency: "",
    duration: "",
  };
};

const validateForm = (plan) => {
  clearErrors();

  let isValid = true;

  if (!plan.name) {
    errors.value.name = "Subscription name is required";
    isValid = false;
  }
  if (!plan.price) {
    errors.value.price = "Subscription price is required";
    isValid = false;
  }
  if (!plan.currency) {
    errors.value.currency = "Subscription currency is required";
    isValid = false;
  }
  if (!plan.duration) {
    errors.value.duration = "Subscription duration is required";
    isValid = false;
  }
  return isValid;
};

const progressData = computed(() => {
  const total = subAnalytics.value.totalRevenue ?? 0;
  const monthly = subAnalytics.value.monthlyRevenue ?? 0;

  const max = Math.max(total, monthly, 1);

  return [
    Math.min(Math.round((total / max) * 100), 100),
    Math.min(Math.round((monthly / max) * 100), 100),
  ];
});

const planProgress = computed(() => {
  if (!subAnalytics.value?.planCounts) return [0, 0, 0, 0];
  return subAnalytics.value.planCounts.map(
    (plan) => plan.subscriptionCount ?? 0
  );
});

const defaultPlans = [
  { name: "Subscription 1", subscriptionCount: 0 },
  { name: "Subscription 2", subscriptionCount: 0 },
  { name: "Subscription 3", subscriptionCount: 0 },
  { name: "Subscription 4", subscriptionCount: 0 },
];

const planNames = computed(() => {
  const plans = subAnalytics.value?.planCounts ?? defaultPlans;
  return plans.map((plan) => plan.name ?? "");
});

const getSubscriptionPlans = async () => {
  plansLoading.value = true;
  try {
    const res = await $api.get("/api/admin/subscription/plans");
    const plans = res.data.data.subscriptionPlans || [];
    subscriptionPlans.value = plans;
  } catch (error) {
    console.error("Failed to fetch subscription plans:", error);
  } finally {
    plansLoading.value = false;
  }
};

const getSubscriptionAnalysis = async () => {
  try {
    const res = await $api.get("/api/admin/subscription/analytics");
    subAnalytics.value = res.data.data?.analytics;
  } catch (error) {
    console.error("Failed to fetch subscription analytics", error);
  } finally {
  }
};

const createPlan = async () => {
  if (isCreating.value) return;
  if (!validateForm(newPlan.value)) return;

  isCreating.value = true;
  try {
    const payload = { ...newPlan.value };
    const res = await $api.post("/api/admin/subscription/plans", payload);

    // Add the new plan to the list
    await getSubscriptionPlans();

    // Close modal and reset form
    openCreate.value = false;
    newPlan.value = {
      name: "",
      description: "",
      requestLimit: 100,
      price: 0,
      currency: "USD",
      duration: 30,
      features: {
        ai_analyses: "AI Analysis",
        priority_support: "Priority Support",
      },
      isActive: true,
      sortOrder: 1,
    };

    successMsg.value = res.data?.message ?? "Plan added successfully";
    successModal.value = true;
  } catch (err) {
    console.error("Failed to create plan:", err);

    showToast(err.response?.data?.error ?? "Failed to add plan", "error");
  } finally {
    isCreating.value = false;
  }
};

// Open update modal
const openUpdateModal = (plan) => {
  selectedPlan.value = { ...plan }; // clone to avoid direct mutation
  openUpdate.value = true;
};

const handleUpdatePlan = async () => {
  if (isUpdateLoading.value) return;
  if (!selectedPlan.value) return;
  if (!validateForm(selectedPlan.value)) return;

  isUpdateLoading.value = true;
  try {
    const res = await $api.put(
      `/api/admin/subscription/plans/${selectedPlan.value.id}`,
      {
        name: selectedPlan.value.name,
        description: selectedPlan.value.description,
        requestLimit: selectedPlan.value.requestLimit,
        price: selectedPlan.value.price,
        currency: selectedPlan.value.currency,
        duration: selectedPlan.value.duration,
        features: selectedPlan.value.features || {},
        isActive: selectedPlan.value.isActive,
        sortOrder: selectedPlan.value.sortOrder || 1,
      }
    );
    openUpdate.value = false;
    getSubscriptionPlans();
    successMsg.value = res.data?.message ?? "Plan updated successfully";
    successModal.value = true;
  } catch (error) {
    console.error("Failed to update plan:", error);
    const message = error?.response?.data?.message ?? "Error updating plan";
    showToast(message, "error");
    openUpdate.value = false;
  } finally {
    isUpdateLoading.value = false;
  }
};

// Open delete confirmation modal
const openDeleteConfirm = (plan) => {
  selectedPlan.value = plan;
  openConfirm.value = true;
};

// Delete API call
const handleDeleteConfirmed = async () => {
  if (isDeleteLoading.value) return;
  if (!selectedPlan.value) return;

  isDeleteLoading.value = true;

  try {
    const res = await $api.delete(
      `/api/admin/subscription/plans/${selectedPlan.value.id}`
    );

    openConfirm.value = false;
    successMsg.value =
      res.data?.message ?? "Plan has been deleted successfully";
    successModal.value = true;
    getSubscriptionPlans();
  } catch (error) {
    console.error("Failed to delete plan:", error);

    const message = error?.response?.data?.message ?? "Error in deleting plan";

    showToast(message, "error");

    openConfirm.value = false;
  } finally {
    isDeleteLoading.value = false;
  }
};

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleRowsPerPageChange = (rpp) => {
  rowsPerPage.value = rpp;
  currentPage.value = 1; // reset to first page
};

onMounted(() => {
  getSubscriptionPlans();
  getSubscriptionAnalysis();
});

const clearData = () => {
  rowsPerPage.value = 15;
  search.value = null;
  filteredPlans.value = [];
  isSearching.value = false;
  getSubscriptionPlans();
  getSubscriptionAnalysis();
};

const handleSearchSubmit = () => {
  const query = search.value?.toLowerCase().trim();

  isSearching.value = !!query;

  if (!query) {
    filteredPlans.value = [];
  } else {
    const searchableKeys = subscriptionColumns
      .map((col) => col.key)
      .filter((key) => key !== "actions");

    filteredPlans.value = subscriptionPlans.value.filter((item) =>
      searchableKeys.some((key) => {
        const value = item[key];
        return value != null && String(value).toLowerCase().includes(query);
      })
    );
  }

  currentPage.value = 1;
};
</script>
