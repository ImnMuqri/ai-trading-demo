<template>
  <div
    class="min-h-screen flex items-center justify-center overflow-hidden bg-[#0C0E12] text-white">
    <transition name="fade-up">
      <div
        class="login-background flex flex-col gap-4 w-full max-w-[400px] p-20 px-12 rounded-lg">
        <div class="text-center mb-6">
          <!-- <img
            src="~assets/icons/ai-icon.svg"
            alt="AI Icon"
            class="mx-auto mb-2 w-32 h-32" /> -->
          <h1 class="text-3xl font-semibold text-white mb-1">Sign In</h1>
          <h1 class="text-sm text-[#838383]">Sign in to your account</h1>
        </div>

        <form @submit.prevent="handleLogin" class="text-gray-700">
          <div class="mb-4">
            <UiInput
              dark
              type="text"
              v-model="email"
              placeholder="Username or Email"
              customClass="h-10">
              <template #icon-left>
                <UiIcon
                  icon="hugeicons:user-03"
                  custom-class="text-gray-300" /> </template
            ></UiInput>
          </div>

          <div class="mb-2">
            <UiInput
              dark
              type="password"
              v-model="password"
              placeholder="Password"
              customClass="h-10">
              <template #icon-left>
                <UiIcon
                  icon="heroicons:lock-closed"
                  custom-class="text-gray-300" /> </template
            ></UiInput>
          </div>
          <div class="pb-12">
            <NuxtLink
              to="/forgotpassword"
              class="text-[10px] text-[#00BDA7] underline pt-[5px] px-1 cursor-pointer">
              Forgot Password
            </NuxtLink>
          </div>

          <UiButton
            :isLoading="isLoading"
            type="submit"
            class="w-full bg-[#00BDA7] text-white py-2.5 !rounded-full hover:bg-[#00CDB5] transition">
            Login
          </UiButton>
        </form>

        <div class="flex gap-1 text-[12px] items-center justify-center pt-10">
          <p>Don't have an account?</p>
          <NuxtLink
            to="/register"
            class="underline text-[#00CDB5] font-semibold cursor-pointer">
            Sign Up
          </NuxtLink>
        </div>
      </div>
    </transition>
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

const email = ref("");
const password = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;

  if (!email.value || !password.value) {
    showToast("Please enter both email and password", "warning");
    isLoading.value = false;
    return;
  }

  try {
    await auth.login(email.value, password.value);

    showToast("Successfully logged in", "success");

    navigateTo("/dashboard");
  } catch (err) {
    showToast(err.message, "error");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
.fade-up-enter-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
.fade-up-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.login-background {
  background-image: url("~/assets/bg/LoginBg.svg");
  background-repeat: no-repeat;
  background-size: cover; /* makes it fill the background */
  background-position: center; /* centers the image */
}
</style>
