<template>
  <teleport to="body">
    <div
      v-if="show"
      ref="root"
      class="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity"
      :class="[isClosing ? 'opacity-0' : 'opacity-100', customClass]">
      <div
        :class="[
          'w-full rounded-lg border border-[#1C1C1C] shadow-xl transition-transform relative',
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100',
          width ?? 'max-w-[500px]',
          isGradient
            ? 'bg-[radial-gradient(76.25%_76.25%_at_50%_0%,rgba(0,142,126,0.5)_0%,rgba(0,0,0,0)_100%)]'
            : 'bg-[#121212]',
          'p-6 text-white',
        ]">
        <!-- Loading Overlay -->

        <div
          v-if="loading"
          class="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg z-50">
          <div class="relative flex flex-col items-center">
            <UiIcon
              icon="icon:ai-icon"
              custom-class="h-48 w-48 text-[#00BDA7] animate-pulse"></UiIcon>
            <p class="absolute bottom-0">Generating Analysis...</p>
          </div>
        </div>

        <!-- Header -->
        <header class="mb-4">
          <h2 class="text-lg font-semibold text-white text-left">
            {{ title }}
          </h2>
          <p class="text-sm text-gray-400 text-left mt-1">
            {{ description }}
          </p>
        </header>

        <!-- Content -->
        <section
          class="max-h-[60vh] overflow-y-auto hide-scrollbar py-2 opacity-100"
          :class="{ 'opacity-50': loading }">
          <slot name="body"></slot>
        </section>

        <!-- Footer -->
        <footer class="mt-6 flex flex-col gap-3">
          <div v-if="type === 'confirmAlert'" class="flex flex-col gap-3">
            <button
              class="w-full py-3 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-500"
              @click="confirm"
              :disabled="loading">
              I am sure
            </button>
            <button
              class="w-full py-3 rounded-md bg-gray-700 text-gray-200 font-medium hover:bg-gray-600"
              @click="close"
              :disabled="loading">
              I change my mind
            </button>
          </div>

          <div v-else-if="type === 'successAlert'">
            <button
              class="w-full py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500"
              @click="close"
              :disabled="loading">
              Return
            </button>
          </div>

          <div v-else-if="type === 'errorAlert'">
            <button
              class="w-full py-3 rounded-md bg-red-600 text-white font-semibold hover:bg-red-500"
              @click="close"
              :disabled="loading">
              Return
            </button>
          </div>

          <div v-else-if="type === 'form'">
            <button
              class="w-full py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500"
              @click="save"
              :disabled="loading">
              Save
            </button>
          </div>

          <div v-else>
            <slot name="footer"></slot>
          </div>
        </footer>

        <!-- Close Icon -->
        <button
          class="absolute top-2 right-2 bg-gray-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm hover:bg-red-500"
          @click="close"
          :disabled="loading">
          x
        </button>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const props = defineProps({
  show: Boolean,
  loading: {
    type: Boolean,
    default: false,
  },
  type: String,
  title: String,
  description: String,
  isGradient: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: null,
  },
  customClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close", "confirm", "save"]);

const root = ref(null);
const isClosing = ref(false);

const lockScroll = () => (document.body.style.overflow = "hidden");
const unlockScroll = () => (document.body.style.overflow = "");

const close = () => {
  if (props.loading) return; // prevent closing while loading
  isClosing.value = true;
  setTimeout(() => {
    emit("close");
    isClosing.value = false;
    unlockScroll();
  }, 150);
};

const confirm = () => !props.loading && emit("confirm");
const save = () => !props.loading && emit("save");

onMounted(() => {
  if (props.show) lockScroll();
});
onBeforeUnmount(() => unlockScroll());

watch(
  () => props.show,
  (val) => {
    if (val) lockScroll();
    else unlockScroll();
  }
);
</script>

<style scoped>
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.loader {
  border-style: solid;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
