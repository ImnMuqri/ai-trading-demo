<template>
  <div class="flex flex-col gap-4 text-white">
    <div class="flex flex-col xl:flex-row gap-4">
      <UiCard isGradient class="p-4 flex flex-col gap-4">
        <div class="flex items-center gap-2 justify-start">
          <UiIcon
            icon="qlementine-icons:system-monitor-16"
            custom-class="w-3 h-3"
          ></UiIcon>
          <span class="text-sm">Trading Analysis</span>
        </div>

        <div
          class="flex flex-col px-10 lg:flex-row h-full justify-center py-10 xl:py-0"
        >
          <div class="flex flex-row items-center gap-8">
            <UiProgress
              type="circle"
              :progress="tradingRing"
              title="Trading Analysis"
              custom-class="max-w-[150px]"
            />

            <div class="flex flex-col text-white gap-6">
              <div class="flex flex-col gap-1">
                <div>
                  <p class="text-sm text-[#838383]">Completed Transactions</p>
                  <p class="text-xl font-semibold text-[#00BDA7]">
                    {{
                      transactionsData.filter(
                        (tx) => tx.paymentStatus === "completed"
                      ).length
                    }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-[#838383]">Other Transactions</p>
                  <p class="text-xl font-semibold text-white">
                    {{
                      transactionsData.filter(
                        (tx) => tx.paymentStatus !== "completed"
                      ).length
                    }}
                  </p>
                </div>
              </div>
              <div>
                <p class="text-[12px] text-[#838383]">Total Revenue</p>
                <p class="text-sm font-semibold text-white">
                  {{ tradingTotalRevenue }} USD
                </p>
              </div>
            </div>
          </div>
        </div>
      </UiCard>

      <UiCard isGradient class="p-4 flex-1"
        ><div class="flex gap-2 items-center">
          <UiIcon
            icon="qlementine-icons:system-monitor-16"
            custom-class="w-3 h-3"
          ></UiIcon>
          <p class="text-sm">System Analytics</p>
        </div>
        <div class="p-10 flex flex-col lg:flex-row justify-around gap-8">
          <div class="flex flex-row items-center gap-8">
            <UiProgress
              type="circle"
              :progress="userRing"
              title="Users Statistics"
              custom-class="max-w-[150px]"
            />

            <div class="flex flex-col gap-1.5 text-white">
              <div>
                <p class="text-sm text-[#838383]">Total Users</p>
                <p class="text-xl font-semibold text-[#00BDA7]">
                  {{ analytics.userStats?.totalUsers ?? "No Data" }}
                </p>
              </div>

              <div>
                <p class="text-[12px] text-[#838383]">Admin Counts</p>
                <p class="text-sm font-semibold">
                  {{ analytics.userStats?.adminCount ?? "No Data" }}
                </p>
              </div>

              <div>
                <p class="text-[12px] text-[#838383]">Manager Counts</p>
                <p class="text-sm font-semibold">
                  {{ analytics.userStats?.managerCount ?? "No Data" }}
                </p>
              </div>

              <div>
                <p class="text-[12px] text-[#838383]">Affiliate Counts</p>
                <p class="text-sm font-semibold">
                  {{ analytics.userStats?.affiliateCount ?? "No Data" }}
                </p>
              </div>

              <div>
                <p class="text-[12px] text-[#838383]">User Counts</p>
                <p class="text-sm font-semibold">
                  {{ analytics.userStats?.userCount ?? "No Data" }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex flex-row items-center gap-8">
            <UiProgress
              type="circle"
              :progress="transactionRing"
              title="Transaction Statistics"
              custom-class="max-w-[150px]"
            />

            <div class="flex flex-col gap-1.5 text-white">
              <div>
                <p class="text-sm text-[#838383]">Total Transactions</p>
                <p class="text-xl font-semibold text-[#00BDA7]">
                  {{
                    analytics.transactionStats?.totalTransactions ?? "No Data"
                  }}
                </p>
              </div>

              <div>
                <p class="text-[12px] text-[#838383]">AI Analysis Counts</p>
                <p class="text-sm font-semibold">
                  {{ analytics.transactionStats?.aiAnalysisCount ?? "No Data" }}
                </p>
              </div>

              <div>
                <p class="text-[12px] text-[#838383]">Payment Counts</p>
                <p class="text-sm font-semibold">
                  {{ analytics.transactionStats?.paymentCount ?? "No Data" }}
                </p>
              </div>

              <div>
                <p class="text-[12px] text-[#838383]">Renewal Counts</p>
                <p class="text-sm font-semibold">
                  {{ analytics.transactionStats?.renewalCount ?? "No Data" }}
                </p>
              </div>

              <div>
                <p class="text-[12px] text-[#838383]">Total Revenue</p>
                <p class="text-sm font-semibold">
                  {{
                    analytics.transactionStats?.totalRevenue.toFixed(2) ?? "N/A"
                  }}
                  USD
                </p>
              </div>
            </div>
          </div>
        </div></UiCard
      >
    </div>

    <div>
      <UiCard class="p-5 text-[12px]">
        <div class="flex items-center justify-around">
          <div class="text-center flex flex-col gap-2">
            <UiIcon icon="hugeicons:user-03" custom-class="w-5 h-5"></UiIcon>
            <div>
              <span> Active Users </span>
              <p class="text-lg text-[#00BDA7]">{{ usersData.length }}</p>
            </div>
          </div>
          <div class="text-center flex flex-col gap-2">
            <UiIcon
              icon="hugeicons:arrow-data-transfer-diagonal"
              custom-class="w-5 h-5"
            ></UiIcon>
            <div>
              <span> Transaction Count </span>
              <p class="text-lg text-[#00BDA7]">
                {{ transactionsData.length }}
              </p>
            </div>
          </div>
          <div class="text-center flex flex-col gap-2">
            <UiIcon icon="hugeicons:user-03" custom-class="w-5 h-5"></UiIcon>
            <div>
              <span> New Users </span>
              <p class="text-lg text-[#00BDA7]">
                {{ analytics.activityStats?.recentSignups ?? "No Data" }}
              </p>
            </div>
          </div>
        </div>
      </UiCard>
      <div class="flex flex-col">
        <div class="pt-5 flex gap-2 text-white text-[12px]">
          <div
            class="px-5 py-2.5 rounded-t-md border cursor-pointer transition-all"
            :class="
              activeTab === 'users'
                ? 'bg-[#00BDA7]/50 border-[#00BDA7]'
                : 'bg-[#0D0D0D] text-[#838383] border-[#1C1C1C] hover:text-white'
            "
            @click="activeTab = 'users'"
          >
            Users
          </div>
          <div
            class="px-5 py-2.5 rounded-t-md border cursor-pointer transition-all"
            :class="
              activeTab === 'transactions'
                ? 'bg-[#00BDA7]/50  border-[#00BDA7]'
                : 'bg-[#0D0D0D] text-[#838383] border-[#1C1C1C] hover:text-white'
            "
            @click="activeTab = 'transactions'"
          >
            Transactions
          </div>
        </div>
        <div class="flex flex-col 2xl:flex-row gap-4">
          <!-- User List -->
          <UiCard
            v-show="activeTab === 'users'"
            class="py-2 text-[12px] h-full flex-1"
            custom-class="!rounded-t-none !rounded-tr-lg"
          >
            <div
              class="flex flex-row justify-between border-b border-[#1C1C1C]"
            >
              <div class="flex items-center gap-2 px-4 pb-2">
                <UiIcon icon="mdi:users" custom-class="w-4 h-4"></UiIcon>
                <p class="text-lg font-semibold py-2 text-sm">User List</p>
              </div>
              <div class="flex flex-row justify-center items-center">
                <div class="">
                  <span class="!hidden text-[#838383]">Filters :</span>
                </div>
              </div>
            </div>

            <UiTable
              :allItems="usersData"
              :columns="userColumns"
              :isLoading="userLoading"
              :currentPage="currentPage"
              :rowsPerPage="rowsPerPage"
              :totalItems="usersData.length"
              @page-changed="handlePageChange"
              @rows-per-page-changed="handleRowsPerPageChange"
              empty-class="min-h-[400px]"
            >
              <template #row="{ item, applyBorder }">
                <div class="grid grid-cols-6 gap-2 items-center">
                  <div
                    v-for="(col, idx) in userColumns"
                    :key="col.key"
                    class="truncate"
                    :class="[
                      applyBorder(idx, userColumns.length),
                      col.key === 'role' || col.key === 'name'
                        ? 'capitalize'
                        : '',
                    ]"
                    :title="item[col.key]"
                  >
                    <span v-if="col.key === 'createdAt'">
                      {{
                        item[col.key]
                          ? new Date(item[col.key]).toLocaleDateString()
                          : "N/A"
                      }}
                    </span>

                    <div
                      v-else-if="col.key === 'actions'"
                      class="flex flex-wrap gap-[2px] justify-center"
                    >
                      <UiButton
                        variant="icon"
                        icon="cuida:edit-outline"
                        size="sm"
                        custom-class="!px-1 !w-fit !text-[#00BDA7] !bg-transparent"
                        @click="updateModal(item)"
                      />
                      <UiButton
                        variant="icon"
                        icon="bxs:trash"
                        size="sm"
                        custom-class="!px-1 !w-fit !text-red-500 !bg-transparent"
                        @click="confirmDelete(item)"
                      />
                    </div>

                    <div v-else>
                      {{ item[col.key] }}
                    </div>
                  </div>
                </div>
              </template>
              <template #pagination></template>
            </UiTable>
          </UiCard>
          <!-- Transactions list -->
          <UiCard
            v-show="activeTab === 'transactions'"
            class="py-2 text-[12px] flex-1 w-full"
            custom-class="!rounded-t-none !rounded-tr-lg"
          >
            <!-- Table Header -->
            <div
              class="flex items-center gap-2 px-4 border-b border-[#1C1C1C] pb-2"
            >
              <UiIcon icon="mdi:currency-usd" custom-class="w-4 h-4"></UiIcon>
              <p class="text-sm font-semibold py-2">Transactions List</p>
            </div>

            <UiTable
              :allItems="transactionsData"
              :columns="transactionsColumns"
              :isLoading="transactionLoading"
              :currentPage="transactionCurrentPage"
              :rowsPerPage="transactionRowsPerPage"
              :totalItems="transactionsData.length"
              @page-changed="transactionHandlePageChange"
              @rows-per-page-changed="transactionandleRowsPerPageChange"
              empty-class="min-h-[350px]"
            >
              <template #row="{ item, applyBorder }">
                <div class="grid grid-cols-6 gap-2 items-center">
                  <div
                    v-for="(col, idx) in transactionsColumns"
                    :key="col.key"
                    class="truncate"
                    :class="applyBorder(idx, transactionsColumns.length)"
                    :title="item[col.key]"
                  >
                    <span v-if="col.key === 'createdAt'">
                      <span class="text-gray-400 font-semibold">
                        {{
                          item[col.key]
                            ? new Date(item[col.key]).toLocaleDateString()
                            : "N/A"
                        }}</span
                      >
                    </span>
                    <span v-else-if="col.key === 'type'" class="capitalize">
                      {{ item[col.key].replaceAll("_", " ") }}
                    </span>
                    <span
                      v-else-if="col.key === 'paymentStatus'"
                      class="font-semibold capitalize"
                      :class="{
                        'text-green-500': item[col.key] === 'completed',
                        'text-yellow-500': item[col.key] === 'pending',
                        'text-red-500': item[col.key] === 'failed',
                      }"
                    >
                      {{ item[col.key] }}
                    </span>

                    <div
                      v-else-if="col.key === 'actions'"
                      class="flex gap-2 justify-center"
                    >
                      <UiButton
                        variant="icon"
                        icon="cuida:edit-outline"
                        size="sm"
                        custom-class="!px-1 !w-fit !text-[#00BDA7] !bg-transparent"
                        @click="updateModal(item)"
                      />
                      <UiButton
                        variant="icon"
                        icon="bxs:trash"
                        size="sm"
                        custom-class="!px-1 !w-fit !text-red-500 !bg-transparent"
                        @click="confirmDelete(item)"
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
          </UiCard>
        </div>
      </div>
    </div>

    <UiModal
      :show="openConfirm"
      title="Confirm Deletion"
      :description="`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`"
      :isLoading="isDeleteLoading"
      @confirm="handleDeleteConfirmed"
      @close="openConfirm = false"
      type="confirmAlert"
    ></UiModal>

    <UiModal
      :show="openUpdate"
      @close="openUpdate = false"
      title="Update User Information"
      :description="`Edit the user's details below. Make sure the information is accurate before saving.`"
    >
      <template #body>
        <div class="flex flex-col gap-4 px-2">
          <UiInput dark label="Name" type="text" v-model="selectedUser.name" />
          <UiInput
            dark
            label="Email"
            type="email"
            v-model="selectedUser.email"
          />
          <UiInput
            dark
            label="Phone"
            type="text"
            v-model="selectedUser.phone"
          />
          <UiInput dark label="Role" type="text" v-model="selectedUser.role" />
        </div>
      </template>
      <template #footer>
        <div class="flex flex-col gap-2.5">
          <UiButton
            class="w-full py-2.5 !rounded-full text-white !text-[12px]"
            :isLoading="isUpdateLoading"
            @click="saveChanges"
          >
            Save Changes </UiButton
          ><UiButton
            class="w-full py-2.5 !rounded-full text-white !text-[12px] bg-gray-700 hover:bg-gray-600"
            @click="openUpdate = false"
          >
            Cancel
          </UiButton>
        </div>
      </template>
    </UiModal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { showToast } from "~/composables/useToastMessage";
definePageMeta({
  layout: "layout",
  middleware: "auth-client",
  role: ["admin", "developer"],
});
const { $api } = useNuxtApp();
const activeTab = ref("users");

const usersData = ref([]);
const transactionsData = ref([]);
const openConfirm = ref(false);
const openUpdate = ref(false);
const selectedUser = ref({
  id: null,
  name: "",
  email: "",
  role: "",
  isActive: "",
});
const analyticsLoading = ref(false);
const isUpdateLoading = ref(false);
const isDeleteLoading = ref(false);
const userLoading = ref(false);
const transactionLoading = ref(false);

const currentPage = ref(1);
const rowsPerPage = ref(5);
const transactionCurrentPage = ref(1);
const transactionRowsPerPage = ref(5);

const userColumns = [
  { label: "Name", key: "name", sortable: true },
  { label: "Phone", key: "phone", sortable: true },
  { label: "Email", key: "email", sortable: true },
  { label: "Role", key: "role", sortable: true },
  { label: "Created At", key: "createdAt", sortable: true },
  { label: "Actions", key: "actions" },
];

const transactionsColumns = [
  { label: "Name", key: "userName", sortable: true },
  { label: "Email", key: "userEmail", sortable: true },
  { label: "Type", key: "type", sortable: true },
  { label: "Amount", key: "amount", sortable: true },
  { label: "Status", key: "paymentStatus", sortable: true },
  { label: "Created At", key: "createdAt", sortable: true },
];

const analytics = ref({
  userStats: {
    totalUsers: 0,
    adminCount: 0,
    managerCount: 0,
    affiliateCount: 0,
    userCount: 0,
  },
  transactionStats: {
    totalTransactions: 0,
    aiAnalysisCount: 0,
    paymentCount: 0,
    renewalCount: 0,
    totalRevenue: 0,
  },
});

const tradingRing = computed(() => {
  const total = transactionsData.value.length;
  if (total === 0) return [0, 100];

  const completed = transactionsData.value.filter(
    (tx) => tx.paymentStatus === "completed"
  ).length;
  const pendingOrFailed = total - completed;

  return [(completed / total) * 100, (pendingOrFailed / total) * 100];
});

const tradingTotalRevenue = computed(() => {
  return transactionsData.value
    .reduce((sum, tx) => sum + parseFloat(tx.amount || "0"), 0)
    .toFixed(2);
});

const transactionRing = computed(() => {
  const total = transactionsData.value.length;
  if (total === 0) return [0, 0];

  let completed = 0;

  transactionsData.value.forEach((tx) => {
    if (tx.paymentStatus === "completed") completed++;
  });

  const other = total - completed;

  return [(completed / total) * 100, (other / total) * 100];
});

const userRing = computed(() => {
  const stats = analytics.value.userStats;
  const total = stats.totalUsers || 0;

  if (total === 0) return [0, 100];

  const countedUsers = stats.userCount || 0;

  return [100, (countedUsers / total) * 100];
});

const getAnalytics = async () => {
  analyticsLoading.value = true;
  try {
    const res = await $api.get("/api/admin/analytics");
    analytics.value = res.data.data;
  } catch (err) {
    console.error("Failed to fetch analytics", err);
  } finally {
    analyticsLoading.value = false;
  }
};

const getUsers = async () => {
  userLoading.value = true;
  try {
    const res = await $api.get(`/api/admin/users`);

    const users = res.data.data.users || [];

    usersData.value = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      country: user.country,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
    }));
    userLoading.value = false;

    return usersData.value;
  } catch (error) {
    userLoading.value = false;
    console.error("Failed to fetch users:", error);
    return [];
  }
};

const confirmDelete = (user) => {
  selectedUser.value = user;
  openConfirm.value = true;
};

const handleDeleteConfirmed = async () => {
  isDeleteLoading.value = true;
  if (!selectedUser.value.id) return;

  try {
    await $api.delete(`/api/admin/users/${selectedUser.value.id}`);

    // Remove from usersData locally
    usersData.value = usersData.value.filter(
      (user) => user.id !== selectedUser.value.id
    );

    openConfirm.value = false;
    selectedUser.value = null;
    showToast("User deleted successfully", "success");
    isDeleteLoading.value = false;
  } catch (error) {
    showToast(error.response.data.message ?? "Error", "error");
    isDeleteLoading.value = false;
  }
};

const updateModal = (user) => {
  selectedUser.value = user;
  openUpdate.value = true;
};

const saveChanges = async () => {
  if (isUpdateLoading.value) return;
  isUpdateLoading.value = true;
  if (!selectedUser.value.id) return;

  try {
    const res = await $api.put(`/api/admin/users/${selectedUser.value.id}`, {
      name: selectedUser.value.name,
      email: selectedUser.value.email,
      role: selectedUser.value.role,
      isActive: selectedUser.value.isActive,
    });

    const updatedUser = res.data.data;

    // Update local state
    usersData.value = usersData.value.map((user) =>
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user
    );

    showToast("User updated successfully", "success");
    isUpdateLoading.value = false;
    openUpdate.value = false;
  } catch (error) {
    showToast("Failed to update user", "error");
    isUpdateLoading.value = false;
    console.error(error);
  }
};

const getTransactions = async () => {
  transactionLoading.value = true;
  try {
    const res = await $api.get(`/api/admin/transactions`);

    const transactions = res.data.data.transactions || [];

    transactionsData.value = transactions.map((tx) => ({
      id: tx.id,
      userName: tx.User?.name || "",
      userEmail: tx.User?.email || "",
      type: tx.type,
      amount: tx.amount,
      currency: tx.currency,
      paymentMethod: tx.paymentMethod,
      paymentStatus: tx.paymentStatus,
      transactionId: tx.transactionId,
      startDate: tx.startDate,
      endDate: tx.endDate,
      isActive: tx.isActive,
      createdAt: tx.createdAt,
    }));
    transactionLoading.value = false;

    return transactionsData.value;
  } catch (error) {
    transactionLoading.value = false;
    console.error("Failed to fetch transactions:", error);
    return [];
  }
};

onMounted(() => {
  getUsers();
  getTransactions();
  getAnalytics();
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleRowsPerPageChange = (rpp) => {
  rowsPerPage.value = rpp;
  currentPage.value = 1; // reset to first page
};
const transactionHandlePageChange = (page) => {
  transactionCurrentPage.value = page;
};

const transactionandleRowsPerPageChange = (rpp) => {
  transactionRowsPerPage.value = rpp;
  transactionCurrentPage.value = 1; // reset to first page
};
</script>

<style lang="scss" scoped></style>
