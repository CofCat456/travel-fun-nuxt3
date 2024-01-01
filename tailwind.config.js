import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      borderRadius: {
        m: '5px',
      },
      colors: {
        cc: {
          'accent': '#EE5220',
          'other-1': '#FFFFFF',
          'other-2': '#181818',
          'other-3': '#666666',
          'other-4': '#9F9F9F',
          'other-5': '#D4D4D4',
          'other-6': '#E9E9E9',
          'other-7': '#F7F7F7',
          'other-8': 'rgba(24, 24, 24, 0.8);',
          'other-9': '#32302C',
          'primary': '#0F4BB4',
        },
      },
      fontFamily: {
        sans: ['Noto Sans TC', ...fontFamily.sans],
        serif: ['Noto Serif TC', ...fontFamily.sans],
      },
      maxWidth: {
        'cc-big-width': '1328px',
        'cc-width': '1296px',
      },
    },

    plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/forms')],
  },
}
