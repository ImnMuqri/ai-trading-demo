import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { showToast } from "~/composables/useToastMessage";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const api = axios.create({
    baseURL: config.public.apiBase,
    timeout: 15000,
  });

  // Add token from Pinia store
  api.interceptors.request.use(
    (config) => {
      const auth = useAuthStore();
      if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const auth = useAuthStore();

      if (error.response && error.response.status === 401) {
        // Try refreshing token if available
        if (auth.refreshToken) {
          await auth.refreshTokens();
          if (auth.token) {
            error.config.headers.Authorization = `Bearer ${auth.token}`;
            return api.request(error.config);
          }
        }
        console.error("Unauthorized, please login");
      }

      if (error.response && error.response.status === 403) {
        if (auth.refreshToken) {
          await auth.refreshTokens();
          if (auth.token) {
            error.config.headers.Authorization = `Bearer ${auth.token}`;
            return api.request(error.config);
          }
        }
        // showToast("Session timed out", "error");
        return;
      }

      return Promise.reject(error);
    }
  );

  return {
    provide: {
      api,
    },
  };
});
