<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[#0D0D0D] overflow-hidden">
    <div
      ref="containerRef"
      class="capsule bg-[#00BDA7] h-8 w-[180px] rounded-full flex flex-col items-center justify-center px-4 overflow-hidden transition-all duration-700 ease-out relative text-white">
      <!-- Sliding ball before expand -->
      <div
        v-if="!expanded"
        class="absolute h-4 w-14 bg-white/80 rounded-full animate-slide"></div>

      <!-- Form content fades in after expand -->
      <transition name="fade">
        <div v-if="expanded" class="w-full max-w-sm px-6 mx-10 py-12">
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
            <UiIcon
              icon="mingcute:arrow-left-fill"
              customClass="w-4 h-4"></UiIcon>
            <p class="font-semibold">Back to login</p>
          </NuxtLink>
        </div>
      </transition>
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
onMounted(async () => {
  const el = containerRef.value;
  // Gentle pre-morph pulse
  if (el) {
    el.animate(
      [
        { transform: "scale(1)", opacity: 1 },
        { transform: "scale(1.05)", opacity: 0.9 },
        { transform: "scale(1)", opacity: 1 },
      ],
      { duration: 1000, easing: "ease-in-out" }
    );

    // Morph capsule into full card
    setTimeout(() => {
      el.style.transition = "all 1.5s cubic-bezier(0.65, 0, 0.35, 1)";
      el.style.width = "400px";
      el.style.height = "300px";
      el.style.borderRadius = "1rem";
      el.style.backgroundColor = "#ffffff";
      el.style.color = "#000000";
    }, 1000);

    // Reveal form
    setTimeout(async () => {
      expanded.value = true;
      await nextTick();
    }, 2500);
  }
});
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

/* Soft glow while capsule */
.capsule::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.25),
    transparent 70%
  );
  opacity: 0.5;
  pointer-events: none;
}

/* Fade for form */
.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-enter-active {
  transition: all 0.8s ease-out;
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
