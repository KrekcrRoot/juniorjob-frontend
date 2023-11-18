export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseURL: 'https://api.junior-job.ru/',
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
