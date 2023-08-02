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
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@element-plus/nuxt"],
  css: ["@/assets/tailwind.css", "element-plus/dist/index.css"],
  ssr: true,
});
