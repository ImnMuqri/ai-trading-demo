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

      return headers;
    },

    getCookie(name) {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? match[2] : null;
    },

    setCookie(name, value, days) {
      const d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = "expires=" + d.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    },

    async restoreSession() {
      if (!process.client) return;

      try {
        // const token = localStorage.getItem("auth_token");
        // const refreshToken = localStorage.getItem("auth_refresh");
        // const user = localStorage.getItem("auth_user");
        const token = this.getCookie("auth_token");
        const refreshToken = this.getCookie("auth_refresh");
        const user = this.getCookie("auth_user");

        if (token) this.token = token;
        if (refreshToken) this.refreshToken = refreshToken;
        if (user) this.user = JSON.parse(user);

        // Auto-refresh if token is expired
        if (this.isTokenExpired && this.refreshToken) {
          await this.refreshTokens();
        }
      } catch (e) {
        console.warn("[AuthStore] restoreSession failed", e);
      }
    },

    setTokens({ token, refreshToken, user }) {
      this.token = token;
      this.refreshToken = refreshToken;
      this.user = user;

      if (!process.client) return;

      // localStorage.setItem("auth_token", token);
      // localStorage.setItem("auth_refresh", refreshToken);
      // localStorage.setItem("auth_user", JSON.stringify(user));

      this.setCookie("auth_token", token, 7);
      this.setCookie("auth_refresh", refreshToken, 7);

      this.setCookie("auth_user", JSON.stringify(user), 7);
    },

    clearTokens() {
      this.token = null;
      this.refreshToken = null;
      this.user = null;

      if (!process.client) return;

      try {
        // localStorage.removeItem("auth_token");
        // localStorage.removeItem("auth_refresh");
        // localStorage.removeItem("auth_user");
        this.setCookie("auth_token", "", -1);
        this.setCookie("auth_refresh", "", -1);
        this.setCookie("auth_user", "", -1);
      } catch (e) {
        console.warn("[AuthStore] clearTokens localStorage failed", e);
      }
    },
    async register(payload) {
      this.loading = true;
      const config = useRuntimeConfig();

      try {
        await $fetch(`${config.public.apiBase}/api/auth/register`, {
          method: "POST",
          body: payload,
        });

        return navigateTo(
          {
            path: "/login",
            query: { success: "Successfully registered. Please login again." },
          },
          { replace: true }
        );
      } catch (error) {
        const message = error?.data?.message || "Registration failed";
        throw new Error(message);
      } finally {
        this.loading = false;
      }
    },
    async login(email, password) {
      this.loading = true;
      const config = useRuntimeConfig();

      try {
        const { data } = await $fetch(
          `${config.public.apiBase}/api/auth/login`,
          { method: "POST", body: { email, password } }
        );

        this.setTokens({
          token: data.accessToken,
          refreshToken: data.refreshToken,
          user: data.user,
        });
      } finally {
        this.loading = false;
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
        return false;
      }
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
        this.setTokens({
          token: res.data.accessToken,
          // refreshToken: res.data.refreshToken || this.refreshToken,
          refreshToken: res.data.refreshToken,
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
        return false;
      }

      if (this.isTokenExpired) {
        if (this.refreshToken) {
          return await this.refreshTokens();
        } else {
          return false;
        }
      }
      return true;
    },
    async forgotPassword(email) {
      this.loading = true;
      const config = useRuntimeConfig();

      try {
        const response = await $fetch(
          `${config.public.apiBase}/api/auth/forgot-password`,
          {
            method: "POST",
            body: { email: email || null },
          }
        );

        return response;
      } catch (error) {
        const message = error?.data?.message || "Request failed";
        throw new Error(message);
      } finally {
        this.loading = false;
      }
    },
  },
});
