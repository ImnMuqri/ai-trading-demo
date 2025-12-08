import Toast, { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    position: "top-right",
    timeout: 1000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    hideProgressBar: false,
    transition: "Vue-Toastification__bounce",
    newestOnTop: true,
    maxToasts: 5,
  };

  // Install the plugin on the Vue app
  nuxtApp.vueApp.use(Toast, options);

  // Create a toast interface after plugin is installed
  const toast = useToast();

  // Provide as `toast`, Nuxt will expose it as `$toast`
  nuxtApp.provide("toast", toast);
});
