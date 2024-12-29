import Material from '@primevue/themes/material';

export default defineNuxtConfig({
  // https://github.com/nuxt-themes/docus
  extends: ['@nuxt-themes/docus'],
  devtools: { enabled: true },
  modules: ['@nuxtjs/plausible', '@nuxtjs/tailwindcss', '@primevue/nuxt-module'],
  primevue: {
    options: {
      theme: { preset: Material }
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
  //components: [ { path: '~/components/content', extensions: ['vue'] } ],
  app: {
    head: {
      script: [
        {
          src: '/cui.js',
          type: 'text/javascript',
          defer: true
        }
      ]
    }
  }
})