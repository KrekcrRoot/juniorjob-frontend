export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseURL: process.env.API_BASE_URL,
    },
  },
  plugins: [{ src: "@/plugins/socket.io", ssr: false }],
  modules: ["@nuxtjs/tailwindcss", "@nuxt/ui"],
  app: {
    head: {},
  },
  css: [
    "~/assets/css/main.css",
    // Другие ваши стили
  ],
});
