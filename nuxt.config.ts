import Material from '@primevue/themes/material';

export default defineNuxtConfig({
  // https://github.com/nuxt-themes/docus
  extends: ['@nuxt-themes/docus'],
  devtools: { enabled: true },
  modules: ['@nuxtjs/plausible', '@primevue/nuxt-module'],  //, '@nuxtjs/tailwindcss'
  primevue: {
    options: {
      theme: {
        preset: Material,
        darkModeSelector: false,  // 'system'
        cssLayer: { name: 'primevue' }
      }
    },
    directives: {
      include: ['Ripple', 'Tooltip']
    }
  },
  compatibilityDate: '2024-10-24',
  content: {
    sources: {
      content: {
        driver: 'fs',
        base: process.env.PUB_HOME || 'content/'
      }
    },
    markdown: {
      mdc: true,
    }
  },
  runtimeConfig: { public: { docsDir:  process.env.DOCS_DIR || '/docs' } },
});