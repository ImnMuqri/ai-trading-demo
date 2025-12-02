import { useAuthStore } from "@/stores/auth";

export default defineNuxtPlugin(() => {
  
  const auth = useAuthStore();
  
  if (!auth.isAuthenticated) {
    auth.restoreSession();
  }

  if (!auth.isAuthenticated) {
      return navigateTo("/login");
    }
  
});