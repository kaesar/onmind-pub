import { defineConfig } from 'vitepress'

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
  // markdown: { toc: { level: [1, 2] } },
  vue: vueOptions
});

const srcDir = (process.env.PUB_SOURCE || 'docs').replace(/^\//, '');
console.log('srcDir =>', srcDir, process.env.PUB_ROOT, process.env.PUB_SOURCE);

const nav = [
  // { text: 'Access', link: '/access' }
];

import { createRequire } from 'module'
import fs from 'fs'
import path from 'path'

// Load a site's nav from its own .vitepress/site.config.js. The data lives per
// site (it changes per site); common only provides the loader. Falls back to an
// empty nav when the file is missing or PUB_ROOT is unset.
export function loadSiteNav(siteRoot = process.env.PUB_ROOT) {
  if (!siteRoot) return []
  const cfg = path.join(siteRoot, '.vitepress', 'site.config.js')
  if (!fs.existsSync(cfg)) return []
  try {
    const require = createRequire(import.meta.url)
    const mod = require(cfg)
    return mod.nav || []
  } catch {
    return []
  }
}

const search = {
  provider: 'local',
  options: {
    _render(src, env, md) {
      const html = md.render(src, env)
      if (env.frontmatter?.hide === 2) return ''
      return html
    }
  }
}

const head = [
  [
    'script',
    {
      type: 'module',
      src: '/cui.js',
      defer: true
    },
  ],
  [
    'script',
    { type: 'text/javascript', defer: true },
    `window.onload = () => { let div = document.createElement('div'); div.setAttribute("id", "modal"); document.body.appendChild(div); }`
  ]
];

// userbase.js (external auth SDK) is opt-in. Set PUB_USERBASE in the site's
// .env to enable it; otherwise no third-party script is injected.
if (process.env.PUB_USERBASE) {
  head.push([
    'script',
    {
      type: 'text/javascript',
      src: 'https://sdk.userbase.com/2/userbase.js'
    }
  ]);
}

const vueOptions = {
  template: {
    compilerOptions: {
      isCustomElement: tag => tag.includes('-')
    }
  }
}

export { srcDir, nav, search, head, vueOptions };
