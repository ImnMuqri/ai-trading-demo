<template>
  <div class="min-h-screen flex items-center justify-center overflow-hidden">
    <div
      class="w-full h-full max-w-[400px] px-8 lg:px-10 mx-5 lg:mx-10 py-6 bg-white rounded-md">
      <h1 class="text-2xl font-semibold text-center my-4 text-gray-800">
        Create an account
      </h1>

      <form @submit.prevent="handleRegister" class="text-gray-700">
        <div class="space-y-4 mb-6">
          <div>
            <UiInput
              label="Name"
              v-model="name"
              placeholder="Enter your name"
              :isDisabled="isLoading"
              type="text" />
          </div>
          <div>
            <UiInput
              label="Email"
              v-model="email"
              placeholder="Enter your email"
              :isDisabled="isLoading"
              type="email" />
          </div>
          <div>
            <UiInput
              label="Password"
              v-model="password"
              placeholder="Enter your password"
              :isDisabled="isLoading"
              type="password" />
          </div>
          <div>
            <UiInput
              label="Country"
              v-model="country"
              placeholder="Malaysia"
              :isDisabled="isLoading"
              type="text" />
          </div>
          <div>
            <UiInput
              label="Phone"
              v-model="phone"
              placeholder="+1234567890"
              :isDisabled="isLoading"
              type="tel" />
          </div>
          <div>
            <UiInput
              label="Referred By"
              v-model="referredBy"
              placeholder="Referral code or email"
              :isDisabled="isLoading"
              type="text" />
          </div>
        </div>
        <UiButton
          :isLoading="isLoading"
          type="submit"
          class="w-full bg-[#00BDA7] text-white py-2 rounded-md hover:bg-[#00CDB5] transition">
          Sign Up
        </UiButton>
      </form>
      <NuxtLink
        to="/login"
        class="flex gap-1 text-sm items-center justify-center mt-4 text-[#00CDB5] hover:text-[#00CDB5]/70 cursor-pointer">
        <UiIcon icon="mingcute:arrow-left-fill" customClass="w-4 h-4"></UiIcon>
        <p class="font-semibold">Back to login</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { showToast } from "~/composables/useToastMessage";

definePageMeta({
  layout: "default",
});

const auth = useAuthStore();

const name = ref("");
const email = ref("");
const password = ref("");
const country = ref("");
const phone = ref("");
const referredBy = ref(null);
const isLoading = ref(false);

const toNull = (value) => {
  return value === "" ? null : value;
};

const handleRegister = async () => {
  isLoading.value = true;

  try {
    await auth.register({
      name: toNull(name.value),
      email: toNull(email.value),
      password: toNull(password.value),
      country: toNull(country.value),
      phone: toNull(phone.value),
      referredBy: toNull(referredBy.value),
    });

    showToast("Account created, please login", "success");
    navigateTo("/login");
  } catch (error) {
    showToast(error.message || "Registration failed", "error");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
