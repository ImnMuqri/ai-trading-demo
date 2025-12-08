import { h } from "vue";
import UiToast from "@/components/UiToast.vue";
import { useNuxtApp } from "#app";

export const showToast = (message, type = "info") => {
  // Skip during SSR
  if (import.meta.server) return;

  const { $toast } = useNuxtApp();
  if (!$toast) {
    console.error("Toast plugin not found");

    return;
  }

  $toast(h(UiToast, { message, type }), {
    timeout: 3000,
    position: "top-center",
    transition: "Vue-Toastification__slideBlurred",
    closeOnClick: true,
    hideProgressBar: false,
  });
};
