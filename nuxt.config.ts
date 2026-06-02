// nuxt.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: [
    '~/assets/css/main.css'
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/supabase'
  ],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  supabase: {
    redirect: false
  },
  future: {
    compatibilityVersion: 4,
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
        }
      ]
    }
  },
  build: {
    transpile: ['@prisma/client']
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' https:;",
          'X-Frame-Options': 'SAMEORIGIN',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'X-XSS-Protection': '1; mode=block',
          'Server': ''
        }
      }
    }
  }
})