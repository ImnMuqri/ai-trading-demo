import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const protectedRoutes = ['/dashboard', '/profile', '/settings'];
  const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route));

  if (!isProtectedRoute) {
    return;
  }

  if (process.server) {
    return;
  }

  const auth = useAuthStore();

  // Restore session
  if (!auth.token) {
    // console.log('[Auth.Client] Restoring session...');
    await auth.restoreSession();
  }

  // Ensure token is valid
  if (auth.token) {
    await auth.ensureValidToken();
  }

  if (!auth.isAuthenticated) {
    // console.log('[Auth.Client] Not authenticated, redirecting to login');
    return navigateTo('/login', { replace: true });
  }

});