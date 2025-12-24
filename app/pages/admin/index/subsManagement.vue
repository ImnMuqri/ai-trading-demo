<template>
  <div class="text-white">
    <UiCard class="py-2 text-[12px] h-full flex-1">
      <div class="flex items-center gap-2 px-4 border-b border-[#1C1C1C] pb-2">
        <UiIcon icon="mdi:credit-card-outline" custom-class="w-4 h-4"></UiIcon>
        <p class="text-sm font-semibold py-2">Package List</p>
      </div>

      <UiTable
        :allItems="subscriptionPlans"
        :isLoading="plansLoading"
        :currentPage="currentPage"
        :rowsPerPage="rowsPerPage"
        :totalItems="subscriptionPlans.length"
        @page-changed="handlePageChange"
        @rows-per-page-changed="handleRowsPerPageChange"
        empty-class="min-h-[400px]">
        <template #header="{ applyBorder }">
          <div class="grid grid-cols-6 gap-2">
            <div
              v-for="(col, idx) in subscriptionColumns"
              :key="col.key"
              class="flex flex-row items-center justify-center text-gray-300 font-bold h-10"
              :class="applyBorder(idx, subscriptionColumns.length)">
              {{ col.label }}
            </div>
          </div>
        </template>

        <template #row="{ item, applyBorder }">
          <div class="grid grid-cols-6 gap-2 items-center">
            <div
              v-for="(col, idx) in subscriptionColumns"
              :key="col.key"
              class="!truncate"
              :class="applyBorder(idx, subscriptionColumns.length)"
              :title="item[col.key]">
              <span v-if="col.key === 'isActive'">
                <span
                  :class="
                    item[col.key]
                      ? 'text-emerald-500 font-semibold'
                      : 'text-red-500 font-semibold'
                  ">
                  {{ item[col.key] ? "Active" : "Inactive" }}</span
                >
              </span>
              <span v-else-if="col.key === 'price'">
                <span> {{ item[col.key] }} {{ item.currency }}</span>
              </span>
              <div
                v-else-if="col.key === 'actions'"
                class="flex flex-wrap gap-[2px] justify-center">
                <UiButton
                  variant="icon"
                  icon="cuida:edit-outline"
                  size="sm"
                  custom-class="!px-1 !w-fit !text-[#00BDA7] hover:!text-[#00BDA7]/80 !bg-transparent"
                  @click="openUpdateModal(item)" />
                <UiButton
                  variant="icon"
                  icon="bxs:trash"
                  size="sm"
                  custom-class="!px-1 !w-fit !text-red-500 hover:!text-red-600 !bg-transparent"
                  @click="openDeleteConfirm(item)" />
              </div>

              <span v-else>
                {{ item[col.key] }}
              </span>
            </div>
          </div>
        </template>
        <template v-if="subscriptionPlans.length >= 5" #actions>
          <UiButton
            variant="text"
            class="!text-[11px] !px-2 !mx-2"
            @click="openCreate = true">
            Create Package
            <template #icon-left>
              <UiIcon
                icon="hugeicons:add-01"
                custom-class="w-4 h-4 !text-[#00BDA7]" />
            </template>
          </UiButton>
        </template>
        <template #pagination></template>
      </UiTable>
      <div
        v-if="subscriptionPlans.length < 5 && !plansLoading"
        class="flex flex-col gap-[2px] items-center justify-center py-20">
        <UiIcon
          icon="hugeicons:package-open"
          custom-class="w-[70px] h-[70px]  bg-gradient-to-r from-[#00AAFF] to-[#00BDA7]" />
        <p>CREATE MORE PACKAGE</p>
        <p class="italic text-[10px] text-[#626262]">
          Click on the button below to create more package
        </p>
        <div class="py-2">
          <UiButton
            label="Create Package"
            variant="primary"
            class="!rounded-full !text-[11px] capitalize"
            @click="openCreate = true">
            Create new package
            <template #icon-left>
              <UiIcon
                icon="hugeicons:add-01"
                custom-class="w-4 h-4 !text-white" />
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
      type="confirmAlert" />

    <!-- Update Plan Modal -->
    <UiModal
      :show="openUpdate"
      @close="openUpdate = false"
      title="Update Plan"
      description="Edit the plan details below. Ensure the information is correct.">
      <template #body>
        <div class="flex flex-col gap-4 px-2">
          <UiInput
            dark
            label="Package Name"
            type="text"
            v-model="selectedPlan.name" />
          <UiInput
            dark
            label="Description"
            type="text"
            v-model="selectedPlan.description" />
          <UiInput
            dark
            label="Request Limit"
            type="number"
            v-model="selectedPlan.requestLimit" />
          <UiInput
            dark
            label="Price"
            type="number"
            v-model="selectedPlan.price" />
          <UiInput
            dark
            label="Currency"
            type="text"
            v-model="selectedPlan.currency" />
          <UiInput
            dark
            label="Duration (days)"
            type="number"
            v-model="selectedPlan.duration" />
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              v-model="selectedPlan.isActive"
              class="w-3 h-3" />
            <label for="isActive" class="text-[12px]">Active</label>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex flex-col gap-2.5">
          <UiButton
            class="w-full py-2.5 !rounded-full text-white !text-[12px]"
            :isLoading="isUpdateLoading"
            @click="handleUpdatePlan">
            Save Changes
          </UiButton>
          <UiButton
            class="w-full py-2.5 !rounded-full text-white !text-[12px] bg-gray-700 hover:bg-gray-600"
            @click="openUpdate = false">
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
      @close="openCreate = false">
      <template #body>
        <div class="flex flex-col gap-3 px-2">
          <UiInput dark label="Name" v-model="newPlan.name" />
          <UiInput dark label="Description" v-model="newPlan.description" />
          <UiInput
            dark
            label="Request Limit"
            type="number"
            v-model.number="newPlan.requestLimit" />
          <UiInput
            dark
            label="Price"
            type="number"
            step="0.01"
            v-model.number="newPlan.price" />
          <UiInput dark label="Currency" v-model="newPlan.currency" />
          <UiInput
            dark
            label="Duration (days)"
            type="number"
            v-model.number="newPlan.duration" />
          <div class="flex flex-col gap-2">
            <label class="text-white text-[12px]">Features:</label>
            <div class="flex flex-col gap-1 text-[12px]">
              <label class="flex items-center gap-2 text-white">
                <input type="checkbox" v-model="newPlan.features.ai_analyses" />
                AI Analyses
              </label>
              <label class="flex items-center gap-2 text-white">
                <input
                  type="checkbox"
                  v-model="newPlan.features.priority_support" />
                Priority Support
              </label>
            </div>
          </div>
          <label class="flex items-center gap-2 text-white text-[12px]">
            <input type="checkbox" v-model="newPlan.isActive" />
            Active
          </label>
        </div>
      </template>

      <template #footer>
        <div class="flex flex-col gap-2.5">
          <UiButton
            class="w-full py-2.5 !rounded-full text-white !text-[12px]"
            :isLoading="isCreating"
            @click="createPlan">
            Create Plan
          </UiButton>
          <UiButton
            class="w-full py-2.5 !rounded-full text-white !text-[12px] bg-gray-700 hover:bg-gray-600"
            @click="openCreate = false">
            Cancel
          </UiButton>
        </div>
      </template>
    </UiModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const { $api } = useNuxtApp();

const subscriptionPlans = ref([]);
const plansLoading = ref(false);
const subscriptionColumns = [
  { label: "ID", key: "id" },
  { label: "Request Limit", key: "requestLimit" },
  { label: "Price", key: "price" },
  { label: "Duration (days)", key: "duration" },
  { label: "Active", key: "isActive" },
  { label: "Actions", key: "actions" },
];

const openCreate = ref(false);
const openConfirm = ref(false);
const openUpdate = ref(false);
const isCreating = ref(false);
const isDeleteLoading = ref(false);
const isUpdateLoading = ref(false);

const currentPage = ref(1);
const rowsPerPage = ref(15);

const selectedPlan = ref(null);

const newPlan = ref({
  name: "",
  description: "",
  requestLimit: 100,
  price: 0,
  currency: "USD",
  duration: 30,
  features: { ai_analyses: true, priority_support: true },
  isActive: true,
  sortOrder: 1,
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

const createPlan = async () => {
  if (isCreating.value) return;
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
      features: { ai_analyses: true, priority_support: true },
      isActive: true,
      sortOrder: 1,
    };
  } catch (err) {
    console.error("Failed to create plan:", err);
  } finally {
    isCreating.value = false;
  }
};

// Open update modal
const openUpdateModal = (plan) => {
  selectedPlan.value = { ...plan }; // clone to avoid direct mutation
  openUpdate.value = true;
};

// Update API call
const handleUpdatePlan = async () => {
  if (!selectedPlan.value) return;
  isUpdateLoading.value = true;
  try {
    await $api.put(`/api/admin/subscription/plans/${selectedPlan.value.id}`, {
      name: selectedPlan.value.name,
      description: selectedPlan.value.description,
      requestLimit: selectedPlan.value.requestLimit,
      price: selectedPlan.value.price,
      currency: selectedPlan.value.currency,
      duration: selectedPlan.value.duration,
      features: selectedPlan.value.features || {},
      isActive: selectedPlan.value.isActive,
      sortOrder: selectedPlan.value.sortOrder || 1,
    });
    openUpdate.value = false;
    getSubscriptionPlans();
  } catch (error) {
    console.error("Failed to update plan:", error);
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
  if (!selectedPlan.value) return;
  isDeleteLoading.value = true;
  try {
    await $api.delete(`/api/admin/subscription/plans/${selectedPlan.value.id}`);
    openConfirm.value = false;
    getSubscriptionPlans();
  } catch (error) {
    console.error("Failed to delete plan:", error);
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
});
</script>
