export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/payment/success") {
    return navigateTo(
      {
        path: "/settings/subscription",
        query: { payment: "success" },
      },
      { replace: true }
    );
  }

  if (to.path === "/payment/failure") {
    return navigateTo(
      {
        path: "/settings/subscription",
        query: { payment: "failure" },
      },
      { replace: true }
    );
  }
});
