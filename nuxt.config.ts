// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          href: '/favicon_io/favicon.ico',
          rel: 'icon',
          type: 'image/x-icon',
        },
        {
          href: '/favicon_io/apple-touch-icon.png',
          rel: 'apple-touch-icon',
          sizes: '180x180',
        },
        {
          href: '/favicon_io/favicon-32x32.png',
          rel: 'icon',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          href: '/favicon_io/favicon-16x16.png',
          rel: 'icon',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          href: '/favicon_io/site.webmanifest',
          rel: 'manifest',
        },
      ],
    },
  },
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
    '@vueuse/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
      apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
      googleMapApiKey: '',

    },
  },
  swiper: {
    modules: ['navigation', 'free-mode', 'pagination'],
  },
})

