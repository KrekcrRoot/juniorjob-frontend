export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseURL: process.env.API_URL,
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  app: {
    head: {
    }
  },
  css: [
    '~/assets/css/main.css',
    // Другие ваши стили
  ],
})
