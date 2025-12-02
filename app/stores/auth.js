import { defineStore } from "pinia";
import { useCookie, useRuntimeConfig } from "#app";

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
  },

  actions: {
    // Centralized headers
    getHeaders(custom = {}) {
      const headers = { "Content-Type": "application/json", ...custom };
      if (this.token) headers.Authorization = `Bearer ${this.token}`;
      return headers;
    },

    // Centralized cookie setter
    setCookies({ token, refreshToken, user }) {
      useCookie("token", { sameSite: "lax", maxAge: 60 * 60 * 24 * 7 }).value =
        token;
      useCookie("refreshToken", {
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
      }).value = refreshToken;
      useCookie("user", { sameSite: "lax", maxAge: 60 * 60 * 24 * 7 }).value =
        JSON.stringify(user);
    },

    // Centralized cookie remover
    clearCookies() {
      useCookie("token").value = null;
      useCookie("refreshToken").value = null;
      useCookie("user").value = null;
    },

    async register(payload) {
      this.loading = true;
      const config = useRuntimeConfig();

      try {
        const { data } = await $fetch(
          `${config.public.apiBase}/api/auth/register`,
          {
            method: "POST",
            headers: this.getHeaders(),
            body: payload,
          }
        );

        if (!data?.accessToken)
          throw new Error("Invalid registration response");

        this.token = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.user = data.user;
        this.setCookies(data);
      } catch (err) {
        throw new Error(err || "Registration failed");
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
          {
            method: "POST",
            headers: this.getHeaders(),
            body: { email, password },
          }
        );

        if (!data?.accessToken) throw new Error("Invalid login response");

        this.token = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.user = data.user;
        this.setCookies(data);
      } catch (err) {
      const msg =
      err?.data?.message ||       
      err?.response?._data?.message ||
      err?.message ||               
      "Login failed";
      throw new Error(msg);
  } finally {
        this.loading = false;
      }
    },

    async forgotPassword(email) {
      this.loading = true;
      const config = useRuntimeConfig();

      try {
        return await $fetch(
          `${config.public.apiBase}/api/auth/forgot-password`,
          {
            method: "POST",
            headers: this.getHeaders(),
            body: { email },
          }
        );
      } catch (err) {
        throw new Error(err || "Request failed");
      } finally {
        this.loading = false;
      }
    },

    restoreSession() {
      const token = useCookie("token").value;
      const refreshToken = useCookie("refreshToken").value;
      const userCookie = useCookie("user").value;

      if (token && userCookie) {
        this.token = token;
        this.refreshToken = refreshToken;

        try {
          this.user =
            typeof userCookie === "string"
              ? JSON.parse(userCookie)
              : userCookie;
        } catch {
          this.clearCookies();
          this.user = null;
        }
      }
    },

    async refreshTokens() {
      if (this.isRefreshing) return;
      const refreshToken = useCookie("refreshToken").value;
      const config = useRuntimeConfig();

      if (!refreshToken) {
        await this.logout();
        return;
      }

      this.isRefreshing = true;

      try {
        const { accessToken, refreshToken: newRefreshToken } = await $fetch(
          `${config.public.apiBase}/api/auth/refresh`,
          {
            method: "POST",
            headers: this.getHeaders(),
            body: { refreshToken },
          }
        );

        if (!accessToken) throw new Error("Invalid refresh response");

        this.token = accessToken;
        this.refreshToken = newRefreshToken;
        this.setCookies({
          token: accessToken,
          refreshToken: newRefreshToken,
          user: this.user,
        });
      } catch {
        await this.logout();
      } finally {
        this.isRefreshing = false;
      }
    },

    async logout() {
      const config = useRuntimeConfig();

      try {
        await $fetch(`${config.public.apiBase}/api/auth/logout`, {
          method: "POST",
          headers: this.getHeaders(),
        });
      } catch {
        console.warn("Logout endpoint unreachable, clearing session anyway");
      } finally {
        this.token = null;
        this.refreshToken = null;
        this.user = null;
        this.clearCookies();
        navigateTo("/login");
      }
    },
  },
});
