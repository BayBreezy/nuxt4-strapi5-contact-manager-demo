// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@vee-validate/nuxt",
    "@morev/vue-transitions/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/strapi",
    "v-wave/nuxt",
  ],
  experimental: { typedPages: true },
  tailwindcss: { exposeConfig: true },
  colorMode: { classSuffix: "" },

  imports: {
    imports: [
      { from: "tailwind-variants", name: "tv" },
      { from: "tailwind-variants", name: "VariantProps", type: true },
      { from: "vue-sonner", name: "toast", as: "useSonner" },
    ],
  },
  strapi: {
    auth: { populate: ["role"] },
    cookie: { maxAge: 60 * 60 * 24 * 20 },
  },

  app: {
    head: {
      title: "Contact App",
      titleTemplate: "%s - Contact App",
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/pdfmake.min.js",
          defer: true,
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/vfs_fonts.min.js",
          defer: true,
        },
      ],
    },
  },

  routeRules: {
    "/": { redirect: "/auth/login" },
  },

  build: {
    transpile: ["vue-sonner"],
  },
});