import { defineStore } from "pinia";
import { useRuntimeConfig } from "#app";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    refreshToken: null,
    loading: false,
    isRefreshing: false,
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token),
    
    isTokenExpired: (state) => {
      if (!state.token) return true;
      
      try {
        const payload = JSON.parse(atob(state.token.split(".")[1]));
        const exp = payload.exp * 1000;
        const now = Date.now();
        const buffer = 60 * 1000; // 1 minute buffer
        
        return exp - now < buffer;
      } catch (e) {
        console.error("[AuthStore] Error checking token expiry", e);
        return true;
      }
    },
  },

  actions: {
    getHeaders(custom = {}) {
      const headers = { "Content-Type": "application/json", ...custom };
      if (this.token) headers.Authorization = `Bearer ${this.token}`;
      console.log("[AuthStore] getHeaders called, headers:", headers);
      return headers;
    },

    async restoreSession() {
      console.log("[AuthStore] restoreSession called");
      if (!process.client) return;

      try {
        const token = localStorage.getItem("auth_token");
        const refreshToken = localStorage.getItem("auth_refresh");
        const user = localStorage.getItem("auth_user");

        if (token) this.token = token;
        if (refreshToken) this.refreshToken = refreshToken;
        if (user) this.user = JSON.parse(user);

        console.log("[AuthStore] token restored:", this.token);
        console.log("[AuthStore] refreshToken restored:", this.refreshToken);
        console.log("[AuthStore] user restored:", this.user);

        // Auto-refresh if token is expired
        if (this.isTokenExpired && this.refreshToken) {
          console.log("[AuthStore] Token expired, refreshing automatically");
          await this.refreshTokens();
        }
      } catch (e) {
        console.warn("[AuthStore] restoreSession failed", e);
      }
    },

    setTokens({ token, refreshToken, user }) {
      console.log("[AuthStore] setTokens called", {
        token,
        refreshToken,
        user,
      });
      this.token = token;
      this.refreshToken = refreshToken;
      this.user = user;

      if (!process.client) return;

      localStorage.setItem("auth_token", token);
      console.log("[AuthStore] refreshtoken saved to localStorage", refreshToken);
      localStorage.setItem("auth_refresh", refreshToken);
      localStorage.setItem("auth_user", JSON.stringify(user));
      console.log("[AuthStore] tokens saved to localStorage");
    },

    clearTokens() {
      console.log("[AuthStore] clearTokens called");
      this.token = null;
      this.refreshToken = null;
      this.user = null;

      if (!process.client) return;

      try {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_refresh");
        localStorage.removeItem("auth_user");
        console.log("[AuthStore] tokens removed from localStorage");
      } catch (e) {
        console.warn("[AuthStore] clearTokens localStorage failed", e);
      }
    },

    async login(email, password) {
      console.log("[AuthStore] login called", { email });
      this.loading = true;
      const config = useRuntimeConfig();

      try {
        const { data } = await $fetch(
          `${config.public.apiBase}/api/auth/login`,
          { method: "POST", body: { email, password } }
        );

        console.log("[AuthStore] login response:", data);

        this.setTokens({
          token: data.accessToken,
          refreshToken: data.refreshToken,
          user: data.user,
        });
      } finally {
        this.loading = false;
        console.log("[AuthStore] login finished, loading set to false");
      }
    },
logout() {
  this.clearTokens();

  if (process.client) {
    return navigateTo("/login", { replace: true });
  }

  return true;
},


    async refreshTokens() {
      if (this.isRefreshing || !this.refreshToken) {
        console.log("[AuthStore] Skip refresh: already refreshing or no refresh token");
        return false;
      }
      
      console.log("[AuthStore] refreshTokens called");
      this.isRefreshing = true;

      const config = useRuntimeConfig();

      try {
        const res = await $fetch(
          `${config.public.apiBase}/api/auth/refresh-token`,
          {
            method: "POST",
            body: { refreshToken: this.refreshToken },
          }
        );
        console.log("[AuthStore] refreshTokens response:", res);

        /**
         * refresh issues bullshit fixme
         */
        this.setTokens({
          token: res.data.accessToken,
          // refreshToken: res.data.refreshToken || this.refreshToken,
          refreshToken: res.data.accessToken,
          user: this.user,
        });
        
        return true;
      } catch (e) {
        console.error("[AuthStore] refreshTokens failed", e);
        this.logout();
        return false;
      } finally {
        this.isRefreshing = false;
      }
    },

    async ensureValidToken() {
      
      if (!this.token) {
        console.log("[AuthStore] No token available");
        return false;
      }

      if (this.isTokenExpired) {
        if (this.refreshToken) {
          console.log("[AuthStore] Token expired, refreshing before request");
          return await this.refreshTokens();
        } else {
          console.log("[AuthStore] Token expired and no refresh token");
          return false;
        }
      }
      
      console.log("[AuthStore] Token is valid");
      return true;
    },
  },
});