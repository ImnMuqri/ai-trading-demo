<template>
  <div
    class="flex items-center gap-3 h-18 px-4 pr-4 rounded-xl border-[1px] cursor-pointer"
    :class="[borderClass]">
    <div class="h-full py-[16px]">
      <UiIcon
        :icon="iconType"
        custom-class="w-6 h-6"
        :class="iconClass"></UiIcon>
    </div>
    <div class="flex-1 grid">
      <span class="capitalize font-semibold text-md text-white/80">{{
        type
      }}</span>
      <span class="text_gray text-[13px] font-light text-white/80">{{
        message
      }}</span>
    </div>
    <!-- <button class="ml-2 text-gray-400 hover:text-gray-600">×</button> -->
    <UiIcon
      @click="closeToast"
      icon="heroicons:x-mark-16-solid"
      custom-class="w-4 h-4 text-gray-400"></UiIcon>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useToast } from "vue-toastification";

const props = defineProps({
  message: String,
  type: String,
  toastProps: {
    type: Object,
    default: () => ({}),
  },
});

const toast = useToast();
const closeToast = () => {
  if (props.toastProps?.id) {
    toast.dismiss(props.toastProps.id);
  } else {
    toast.clear();
  }
};

const borderClass = computed(() => {
  switch (props.type) {
    case "success":
      return "border-green-900 bg-emerald-700";
    case "error":
      return "border-red-900 bg-red-700";
    case "warning":
      return "border-yellow-900 bg-yellow-700";
    default:
      return "border-blue-900 bg-blue-700";
  }
});
// const textClass = computed(() => {
//   switch (props.type) {
//     case "success":
//       return "text-green-500";
//     case "error":
//       return "text-red-500";
//     case "warning":
//       return "text-yellow-500";
//     default:
//       return "text-blue-500";
//   }
// });
const iconClass = computed(() => {
  switch (props.type) {
    case "success":
      return "text-emerald-400";
    case "error":
      return "text-red-400";
    case "warning":
      return "text-yellow-400";
    default:
      return "text-blue-400";
  }
});

const iconType = computed(() => {
  switch (props.type) {
    case "success":
      return "akar-icons:check-box-fill";
    case "error":
      return "akar-icons:circle-x-fill";
    case "warning":
      return "akar-icons:circle-alert-fill";
    default:
      return "akar-icons:info-fill";
  }
});
</script>
<style></style>
