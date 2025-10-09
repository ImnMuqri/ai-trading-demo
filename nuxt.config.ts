// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/icon", "@nuxtjs/tailwindcss"],
  app: {
    head: {
      title: "AI Trading App",
      meta: [{ name: "description", content: "Ai Trading Applicatin" }],
    },
  },
  icon: {
    customCollections: [
      {
        prefix: "icon",
        dir: "./app/assets/icons",
      },
    ],
  },
});
