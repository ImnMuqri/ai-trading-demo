<template>
  <div class="flex flex-col gap-4 text-white">
    <div class="flex flex-col xl:flex-row gap-4">
      <UiCard isGradient class="p-4 flex flex-col gap-4">
        <div class="flex items-center gap-2 justify-start">
          <UiIcon
            icon="qlementine-icons:system-monitor-16"
            custom-class="w-3 h-3"
          ></UiIcon>
          <span class="text-sm">Affiliator Summary</span>
        </div>

        <div
          class="flex flex-col px-10 lg:flex-row h-full items-center justify-center py-10 xl:py-0"
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
                  <p class="text-sm text-[#838383]">Total Affiliator</p>
                  <p class="text-xl font-semibold text-[#00BDA7]">
                    {{
                      transactionsData.filter(
                        (tx) => tx.paymentStatus === "completed"
                      ).length
                    }}
                  </p>
                </div>
                <div>
                  <div class="flex flex-row gap-1">
                    <p class="text-sm text-[#838383]">New Affiliator Today</p>
                    <UiIcon icon="icon:ai-star" custom-class="w-5 h-5" />
                  </div>

                  <p class="text-sm font-medium text-white">
                    {{
                      transactionsData.filter(
                        (tx) => tx.paymentStatus !== "completed"
                      ).length
                    }}
                  </p>
                </div>

                <div
                  class="h-[2px] bg-gradient-to-r from-[#626262] to-[#1D1D1D00] my-2 w-1/3"
                ></div>
              </div>
              <div>
                <p class="text-[12px] text-[#838383]">
                  New Affiliator Last 30 Days
                </p>
                <p class="text-[12px] font-medium text-white">
                  {{ tradingTotalRevenue }} USD
                </p>
              </div>
              <div>
                <p class="text-[12px] text-[#838383]">
                  New Affiliator Last 30 Days
                </p>
                <p class="text-[12px] font-medium text-white">
                  {{ tradingTotalRevenue }} USD
                </p>
              </div>
            </div>
          </div>
        </div>
      </UiCard>

      <UiCard class="p-4 flex-1 !bg-[#0D0D0D]">
        <div class="flex gap-2 items-center">
          <UiIcon
            icon="qlementine-icons:system-monitor-16"
            custom-class="w-3 h-3"
          ></UiIcon>
          <p class="text-sm">Client Analytics</p>
        </div>
        <div class="p-10 flex flex-col lg:flex-row justify-around gap-8">
          <div
            class="flex flex-row items-center lg:justify-none justify-center gap-8"
          >
            <UiProgress
              type="circle"
              :progress="userRing"
              title="Total Client"
              custom-class="max-w-[150px] min-w-[100px]"
            />

            <div class="flex flex-col gap-1.5 text-white">
              <div>
                <p class="text-sm text-[#838383]">Total Clients</p>
                <p class="text-xl font-semibold text-[#00BDA7]">
                  {{ analytics.userStats?.totalUsers ?? "No Data" }}
                </p>
              </div>

              <div>
                <div class="flex flex-row gap-1">
                  <p class="text-[12px] text-[#838383]">New Client Today</p>
                  <UiIcon icon="icon:ai-star" custom-class="w-5 h-5" />
                </div>

                <p class="text-sm font-semibold">
                  {{ analytics.userStats?.adminCount ?? "No Data" }}
                </p>
              </div>

              <div
                class="h-[2px] bg-gradient-to-r from-[#626262] to-[#1D1D1D00] my-2 w-1/3"
              ></div>

              <div>
                <p class="text-[12px] text-[#838383]">
                  New Clients Last 30 Dats
                </p>
                <p class="text-sm font-semibold">
                  {{ analytics.userStats?.managerCount ?? "No Data" }}
                </p>
              </div>

              <div>
                <p class="text-[12px] text-[#838383]">
                  New Clients Last 60 Days
                </p>
                <p class="text-sm font-semibold">
                  {{ analytics.userStats?.affiliateCount ?? "No Data" }}
                </p>
              </div>
            </div>
          </div>

          <div
            class="flex flex-row items-center lg:justify-none justify-center gap-8"
          >
            <UiProgress
              type="circle"
              :progress="transactionRing"
              title="Client Type"
              custom-class="max-w-[150px]  min-w-[100px] !text-gray-400"
            />

            <div class="flex flex-col gap-8 text-white">
              <div>
                <div class="flex gap-2 text-[#838383] mb-1">
                  <UiIcon icon="mdi:package-variant"></UiIcon>
                  <p class="text-[12px] text-[#838383]">Basic Package</p>
                </div>
                <p class="text-sm font-semibold">No Data</p>
              </div>

              <div>
                <div class="flex gap-2 text-[#838383] mb-1">
                  <UiIcon icon="mdi:package-variant"></UiIcon>
                  <p class="text-[12px] text-[#838383]">Pro Package</p>
                </div>
                <p class="text-sm font-semibold text-[#00BDA7]">No Data</p>
              </div>
            </div>
          </div>
        </div></UiCard
      >
    </div>

    <div class="flex flex-col xl:flex-row gap-4 w-full">
      <UiCard class="flex-[1] p-4 flex flex-col gap-4 !bg-[#0D0D0D]">
        <div class="flex items-center gap-2 justify-start">
          <UiIcon
            icon="qlementine-icons:system-monitor-16"
            custom-class="w-3 h-3"
          ></UiIcon>
          <span class="text-sm">Top 5 Affiliator by Profits</span>
        </div>

        <div
          class="h-[2px] bg-gradient-to-r from-[#626262] to-[#1D1D1D00] w-1/6"
        ></div>

        <div
          class="flex flex-col lg:flex-row h-full items-center justify-center py-10 xl:py-0"
        >
          <div class="w-full max-h-[300px] h-full overflow-hidden min-h-0">
            <UiList
              :parameters="topAffiliatorProfits"
              :isLoading="affiliatorLoading"
              class="w-full h-full"
            />
          </div>
        </div>
      </UiCard>
      <UiCard class="flex-[1] p-4 flex flex-col gap-4 !bg-[#0D0D0D]">
        <div class="flex items-center gap-2 justify-start">
          <UiIcon
            icon="qlementine-icons:system-monitor-16"
            custom-class="w-3 h-3"
          ></UiIcon>
          <span class="text-sm">Top 5 Affiliator by Clients</span>
        </div>

        <div
          class="h-[2px] bg-gradient-to-r from-[#626262] to-[#1D1D1D00] w-1/6"
        ></div>

        <div
          class="flex flex-col lg:flex-row h-full items-center justify-center py-10 xl:py-0"
        >
          <div class="w-full max-h-[300px] h-full overflow-hidden min-h-0">
            <UiList
              :parameters="topAffiliatorClients"
              :isLoading="affiliatorLoading"
              class="w-full h-full"
            />
          </div></div
      ></UiCard>
      <UiCard class="flex-[0.5] flex flex-col !bg-[#0D0D0D]" is-gradient>
        <div class="p-4 border-b border-[#1C1C1C]">
          <div class="flex items-center gap-2 justify-start pb-4">
            <UiIcon
              icon="qlementine-icons:system-monitor-16"
              custom-class="w-3 h-3"
            ></UiIcon>
            <span class="text-sm">Client Status </span>
          </div>
          <div
            class="h-[2px] bg-gradient-to-r from-[#626262] to-[#1D1D1D00] w-1/6"
          ></div>

          <div
            class="flex flex-col justify-center items-center w-full xl:w-[350px] h-full gap-6 py-5"
          >
            <div
              class="flex flex-col items-center px-3 max-w-[220px] border-b-[2px] border-[#D9D9D9]"
            >
              <UiProgress
                orientation="vertical"
                :progress="clientStatusProgress"
                :gradient-colors="clientStatusGradients"
                bar-gap="gap-20"
                custom-class="max-h-[140px] "
              />
            </div>

            <div class="flex flex-col gap-2 w-full max-w-[280px]">
              <div
                v-for="(status, idx) in clientStatusNames"
                :key="idx"
                class="flex justify-between text-[13px]"
              >
                <p class="text-white">{{ status }}</p>
                <p :style="{ color: clientStatusColors[idx] }">
                  {{ clientStatusProgress[idx] }}%
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-wrap items-center justify-center p-4 text-[#838383] hover:cursor-pointer"
        >
          See full details <span class="pl-2 text-[#00BDA7]">></span>
        </div>
      </UiCard>
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
            :class="userLoading ? 'min-h-[350px]' : ''"
          >
            <div
              class="flex flex-col sm:flex-row justify-center sm:justify-between border-b border-[#1C1C1C] sm:pb-0 pb-2"
            >
              <div
                class="flex items-center gap-2 px-4 sm:border-b border-[#1C1C1C] sm:pb-2"
              >
                <UiIcon icon="mdi:users" custom-class="w-4 h-4"></UiIcon>
                <p class="text-sm font-semibold py-2">User List</p>
              </div>
              <div
                class="flex flex-wrap justify-center sm:justify-end items-center gap-3"
              >
                <span class="text-[#838383]">Filters : </span>
                <div class="flex flex-wrap">
                  <UiSearch v-model="userSearch" dark />
                  <UiFilter
                    v-model="selectedRole"
                    icon="fa6-regular:user"
                    :options="roleOptions"
                  />
                  <UiFilter
                    v-model="rowsPerPage"
                    icon="gg:list"
                    :options="rowsPerPageOptions"
                  />

                  <div
                    class="flex flex-col w-8 h-8 items-center justify-center rounded-lg cursor-pointer"
                    @click="searchUsers()"
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
              :allItems="
                isSearchingUsers || isFilteringByRole
                  ? filteredUsers
                  : usersData
              "
              :columns="userColumns"
              :isLoading="userLoading"
              :currentPage="currentPage"
              :rowsPerPage="rowsPerPage"
              :totalItems="
                (isSearchingUsers || isFilteringByRole
                  ? filteredUsers
                  : usersData
                ).length
              "
              @page-changed="handlePageChange"
              @rows-per-page-changed="handleRowsPerPageChange"
              empty-class="min-h-[350px]"
              :table-break-points="1000"
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

              <template #card="{ item }">
                <div v-for="(card, idx) in item" :key="idx">
                  <UiListCard
                    :title="card.email"
                    :items="card"
                    :index="(currentPage - 1) * rowsPerPage + idx"
                    :map="userColumns"
                    class="my-2"
                  >
                    <template #actions>
                      <div class="flex flex-wrap gap-[2px] justify-center">
                        <UiButton
                          variant="icon"
                          icon="cuida:edit-outline"
                          size="sm"
                          custom-class="!px-1 !w-fit !text-[#00BDA7] !bg-transparent"
                          @click="updateModal(card)"
                        />
                        <UiButton
                          variant="icon"
                          icon="bxs:trash"
                          size="sm"
                          custom-class="!px-1 !w-fit !text-red-500 !bg-transparent"
                          @click="confirmDelete(card)"
                        /></div
                    ></template>
                    <template v-if="card.label"></template>
                    <template v-else>
                      {{ value ?? "No Data" }}
                    </template></UiListCard
                  >
                </div></template
              >
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
              class="flex flex-col sm:flex-row justify-center sm:justify-between border-b border-[#1C1C1C] sm:pb-0 pb-2"
            >
              <div
                class="flex items-center gap-2 px-4 sm:border-b border-[#1C1C1C] sm:pb-2"
              >
                <UiIcon icon="mdi:currency-usd" custom-class="w-4 h-4"></UiIcon>
                <p class="text-sm font-semibold py-2">Transactions List</p>
              </div>
              <div
                class="flex flex-wrap justify-center sm:justify-end items-center gap-3"
              >
                <span class="text-[#838383]">Filters : </span>
                <div class="flex flex-wrap">
                  <UiSearch v-model="transactionSearch" dark />
                  <UiFilter
                    v-model="selectedType"
                    icon="fa6-regular:user"
                    :options="typeOptions"
                  />
                  <UiFilter
                    v-model="selectedTransaction"
                    icon="mingcute:transfer-line"
                    :options="transactionOptions"
                  />
                  <UiFilter
                    v-model="transactionRowsPerPage"
                    icon="gg:list"
                    :options="rowsPerPageOptions"
                  />

                  <div
                    class="flex flex-col w-8 h-8 items-center justify-center rounded-lg cursor-pointer"
                    @click="searchTransactions()"
                  >
                    <UiIcon
                      icon="formkit:submit"
                      class="!text-[#00BDA7] hover:!text-white"
                    />
                  </div>
                  <div
                    class="flex flex-col w-8 h-8 items-center justify-center rounded-lg cursor-pointer"
                    @click="clearTransactions()"
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
              :allItems="
                isSearchingTransaction || isFilteringStatus || isFilteringType
                  ? filteredTransactions
                  : transactionsData
              "
              :columns="transactionsColumns"
              :isLoading="transactionLoading"
              :currentPage="transactionCurrentPage"
              :rowsPerPage="transactionRowsPerPage"
              :totalItems="
                (isSearchingTransaction || isFilteringStatus || isFilteringType
                  ? filteredTransactions
                  : transactionsData
                ).length
              "
              @page-changed="transactionHandlePageChange"
              @rows-per-page-changed="transactionandleRowsPerPageChange"
              empty-class="min-h-[350px]"
              :table-break-points="1200"
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
              <template #card="{ item }">
                <div v-for="(card, idx) in item" :key="idx">
                  <UiListCard
                    :title="card.User?.email"
                    :items="card"
                    :index="(currentPage - 1) * rowsPerPage + idx"
                    :map="transactionsColumns"
                    class="my-2"
                  >
                    <template #format="{ field, value }">
                      <span v-if="field.key === 'type'" class="capitalize">
                        {{ value.replaceAll("_", " ") }}
                      </span>

                      <span
                        v-else-if="field.key === 'paymentStatus'"
                        class="font-semibold capitalize"
                        :class="{
                          'text-green-500': value === 'completed',
                          'text-yellow-500': value === 'pending',
                          'text-red-500': value === 'failed',
                        }"
                      >
                        {{ value ?? "No Data" }}
                      </span>

                      <!-- Default -->
                      <span v-else>
                        {{ value ?? "No Data" }}
                      </span>
                    </template>
                  </UiListCard>
                </div></template
              >
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
import { ref, onMounted, computed, watch } from "vue";
import { showToast } from "~/composables/useToastMessage";
definePageMeta({
  layout: "layout",
  middleware: "auth-client",
  role: ["admin", "developer"],
});
const { $api } = useNuxtApp();
const activeTab = ref("users");

const usersData = ref([]);
const filteredUsers = ref([]);
const transactionsData = ref([]);
const filteredTransactions = ref([]);

const userSearch = ref(null);
const isSearchingUsers = ref(false);
const isFilteringByRole = ref(false);
const transactionSearch = ref(null);
const isSearchingTransaction = ref(false);
const isFilteringType = ref(null);
const isFilteringStatus = ref(null);

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

const selectedRole = ref("Show All");
const roleOptions = [
  { label: "Show All", value: "Show All" },
  { label: "User", value: "User" },
  { label: "Admin", value: "Admin" },
];

const selectedType = ref("Show All");
const typeOptions = [
  { label: "Show All", value: "Show All" },
  { label: "Completed", value: "Completed" },
  { label: "Pending", value: "Pending" },
  { label: "Failed", value: "Failed" },
];

const selectedTransaction = ref("Show All");
const transactionOptions = [
  { label: "Show All", value: "Show All" },
  { label: "Subscription Payment", value: "subscription_payment" },
  { label: "Annual Plan Renewal", value: "annual_plan_renewal" },
  { label: "Others", value: "Others" },
];

const rowsPerPageOptions = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 },
];

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

const affiliatorSummary = ref({});
const clientSummary = ref({});

const topAffiliatorProfits = ref([
  {
    text: "Muhammad Hazri",
    desc: "hazriw@gmail.com",
    value: 321300,
  },
  {
    text: "Muhammad Hazri",
    desc: "hazriw@gmail.com",
    value: 321300,
  },
  {
    text: "Muhammad Hazri",
    desc: "hazriw@gmail.com",
    value: 321300,
  },
  {
    text: "Muhammad Hazri",
    desc: "hazriw@gmail.com",
    value: 321300,
  },
  {
    text: "Muhammad Hazri",
    desc: "hazriw@gmail.com",
    value: 321300,
  },
]);
const topAffiliatorClients = ref([
  {
    text: "Muhammad Hazri",
    desc: "hazriw@gmail.com",
    value: 23,
  },
  {
    text: "Muhammad Hazri",
    desc: "hazriw@gmail.com",
    value: 21,
  },
  {
    text: "Muhammad Hazri",
    desc: "hazriw@gmail.com",
    value: 15,
  },
  {
    text: "Muhammad Hazri",
    desc: "hazriw@gmail.com",
    value: 16,
  },
  {
    text: "Muhammad Hazri",
    desc: "hazriw@gmail.com",
    value: 22,
  },
]);

const clientStatusNames = ref([
  "Active Clients",
  "Inactive Clients",
  "Expiring Clients",
]);

const clientStatusProgress = ref([100, 70, 20]);

const clientStatusGradients = ref([
  ["#00AAFF", "#00BDA7"],
  ["#DC2626", "#DC2626"],
  ["#FFFFFF", "#FFFFFF"],
]);

const clientStatusColors = ref(["#00BDA7", "#DC2626", "#FACC15"]);

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
    const resp = await $api.get("/api/admin/dashboard-stats");
    if (resp.data?.affiliatorSummary) {
      affiliatorSummary.value = resp.data?.affiliatorSummary;
    }
    if (resp.data?.clientSummary) {
      clientSummary.value = resp.data?.clientSummary;
    }
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
      User: tx.User,
    }));
    transactionLoading.value = false;

    return transactionsData.value;
  } catch (error) {
    transactionLoading.value = false;
    console.error("Failed to fetch transactions:", error);
    return [];
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
  transactionCurrentPage.value = page;
};

const transactionandleRowsPerPageChange = (rpp) => {
  transactionRowsPerPage.value = rpp;
  transactionCurrentPage.value = 1; // reset to first page
};

const clearData = () => {
  rowsPerPage.value = 5;
  userSearch.value = null;
  selectedRole.value = "Show All";
  filteredUsers.value = [];
  isSearchingUsers.value = false;
  isFilteringByRole.value = false;
  getUsers();
};
const clearTransactions = () => {
  transactionRowsPerPage.value = 5;
  transactionSearch.value = null;
  selectedType.value = "Show All";
  selectedTransaction.value = "Show All";
  filteredTransactions.value = [];
  isSearchingTransaction.value = false;
  isFilteringStatus.value = false;
  getUsers();
};

const searchUsers = () => {
  const query = userSearch.value?.toLowerCase().trim();

  // isSearchingUsers.value = !!query;
  isSearchingUsers.value = !!query || isFilteringByRole.value;

  if (!query) {
    filteredUsers.value = [];
  } else {
    const searchableKeys = userColumns
      .map((col) => col.key)
      .filter((key) => key !== "actions");

    filteredUsers.value = usersData.value.filter((item) =>
      searchableKeys.some((key) => {
        const value = item[key];
        return value != null && String(value).toLowerCase().includes(query);
      })
    );
  }

  currentPage.value = 1;
};

const filterByRole = (role) => {
  if (!role || role === "Show All") {
    isFilteringByRole.value = false;

    filteredUsers.value = isSearchingUsers.value ? filteredUsers.value : [];

    return;
  }

  isFilteringByRole.value = true;

  const baseData = isSearchingUsers.value
    ? filteredUsers.value
    : usersData.value;

  filteredUsers.value = baseData.filter(
    (user) => user.role?.toLowerCase() === role.toLowerCase()
  );

  currentPage.value = 1;
};

/**
 * Transaction Table
 */

const searchTransactions = () => {
  const query = transactionSearch.value?.toLowerCase().trim();

  isSearchingTransaction.value =
    !!query || isFilteringStatus.value || isFilteringType.value;

  if (!query) {
    filteredTransactions.value = [];
  } else {
    const searchableKeys = transactionsColumns
      .map((col) => col.key)
      .filter((key) => key);

    filteredTransactions.value = transactionsData.value.filter((item) =>
      searchableKeys.some((key) => {
        const value = item[key];
        return value != null && String(value).toLowerCase().includes(query);
      })
    );
  }

  transactionCurrentPage.value = 1;
};

const filterByStatus = (status) => {
  if (!status || status === "Show All") {
    isFilteringStatus.value = false;

    filteredTransactions.value = isSearchingTransaction.value
      ? filteredTransactions.value
      : [];

    return;
  }

  isFilteringStatus.value = true;

  const baseData = isSearchingTransaction.value
    ? filteredTransactions.value
    : transactionsData.value;

  filteredTransactions.value = baseData.filter(
    (tx) => tx.paymentStatus?.toLowerCase() === status.toLowerCase()
  );

  transactionCurrentPage.value = 1;
};

const filterByType = (type) => {
  if (!type || type === "Show All") {
    isFilteringType.value = false;

    filteredTransactions.value = isSearchingTransaction.value
      ? filteredTransactions.value
      : [];
    return;
  }

  isFilteringType.value = true;

  const baseData = isSearchingTransaction.value
    ? filteredTransactions.value
    : transactionsData.value;

  filteredTransactions.value = baseData.filter(
    (tx) => tx.type === type.toLowerCase()
  );

  transactionCurrentPage.value = 1;
};

onMounted(() => {
  getUsers();
  getTransactions();
  getAnalytics();
});

watch(selectedRole, (role) => {
  filterByRole(role);
});

watch(selectedType, (status) => {
  filterByStatus(status);
});

watch(selectedTransaction, (type) => {
  filterByType(type);
});
</script>

<style lang="scss" scoped></style>
