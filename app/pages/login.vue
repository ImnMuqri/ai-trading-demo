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
        <div v-if="expanded" class="w-full max-w-sm px-6 mx-10 py-6">
          <h1 class="text-2xl font-semibold text-center mb-6 text-gray-800">
            Welcome Back
          </h1>

          <form @submit.prevent="login" class="text-gray-700">
            <div class="mb-4">
              <label class="block mb-1">Email</label>
              <input
                type="text"
                v-model="email"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BDA7]" />
            </div>

            <div class="mb-6">
              <label class="block mb-1">Password</label>
              <input
                type="password"
                v-model="password"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BDA7]" />
            </div>

            <button
              type="submit"
              class="w-full bg-[#00BDA7] text-white py-2 rounded-md hover:bg-[#00CDB5] transition">
              Login
            </button>
          </form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "#app";

const email = ref("");
const password = ref("");
const expanded = ref(false);
const containerRef = ref(null);
const router = useRouter();

onMounted(async () => {
  const el = containerRef.value;

  // Gentle pre-morph pulse
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
    el.style.width = "350px";
    el.style.height = "440px";
    el.style.borderRadius = "1rem";
    el.style.backgroundColor = "#ffffff";
    el.style.color = "#000000";
  }, 1000);

  // Reveal form
  setTimeout(async () => {
    expanded.value = true;
    await nextTick();
  }, 2500);
});

function login() {
  if (email.value === "user" && password.value === "12345") {
    useCookie("authToken").value = "loggedin";
    navigateTo("/dashboard");
  } else {
    alert("Invalid login");
  }
}
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
