import { useAuthStore } from "@/stores/auth";

export default defineNuxtPlugin(() => {
  const auth = useAuthStore();

  globalThis.$authFetch = async (url, options = {}) => {
    if (!options.headers) {
      options.headers = {};
    }

    if (auth.token) {
      options.headers.Authorization = "Bearer " + auth.token;
    }

    try {
      return await $fetch(url, options);
    } catch (error) {
      if (error?.status === 401) {
        await auth.refreshTokens();

        if (auth.token) {
          options.headers.Authorization = "Bearer " + auth.token;
          return await $fetch(url, options);
        }
      }

      throw error;
    }
  };
});
