// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  build: {
    transpile: ["@fortawesome/vue-fontawesome"],
  },
  devtools: { enabled: false },
  modules: ["@pinia/nuxt", "@element-plus/nuxt"],
  css: [
    "@/assets/css/tailwind.css",
    "@/assets/css/main.scss",
    "element-plus/dist/index.css",
  ],
  ssr: true,
});
