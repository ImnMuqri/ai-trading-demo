<template>
  <div class="flex flex-col justify-between gap-6 text-white h-full">
    <div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-6">
          <div class="p-8 rounded-full bg-white"></div>
          <div>
            <div class="flex items-center gap-3">
              <p class="text-xl font-semibold">{{ profileData.name }}</p>
              <UiIcon
                v-if="!isEditing"
                icon="cuida:edit-outline"
                custom-class="w-4 h-4 text-[#00BDA7]"
                class="block lg:hidden hover:cursor-pointer hover:-translate-y-1 transition-all duration-300 ease-in-out"
                @click="editingForm" />
              <UiIcon
                v-if="isEditing"
                icon="cuida:edit-outline"
                custom-class="w-4 h-4 text-red-500"
                class="block lg:hidden hover:cursor-pointer hover:-translate-y-1 transition-all duration-300 ease-in-out"
                @click="closeForm" />
            </div>
            <p class="text-[12px] text-gray-400">{{ profileData.email }}</p>
          </div>
        </div>
        <div>
          <UiButton
            v-if="isEditing"
            @click="closeForm"
            class="hidden lg:block border-red-500 hover:bg-red-500 text-red-500 hover:text-white"
            variant="outline"
            >Close Edit Mode</UiButton
          >
          <UiButton
            v-else
            @click="editingForm"
            class="hidden lg:block"
            variant="outline"
            >Edit Profile</UiButton
          >
        </div>
      </div>
      <div class="grid grid-cols-1 gap-4 w-full mt-4 lg:w-[500px] !text-white">
        <UiInput
          v-model="profileData.name"
          label="Name"
          placeholder="Enter here.."
          :isReadonly="!isEditing"
          :custom-class="isEditing ? 'border !border-[#00BDA7]' : ''"
          dark></UiInput>
        <UiInput
          v-model="profileData.email"
          label="Email"
          placeholder="Enter here.."
          :isReadonly="!isEditing"
          :custom-class="isEditing ? 'border !border-[#00BDA7]' : ''"
          dark></UiInput>
        <UiInput
          v-model="profileData.phone"
          label="Phone Number"
          placeholder="Enter here.."
          :isReadonly="!isEditing"
          :custom-class="isEditing ? 'border !border-[#00BDA7]' : ''"
          dark></UiInput>

        <UiInput
          v-model="profileData.role"
          label="Role"
          placeholder="Your role"
          custom-class="capitalize"
          isReadonly
          dark></UiInput>
        <UiInput
          v-model="profileData.country"
          label="Country "
          placeholder="Your country"
          :isReadonly="!isEditing"
          :custom-class="isEditing ? 'border !border-[#00BDA7]' : ''"
          dark></UiInput>
        <div
          title="Option to enable or disable the dashboard tutorial"
          class="w-fit">
          <ClientOnly>
            <UiRadio
              v-model="isTourActive"
              as-boolean
              :items="['Tutorial Mode*', 'Tutorial Mode*']"
              custom-class="!text-[12px] !w-fit"
          /></ClientOnly>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <UiButton @click="updateUserProfile">Save</UiButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { showToast } from "~/composables/useToastMessage";

definePageMeta({
  title: "Basic Information",
  layout: "layout",
  // middleware: "auth",
  middleware: "auth-client",
});
const { $api } = useNuxtApp();

const { isTourEnabled, setTourEnabled } = useGuidedTour();

const isEditing = ref(false);
const isTourActive = ref(true);
const isUpdating = ref(false);

const profileData = ref({
  id: null,
  name: null,
  email: null,
  role: null,
  phone: null,
  country: null,
  isEmailVerified: null,
});

const roleOptions = [
  { label: "User", value: "user" },
  { label: "Admin", value: "admin" },
  { label: "Affiliate", value: "affiliate" },
  { label: "Developer", value: "developer" },
];

const editingForm = () => (isEditing.value = true);
const closeForm = () => (isEditing.value = false);

const getUserProfile = async () => {
  try {
    const res = await $api.get(`/api/user/profile`);

    const data = res.data.data.user || {};

    // Map the response to your reactive object
    profileData.value = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
      isEmailVerified: data.isEmailVerified,
      country: data.country,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    return profileData.value;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
};

const updateUserProfile = async () => {
  if (isUpdating.value) return;
  isUpdating.value = true;
  try {
    const res = await $api.put("/api/user/profile", {
      name: profileData.value.name,
      email: profileData.value.email,
      country: profileData.value.country,
      phone: profileData.value.phone,
    });
    closeForm();
    showToast("User updated successfully", "success");
    isUpdating.value = false;

    return res.data;
  } catch (error) {
    console.error("Failed to update profile:", error);
    closeForm();
    showToast("Failed to update user profile", "error");
    isUpdating.value = false;

    return null;
  }
};

onMounted(() => {
  getUserProfile();
  isTourActive.value = isTourEnabled();
});

watch(isTourActive, (value) => {
  setTourEnabled(value);
});
</script>

<style lang="scss" scoped></style>
