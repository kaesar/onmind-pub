import { defineConfig } from 'vitepress'
import { srcDir, nav, search, head, vueOptions } from '../../_common/.vitepress/config.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "OnMind-PUB",
  description: "Pages | Universes | Blogs: This is a great place by OnMind-PUB",
  srcDir: srcDir,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav,

    sidebar: [],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kaesar/onmind-pub' }
    ],

    aside: 'left',
    search: search
  },
  head: head,
  vue: vueOptions
})
