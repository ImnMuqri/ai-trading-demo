import { defineStore } from "pinia";
import { useCookie, useRuntimeConfig } from "#app";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    refreshToken: null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(email, password) {
      this.loading = true;
      const config = useRuntimeConfig();

      try {
        // Call your login API
        const response = await $fetch(
          `${config.public.apiBase}/api/auth/login`,
          {
            method: "POST",
            body: { email, password },
          }
        );

        // Extract data from your response structure
        const data = response.data;

        this.token = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.user = data.user;

        // Store tokens and user info in cookies
        const tokenCookie = useCookie("token", { sameSite: "lax" });
        const refreshCookie = useCookie("refreshToken", { sameSite: "lax" });
        const userCookie = useCookie("user", { sameSite: "lax" });

        tokenCookie.value = data.accessToken;
        refreshCookie.value = data.refreshToken;
        userCookie.value = JSON.stringify(data.user);
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
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
          // Try to parse JSON if it's a string
          this.user =
            typeof userCookie.value === "string"
              ? JSON.parse(userCookie.value)
              : userCookie.value;
        } catch (err) {
          console.warn("Invalid user cookie, clearing...", err);
          useCookie("user").value = null; // clear broken cookie
          this.user = null;
        }
      }
    },

    async refreshTokens() {
      const config = useRuntimeConfig();
      const refreshCookie = useCookie("refreshToken");
      if (!refreshCookie.value) {
        this.logout();
        return;
      }

      try {
        const data = await $fetch(`${config.public.apiBase}/api/auth/refresh`, {
          method: "POST",
          body: { refreshToken: refreshCookie.value },
        });

        this.token = data.accessToken;
        this.refreshToken = data.refreshToken;

        // Update cookies
        useCookie("token").value = data.accessToken;
        useCookie("refreshToken").value = data.refreshToken;
      } catch (error) {
        console.error("Token refresh failed:", error);
        this.logout();
      }
    },

    async logout() {
      const config = useRuntimeConfig();
      try {
        await $fetch(`${config.public.apiBase}/api/auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${this.token}` },
        });
      } catch (error) {
        console.warn("Logout request failed:", error);
      } finally {
        this.user = null;
        this.token = null;
        this.refreshToken = null;

        useCookie("token").value = null;
        useCookie("refreshToken").value = null;
        useCookie("user").value = null;

        navigateTo("/login");
      }
    },
  },
});
