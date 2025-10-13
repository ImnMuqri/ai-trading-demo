<template>
  <div
    class="flex items-center gap-3 h-20 px-4 pr-4 rounded-xl border-[1px] cursor-pointer"
    :class="[borderClass, textClass]">
    <div class="h-full py-[18px]">
      <UiIcon
        :icon="iconType"
        custom-class="w-6 h-6"
        :class="iconClass"></UiIcon>
    </div>
    <div class="flex-1 grid">
      <span class="capitalize font-semibold text-md text-black/80">{{
        type
      }}</span>
      <span class="text_gray text-[14px] font-light text-black/80">{{
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
      return "border-green-500 bg-emerald-50";
    case "error":
      return "border-red-500 bg-red-50";
    case "warning":
      return "border-yellow-500 bg-yellow-50";
    default:
      return "border-blue-500 bg-blue-50";
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
