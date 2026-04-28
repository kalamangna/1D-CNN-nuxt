// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt 4 behavior enablement
  future: {
    compatibilityVersion: 4,
  },

  app: {
    head: {
      title: 'FaultGuard AI - Smart Fault Detection System',
      meta: [
        { name: 'description', content: 'AI-powered real-time fault detection and classification system for power systems.' }
      ],
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js' },
        { src: 'https://cdn.jsdelivr.net/npm/chart.js' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' }
      ]
    }
  },

  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],

  // Nuxt 4 with app/ directory expects relative paths or ~/
  css: ['~/assets/css/main.css'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    viewer: true,
  },

  compatibilityDate: '2024-04-03'
})
