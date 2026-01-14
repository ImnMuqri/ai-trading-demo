// server/api/subscription/purchase.post.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  if (!body?.planId) {
    throw createError({ statusCode: 400, message: "planId is required" });
  }

  // Example: read JWT from cookie
  const cookie = getCookie(event, "auth_token"); // name of your cookie
  if (!cookie) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  // Proxy request to real purchase API
  const res = await $fetch(
    `${config.public.apiBase}/api/subscription/purchase`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookie}`, // user JWT from cookie
      },
      body: {
        planId: body.planId,
      },
    }
  );

  if (!res?.data?.checkoutUrl) {
    throw createError({ statusCode: 500, message: "Checkout URL missing" });
  }

  return { checkoutUrl: res.data.checkoutUrl };
});
