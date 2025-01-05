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
    highlight: {
      theme: {
          default: 'github-light',
          dark: 'github-dark',
          sepia: 'monokai'
      },
      langs: ['javascript', 'typescript', 'json', 'bash', 'shell', 'html', 'xml', 'css', 'scss', 'yaml', 'markdown', 'java', 'python', 'php', 'sql', 'ruby', 'perl', 'c', 'cpp', 'csharp', 'go', 'rust', 'swift', 'kotlin', 'groovy', 'scala', 'lua', 'r', 'dart', 'swift', 'typescript', 'jsx', 'tsx', 'graphql', 'dockerfile']
    },
    markdown: {
      mdc: true,
    }
  },
  runtimeConfig: { public: { docsDir:  process.env.DOCS_DIR || '/docs' } },
});