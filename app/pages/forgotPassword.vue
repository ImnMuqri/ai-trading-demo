<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[#0D0D0D] overflow-hidden">
    <div class="w-full max-w-sm px-6 mx-10 py-12">
      <h1 class="text-2xl font-semibold text-center my-8 text-gray-800">
        Forgot your password?
      </h1>

      <form @submit.prevent="handleLogin" class="text-gray-700">
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

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useAuth } from "@/composables/auth";
import { showToast } from "~/composables/useToastMessage";

const { login, loading } = useAuth();
const email = ref("");
const password = ref("");
const expanded = ref(false);
const containerRef = ref(null);
const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  try {
    await login(email.value, password.value);
    navigateTo("/dashboard");
    isLoading.value = false;
    showToast("Successfully logged in", "success");
  } catch (e) {
    // alert("Invalid email or password");
    isLoading.value = false;
    showToast("Invalid email or password", "error");
  }
};
</script>

<style scoped>
@keyframes slide {
  0% {
    left: 0;
  }
  50% {
    left: 75%;
  }
  100% {
    left: 0;
  }
}
.animate-slide {
  animation: slide 1s ease-in-out infinite;
}
</style>
