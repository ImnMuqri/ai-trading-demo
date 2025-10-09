export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = !!useCookie("authToken").value;
  if (!isAuthenticated) return navigateTo("/login");
});
