import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { findRepoRoot, resolveSiteFolder } from './lib/repo.js';

// Build a single site: load its .env (if any), index content, then vitepress build.
// Usage: bun task/build-site.js <site>   (e.g. andrey | sites/andrey)
const repoRoot = findRepoRoot();
const sitePath = resolveSiteFolder(process.argv[2], repoRoot);
if (!sitePath) {
    console.error('Error: site folder is required, e.g. `bun task/build-site.js andrey`.');
    process.exit(1);
}
if (!fs.existsSync(sitePath)) {
    console.error(`Error: site folder not found: ${sitePath}`);
    process.exit(1);
}

// Load .env from the site folder if present. The site's .env always wins
// over inherited environment so one site never builds another's content.
const envPath = path.join(sitePath, '.env');
const siteEnv = {};
if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eq = trimmed.indexOf('=');
        if (eq <= 0) continue;
        siteEnv[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
    }
    console.log(`Loaded .env from ${envPath}`);
}
Object.assign(process.env, siteEnv);

// Ensure PUB_ROOT/PUB_SOURCE are set (fallback to the site folder itself).
if (!process.env.PUB_ROOT) {
    process.env.PUB_ROOT = path.relative(repoRoot, sitePath);
    console.log(`PUB_ROOT not set, defaulting to ${process.env.PUB_ROOT}`);
}
if (!process.env.PUB_SOURCE) {
    process.env.PUB_SOURCE = '/docs';
}

// Copy the shared OnMind-CUI build (single source of truth) into the site's
// public folder. Generated at build time; do not edit the copy under sites/.
const cuiSrc = path.join(repoRoot, 'common', 'public', 'cui.js');
const cuiDestDir = path.join(sitePath, 'docs', 'public');
if (fs.existsSync(cuiSrc)) {
    fs.mkdirSync(cuiDestDir, { recursive: true });
    fs.copyFileSync(cuiSrc, path.join(cuiDestDir, 'cui.js'));
    console.log(`Copied CUI -> ${path.join(cuiDestDir, 'cui.js')}`);
} else {
    console.error(`Error: CUI source not found: ${cuiSrc}`);
    process.exit(1);
}

// 1) Index the content (fails hard on error).
console.log('--- Indexing ---');
const indexResult = spawnSync('bun', ['task/indexing.js'], { stdio: 'inherit', cwd: repoRoot, env: process.env });
if (indexResult.status !== 0) {
    console.error('Indexing failed, aborting build.');
    process.exit(indexResult.status ?? 1);
}

// 2) Build with VitePress from the site folder.
console.log('--- Building ---');
const buildResult = spawnSync('vitepress', ['build'], { stdio: 'inherit', cwd: sitePath, env: process.env });
process.exit(buildResult.status ?? 0);
