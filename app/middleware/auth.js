import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  const token = useCookie("token");

  if (!token.value) {
    return navigateTo("/login");
  }

  // If token exists but user not set, restore user from cookies
  if (!auth.user && token.value) {
    const userCookie = useCookie("user");
    if (userCookie.value) {
      auth.user = userCookie.value;
    }
  }
});
