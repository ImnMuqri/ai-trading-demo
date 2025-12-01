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
    async register(payload) {
      this.loading = true;
      const config = useRuntimeConfig();

      try {
        const response = await $fetch(
          `${config.public.apiBase}/api/auth/register`,
          {
            method: "POST",
            body: payload,
          }
        );

        const data = response.data;

        if (!data || !data.accessToken) {
          throw new Error("Invalid registration response");
        }

        this.token = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.user = data.user;

        const tokenCookie = useCookie("token", {
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
        });

        const refreshCookie = useCookie("refreshToken", {
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 30,
        });

        const userCookie = useCookie("user", {
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
        });

        tokenCookie.value = data.accessToken;
        refreshCookie.value = data.refreshToken;
        userCookie.value = JSON.stringify(data.user);
      } catch (error) {
        const message = error?.data?.message || "Registration failed";
        this.loading = false;
        throw new Error(message);
      } finally {
        this.loading = false;
      }
    },

    async login(email, password) {
      this.loading = true;
      const config = useRuntimeConfig();

      try {
        const response = await $fetch(
          `${config.public.apiBase}/api/auth/login`,
          {
            method: "POST",
            body: { email, password },
          }
        );

        const data = response.data;

        if (!data || !data.accessToken) {
          throw new Error("Invalid login response");
        }

        this.token = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.user = data.user;

        const tokenCookie = useCookie("token", {
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
        });

        const refreshCookie = useCookie("refreshToken", {
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 30,
        });

        const userCookie = useCookie("user", {
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
        });

        tokenCookie.value = data.accessToken;
        refreshCookie.value = data.refreshToken;
        userCookie.value = JSON.stringify(data.user);
      } catch (error) {
        // const message = error?.data?.message || "Login failed";
        const message = error;
        this.loading = false;
        throw new Error(message);
      } finally {
        this.loading = false;
      }
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

    restoreSession() {
      const tokenCookie = useCookie("token");
      const refreshCookie = useCookie("refreshToken");
      const userCookie = useCookie("user");

      if (tokenCookie.value && userCookie.value) {
        this.token = tokenCookie.value;
        this.refreshToken = refreshCookie.value;

        try {
          this.user =
            typeof userCookie.value === "string"
              ? JSON.parse(userCookie.value)
              : userCookie.value;
        } catch (error) {
          useCookie("user").value = null;
          this.user = null;
        }
      }
    },

    async refreshTokens() {
      if (this.isRefreshing) {
        return;
      }

      const config = useRuntimeConfig();
      const refreshCookie = useCookie("refreshToken");

      if (!refreshCookie.value) {
        this.logout();
        return;
      }

      this.isRefreshing = true;

      try {
        const data = await $fetch(`${config.public.apiBase}/api/auth/refresh`, {
          method: "POST",
          body: { refreshToken: refreshCookie.value },
        });

        if (!data || !data.accessToken) {
          throw new Error("Invalid refresh response");
        }

        this.token = data.accessToken;
        this.refreshToken = data.refreshToken;

        useCookie("token").value = data.accessToken;
        useCookie("refreshToken").value = data.refreshToken;
      } catch (error) {
        this.logout();
      } finally {
        this.isRefreshing = false;
      }
    },

    async logout() {
      const config = useRuntimeConfig();

      try {
        await $fetch(`${config.public.apiBase}/api/auth/logout`, {
          method: "POST",
          headers: { Authorization: "Bearer " + this.token },
        });
      } catch (error) {
        console.warn("Failed to contact logout endpoint");
      } finally {
        this.token = null;
        this.refreshToken = null;
        this.user = null;

        useCookie("token").value = null;
        useCookie("refreshToken").value = null;
        useCookie("user").value = null;

        navigateTo("/login");
      }
    },
  },
});
