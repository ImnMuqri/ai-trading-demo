<template>
  <div class="text-white">
    <UiCard class="py-2 text-[12px] h-full flex-1">
      <div class="flex items-center gap-2 px-4 border-b border-[#1C1C1C] pb-2">
        <UiIcon icon="mdi:account-multiple-outline" custom-class="w-4 h-4" />
        <p class="text-sm font-semibold py-2">Referral Campaigns</p>
      </div>

      <UiTable
        :allItems="referralCampaigns"
        :columns="referralColumns"
        :isLoading="campaignsLoading"
        :currentPage="currentPage"
        :rowsPerPage="rowsPerPage"
        :totalItems="referralCampaigns.length"
        @page-changed="handlePageChange"
        @rows-per-page-changed="handleRowsPerPageChange"
        empty-class="min-h-[400px]"
      >
        <template #row="{ item }">
          <div
            class="grid grid-cols-6 gap-2 items-center text-[#838383] text-center"
          >
            <div
              v-for="(col, idx) in referralColumns"
              :key="col.key"
              class="flex flex-row items-center justify-center text-gray-300 font-bold h-12"
              :class="
                idx < referralColumns.length - 1
                  ? 'border-r border-[#2A2A2A] pr-2'
                  : ''
              "
              :title="item[col.key]"
            >
              <span v-if="col.key === 'createdAt'">
                {{
                  item[col.key]
                    ? new Date(item[col.key]).toLocaleDateString()
                    : "N/A"
                }}
              </span>
              <span
                v-else-if="col.key === 'status'"
                class="font-semibold capitalize"
                :class="
                  item[col.key] === 'active'
                    ? 'text-emerald-500 font-semibold'
                    : 'text-yellow-500 font-semibold'
                "
              >
                {{ item[col.key] }}
              </span>

              <div
                v-else-if="col.key === 'actions'"
                class="flex gap-[2px] justify-center"
              >
                <UiButton
                  variant="icon"
                  icon="cuida:edit-outline"
                  size="sm"
                  custom-class="!px-1 !text-[#00BDA7] !bg-transparent"
                  @click="openUpdateModal(item)"
                />
                <UiButton
                  variant="icon"
                  icon="bxs:trash"
                  size="sm"
                  custom-class="!px-1 !text-red-500 !bg-transparent"
                  @click="openDeleteConfirm(item)"
                />
              </div>

              <span v-else>
                {{ item[col.key] }}
              </span>
            </div>
          </div>
        </template>
        <template v-if="referralCampaigns.length >= 5" #actions>
          <UiButton
            variant="text"
            class="!text-[11px] !px-2 !mx-2"
            @click="openCreate = true"
          >
            Create Campaign
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

      <!-- Add Referral Campaings -->
      <div
        v-if="referralCampaigns.length < 5 && !campaignsLoading"
        class="flex flex-col gap-[2px] items-center justify-center py-20"
      >
        <UiIcon
          icon="humbleicons:users"
          custom-class="w-[70px] h-[70px] bg-gradient-to-r from-[#00AAFF] to-[#00BDA7]"
        />
        <p>CREATE MORE CAMPAIGNS</p>
        <p class="italic text-[10px] text-[#626262]">
          Click the button below to create a new referral campaign
        </p>
        <div class="py-2">
          <UiButton
            class="!rounded-full !text-[11px]"
            @click="openCreate = true"
          >
            Create Campaign
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

    <!-- Create Campaign Modal -->
    <UiModal
      :show="openCreate"
      title="Create Referral Campaign"
      @close="(openCreate = false), clearErrors(), resetNewCampaign()"
    >
      <template #body>
        <div class="flex flex-col gap-3 px-2">
          <div class="">
            <UiInput dark label="Name" v-model="newCampaign.name" />
            <p
              v-if="errors.name"
              class="text-red-500 text-[10px] pt-1 pl-2 min-h-[16px]"
            >
              {{ errors.name }}
            </p>
          </div>

          <UiInput dark label="Description" v-model="newCampaign.description" />
          <div class="">
            <UiInput
              dark
              label="Commission Percentage"
              type="number"
              v-model.number="newCampaign.commissionPercentage"
            />
            <p
              v-if="errors.commissionPercentage"
              class="text-red-500 text-[10px] pt-1 pl-2 min-h-[16px]"
            >
              {{ errors.commissionPercentage }}
            </p>
          </div>
          <div class="">
            <UiDate label="Start Date" v-model="newCampaign.startDate" />
            <p
              v-if="errors.startDate"
              class="text-red-500 text-[10px] pt-1 pl-2 min-h-[16px]"
            >
              {{ errors.startDate }}
            </p>
          </div>
          <div class="">
            <!-- <UiInput
              dark
              label="End Date"
              type="date"
              v-model="newCampaign.endDate"
            /> -->
            <UiDate label="End Date" v-model="newCampaign.endDate" />
            <p
              v-if="errors.endDate"
              class="text-red-500 text-[10px] pt-1 pl-2 min-h-[16px]"
            >
              {{ errors.endDate }}
            </p>
          </div>
        </div>
      </template>

      <template #footer>
        <UiButton
          class="w-full py-2.5 !text-[12px] !rounded-full"
          :isLoading="isCreating"
          @click="createCampaign"
        >
          Create Campaign
        </UiButton>
      </template>
    </UiModal>

    <!-- Update Campaign Modal -->
    <UiModal
      :show="openUpdate"
      title="Update Campaign"
      @close="openUpdate = false"
    >
      <template #body>
        <div class="flex flex-col gap-3 px-2">
          <div class="">
            <UiInput dark label="Name" v-model="selectedCampaign.name" />
            <p
              v-if="errors.name"
              class="text-red-500 text-[10px] pt-1 pl-2 min-h-[16px]"
            >
              {{ errors.name }}
            </p>
          </div>
          <div class="">
            <UiInput dark label="Status" v-model="selectedCampaign.status" />
            <p
              v-if="errors.status"
              class="text-red-500 text-[10px] pt-1 pl-2 min-h-[16px]"
            >
              {{ errors.status }}
            </p>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex flex-col gap-2.5">
          <UiButton
            class="w-full py-2.5 !rounded-full text-white !text-[12px]"
            :isLoading="isUpdateLoading"
            @click="updateCampaign"
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

    <!-- Delete Confirm -->
    <UiModal
      :show="openConfirm"
      title="Confirm Deletion"
      :description="`Are you sure you want to delete ${selectedCampaign?.name}? This action cannot be undone.`"
      type="confirmAlert"
      :isLoading="isDeleteLoading"
      @confirm="deleteCampaign"
      @close="openConfirm = false"
    />
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
import { ref, onMounted } from "vue";

const { $api } = useNuxtApp();

const fromDate = ref(null);

const referralCampaigns = ref([]);
const campaignsLoading = ref(false);

const referralColumns = [
  { label: "ID", key: "id", sortable: true },
  { label: "Name", key: "name", sortable: true },
  { label: "Commission %", key: "commissionPercentage", sortable: true },
  { label: "Status", key: "status", sortable: true },
  { label: "Created", key: "createdAt", sortable: true },
  { label: "Actions", key: "actions" },
];

const currentPage = ref(1);
const rowsPerPage = ref(10);
const transactionCurrentPage = ref(1);
const transactionRowsPerPage = ref(15);

const openCreate = ref(false);
const openUpdate = ref(false);
const openConfirm = ref(false);

const isCreating = ref(false);
const isUpdateLoading = ref(false);
const isDeleteLoading = ref(false);

const selectedCampaign = ref(null);

const successModal = ref(false);
const successMsg = ref("Action successful");

const newCampaign = ref({
  name: "",
  description: "",
  commissionPercentage: 10,
  startDate: "",
  endDate: "",
  status: "active",
});

const errors = ref({
  name: "",
  description: "",
  commissionPercentage: "",
  startDate: "",
  endDate: "",
  status: "",
});

const resetNewCampaign = () => {
  newCampaign.value = {
    name: "",
    description: "",
    commissionPercentage: 10,
    startDate: "",
    endDate: "",
    status: "active",
  };
};

const clearErrors = () => {
  errors.value = {
    name: "",
    description: "",
    commissionPercentage: "",
    startDate: "",
    endDate: "",
    status: "",
  };
};

const validateForm = (selected) => {
  clearErrors();

  let isValid = true;

  if (!selected.name) {
    errors.value.name = "Referral name is required";
    isValid = false;
  }
  if (!selected.commissionPercentage) {
    errors.value.commissionPercentage = "Commission percentage is required";
    isValid = false;
  }
  if (!selected.startDate) {
    errors.value.startDate = "Start date is required";
    isValid = false;
  }
  if (!selected.endDate) {
    errors.value.endDate = "End date is required";
    isValid = false;
  }
  if (!selected.status) {
    errors.value.status = "Status is required";
    isValid = false;
  }

  return isValid;
};

const getCampaigns = async () => {
  if (campaignsLoading.value) return;
  campaignsLoading.value = true;
  try {
    const res = await $api.get("/api/admin/referral/campaigns");
    referralCampaigns.value = res.data.data || [];
  } finally {
    campaignsLoading.value = false;
  }
};

const createCampaign = async () => {
  if (isCreating.value) return;
  if (!validateForm(newCampaign.value)) return;
  isCreating.value = true;
  try {
    const res = await $api.post(
      "/api/admin/referral/campaigns",
      newCampaign.value
    );
    successMsg.value = res.data?.message ?? "Campaign added successfully";
    successModal.value = true;
    openCreate.value = false;
    await getCampaigns();
  } catch (error) {
    console.error("Error in creating campaign, ", error);
    showToast(error ?? "Error in creating campaign", "error");
  } finally {
    isCreating.value = false;
  }
};

const openUpdateModal = (campaign) => {
  selectedCampaign.value = { ...campaign };
  openUpdate.value = true;
};

const updateCampaign = async () => {
  if (isUpdateLoading.value) return;

  clearErrors();
  let isValid = true;
  if (!selectedCampaign.value.name) {
    errors.value.name = "Referral name is required";
    isValid = false;
  }
  if (!selectedCampaign.value.status) {
    errors.value.status = "Status is required";
    isValid = false;
  }
  if (!isValid) return;

  isUpdateLoading.value = true;
  try {
    const res = await $api.put(
      `/api/admin/referral/campaigns/${selectedCampaign.value.id}`,
      {
        name: selectedCampaign.value.name,
        status: selectedCampaign.value.status,
      }
    );
    successMsg.value = res.data?.message ?? "Campaign updated successfully";
    successModal.value = true;
    openUpdate.value = false;
    await getCampaigns();
  } catch (error) {
    console.error("Error in updating campaign, ", error);
    showToast(error.message ?? "Error in updating campaign", "error");
  } finally {
    isUpdateLoading.value = false;
  }
};

const openDeleteConfirm = (campaign) => {
  selectedCampaign.value = campaign;
  openConfirm.value = true;
};

const deleteCampaign = async () => {
  if (isDeleteLoading.value) return;
  isDeleteLoading.value = true;

  try {
    const res = await $api.delete(
      `/api/admin/referral/campaigns/${selectedCampaign.value.id}`
    );

    openConfirm.value = false;
    successMsg.value = res.data?.message ?? "Campaign deleted successfully";
    successModal.value = true;
    await getCampaigns();
  } catch (error) {
    console.error("Error deleting campaign:", error);
    openConfirm.value = false;
    showToast(
      error.response?.data?.message ??
        error.message ??
        "Failed to delete campaign",
      "error"
    );
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
const transactionHandlePageChange = (page) => {
  currentPage.value = page;
};

const transactionandleRowsPerPageChange = (rpp) => {
  rowsPerPage.value = rpp;
  currentPage.value = 1; // reset to first page
};

onMounted(getCampaigns);
</script>
