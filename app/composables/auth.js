import { useAuthStore } from "@/stores/auth";

export function useAuth() {
  const auth = useAuthStore();

  const login = async (email, password) => await auth.login(email, password);
  const logout = () => auth.logout();
  const fetchUser = async () => await auth.fetchUser();
  const refresh = async () => await auth.refreshTokens();

  return {
    user: computed(() => auth.user),
    token: computed(() => auth.token),
    isAuthenticated: computed(() => auth.isAuthenticated),
    loading: computed(() => auth.loading),
    login,
    logout,
    fetchUser,
    refresh,
  };
}
