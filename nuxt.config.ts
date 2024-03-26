export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseURL: process.env.API_BASE_URL,
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/ui"],
  app: {
    head: {
      script: [
        {
          src: "https://cdn.socket.io/4.7.5/socket.io.min.js",
          type: "text/javascript",
          integrity:
            "sha384-2huaZvOR9iDzHqslqwpR87isEmrfxqyWOF7hr7BY6KG0+hVKLoEXMPUJw3ynWuhO",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  css: [
    "~/assets/css/main.css",
    // Другие ваши стили
  ],
});
