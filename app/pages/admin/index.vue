<template>
  <div class="flex flex-col gap-4 text-white">
    <div class="flex flex-col md:flex-row gap-4">
      <UiCard isGradient class="p-20 flex-1">System Analytic</UiCard>
      <UiCard isGradient class="p-20 text-md flex flex-col items-center gap-3">
        <div class="flex justify-between items-center gap-4">
          <span class="text-lg">Trading Analysis</span>
        </div>
      </UiCard>
    </div>

    <div>
      <UiCard class="p-5 text-[12px]">
        <div class="flex items-center justify-around">
          <div class="text-center">
            Active Users
            <p class="text-lg text-[#00BDA7]">{{ usersData.length }}</p>
          </div>
          <div class="text-center">
            Transaction Count
            <p class="text-lg text-[#00BDA7]">
              {{ transactionsData.length }}
            </p>
          </div>
          <div class="text-center">
            New Users
            <p class="text-lg text-[#00BDA7]">3000</p>
          </div>
        </div>
      </UiCard>

      <div class="flex flex-col 2xl:flex-row gap-4">
        <!-- User List -->
        <UiCard
          class="mt-4 py-2 text-[12px] h-full min-h-[400px]"
          :class="userLoading ? '!w-full' : '!w-fit'"
        >
          <div
            class="flex items-center gap-2 px-4 border-b border-[#1C1C1C] pb-2"
          >
            <UiIcon icon="mdi:users" custom-class="w-5 h-5"></UiIcon>
            <p class="text-lg font-semibold py-2">User List</p>
          </div>

          <UiTable
            :allItems="usersData"
            :isLoading="userLoading"
            empty-class="min-h-[350px]"
          >
            <template #header>
              <div class="grid grid-cols-6 gap-2">
                <div
                  v-for="col in userColumns"
                  :key="col.key"
                  class="text-gray-300 font-bold"
                >
                  <div v-if="col.label === 'Actions'" class="!text-center">
                    {{ col.label }}
                  </div>
                  <div v-else>{{ col.label }}</div>
                </div>
              </div>
            </template>

            <template #row="{ item }">
              <div class="grid grid-cols-6 gap-2 items-center">
                <div
                  v-for="col in userColumns"
                  :key="col.key"
                  class="truncate"
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
                    class="flex gap-2 justify-center"
                  >
                    <UiButton
                      variant="icon"
                      icon="cuida:edit-outline"
                      size="sm"
                      custom-class="!px-1 !w-fit"
                      @click="updateModal(item)"
                    />
                    <UiButton
                      variant="icon"
                      icon="bxs:trash"
                      size="sm"
                      custom-class="!px-1 !w-fit bg-red-500 hover:bg-red-600"
                      @click="confirmDelete(item)"
                    />
                  </div>

                  <span v-else>
                    {{ item[col.key] }}
                  </span>
                </div>
              </div>
            </template>
          </UiTable>
        </UiCard>

        <!-- Transactions list -->
        <UiCard class="mt-4 py-2 text-[12px] flex-1 w-full">
          <!-- Table Header -->
          <div
            class="flex items-center gap-2 px-4 border-b border-[#1C1C1C] pb-2"
          >
            <UiIcon icon="mdi:currency-usd" custom-class="w-5 h-5"></UiIcon>
            <p class="text-lg font-semibold py-2">Transactions List</p>
          </div>

          <UiTable :allItems="transactionsData" :isLoading="transactionLoading">
            <template #header>
              <div class="grid grid-cols-6 gap-2">
                <div
                  v-for="col in transactionsColumns"
                  :key="col.key"
                  class="text-gray-300 font-bold"
                >
                  <div v-if="col.label === 'Status'">
                    {{ col.label }}
                  </div>
                  <div v-else>{{ col.label }}</div>
                </div>
              </div>
            </template>

            <template #row="{ item }">
              <div class="grid grid-cols-6 gap-2 items-center">
                <div
                  v-for="col in transactionsColumns"
                  :key="col.key"
                  class="truncate"
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
                      custom-class="!px-1 !w-fit"
                      @click="updateModal(item)"
                    />
                    <UiButton
                      variant="icon"
                      icon="bxs:trash"
                      size="sm"
                      custom-class="!px-1 !w-fit bg-red-500 hover:bg-red-600"
                      @click="confirmDelete(item)"
                    />
                  </div>

                  <span v-else>
                    {{ item[col.key] }}
                  </span>
                </div>
              </div>
            </template>
          </UiTable>
        </UiCard>
      </div>
    </div>

    <UiModal
      :show="openConfirm"
      title="Confirm Deletion"
      :description="`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`"
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
        <div class="flex flex-col gap-4">
          <UiInput label="Name" type="text" v-model="selectedUser.name" />
          <UiInput label="Email" type="email" v-model="selectedUser.email" />
          <UiInput label="Phone" type="text" v-model="selectedUser.phone" />
          <UiInput label="Role" type="text" v-model="selectedUser.role" />
        </div>
      </template>
    </UiModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { showToast } from "~/composables/useToastMessage";
definePageMeta({
  layout: "layout",
  middleware: "auth-client",
});
const { $api } = useNuxtApp();
const usersData = ref([]);
const transactionsData = ref([]);
const openConfirm = ref(false);
const openUpdate = ref(false);
const selectedUser = ref(null);

const userLoading = ref(false);
const transactionLoading = ref(false);
const userColumns = [
  { label: "Name", key: "name" },
  { label: "Phone", key: "phone" },
  { label: "Email", key: "email" },
  { label: "Role", key: "role" },
  { label: "Created At", key: "createdAt" },
  { label: "Actions", key: "actions" },
];

const transactionsColumns = [
  { label: "Name", key: "userName" },
  { label: "Email", key: "userEmail" },
  { label: "Type", key: "type" },
  { label: "Amount", key: "amount" },
  { label: "Status", key: "paymentStatus" },
  { label: "Created At", key: "createdAt" },
];
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
    console.error("Failed to fetch users:", error);
    return [];
  }
};

const confirmDelete = (user) => {
  selectedUser.value = user;
  openConfirm.value = true;
};

const handleDeleteConfirmed = async () => {
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
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};

const updateModal = (user) => {
  selectedUser.value = user;
  openUpdate.value = true;
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
});
</script>

<style lang="scss" scoped></style>
