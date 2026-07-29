import { defineConfig } from 'vitepress'
import { srcDir, nav, search, head, vueOptions } from './site-config.mjs'

export default defineConfig({
  title: "OnMind-PUB",
  description: "Pages | Universes | Blogs: This is a great place by OnMind-PUB",
  srcDir: srcDir,
  themeConfig: {
    sidebar: [],
    aside: false,
    search: search
  },
  head: head,
  vue: vueOptions
});