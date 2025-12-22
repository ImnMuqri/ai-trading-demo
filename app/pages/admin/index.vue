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

      <div class="flex flex-col xl:flex-row gap-4">
        <UiCard class="mt-4 py-2 text-[12px]">
          <div
            class="flex items-center gap-2 px-4 border-b border-[#1C1C1C] pb-2">
            <UiIcon icon="mdi:users" custom-class="w-5 h-5"></UiIcon>
            <p class="text-lg font-semibold py-2">User List</p>
          </div>

          <UiTable :allItems="usersData" :isLoading="isLoading">
            <template #header>
              <div class="grid grid-cols-[repeat(6,_1fr)] gap-2">
                <div
                  v-for="col in columns"
                  :key="col.key"
                  class="text-gray-300 font-bold">
                  {{ col.label }}
                </div>
              </div>
            </template>

            <template #row="{ item }">
              <div class="grid grid-cols-[repeat(6,_1fr)] gap-2 items-center">
                <div
                  v-for="col in columns"
                  :key="col.key"
                  class="truncate"
                  :title="item[col.key]">
                  <span v-if="col.key === 'createdAt'">
                    {{
                      item[col.key]
                        ? new Date(item[col.key]).toLocaleDateString()
                        : "N/A"
                    }}
                  </span>

                  <div
                    v-else-if="col.key === 'actions'"
                    class="flex gap-2 justify-center">
                    <UiButton
                      variant="icon"
                      icon="cuida:edit-outline"
                      size="sm"
                      @click="updateModal(item)" />
                    <UiButton
                      variant="icon"
                      icon="bxs:trash"
                      size="sm"
                      class="bg-red-500"
                      @click="confirmDelete(item)" />
                  </div>

                  <span v-else>
                    {{ item[col.key] }}
                  </span>
                </div>
              </div>
            </template>
          </UiTable>
        </UiCard>

        <UiCard class="mt-4 py-2 text-[12px] !hidden">
          <!-- Table Header -->
          <div
            class="flex items-center gap-2 px-4 border-b border-[#1C1C1C] pb-2">
            <UiIcon icon="mdi:users" custom-class="w-5 h-5"></UiIcon>
            <p class="text-lg font-semibold py-2">User List</p>
          </div>

          <div
            class="px-4 grid grid-cols-7 gap-2 text-gray-300 font-bold p-3 rounded-t-md bg-gradient-to-b from-[#111111] to-[#1C1C1C]">
            <div class="col-span-1">No.</div>
            <div class="col-span-1">Name</div>
            <div class="col-span-1">Phone</div>
            <div class="col-span-1">Email</div>
            <div class="col-span-1">Role</div>
            <div class="col-span-1">Created at</div>
            <div class="col-span-1">Actions</div>
          </div>

          <!-- Table Rows -->
          <div
            v-for="(user, index) in usersData"
            :key="user.id"
            class="px-4 grid grid-cols-7 gap-2 items-center transition p-3 hover:bg-[#111111] border-t border-gray-800">
            <div
              class="flex justify-center items-center h-5 w-5 rounded-full text-black bg-gradient-to-b from-[#00BDA7] to-[#A3D0E6]">
              {{ index + 1 }}
            </div>
            <div class="col-span-1 truncate" :title="user.name">
              {{ user.name }}
            </div>
            <div class="col-span-1">{{ user.phone }}</div>
            <div
              class="col-span-1 truncate overflow-hidden whitespace-nowrap"
              :title="user.email">
              {{ user.email }}
            </div>
            <div class="col-span-1 capitalize">{{ user.role }}</div>
            <div class="col-span-1 flex items-center gap-2">
              <span class="text-gray-400 font-semibold">
                {{ new Date(user.createdAt).toLocaleDateString() }}
              </span>
            </div>
            <div class="col-span-1 flex flex-row gap-2">
              <UiButton
                @click="updateModal(user)"
                variant="icon"
                :icon="'cuida:edit-outline'"
                size="sm"
                custom-class="!px-1 !w-fit" />
              <UiButton
                @click="confirmDelete(user)"
                variant="icon"
                :icon="'bxs:trash'"
                size="sm"
                custom-class="!px-1 !w-fit bg-red-500 hover:bg-red-600" />
            </div>
          </div>
        </UiCard>

        <UiCard class="mt-4 py-2 text-[12px]">
          <!-- Table Header -->
          <div
            class="flex items-center gap-2 px-4 border-b border-[#1C1C1C] pb-2">
            <UiIcon icon="mdi:currency-usd" custom-class="w-5 h-5"></UiIcon>
            <p class="text-lg font-semibold py-2">Transactions List</p>
          </div>

          <div
            class="px-4 grid grid-cols-8 gap-2 text-gray-300 font-bold p-3 rounded-t-md bg-gradient-to-b from-[#111111] to-[#1C1C1C]">
            <div class="col-span-1">No.</div>
            <div class="col-span-1">Name</div>
            <div class="col-span-2">Email</div>
            <div class="col-span-1">Type</div>
            <div class="col-span-1">Amount</div>
            <div class="col-span-1">Status</div>
            <div class="col-span-1">Created at</div>
          </div>

          <!-- Table Rows -->
          <div
            v-for="(tx, index) in transactionsData"
            :key="tx.id"
            class="px-4 grid grid-cols-8 gap-2 items-center transition p-3 hover:bg-[#111111] border-t border-gray-800">
            <div
              class="flex justify-center items-center h-5 w-5 rounded-full text-black bg-gradient-to-b from-[#00BDA7] to-[#A3D0E6]">
              {{ index + 1 }}
            </div>
            <div class="col-span-1">{{ tx.userName }}</div>
            <div class="col-span-2 truncate" :title="tx.userEmail">
              {{ tx.userEmail }}
            </div>
            <div class="col-span-1 capitalize truncate" :title="tx.type">
              {{ tx.type.replaceAll("_", " ") }}
            </div>
            <div class="col-span-1">{{ tx.amount }} {{ tx.currency }}</div>
            <div
              class="col-span-1 font-semibold capitalize truncate"
              :title="tx.paymentStatus"
              :class="{
                'text-green-500': tx.paymentStatus === 'completed',
                'text-yellow-500': tx.paymentStatus === 'pending',
                'text-red-500': tx.paymentStatus === 'failed',
              }">
              {{ tx.paymentStatus }}
            </div>
            <div class="col-span-1 flex items-center gap-2">
              <span class="text-gray-400 font-semibold">
                {{ new Date(tx.createdAt).toLocaleDateString() }}
              </span>
            </div>
          </div>
        </UiCard>
      </div>
    </div>

    <UiModal
      :show="openConfirm"
      title="Confirm Deletion"
      :description="`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`"
      @confirm="handleDeleteConfirmed"
      @close="openConfirm = false"
      type="confirmAlert"></UiModal>

    <UiModal
      :show="openUpdate"
      @close="openUpdate = false"
      title="Update User Information"
      :description="`Edit the user's details below. Make sure the information is accurate before saving.`">
      <template #body>
        <div class="flex flex-col gap-4 px-2">
          <UiInput dark label="Name" type="text" v-model="selectedUser.name" />
          <UiInput
            dark
            label="Email"
            type="email"
            v-model="selectedUser.email" />
          <UiInput
            dark
            label="Phone"
            type="text"
            v-model="selectedUser.phone" />
          <UiInput dark label="Role" type="text" v-model="selectedUser.role" />
        </div>
      </template>
      <template #footer>
        <UiButton
          class="w-full py-3 rounded-md text-white text-sm"
          @click="openUpdate = false">
          Save Changes
        </UiButton>
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

const isLoading = ref(false);
const columns = [
  { label: "Name", key: "name" },
  { label: "Phone", key: "phone" },
  { label: "Email", key: "email" },
  { label: "Role", key: "role" },
  { label: "Created At", key: "createdAt" },
  { label: "Actions", key: "actions" },
];

const getUsers = async () => {
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

    return transactionsData.value;
  } catch (error) {
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
