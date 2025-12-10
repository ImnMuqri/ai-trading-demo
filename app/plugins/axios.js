import axios from "axios";
import { useAuthStore } from "@/stores/auth";

export default defineNuxtPlugin((nuxtApp) => {

  const api = axios.create({
    baseURL: useRuntimeConfig().public.apiBase,
    headers: { "Content-Type": "application/json" },
  });

  api.interceptors.request.use(
    async (config) => {
      if (process.server) {
        return config;
      }

      
      const auth = useAuthStore();

      if (auth.token) {
        await auth.ensureValidToken();
      }

      if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;

        try {
          const exp = JSON.parse(atob(auth.token.split(".")[1])).exp;
          const now = Math.floor(Date.now() / 1000);
          console.log(
            "[Axios] Token expires in:",
            exp - now,
            "seconds"
          );
        } catch (e) {
          console.error("[Axios] Error parsing token:", e);
        }
      } else {
        console.log("[Axios] No token available for request");
      }

      return config;
    },
    (error) => {
      console.error("[Axios] Request error", error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      
      console.warn(
        "[Axios] Response error:",
        originalRequest?.url,
        error.response?.status
      );

      if (process.server) {
        return Promise.reject(error);
      }

      // Handle 401 with token refresh logic
      if (
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        console.log("[Axios] 401 detected, attempting token refresh");
        originalRequest._retry = true;

        const auth = useAuthStore();
        
        if (auth.refreshToken) {
          const success = await auth.refreshTokens();

          if (success && auth.token) {
            console.log("[Axios] Token refreshed, retrying request");
            originalRequest.headers.Authorization = `Bearer ${auth.token}`;
            return api.request(originalRequest);
          }
        }

        console.log("[Axios] Token refresh failed or no refresh token");
        auth.logout();
        
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }

      return Promise.reject(error);
    }
  );

  nuxtApp.provide("api", api);
});