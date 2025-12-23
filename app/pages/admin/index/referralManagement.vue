<template>
  <div class="text-white">
    <UiCard class="py-2 text-[12px] h-full min-h-[300px] flex-1">
      <div class="flex items-center gap-2 px-4 border-b border-[#1C1C1C] pb-2">
        <UiIcon icon="mdi:account-multiple-outline" custom-class="w-4 h-4" />
        <p class="text-sm font-semibold py-2">Referral Campaigns</p>
      </div>

      <UiTable
        :allItems="referralCampaigns"
        :isLoading="campaignsLoading"
        :currentPage="currentPage"
        :rowsPerPage="rowsPerPage"
        :totalItems="referralCampaigns.length"
        @page-changed="handlePageChange"
        @rows-per-page-changed="handleRowsPerPageChange"
        empty-class="min-h-[400px]"
      >
        <template #header>
          <div class="grid grid-cols-6 gap-2">
            <div
              v-for="(col, idx) in referralColumns"
              :key="col.key"
              class="flex flex-row items-center justify-center text-gray-300 font-bold h-10"
              :class="
                idx < referralColumns.length - 1
                  ? 'border-r border-[#2A2A2A] pr-2'
                  : ''
              "
            >
              {{ col.label }}
            </div>
          </div>
        </template>

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
        <template #pagination></template>
      </UiTable>

      <!-- Add Referral Campaings -->
      <div
        v-if="referralCampaigns.length < 5"
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
      @close="openCreate = false"
    >
      <template #body>
        <div class="flex flex-col gap-3 px-2">
          <UiInput dark label="Name" v-model="newCampaign.name" />
          <UiInput dark label="Description" v-model="newCampaign.description" />
          <UiInput
            dark
            label="Commission Percentage"
            type="number"
            v-model.number="newCampaign.commissionPercentage"
          />
          <UiInput
            dark
            label="Start Date"
            type="date"
            v-model="newCampaign.startDate"
          />
          <UiInput
            dark
            label="End Date"
            type="date"
            v-model="newCampaign.endDate"
          />
        </div>
      </template>

      <template #footer>
        <UiButton
          class="w-full py-2.5"
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
          <UiInput dark label="Name" v-model="selectedCampaign.name" />
          <UiInput dark label="Status" v-model="selectedCampaign.status" />
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const { $api } = useNuxtApp();

const referralCampaigns = ref([]);
const campaignsLoading = ref(false);

const referralColumns = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Commission %", key: "commissionPercentage" },
  { label: "Status", key: "status" },
  { label: "Created", key: "createdAt" },
  { label: "Actions", key: "actions" },
];

const currentPage = ref(1);
const rowsPerPage = ref(15);

const openCreate = ref(false);
const openUpdate = ref(false);
const openConfirm = ref(false);

const isCreating = ref(false);
const isUpdateLoading = ref(false);
const isDeleteLoading = ref(false);

const selectedCampaign = ref(null);

const newCampaign = ref({
  name: "",
  description: "",
  commissionPercentage: 10,
  startDate: "",
  endDate: "",
  status: "active",
});

const getCampaigns = async () => {
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
  isCreating.value = true;
  try {
    await $api.post("/api/admin/referral/campaigns", newCampaign.value);
    openCreate.value = false;
    await getCampaigns();
  } finally {
    isCreating.value = false;
  }
};

const openUpdateModal = (campaign) => {
  selectedCampaign.value = { ...campaign };
  openUpdate.value = true;
};

const updateCampaign = async () => {
  isUpdateLoading.value = true;
  try {
    await $api.put(
      `/api/admin/referral/campaigns/${selectedCampaign.value.id}`,
      {
        name: selectedCampaign.value.name,
        status: selectedCampaign.value.status,
      }
    );
    openUpdate.value = false;
    await getCampaigns();
  } finally {
    isUpdateLoading.value = false;
  }
};

const openDeleteConfirm = (campaign) => {
  selectedCampaign.value = campaign;
  openConfirm.value = true;
};

const deleteCampaign = async () => {
  isDeleteLoading.value = true;
  try {
    await $api.delete(
      `/api/admin/referral/campaigns/${selectedCampaign.value.id}`
    );
    openConfirm.value = false;
    await getCampaigns();
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

onMounted(getCampaigns);
</script>
