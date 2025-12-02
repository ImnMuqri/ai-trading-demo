<template>
  <div class="min-h-screen flex items-center justify-center overflow-hidden">
    <div class="w-full max-w-[400px] px-8 lg:px-10 mx-5 lg:mx-10 py-8 bg-white rounded-md">
      <h1 class="text-2xl font-semibold text-center my-6 text-gray-800">
        Forgot your password?
      </h1>

      <form @submit.prevent="handleForgotPassword" class="text-gray-700">
        <div class="mb-4">
          <label class="block mb-1 text-sm">Email</label>
          <input
            type="text"
            v-model="email"
            placeholder="example@example.com"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BDA7] text-[12px]" />
        </div>

        <UiButton
          :isLoading="isLoading"
          type="submit"
          class="w-full bg-[#00BDA7] text-white py-2 rounded-md hover:bg-[#00CDB5] transition">
          Send Reset Link
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
const auth = useAuthStore();

const email = ref("");
const isLoading = ref(false);

const handleForgotPassword = async () => {
  if (!email.value) {
    showToast("Please enter your email", "error");
    return;
  }
  isLoading.value = true;
  try {
    await auth.forgotPassword(email.value);
    showToast("Password reset link sent to your email", "success");
  } catch (e) {
    console.log("Forgot password error:", e);
    showToast(e?.data?.message || "Unable to send reset link", "error");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
