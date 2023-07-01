// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  generate: {
    routes: [
      '/',
      '/setup',
      // '/_redirects',
    ],
  },

  modules: [
    //
    '@nuxtjs/tailwindcss',
  ],
})
