# OnMind-PUB

Pages, Universes &amp; Blogs (**PUB**): An static site generator (SSG) using [**VitePress**](https://vitepress.dev/) and customized with **OnMind** theme shared for several projects. Thinking in a **CMS** (Content Management System) for super simples but powered sites.

You can add `.md` (Markdown) files under `sites/*/docs` or change this by setting the environment variable `PUB_ROOT`

## Why is based on VitePress

Before, I tried with several technologies like **NextJS**, **NuxtJS**, **11ty** (Eleventy), **Astro Starlight**, **Hugo** (even my own CMS inside **OnMind** platform), I found [**VitePress**](https://vitepress.dev/) great fit because I want simplicity (and DX) to generate static sites fast with good look and standards for web (e.g. JAM Stack & Vite).

## What is added by OnMind-PUB

1. Focus in several subprojects of content.
2. Shared custom theme.
3. Tasks (e.g. init, index).
4. Web components.
5. Some style.
6. Bun environment (optional but preferable).
7. Workflow proposed.

## The Workflow proposed for OnMind-PUB

Once you donwload and setup the project, you can think in a workflow where the files are edited in a tool like [**Obsidian**](https://obsidian.md/download) (or another Markdown editor), then you cand build the project and check with preview mode, finally publish the changes (in remote repository or deploy it). This is:

> `init` ~> `open-editor` ~> `edit` ~> `index` ~> `build` ~> `preview` ~> `publish`

1. Initialize the new content project (under `sites` folder)
2. Open a vault or folder in [**Obsidian**](https://obsidian.md/download) (or another Markdown editor)
3. Edit or write your content with **Markdown** syntax
4. Index the content (it is launched internally with build step also)
5. Build to generate the output or distribution files
6. Preview the content project
7. Publish the content project

## How is this project organized or estructured

This project is based on [**VitePress**](https://vitepress.dev/) and keep its features but is focused in several subprojects of content. Its directories tree looks like this:

```txt
* pub  
├─ common  
│⋅⋅├─ .vitepress  
│⋅⋅│⋅⋅├─ snippets  
│⋅⋅│⋅⋅├─ theme  
│⋅⋅│⋅⋅│⋅⋅└─ index.js  
│⋅⋅│⋅⋅└─ config.mjs  
│⋅⋅└─ index.md  
├─ sites  
│⋅⋅└─ blog  
│⋅⋅⋅⋅⋅├─ .vitepress  
│⋅⋅⋅⋅⋅│⋅⋅├─ theme  
│⋅⋅⋅⋅⋅│⋅⋅│⋅⋅└─ index.js  
│⋅⋅⋅⋅⋅│⋅⋅└─ config.mjs  
│⋅⋅⋅⋅⋅├─ docs  
│⋅⋅⋅⋅⋅│⋅⋅├─ public  
│⋅⋅⋅⋅⋅│⋅⋅│⋅⋅├─ _index.json  
│⋅⋅⋅⋅⋅│⋅⋅│⋅⋅└─ favicon.ico  
│⋅⋅⋅⋅⋅│⋅⋅└─ index.md  
│⋅⋅⋅⋅⋅└─ package.json  
├─ task  
│⋅⋅├─ initialize.js  
│⋅⋅└─ indexing.js  
└─ package.json  
```

> Note that the `common` folder is for share the `theme` and `snippets` (web components).  
> Inside `sites` folder, the `docs` folder contains the Markdown files, and it also has `public` assets.

## How to use it

1. Clone the repository: `git clone https://github.com/kaesar/onmind-pub.git pub`
2. Open the folder and install modules, e.g.: `cd pub && bun install`
3. Write your content starting with `sites/blog/docs/index.md` (where `blog` is your first site)
4. Generate static files, e.g.: `cd sites/blog && bun run docs:build`
5. Check with local preview: `bun run preview`

> You can use `npm` instead of `bun`.  
> For `bun`, remember check if it is installed.  

- There is a task called `init` to initilize new project under `sites` folder.  
- There is a task called `index` to generate `public/_index.json` file. For example: `bun run index`.  

## Custom folder for sites

You can change the `sites/blog/docs` folder by using another path. First include a `.env` file and the `PUB_ROOT` variable like this:

```bash
PUB_ROOT=sites/blog/docs
```

Then, load the file or set the variable in the environment. Example:

```bash
source .env
```

> Or just set this directly from command line with: `export PUB_ROOT=sites/blog/docs`

## About sites folder

`sites` folder is the main for content projects. Inside `sites` folder you can imagine a key files that can be expresed with sentences, for example, if you have a `sites/blog` folder this could mean the following:

```bash
mkdir sites
mkdir -p sites/blog
mkdir -p sites/blog/.vitepress
mkdir -p sites/blog/.vitepress/theme
mkdir -p sites/blog/docs
mkdir -p sites/blog/docs/public
```

You can initilizae a new site just executing:

```bash
bun run init
```

You can also initialize the configuration opening the content folder like `sites/blog` from a terminal and executing the next sentence (under that folder):

```bash
cd sites/blog
npx vitepress init
```

Once you have files like `index.md`, `config.mjs` and `index.js` inside `sites/blog` you can execute:

```bash
bun run docs:dev
```

> You can use `npm` instead of `bun`.  
> For `bun`, remember check if it is installed.  

## Base files examples

Essentialy, in your content folder, for example `sites/blog`, you have al least the next files:

1. `sites/blog/docs/index.md`
2. `sites/blog/.vitepress/config.mjs`
3. `sites/blog/.vitepress/theme/index.js`
4. `sites/blog/package.json`

### index.md example

Inside the `sites/*/docs` folder we can put an `index.md` like this:

```markdown
---
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
```

> Note that `AsIndex` put an agile filter by titles

<!--
Additionally, you can add an `access.md` file like this:

```markdown
```
-->
### .vitepress/config.mjs example

For every project folder under `sites`, you can add the `.vitepress/config.mjs` file like this:

```js
import { defineConfig } from 'vitepress'
import { srcDir, nav, search, head, vueOptions } from '../../../common/.vitepress/config.mjs'

export default defineConfig({
  title: "My Blog",
  description: "This is a nice place",
  srcDir: srcDir,
  themeConfig: {
    nav: nav,
    sidebar: [],
    aside: true,
    search: search
  },
  head: head,
  vue: vueOptions
})
```

> Note that this import `srcDir`, `nav`, `search`, `head` and `vueOptions` from the common theme configuration.  
> Remember change `title` and `description`.  

### .vitepress/theme/index.js example

It's important to check that you get the custom theme by **OnMind** from `common`, including a `.vitepress/theme/index.js` file like this:

```js
import theme from '../../../../common/.vitepress/theme/index.js';
export default theme;
```

### package.json example

Additionaly, you have `package.json` file inside the content folder like this:

```json
{
  "scripts": {
    "start": "vitepress dev",
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview"
  }
}
```
