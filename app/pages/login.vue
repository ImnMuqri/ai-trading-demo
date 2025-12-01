<template>
  <div class="min-h-screen flex items-center justify-center overflow-hidden">
    <transition name="fade-up">
      <div class="w-full max-w-[390px] px-8 mx-10 pb-6 bg-white rounded-lg">
        <div class="text-center my-2">
          <img
            src="~assets/icons/ai-icon.svg"
            alt="AI Icon"
            class="mx-auto mb-2 w-32 h-32" />
          <h1 class="text-2xl font-semibold text-gray-800">Welcome Back</h1>
        </div>

        <form @submit.prevent="handleLogin" class="text-gray-700">
          <div class="mb-4">
            <label class="block mb-1 text-sm">Email</label>
            <input
              type="text"
              v-model="email"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BDA7] text-[12px]" />
          </div>

          <div>
            <label class="block mb-1 text-sm">Password</label>
            <input
              type="password"
              v-model="password"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BDA7] text-[12px]" />
          </div>

          <div class="pb-6">
            <NuxtLink
              to="/forgotpassword"
              class="text-[10px] underline pt-[5px] px-1 cursor-pointer">
              Forgot Password
            </NuxtLink>
          </div>

          <UiButton
            :isLoading="isLoading"
            type="submit"
            class="w-full bg-[#00BDA7] text-white py-2 rounded-md hover:bg-[#00CDB5] transition">
            Login
          </UiButton>
        </form>
        {{ errorMessage }}
        <div class="flex gap-1 text-[12px] items-center justify-center pt-20">
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
const errorMessage = ref("");

const handleLogin = async () => {
  isLoading.value = true;

  try {
    await auth.login(email.value, password.value);

    showToast("Successfully logged in", "success");
    navigateTo("/dashboard");
  } catch (error) {
    errorMessage.value = error.message;
    showToast(error.message || "Invalid email or password", "error");
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
</style>
