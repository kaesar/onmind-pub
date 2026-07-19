import fs from 'fs';
import path from 'path';
import { readFileFrontmatter } from './lib/frontmatter.js';

const rootContentDir = path.join(process.env.PUB_ROOT || 'sites/blog', process.env.PUB_SOURCE || 'docs');

function readArticles(directory, baseDir = directory) {
    const articles = [];
    if (!fs.existsSync(directory)) return articles;
    
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory()) {
            articles.push(...readArticles(filePath, baseDir));
        } else if (path.extname(file) === '.md' && !['index.md', '_index.md', '_sidebar.md', 'README.md', `about.md`, 'toc.md'].includes(file) && !file.startsWith('Trivia-')) {
            const fm = readFileFrontmatter(filePath);
            const title = fm?.title || file.replace('.md', '');
            const relativePath = path.relative(baseDir, filePath).replace(/\\/g, '/').replace('.md', '');
            articles.push({ title, path: relativePath });
        }
    }
    return articles;
}

const articles = readArticles(rootContentDir);
const tocContent = `---
title: Table of Contents
---

# Table of Contents

${articles.map((article, i) => `${i + 1}. ${article.title}`).join('\n')}
`;  // ${aboutContent}

fs.writeFileSync(path.join(rootContentDir, 'toc.md'), tocContent);
console.log(`TOC generated with ${articles.length} articles at ${path.join(rootContentDir, 'toc.md')}`);
