<template>
  <div
    class="min-h-screen flex items-center justify-center overflow-hidden bg-[#0C0E12]"
  >
    <div
      class="forgot-background flex flex-col w-full justify-center min-h-[485px] max-w-[390px] px-8 lg:px-10 mx-5 rounded-md"
    >
      <UiIcon
        icon="hugeicons:forgot-password"
        custom-class="!size-20 text-white"
      ></UiIcon>
      <div class="flex flex-col justify-center mb-10 mt-4">
        <h1 class="text-2xl font-medium text-center text-white">
          Forgot password
        </h1>
        <p class="text-[#838383] text-center text-sm">
          Please enter your account’s email to reset your password
        </p>
      </div>

      <form @submit.prevent="handleForgotPassword" class="text-gray-700">
        <div class="mb-4">
          <UiInput
            dark
            v-model="email"
            placeholder="Email"
            :isDisabled="isLoading"
            type="email"
          >
            <template #icon-left>
              <UiIcon
                icon="hugeicons:mail-01"
                custom-class="text-gray-300"
              /> </template
          ></UiInput>
        </div>

        <UiButton
          :isLoading="isLoading"
          type="submit"
          class="w-full !bg-[#0077B3] border border-[#3DBEFF] text-white py-3 !rounded-[41px] hover:bg-[#00CDB5] transition"
        >
          Send Reset Link
        </UiButton>
      </form>
      <NuxtLink
        to="/login"
        class="flex gap-1 text-[12px] items-center justify-center mt-4 text-white cursor-pointer"
      >
        <UiIcon icon="weui:back-outlined" customClass="w-2 h-2"></UiIcon>
        <p class="font-medium">Back</p>
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
    showToast(e?.data?.message || "Unable to send reset link", "error");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.forgot-background {
  background-image: url("~/assets/bg/forgotPassBg.svg");
  background-repeat: no-repeat;
  background-size: cover; /* makes it fill the background */
  background-position: center; /* centers the image */
}
</style>
