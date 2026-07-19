import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { findRepoRoot, resolveSiteFolder } from './lib/repo.js';

// Publish a single site to Cloudflare Pages via wrangler.
// Usage: bun task/publish.js <site>   (e.g. andrey | sites/andrey)
const repoRoot = findRepoRoot();
const sitePath = resolveSiteFolder(process.argv[2], repoRoot);
if (!sitePath) {
    console.error('Error: site folder is required, e.g. `bun task/publish.js andrey`.');
    process.exit(1);
}
if (!fs.existsSync(sitePath)) {
    console.error(`Error: site folder not found: ${sitePath}`);
    process.exit(1);
}

// Load .env from the site folder; the site's .env always wins over environment.
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

const distDir = path.join(sitePath, '.vitepress', 'dist');
if (!fs.existsSync(distDir)) {
    console.error(`Error: build output not found: ${distDir}\nRun \`docs:build\` first.`);
    process.exit(1);
}

const projectName = process.env.PUB_CF_PROJECT || path.basename(sitePath);
console.log(`Publishing ${distDir} to Cloudflare Pages project "${projectName}"...`);

const args = ['wrangler', 'pages', 'deploy', distDir, '--project-name', projectName];
if (process.env.PUB_CF_BRANCH) args.push('--branch', process.env.PUB_CF_BRANCH);

const result = spawnSync('npx', args, { stdio: 'inherit', cwd: sitePath, env: process.env });
process.exit(result.status ?? 0);
