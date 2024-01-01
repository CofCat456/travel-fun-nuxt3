// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '~/assets/css/main.css',
  ],
  devtools: { enabled: true },
  experimental: {
    renderJsonPayloads: false,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-swiper',
    '@pinia/nuxt',
    ['@nuxtjs/google-fonts', {
      families: {
        'Noto Sans TC': [300, 500, 700],
        'Noto Serif TC': [300, 500, 700],
      },
    }],
    '@nuxt/image',
    '@bg-dev/nuxt-naiveui',
  ],
  runtimeConfig: {
    public: {
      apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
      apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
      googleMapApiKey: '',

    },
  },
  swiper: {
    modules: ['navigation'],
  },
})

