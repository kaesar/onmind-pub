import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const config_mjs = `import { defineConfig } from 'vitepress'
import { srcDir, nav, search, head, vueOptions } from '../../../common/.vitepress/config.mjs'

export default defineConfig({
  title: "My Blog",
  description: "This is a nice place",
  srcDir: srcDir,
  themeConfig: {
    nav: [
      { text: 'About', link: '/about' },
    ],
    sidebar: [],
    aside: true,
    search: search
  },
  head: head,
  vue: vueOptions
});
`;

const index_js = `import theme from '../../../../common/.vitepress/theme/index.js';
export default theme;
`;

const index_md = `---
layout: home

hero:
  name: "My Blog"
  text: "This is a nice place"
  tagline: Your another line here
  actions:
    - theme: brand
      text: About
      link: /about
---
<AsIndex filtering="true" />
`;

const package_json = `{
  "scripts": {
    "start": "vitepress dev",
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview"
  }
}`;

const dot_gitignore = `.nojekyll
.DS_Store
*.lock*
/.vitepress/cache
/.vitepress/dist
/.obsidian
/docs/.obsidian
/node_modules
package-lock.json
bun.lock
site.zip
.env*`;

rl.question('Enter the name of the new subdirectory inside of "sites": ', (newFolder) => {
    const dot_env = `PUB_ROOT=sites/${newFolder}\nPUB_SOURCE=/docs`;
    const rootPath = path.join('sites', newFolder);
    const vitepressPath = path.join(rootPath, '.vitepress');
    const themePath = path.join(vitepressPath, 'theme');
    const docsPath = path.join(rootPath, process.env.PUB_SOURCE || 'docs');
    const publicPath = path.join(docsPath, 'public');
    console.log(`Creating subfolder "${newFolder}"...\n`, rootPath, vitepressPath, themePath, docsPath, publicPath);

    fs.mkdirSync(rootPath,      { recursive: true });
    fs.mkdirSync(vitepressPath, { recursive: true });
    fs.mkdirSync(themePath,     { recursive: true });
    fs.mkdirSync(docsPath,      { recursive: true });
    fs.mkdirSync(publicPath,    { recursive: true });

    fs.writeFileSync(path.join(vitepressPath, 'config.mjs'), config_mjs);
    fs.writeFileSync(path.join(themePath, 'index.js'), index_js);
    fs.writeFileSync(path.join(docsPath, 'index.md'), index_md);
    fs.writeFileSync(path.join(rootPath, 'package.json'), package_json);
    fs.writeFileSync(path.join(rootPath, '.gitignore'), dot_gitignore);
    fs.writeFileSync(path.join(rootPath, '.env'), dot_env);

    console.log(`The subfolder "${newFolder}" has been created succesfully under "sites".`);

    rl.close();
});
