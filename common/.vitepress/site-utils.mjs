import { createRequire } from 'module'
import fs from 'fs'
import path from 'path'

/**
 * Load a site's nav from its own .vitepress/site.config.js.
 * The data lives per site; common only provides the loader.
 * Falls back to an empty nav when the file is missing or PUB_ROOT is unset.
 */
export function loadSiteNav(siteRoot = process.env.PUB_ROOT) {
  if (!siteRoot) return []
  const cfg = path.resolve(siteRoot, '.vitepress', 'site.config.js')
  if (!fs.existsSync(cfg)) return []
  try {
    const require = createRequire(import.meta.url)
    const mod = require(cfg)
    return mod.nav || []
  } catch {
    return []
  }
}

/**
 * Build nav by merging global defaults with site-specific nav.
 * Global defaults (e.g., Home) come first, then site-specific items.
 */
export function buildNav(siteRoot = process.env.PUB_ROOT) {
  const globalNav = [
    { text: 'Home', link: '/' }
  ]
  const siteNav = loadSiteNav(siteRoot)
  return [...globalNav, ...siteNav]
}

/**
 * Build sidebar automatically from the site's content structure.
 * Reads _index.json and groups by language/category.
 * Returns VitePress sidebar configuration.
 */
export function buildSidebar(siteRoot = process.env.PUB_ROOT) {
  if (!siteRoot) return []
  const sourceDir = process.env.PUB_SOURCE || 'docs'
  const indexPath = path.join(siteRoot, sourceDir, 'public', '_index.json')
  if (!fs.existsSync(indexPath)) return []

  try {
    const articles = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))
    if (!articles.length) return []

    // Group by language and category
    const byLang = {}
    for (const article of articles) {
      if (article.hide || !article.title) continue
      const lang = article.language || 'en'
      const cat = article.category || 'general'
      if (!byLang[lang]) byLang[lang] = {}
      if (!byLang[lang][cat]) byLang[lang][cat] = []
      byLang[lang][cat].push({
        text: article.title,
        link: article.url
      })
    }

    // Build sidebar for each language
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