import { createRequire } from 'module'
import fs from 'fs'
import path from 'path'

// ============================================================================
// Global Constants
// ============================================================================
const globalNav = [
  { text: 'Home', link: '/' }
]

// ============================================================================
// Site Navigation Builder
// ============================================================================
// Build nav by merging global defaults with site-specific nav.
// Global defaults (e.g., Home) come first, then site-specific items.

function buildNav(siteRoot = process.env.PUB_ROOT) {
  if (!siteRoot) return []
  const cfg = path.join(siteRoot, '.vitepress', 'site.config.js')
  if (!fs.existsSync(cfg)) return []
  try {
    const require = createRequire('file://' + process.cwd() + '/')
    const mod = require(cfg)
    const siteNav = mod.nav || []
    return [...globalNav, ...siteNav]
  } catch {
    return []
  }
}

// ============================================================================
// Site Sidebar Builder
// ============================================================================
// Builds sidebar from the indexer's _index.json for the current site/language.
// Falls back to empty array for auto-generation by VitePress.

function buildSidebar(siteRoot = process.env.PUB_ROOT, locale = '') {
  if (!siteRoot) return []
  const indexPath = path.join(siteRoot, process.env.PUB_SOURCE || 'docs', 'public', '_index.json')
  if (!fs.existsSync(indexPath)) return []
  
  try {
    const data = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))
    
    // If no locale specified, build sidebar for all languages
    const targetLang = locale || 'all'
    
    // Group by language and category
    const byLang = {}
    for (const article of data) {
      if (article.hide || !article.title) continue
      const lang = article.language || 'en'
      const cat = article.category || 'general'
      if (!byLang[lang]) byLang[lang] = {}
      if (!byLang[lang][cat]) byLang[lang][cat] = []
      byLang[lang][cat].push({
        text: article.title,
        link: article.url.replace('./', '/').replace('.md', '')
      })
    }

    // If specific locale requested, return only that language
    if (targetLang !== 'all' && byLang[targetLang]) {
      return Object.entries(byLang[targetLang]).map(([cat, items]) => ({
        text: cat.charAt(0).toUpperCase() + cat.slice(1),
        collapsed: false,
        items: items.sort((a, b) => a.text.localeCompare(b.text))
      }))
    }

    // Return multi-language sidebar
    const sidebar = {}
    for (const [lang, categories] of Object.entries(byLang)) {
      sidebar[`/${lang}/`] = Object.entries(categories).map(([cat, items]) => ({
        text: cat.charAt(0).toUpperCase() + cat.slice(1),
        collapsed: false,
        items: items.sort((a, b) => a.text.localeCompare(b.text))
      }))
    }
    return sidebar
  } catch {
    return []
  }
}

// ============================================================================
// Common Config Exports (srcDir, search, head, vueOptions)
// ============================================================================

const srcDir = (process.env.PUB_SOURCE || 'docs').replace(/^\//, '')

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
      src: '/cui.js'
    },
  ],
]

// userbase.js (external auth SDK) is opt-in
if (process.env.PUB_USERBASE) {
  head.push([
    'script',
    {
      type: 'text/javascript',
      src: 'https://sdk.userbase.com/2/userbase.js'
    }
  ])
}

const vueOptions = {
  template: {
    compilerOptions: {
      isCustomElement: tag => tag.includes('-')
    }
  }
}

// Global nav constant for backward compatibility
const nav = [
  // { text: 'Access', link: '/access' }
]

export { buildNav, buildSidebar, srcDir, search, head, vueOptions, nav }