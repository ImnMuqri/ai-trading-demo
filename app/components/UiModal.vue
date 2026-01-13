<template>
  <teleport to="body">
    <div
      v-if="show"
      ref="root"
      class="px-4 fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity"
      :class="[isClosing ? 'opacity-0' : 'opacity-100', customClass]">
      <div
        :class="[
          ' w-full border border-[#1C1C1C] shadow-xl transition-transform relative py-4 px-6 text-white',
          'modal-scroll hide-scrollbar overflow-y-auto max-h-[80vh] md:max-h-[90vh]',
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100',
          width ?? 'max-w-[500px]',
          type === 'successAlert'
            ? 'success-background h-[420px] !w-[400px] !rounded-3xl border-none py-8 flex flex-col items-center justify-center'
            : type === 'confirmAlert'
            ? 'confirm-background h-[420px] !w-[400px] !rounded-3xl border-none py-8 flex flex-col items-center justify-end'
            : type === 'errorAlert'
            ? 'error-background h-[420px] !w-[400px] !rounded-3xl border-none py-8 flex flex-col items-center justify-center'
            : isGradient
            ? 'bg-[radial-gradient(76.25%_76.25%_at_50%_0%,#008E7E_0%,#0A0A0A_100%)]'
            : ' bg-[#121212]',
          'rounded-lg',
        ]">
        <!-- Loading Overlay -->

        <div
          class="absolute inset-0 bg-[#1C1C1C] flex items-center justify-center rounded-lg z-50 transition-opacity duration-300"
          :class="
            isLoading && type == null
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none'
          ">
          <div class="relative flex flex-col items-center justify-center">
            <iframe
              src="https://lottie.host/embed/19bbd268-9de6-4b34-87af-9b8597b78ad7/T8RAh3Cqqo.lottie"
              class="border-0 !w-[500px] !h-[500px]"></iframe>

            <p
              class="absolute text-sm font-semibold text-gray-400 shimmer-text">
              Generating Ai Analysis
            </p>
          </div>
        </div>

        <!-- Header -->
        <header
          v-if="['successAlert', 'confirmAlert', 'errorAlert'].includes(type)"
          class="mb-4 text-center">
          <UiIcon :icon="alertIcon" custom-class="w-32 h-32" />

          <h2 class="text-xl font-semibold text-white">
            {{ alertTitle }}
          </h2>

          <p class="text-[12px] text-white mt-1 px-5">
            {{ description }}
          </p>
        </header>

        <header
          v-else
          class="mb-4"
          :class="headerCenter ? 'text-center' : 'text-left'">
          <h2 class="text-lg font-semibold text-white">
            {{ title }}
          </h2>
          <p class="text-sm text-gray-400 mt-1">
            {{ description }}
          </p>
        </header>

        <!-- Content -->
        <section
          class="py-2 opacity-100"
          :class="[customBodyClass, { 'opacity-50': isLoading }]">
          <slot name="body"></slot>
        </section>

        <!-- Footer -->
        <footer class="mt-4 flex flex-col gap-3 w-full">
          <div v-if="type === 'confirmAlert'" class="flex flex-col gap-3">
            <UiButton
              class="w-full py-3 !rounded-full bg-[#FFAE00] text-white font-semibold hover:bg-[#FFAE00]/80 !text-[12px]"
              @click="confirm"
              :disabled="isLoading">
              I am sure
            </UiButton>
            <UiButton
              class="w-full py-3 !rounded-full bg-gray-700 text-gray-200 font-medium hover:bg-gray-600 !text-[12px]"
              @click="close"
              :disabled="isLoading">
              I change my mind
            </UiButton>
          </div>

          <div v-else-if="type === 'successAlert'">
            <div class="flex flex-col items-center justify-center">
              <UiButton
                class="w-full py-3 !w-[12vw] !rounded-full text-white !text-[12px] font-semibold hover:bg-[#00BDA7]/80"
                @click="close"
                :disabled="isLoading">
                Return
              </UiButton>
            </div>
          </div>

          <div v-else-if="type === 'errorAlert'">
            <UiButton
              class="w-full py-3 !rounded-full bg-red-600 text-white !text-[12px] font-semibold hover:bg-red-500"
              @click="close"
              :disabled="isLoading">
              Return
            </UiButton>
          </div>

          <div v-else-if="type === 'form'">
            <button
              class="w-full py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500"
              @click="save"
              :disabled="isLoading">
              Save
            </button>
          </div>

          <div v-else>
            <slot name="footer"></slot>
          </div>
        </footer>

        <!-- Close Icon -->
        <button
          v-if="type == 'form' || type == null"
          class="absolute top-2 right-2 bg-gray-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm hover:bg-red-500"
          @click="close"
          :disabled="isLoading">
          <UiIcon icon="hugeicons:cancel-01"></UiIcon>
        </button>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";

const props = defineProps({
  show: Boolean,
  isLoading: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: null,
  },
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
  customBodyClass: {
    type: String,
    default: "",
  },
  headerCenter: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "confirm", "save"]);

const alertIcon = computed(() => {
  if (props.type === "successAlert") return "icon:ai-success";
  if (props.type === "confirmAlert") return "icon:ai-warning";
  return "icon:ai-error";
});

const alertTitle = computed(() => {
  if (props.type === "successAlert") return "Successful!";
  if (props.type === "errorAlert") return "Encountered an Error";
  return props.title;
});
const root = ref(null);
const isClosing = ref(false);

const lockScroll = () => {
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
};

const unlockScroll = () => {
  document.body.style.position = "";
  document.body.style.width = "";
};

const close = () => {
  if (props.isLoading) return; // prevent closing while loading
  isClosing.value = true;
  setTimeout(() => {
    emit("close");
    isClosing.value = false;
    unlockScroll();
  }, 150);
};

const confirm = () => !props.isLoading && emit("confirm");
const save = () => !props.isLoading && emit("save");

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
.success-background {
  background-image: url("~/assets/bg/SuccessBg.svg");
  background-repeat: no-repeat;
  background-size: cover; /* makes it fill the background */
  background-position: center; /* centers the image */
}
.confirm-background {
  background-image: url("~/assets/bg/ConfirmBg.svg");
  background-repeat: no-repeat;
  background-size: cover; /* makes it fill the background */
  background-position: center; /* centers the image */
}
.error-background {
  background-image: url("~/assets/bg/ErrorBg.svg");
  background-repeat: no-repeat;
  background-size: cover; /* makes it fill the background */
  background-position: center; /* centers the image */
}
.shimmer-text {
  background: linear-gradient(90deg, #bbb 20%, #fff 50%, #bbb 90%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer-text 2s infinite linear;
}
.modal-scroll {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

@keyframes shimmer-text {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
