import { useAuthStore } from "@/stores/auth";
import { showToast } from "~/composables/useToastMessage";

export default defineNuxtRouteMiddleware(async (to) => {
  // const protectedRoutes = ["/dashboard", "/profile", "/settings"];
  // const isProtectedRoute = protectedRoutes.some((route) =>
  //   to.path.startsWith(route)
  // );

  // if (!isProtectedRoute) {
  //   return;
  // }

  if (process.server) {
    return;
  }

  const auth = useAuthStore();

  // Restore session
  if (!auth.token) {
    await auth.restoreSession();
  }

  // Ensure token is valid
  if (auth.token) {
    await auth.ensureValidToken();
  }

  if (!auth.isAuthenticated) {
    showToast("Unauthenticated, returning to login page...", "error");
    return navigateTo("/login", { replace: true });
  }

  const requiredRoles = to.meta.roles;

  if (requiredRoles && !auth.hasRole(requiredRoles)) {
    const missingRole = requiredRoles.join(",");
    return navigateTo(`/403?unauthorized=true&role=${missingRole}`, {
      replace: true,
    });
  }
});
