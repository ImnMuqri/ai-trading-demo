<template>
  <section
    class="relative flex flex-col items-center justify-center min-h-screen bg-[#0D0D0D] text-center overflow-hidden">
    <!-- Glowing floating spheres -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="glow glow1"></div>
      <div class="glow glow2"></div>
    </div>

    <div class="relative z-10 max-w-2xl px-6">
      <div class="mb-4 grid grid-cols-1 gap-4">
        <div class="flex items-center justify-center gap-2">
          <div class="text-sky-500 text-[12px] capitalize">
            powered by TrueProTech
          </div>
          <span class="relative flex size-2">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
            <span
              class="relative inline-flex size-2 rounded-full bg-sky-400"></span
          ></span>
        </div>
        <h1 class="text-4xl font-bold text-white">Welcome to AI Trading App</h1>
      </div>
      <p class="text-gray-300 mb-8">
        A modern app built with trusted technologies to help you trade smarter.
      </p>

      <div class="flex flex-wrap justify-center gap-4">
        <NuxtLink
          to="/login"
          class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition w-full sm:w-auto">
          Get Started
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.glow {
  position: absolute;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  filter: blur(130px);
  opacity: 0.85;
  pointer-events: none;
}

/* Soft teal glow */
.glow1 {
  background: radial-gradient(
    circle,
    rgba(0, 255, 200, 0.7),
    rgba(0, 189, 167, 0.15),
    transparent 80%
  );
  animation: floatSoft1 18s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
}

/* Soft blue glow */
.glow2 {
  background: radial-gradient(
    circle,
    rgba(0, 170, 255, 0.6),
    rgba(0, 120, 255, 0.1),
    transparent 80%
  );
  animation: floatSoft2 22s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
}

/* Smooth floating motion */
@keyframes floatSoft1 {
  0% {
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
  }
  25% {
    top: 40%;
    left: 60%;
    transform: translate(-50%, -50%) scale(1.05);
  }
  50% {
    top: 55%;
    left: 55%;
    transform: translate(-50%, -50%) scale(0.95);
  }
  75% {
    top: 50%;
    left: 40%;
    transform: translate(-50%, -50%) scale(1.1);
  }
  100% {
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes floatSoft2 {
  0% {
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
  }
  25% {
    top: 50%;
    left: 35%;
    transform: translate(-50%, -50%) scale(1.08);
  }
  50% {
    top: 40%;
    left: 45%;
    transform: translate(-50%, -50%) scale(0.92);
  }
  75% {
    top: 60%;
    left: 60%;
    transform: translate(-50%, -50%) scale(1.07);
  }
  100% {
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
