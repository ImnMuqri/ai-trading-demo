<template>
  <div class="flex flex-col gap-4 text-white">
    <div class="flex gap-2 justify-end">
      <UiButton variant="outline" @click="openReferral = true"
        >Referral Link</UiButton
      ><UiButton variant="outline" @click="openExternal = true"
        >External Link</UiButton
      >
    </div>
    <div class="flex flex-col xl:flex-row gap-4">
      <UiCard isGradient class="p-4 flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <UiIcon
            icon="qlementine-icons:money-16"
            custom-class="w-3 h-3"
          ></UiIcon>
          <span class="text-sm">Affiliator Profit</span>
        </div>
        <div
          class="w-full xl:w-[350px] px-6 py-2 flex items-center justify-between gap-8"
        >
          <div>
            <p class="text-sm text-[#838383]">Total Profits</p>
            <p class="text-2xl font-semibold text-[#00BDA7]">
              ${{ profitStats.total ?? "0.00" }}
            </p>
          </div>
          <div class="flex flex-col items-end">
            <p class="text-sm text-[#838383]">Profits Today</p>
            <p class="text-2xl font-semibold text-white">
              ${{ profitStats.today ?? "0.00" }}
            </p>
          </div>
        </div>
        <div class="px-6">
          <div class="flex flex-col gap-3 py-3 border-l-[2px] border-[#D9D9D9]">
            <UiProgress
              :progress="[
                profitStats.last7Days ?? 0,
                profitStats.last30Days ?? 0,
                profitStats.last60Days ?? 0,
                profitStats.last90Days ?? 0,
              ]"
              :gradientColors="[['#00AAFF', '#00BDA7']]"
            ></UiProgress>
          </div>
        </div>
        <div class="flex flex-col gap-2 px-6 py-2">
          <div class="flex flex-row justify-between">
            <p class="text-[12px]">Profit last 7 days</p>
            <p class="text-[12px] text-[#00BDA7]">
              ${{ profitStats.last7Days ?? "0.00" }}
            </p>
          </div>
          <div class="flex flex-row justify-between">
            <p class="text-[12px]">Profit last 30 days</p>
            <p class="text-[12px] text-[#00BDA7]">
              ${{ profitStats.last30Days ?? "0.00" }}
            </p>
          </div>
          <div class="flex flex-row justify-between">
            <p class="text-[12px]">Profit last 60 days</p>
            <p class="text-[12px] text-[#00BDA7]">
              ${{ profitStats.last60Days ?? "0.00" }}
            </p>
          </div>
          <div class="flex flex-row justify-between">
            <p class="text-[12px]">Profit last 90 days</p>
            <p class="text-[12px] text-[#00BDA7]">
              ${{ profitStats.last90Days ?? "0.00" }}
            </p>
          </div>
        </div>
      </UiCard>
      <UiCard class="p-4 flex-1 bg-[#0D0D0D]">
        <div class="flex gap-2 items-center">
          <UiIcon icon="humbleicons:users" custom-class="w-4 h-4"></UiIcon>
          <p class="text-sm">Clients Summary</p>
        </div>
        <div class="flex flex-col lg:flex-row justify-center h-full w-full">
          <div
            class="p-10 flex flex-col lg:flex-row justify-around h-full w-full items-center gap-8"
          >
            <div class="flex flex-row items-center gap-8">
              <UiProgress
                type="circle"
                :progress="[
                  clientSummary.total ?? 0,
                  clientSummary.newToday ?? 0,
                ]"
                title="Total Clients"
                custom-class="max-w-[200px]"
                title-class="!text-[#838383] !text-[15px]"
              />

              <div class="flex flex-col gap-1.5 text-white">
                <div>
                  <p class="text-sm text-[#838383]">Total Clients</p>
                  <p class="text-xl font-semibold text-[#00BDA7]">
                    {{ clientSummary.total ?? "0" }}
                  </p>
                </div>

                <div>
                  <p class="text-[12px] text-[#838383]">New Clients Today</p>
                  <p class="text-sm">
                    {{ clientSummary.newToday ?? "0" }}
                  </p>
                </div>
                <div
                  class="h-[2px] bg-gradient-to-r from-[#626262] to-[#1D1D1D00] my-2"
                ></div>
                <div>
                  <p class="text-[12px] text-[#838383]">
                    New Clients Last 30 Days
                  </p>
                  <p class="text-sm">
                    {{ clientSummary.newLast30Days ?? "0" }}
                  </p>
                </div>

                <div>
                  <p class="text-[12px] text-[#838383]">
                    New Clients Last 60 Days
                  </p>
                  <p class="text-sm">
                    {{ clientSummary.newLast60Days ?? "0" }}
                  </p>
                </div>
              </div>
            </div>

            <div class="flex flex-row items-center gap-8">
              <UiProgress
                type="circle"
                :progress="planRingData"
                title="Sub Analysis"
                custom-class="max-w-[200px]"
                title-class="!text-[#838383] !text-[15px]"
              />

              <div class="flex flex-col gap-4 text-white">
                <div
                  v-for="plan in subAnalysis?.analytics?.planCounts || []"
                  :key="plan.id"
                >
                  <div class="flex gap-1 text-[#838383] mb-1">
                    <UiIcon icon="mdi:package-variant" />
                    <p class="text-[12px] text-[#838383]">
                      {{ plan.name }}
                    </p>
                  </div>

                  <p class="text-sm font-semibold">
                    {{ plan.subscriptionCount }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UiCard>
    </div>
    <div>
      <UiCard class="p-4 text-[12px]">
        <div class="flex items-center justify-around">
          <div class="text-center">
            <div>
              <UiIcon
                icon="hugeicons:user-03"
                class="mb-1"
                custom-class="w-4 h-4"
              ></UiIcon>
              <p>Active Users</p>
            </div>
            <p class="text-lg text-[#00BDA7]">
              {{ clientStatus.active ?? "0" }}
            </p>
          </div>
          <div class="text-center">
            <div>
              <UiIcon
                icon="hugeicons:user-03"
                class="mb-1"
                custom-class="w-4 h-4"
              ></UiIcon>
              <p>Inactive Users</p>
            </div>
            <p class="text-lg text-red-500">
              {{ clientStatus.inactive ?? "0" }}
            </p>
          </div>
          <div class="text-center">
            <div>
              <UiIcon
                icon="hugeicons:user-03"
                class="mb-1"
                custom-class="w-4 h-4"
              ></UiIcon>
              <div class="flex gap-1 items-center">
                <p>Client Account Expiring</p>
                <p class="text-[#838383] text-[11px]">- in 10 days</p>
              </div>
            </div>

            <p class="text-lg text-yellow-500">
              {{ clientStatus.expiringSoon ?? "0" }}
            </p>
          </div>
        </div>
      </UiCard>
      <div class="flex flex-col">
        <div class="pt-5 flex gap-2 text-white text-[12px]">
          <div
            class="px-5 py-2.5 rounded-t-md border cursor-pointer transition-all"
            :class="
              activeTab === 'clients'
                ? 'bg-[#00BDA7]/50 border-[#00BDA7]'
                : 'bg-[#0D0D0D] text-[#838383] border-[#1C1C1C] hover:text-white'
            "
            @click="activeTab = 'clients'"
          >
            Clients
          </div>
          <div class="cursor-not-allowed" title="Upcoming Features">
            <div
              class="px-5 py-2.5 rounded-t-md border pointer-events-none transition-all"
              :class="
                activeTab === 'transactions'
                  ? 'bg-[#00BDA7]/50  border-[#00BDA7]'
                  : 'bg-[#0D0D0D] text-[#838383] border-[#1C1C1C] hover:text-white'
              "
              @click="activeTab = 'transactions'"
            >
              Affiliate Approval
            </div>
          </div>
        </div>
        <div class="flex flex-col 2xl:flex-row gap-4">
          <!-- User List -->
          <UiCard
            v-show="activeTab === 'clients'"
            class="py-2 text-[12px] h-full flex-1"
            custom-class="!rounded-t-none !rounded-tr-lg"
          >
            <div
              class="flex items-center gap-2 px-4 border-b border-[#1C1C1C] pb-2"
            >
              <UiIcon icon="mdi:users" custom-class="w-4 h-4"></UiIcon>
              <p class="text-lg font-semibold py-2 text-sm">Clients List</p>
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
    <UiModal
      :show="openReferral"
      title="Referrals"
      :description="`Invite friends to experience AI Trading and receive commission from their subscription.`"
      width="max-w-[500px]"
      @confirm="handleDeleteConfirmed"
      @close="(openReferral = false), (openReferralForm = false)"
    >
      <template #body>
        <div
          v-if="!referralLink"
          class="flex flex-col justify-center items-center text-center"
        >
          <UiIcon icon="icon:ai-confuse" custom-class="w-32 h-32" />
          <div>
            <p class="capitalize text-sm fonts-semibold">
              No Referral Code Created
            </p>
            <p class="text-[12px]">Create code for potential clients</p>
          </div>
          <UiButton @click="openReferralForm = true" class="!rounded-full my-4">
            Create Referral Code
            <template #icon-left>
              <UiIcon
                icon="hugeicons:add-01"
                custom-class="w-4 h-4 "
              /> </template
          ></UiButton>
        </div>
        <div v-if="openReferralForm" class="flex flex-col gap-2 px-2">
          <div>
            <UiButton
              variant="icon"
              icon="weui:back-filled"
              class="border-0 !w-fit !p-0 mb-2"
              @click="closeModal('referral')"
            ></UiButton>
            <p
              class="text-xl mb-1 font-semibold bg-gradient-to-r from-[#00AAFF] to-[#00BDA7] bg-clip-text text-transparent"
            >
              Create Referral Code
            </p>
            <p class="text-[12px] mb-2 italic">
              {{ isEditMode ? "Updated At" : "Created at" }}
              {{
                $formatDate(new Date().toLocaleDateString(), { withTime: true })
              }}
            </p>
          </div>
          <UiInput v-model="referralForm.name" placeholder="Name"></UiInput>
          <UiInput
            v-model="referralForm.description"
            placeholder="Description"
            type="textarea"
          ></UiInput>
          <UiButton class="!rounded-full" @click="submitReferral">
            {{ submitButtonLabel }}
          </UiButton>
          <UiButton
            v-if="isEditMode"
            @click="deleteReferralLink(editingIndex)"
            class="!rounded-full bg-red-500 border border-red-500 hover:bg-red-600"
          >
            Delete Referral</UiButton
          >
        </div>
        <div
          v-if="referralLink && !openReferralForm"
          class="flex flex-col text-center gap-4 w-full"
        >
          <img src="assets/bg/referralPic.svg" class="w-full h-[15vh]" />
          <div class="grid grid-cols-1 gap-2">
            <p
              class="text-2xl font-semibold bg-gradient-to-r from-[#00AAFF] to-[#00BDA7] bg-clip-text text-transparent"
            >
              Iman Muqri
            </p>
            <p>Id: 66666</p>
          </div>
          <div class="flex flex-row gap-4 justify-evenly items-center">
            <div
              class="h-[2px] w-full bg-gradient-to-l from-[#838383] to-[#1D1D1D00]"
            ></div>
            <p class="text-[12px] whitespace-nowrap">Referral Link</p>
            <div
              class="h-[2px] w-full bg-gradient-to-r from-[#838383] to-[#1D1D1D00]"
            ></div>
          </div>
          <UiList
            :parameters="referralLink.referralLinks"
            :totalItems="referralLink.referralLinks.length"
            :currentPage="refCurrentPage"
            :rowsPerPage="refRowsPerPage"
            @page-changed="refPageChange"
            @rows-per-page-changed="refRowsChange"
            pagination
          >
            <template #parameters="{ parameters }">
              <div
                v-for="(link, idx) in parameters"
                class="overflow-y-auto mb-2"
              >
                <div
                  class="flex justify-between items-center py-2 px-4 bg-[#323232] rounded-lg text-left"
                >
                  <div>
                    <a :href="link.url" target="_blank" class="w-full text-sm"
                      >{{ link.name }}
                    </a>
                    <p class="text-[11px]">{{ link.description }}</p>
                  </div>
                  <div class="flex gap-2">
                    <div
                      class="flex items-center justify-center h-6 w-6 rounded-full bg-[#00AAFF]"
                    >
                      <UiIcon
                        icon="solar:copy-bold"
                        custom-class="h-3 w-3  cursor-pointer"
                        :class="
                          copied
                            ? 'text-[#00BDA7]'
                            : 'text-white hover:text-white/80'
                        "
                        @click="copyLink(link.url)"
                      />
                    </div>
                    <div
                      class="flex items-center justify-center h-6 w-6 rounded-full bg-[#00BDA780] border-[1px] border-[#00BDA7]"
                    >
                      <UiIcon
                        icon="cuida:edit-outline"
                        custom-class="h-3 w-3  cursor-pointer"
                        :class="
                          copied
                            ? 'text-[#00BDA7]'
                            : 'text-white hover:text-white/80'
                        "
                        @click="openEditReferralForm(idx)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #footer>
              <UiButton
                @click="openReferralForm = true"
                class="!rounded-full my-4 w-full"
              >
                Create Referral Code
                <template #icon-left>
                  <UiIcon
                    icon="hugeicons:add-01"
                    custom-class="w-4 h-4 "
                  /> </template></UiButton
            ></template>
          </UiList>
        </div> </template
    ></UiModal>
    <UiModal
      :show="openExternal"
      title="External Links"
      :description="`Invite friends to experience AI Trading and receive commission from their subscription.`"
      width="max-w-[500px]"
      @close="openExternal = false"
    >
      <template #body>
        <div
          v-if="!externalLink"
          class="flex flex-col justify-center items-center text-center"
        >
          <UiIcon icon="icon:ai-confuse" custom-class="w-32 h-32" />
          <div>
            <p class="capitalize text-sm fonts-semibold">No Link Created</p>
            <p class="text-[12px]">Create link for your client reference</p>
          </div>
          <UiButton @click="openExternalForm = true" class="!rounded-full my-4">
            Create External Link
            <template #icon-left>
              <UiIcon
                icon="hugeicons:add-01"
                custom-class="w-4 h-4 "
              /> </template
          ></UiButton>
        </div>

        <div v-if="openExternalForm" class="flex flex-col gap-2 px-2">
          <div>
            <UiButton
              variant="icon"
              icon="weui:back-filled"
              class="border-0 !w-fit !p-0 mb-2"
              @click="closeModal('external')"
            ></UiButton>
            <p
              class="text-xl mb-1 font-semibold bg-gradient-to-r from-[#00AAFF] to-[#00BDA7] bg-clip-text text-transparent"
            >
              {{ isExternalEdit ? "Update Your Link" : "Create New Link" }}
            </p>
            <p class="text-[12px] mb-2 italic">
              {{ isExternalEdit ? "Updated at" : "Created at" }}
              {{
                $formatDate(new Date().toLocaleDateString(), { withTime: true })
              }}
            </p>
          </div>
          <UiInput v-model="externalForm.name" placeholder="Name"></UiInput>
          <UiInput v-model="externalForm.url" placeholder="Url"></UiInput>
          <UiInput
            v-model="externalForm.description"
            placeholder="Description"
            type="textarea"
          ></UiInput>
          <UiButton class="!rounded-full" @click="submitExternal">{{
            externalButtonLabel
          }}</UiButton>
          <UiButton
            v-if="isExternalEdit"
            class="!rounded-full bg-red-500 border border-red-500"
            @click="deleteExternalLink(externalEditingIndex)"
          >
            Delete Link</UiButton
          >
        </div>
        <div
          v-if="externalLink && !openExternalForm"
          class="flex flex-col text-center gap-4 w-full"
        >
          <img src="assets/bg/LinkPic.svg" class="w-full h-[15vh]" />
          <div class="grid grid-cols-1 gap-2">
            <p
              class="text-2xl font-semibold bg-gradient-to-r from-[#00AAFF] to-[#00BDA7] bg-clip-text text-transparent"
            >
              Iman Muqri
            </p>
            <p>Id: 66666</p>
          </div>
          <div class="flex flex-row gap-4 justify-evenly items-center">
            <div
              class="h-[2px] w-full bg-gradient-to-l from-[#838383] to-[#1D1D1D00]"
            ></div>
            <p class="text-[12px] whitespace-nowrap">External Link</p>
            <div
              class="h-[2px] w-full bg-gradient-to-r from-[#838383] to-[#1D1D1D00]"
            ></div>
          </div>
          <UiList
            :parameters="externalLink.externalLinks"
            :totalItems="externalLink.externalLinks.length"
            :currentPage="extCurrentPage"
            :rowsPerPage="extRowsPerPage"
            @page-changed="extPageChange"
            @rows-per-page-changed="extRowsChange"
            pagination
          >
            <template #parameters="{ parameters }">
              <div
                v-for="(link, idx) in parameters"
                class="overflow-y-auto mb-2"
              >
                <div
                  class="flex justify-between items-center py-2 px-4 bg-[#323232] rounded-lg text-left"
                >
                  <div>
                    <a :href="link.url" target="_blank" class="w-full text-sm"
                      >{{ link.name }}
                    </a>
                    <p class="text-[11px]">{{ link.description }}</p>
                  </div>
                  <div class="flex gap-2">
                    <div
                      class="flex items-center justify-center h-6 w-6 rounded-full bg-[#00AAFF]"
                    >
                      <UiIcon
                        icon="solar:copy-bold"
                        custom-class="h-3 w-3  cursor-pointer"
                        :class="
                          copied
                            ? 'text-[#00BDA7]'
                            : 'text-white hover:text-white/80'
                        "
                        @click="copyLink(link.url)"
                      />
                    </div>
                    <div
                      class="flex items-center justify-center h-6 w-6 rounded-full bg-[#00BDA780] border-[1px] border-[#00BDA7]"
                    >
                      <UiIcon
                        icon="cuida:edit-outline"
                        custom-class="h-3 w-3  cursor-pointer"
                        :class="
                          copied
                            ? 'text-[#00BDA7]'
                            : 'text-white hover:text-white/80'
                        "
                        @click="openEditExternal(idx)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #footer>
              <UiButton
                @click="openExternalForm = true"
                class="!rounded-full my-4 w-full"
              >
                Create New Link
                <template #icon-left>
                  <UiIcon
                    icon="hugeicons:add-01"
                    custom-class="w-4 h-4 "
                  /> </template></UiButton
            ></template>
            <template #pagination></template>
          </UiList>
        </div> </template
    ></UiModal>
  </div>
</template>

<script setup>
/* ===================== IMPORTS ===================== */
import { ref, computed, onMounted } from "vue";
import { showToast } from "~/composables/useToastMessage";

/* ===================== PAGE META ===================== */
definePageMeta({
  layout: "layout",
  middleware: "auth-client",
  roles: ["affiliate", "admin", "developer"],
});

const { $api } = useNuxtApp();

const activeTab = ref("clients");

const currentPage = ref(1);
const rowsPerPage = ref(5);

const refCurrentPage = ref(1);
const refRowsPerPage = ref(5);

const extCurrentPage = ref(1);
const extRowsPerPage = ref(5);

const userLoading = ref(false);
const isUpdateLoading = ref(false);
const isDeleteLoading = ref(false);
const referralLinksLoading = ref(false);
const externalLinksLoading = ref(false);
const isReferralSubmitting = ref(false);
const isExternalSubmitting = ref(false);
const isReferralDeleting = ref(false);
const isExternalDeleting = ref(false);

const openReferral = ref(false);
const openExternal = ref(false);
const openConfirm = ref(false);
const openUpdate = ref(false);
const openReferralForm = ref(false);
const openExternalForm = ref(false);

const selectedUser = ref({
  id: null,
  name: "",
  email: "",
  role: "",
  isActive: "",
});
const copied = ref(false);
const editingIndex = ref(null);
const externalEditingIndex = ref(null);

const subLoading = ref(false);
const subAnalysis = ref(null);

const usersData = ref([]);
const clientList = ref([]);
const affiliateInfo = ref({});
const profitStats = ref({});
const clientSummary = ref({});
const clientStatus = ref({});

const referralLink = ref({ referralLinks: [] });
const externalLink = ref({ externalLinks: [] });

/* ===================== TABLE COLUMNS ===================== */
const userColumns = [
  { label: "Name", key: "name" },
  { label: "Plan", key: "plan" },
  { label: "Status", key: "status" },
  { label: "Joined At", key: "joinedAt" },
  { label: "Expiry Date", key: "expiryDate" },
];

/* ===================== REFERRAL FORM ===================== */
const emptyReferralForm = () => ({ name: "", description: "" });
const referralForm = ref(emptyReferralForm());

const isEditMode = computed(() => editingIndex.value !== null);
const submitButtonLabel = computed(() =>
  isEditMode.value ? "Update Referral Code" : "Generate Referral Code"
);

/* ===================== EXTERNAL LINK FORM ===================== */
const externalForm = ref({ name: "", url: "", description: "" });
const isExternalEdit = computed(() => externalEditingIndex.value !== null);
const externalButtonLabel = computed(() =>
  isExternalEdit.value ? "Update External Link" : "Generate External Link"
);

const copyLink = async (url) => {
  if (!url) return;
  try {
    await navigator.clipboard.writeText(url);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch (err) {
    console.error("Failed to copy", err);
  }
};

// Affiliate
const getAffiliateStats = async () => {
  userLoading.value = true;
  try {
    const res = await $api.get("/api/affiliate/stats");
    const data = res.data.data || {};

    affiliateInfo.value = data.affiliate ?? {};
    profitStats.value = data.affiliatorProfit ?? {};
    clientSummary.value = data.clientSummary ?? {};
    clientStatus.value = data.clientStatus ?? {};
    clientList.value = data.clientList ?? [];
    usersData.value = [...clientList.value];
  } catch (err) {
    console.error("Failed to fetch affiliate stats:", err);
    showToast("Failed to fetch affiliate stats", "error");
  } finally {
    userLoading.value = false;
  }
};

const getSubStats = async () => {
  subLoading.value = true;
  try {
    const res = await $api.get("/api/admin/subscription/analytics");
    subAnalysis.value = res.data.data ?? null;
    console.log(subAnalysis.value);
  } catch (error) {
    console.error("Error in fetching sub analysis stats: ", error);
  }
};

const planRingData = computed(() => {
  const plans = subAnalysis.value?.analytics?.planCounts ?? [];
  if (!plans.length) return [];

  const max = Math.max(...plans.map((p) => p.subscriptionCount ?? 0), 1);

  return plans.map((p) =>
    Math.min(Math.round(((p.subscriptionCount ?? 0) / max) * 100), 100)
  );
});

// Referral
const getReferralLinks = async () => {
  referralLinksLoading.value = true;
  try {
    const res = await $api.get("/api/affiliate/referral-links");
    referralLink.value = res.data?.data ?? { referralLinks: [] };
  } catch (err) {
    console.error(err);
    showToast("Unable to fetch referral links", "error");
  } finally {
    referralLinksLoading.value = false;
  }
};

const openEditReferralForm = (idx) => {
  const selected = referralLink.value.referralLinks[idx];
  if (!selected) return;
  editingIndex.value = idx;
  referralForm.value = {
    name: selected.name,
    description: selected.description,
  };
  openReferralForm.value = true;
};

const submitReferral = async () => {
  if (isReferralSubmitting) return;
  isReferralSubmitting.value = true;
  if (!referralForm.value.name) return;
  try {
    if (isEditMode.value) {
      const linkId = referralLink.value.referralLinks[editingIndex.value].id;
      await $api.put(
        `/api/affiliate/referral-links/${linkId}`,
        referralForm.value
      );
      referralLink.value.referralLinks[editingIndex.value] = {
        ...referralLink.value.referralLinks[editingIndex.value],
        ...referralForm.value,
      };
    } else {
      const res = await $api.post(
        "/api/affiliate/referral-links",
        referralForm.value
      );
      referralLink.value.referralLinks.push(res.data.data);
    }
    openReferralForm.value = false;
    referralForm.value = emptyReferralForm();
    editingIndex.value = null;
  } catch (err) {
    console.error("Referral submit failed", err);
  } finally {
    isReferralSubmitting.value = false;
  }
};
const deleteReferralLink = async (idx) => {
  if (isReferralDeleting) return;
  isReferralDeleting.value = true;
  if (idx === null || idx === undefined) return;
  const link = referralLink.value.referralLinks[idx];
  if (!link?.id) return;

  try {
    await $api.delete(`/api/affiliate/referral-links/${link.id}`);
    referralLink.value.referralLinks.splice(idx, 1);
    showToast("Referral link deleted", "success");

    if (editingIndex.value === idx) {
      openReferralForm.value = false;
      editingIndex.value = null;
      referralForm.value = emptyReferralForm();
    }
  } catch (err) {
    console.error(err);
    showToast("Failed to delete referral link", "error");
  } finally {
    isReferralDeleting.value = true;
  }
};

// External
const getExternalLinks = async () => {
  externalLinksLoading.value = true;
  try {
    const res = await $api.get("/api/affiliate/external-links");
    externalLink.value = res.data?.data ?? { externalLinks: [] };
  } catch (err) {
    console.error(err);
    showToast("Unable to fetch external links", "error");
  } finally {
    externalLinksLoading.value = false;
  }
};

const openEditExternal = (idx) => {
  const link = externalLink.value.externalLinks[idx];
  if (!link) return;
  externalEditingIndex.value = idx;
  externalForm.value = {
    name: link.name,
    url: link.url,
    description: link.description,
  };
  openExternalForm.value = true;
};

const submitExternal = async () => {
  if (isExternalSubmitting) return;
  isExternalSubmitting.value = true;
  if (!externalForm.value.name || !externalForm.value.url) return;
  try {
    if (isExternalEdit.value) {
      const link = externalLink.value.externalLinks[externalEditingIndex.value];
      await $api.put(
        `/api/affiliate/external-links/${link.id}`,
        externalForm.value
      );
      externalLink.value.externalLinks[externalEditingIndex.value] = {
        ...link,
        ...externalForm.value,
      };
    } else {
      const res = await $api.post(
        "/api/affiliate/external-links",
        externalForm.value
      );
      externalLink.value.externalLinks.push(res.data.data);
    }
    openExternalForm.value = false;
    externalEditingIndex.value = null;
    externalForm.value = { name: "", url: "", description: "" };
    showToast("External link saved", "success");
  } catch {
    showToast("Failed to save external link", "error");
  } finally {
    isExternalSubmitting.value = false;
  }
};
const deleteExternalLink = async (idx) => {
  if (isExternalDeleting.value) return;
  if (idx === null || idx === undefined) return;

  const link = externalLink.value.externalLinks[idx];
  if (!link?.id) return;

  isExternalDeleting.value = true;

  try {
    await $api.delete(`/api/affiliate/external-links/${link.id}`);
    externalLink.value.externalLinks.splice(idx, 1);
    showToast("External link deleted successfully", "success");

    if (externalEditingIndex.value === idx) {
      openExternalForm.value = false;
      externalEditingIndex.value = null;
      externalForm.value = { name: "", url: "", description: "" };
    }
  } catch (err) {
    console.error(err);
    showToast("Failed to delete external link", "error");
  } finally {
    isExternalDeleting.value = false;
  }
};

const closeModal = (type) => {
  switch (type) {
    case "referral":
      openReferralForm.value = false;
      editingIndex.value = null;
      referralForm.value = emptyReferralForm();
      break;
    case "external":
      openExternalForm.value = false;
      externalEditingIndex.value = null;
      externalForm.value = { name: "", url: "", description: "" };
      break;
  }
};

// User
const confirmDelete = (user) => {
  selectedUser.value = user;
  openConfirm.value = true;
};

const handleDeleteConfirmed = async () => {
  if (!selectedUser.value.id) return;
  isDeleteLoading.value = true;
  try {
    await $api.delete(`/api/admin/users/${selectedUser.value.id}`);
    usersData.value = usersData.value.filter(
      (u) => u.id !== selectedUser.value.id
    );
    showToast("User deleted successfully", "success");
    openConfirm.value = false;
    selectedUser.value = null;
  } catch (err) {
    showToast(err.response?.data?.message ?? "Error", "error");
  } finally {
    isDeleteLoading.value = false;
  }
};

const updateModal = (user) => {
  selectedUser.value = { ...user };
  openUpdate.value = true;
};

const saveChanges = async () => {
  if (!selectedUser.value.id || isUpdateLoading.value) return;
  isUpdateLoading.value = true;
  try {
    const res = await $api.put(
      `/api/admin/users/${selectedUser.value.id}`,
      selectedUser.value
    );
    usersData.value = usersData.value.map((u) =>
      u.id === res.data.data.id ? res.data.data : u
    );
    showToast("User updated successfully", "success");
    openUpdate.value = false;
  } catch (err) {
    showToast("Failed to update user", "error");
    console.error(err);
  } finally {
    isUpdateLoading.value = false;
  }
};

const handlePageChange = (page) => (currentPage.value = page);
const handleRowsPerPageChange = (rpp) => {
  rowsPerPage.value = rpp;
  currentPage.value = 1;
};
const refPageChange = (page) => (refCurrentPage.value = page);
const refRowsChange = (rpp) => {
  refRowsPerPage.value = rpp;
  refCurrentPage.value = 1;
};
const extPageChange = (page) => (extCurrentPage.value = page);
const extRowsChange = (rpp) => {
  extRowsPerPage.value = rpp;
  extCurrentPage.value = 1;
};

onMounted(() => {
  getAffiliateStats();
  getSubStats();
  getReferralLinks();
  getExternalLinks();
});
</script>

<style lang="scss" scoped></style>
