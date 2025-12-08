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
                icon="cuida:edit-outline"
                custom-class="w-4 h-4 text-[#00BDA7]"
                class="block lg:hidden" />
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
      <div class="grid grid-cols-1 gap-4 w-full lg:w-[500px]">
        <UiInput
          v-model="profileData.name"
          label="Name"
          placeholder="Enter here.."
          :isReadonly="!isEditing"
          dark></UiInput>
        <UiInput
          v-model="profileData.email"
          label="Email"
          placeholder="Enter here.."
          :isReadonly="!isEditing"
          dark></UiInput>
        <UiInput
          v-model="profileData.phone"
          label="Phone Number"
          placeholder="Enter here.."
          :isReadonly="!isEditing"
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
          custom-class="pointer-events-none capitalize"
          :isReadonly="!isEditing"
          dark></UiInput>
      </div>
    </div>
    <div class="flex justify-end">
      <UiButton @click="updateUserProfile">Save</UiButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
definePageMeta({
  title: "Basic Information",
  layout: "layout",
  middleware: "auth",
});
const { $api } = useNuxtApp();
const isEditing = ref(false);

const profileData = ref({
  id: null,
  name: null,
  email: null,
  role: null,
  phone: null,
  country: null,
  isEmailVerified: null,
});

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
    console.log("User Profile Data:", data);
    return profileData.value;
  } catch (error) {
    console.error("Unable to load user profile", error);
    return null;
  }
};

const updateUserProfile = async (profileData) => {
  try {
    const res = await $api.put("/api/user/profile", {
      name: profileData.name,
      email: profileData.email,
      country: profileData.country,
      phone: profileData.phone,
    });
    console.log("Profile updated:", res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to update profile:", error);
    return null;
  }
};

onMounted(() => {
  getUserProfile();
});
</script>

<style lang="scss" scoped></style>
