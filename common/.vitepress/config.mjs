import { defineConfig } from 'vitepress'
import path from 'path';

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
    {
      type: 'text/javascript',
      src: 'https://sdk.userbase.com/2/userbase.js'
    }
  ],
  [
    'script',
    { type: 'text/javascript', defer: true },
    `window.onload = () => { let div = document.createElement('div'); div.setAttribute("id", "modal"); document.body.appendChild(div); }`
  ]
];

const vueOptions = {
  template: {
    compilerOptions: {
      isCustomElement: tag => tag.includes('-')
    }
  }
}

export { srcDir, nav, search, head, vueOptions };
