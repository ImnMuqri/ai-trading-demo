<template>
  <div class="min-h-screen flex items-center justify-center overflow-hidden">
    <div class="w-full h-full max-w-sm px-8 mx-10 py-6 bg-white rounded-md">
      <h1 class="text-2xl font-semibold text-center my-4 text-gray-800">
        Create an account
      </h1>

      <form @submit.prevent="handleLogin" class="text-gray-700">
        <div class="space-y-4 mb-6">
          <div>
            <UiInput
              label="Name"
              v-model="name"
              placeholder="Enter your name"
              type="text"
            />
          </div>
          <div>
            <UiInput
              label="Email"
              v-model="email"
              placeholder="Enter your email"
              type="email"
            />
          </div>
          <div>
            <UiInput
              label="Password"
              v-model="password"
              placeholder="Enter your password"
              type="password"
            />
          </div>
          <div>
            <UiInput
              label="Country"
              v-model="country"
              placeholder="Malaysia"
              type="text"
            />
          </div>
          <div>
            <UiInput
              label="Phone"
              v-model="phone"
              placeholder="+1234567890"
              type="tel"
            />
          </div>
          <div>
            <UiInput
              label="Referred By"
              v-model="referredBy"
              placeholder="Referral code or email"
              type="text"
            />
          </div>
        </div>
        <UiButton
          :isLoading="isLoading"
          type="submit"
          class="w-full bg-[#00BDA7] text-white py-2 rounded-md hover:bg-[#00CDB5] transition"
        >
          Sign Up
        </UiButton>
      </form>
      <NuxtLink
        to="/login"
        class="flex gap-1 text-sm items-center justify-center mt-4 text-[#00CDB5] hover:text-[#00CDB5]/70 cursor-pointer"
      >
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
const name = ref("");
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
      el.style.height = "660px";
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
  animation: slide 1.5s ease-in-out infinite;
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
