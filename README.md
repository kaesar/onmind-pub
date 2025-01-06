# OnMind-PUB

Pages, Universes &amp; Blogs (PUB)

You can add **MD** (Markdown) files under `content/docs` or change this by setting the environment variable `PUB_ROOT`

## How is this project organized or estructured

This project is based on **VitePress** and keep its features but is focused in share a custom theme and components (by **OnMind**) for several subprojects.

```planetext
* pub  
├─ _common  
│⋅⋅├─ .vitepress  
│⋅⋅│⋅⋅├─ snippets  
│⋅⋅│⋅⋅├─ theme  
│⋅⋅│⋅⋅│⋅⋅└─ index.js  
│⋅⋅│⋅⋅└─ config.mjs  
│⋅⋅└─ index.md  
├─ content  
│⋅⋅├─ .vitepress  
│⋅⋅│⋅⋅├─ theme  
│⋅⋅│⋅⋅│⋅⋅└─ index.js  
│⋅⋅│⋅⋅└─ config.mjs  
│⋅⋅└─ docs  
│⋅⋅⋅⋅⋅├─ public  
│⋅⋅⋅⋅⋅│⋅⋅├─ _index.json  
│⋅⋅⋅⋅⋅│⋅⋅├─ favicon.ico  
│⋅⋅⋅⋅⋅│⋅⋅└─ cui.js  
│⋅⋅⋅⋅⋅└─ index.md  
├─ task  
│⋅⋅└─ indexing.js  
└─ package.json  
```

> Note that the `_common` folder is for share the `theme` and `snippets` (web components).  
> The `content` folder contains the Markdown files under `docs` folder, and it also has `public` assets.

## How to use it

1. Clone the repository: `git clone https://github.com/kaesar/onmind-pub.git pub`
2. Open the folder and install modules, e.g.: `cd pub && npm install`
3. Write your content starting with `content/docs/index.md` (see example)
4. Generate static files, e.g.: `cd content && bun run build`
5. Check with local preview: `bun run preview`

> You can use `npm` instead of `bun`.  
> For `bun`, remember check if it is installed.  

There is a task called `index` to generate `public/_index.json` file. For example: `bun run index`

## Custom folder for content

You can change the `content/docs` folder by using another path. First include a `.env` file and the `PUB_ROOT` variable like this:

```bash
PUB_ROOT=content/docs
```

Then, load the file or set the variable in the environment. Example:

```bash
source .env
```

## index.md example

Inside the `content/docs` folder we can put an `index.md` like this:

```markdown
---
layout: home

hero:
  name: "My Blog"
  text: "This is a nice place"
  tagline: Your another line here
  actions:
    - theme: brand
      text: GitHub Repo
      link: https://github.com/kaesar/onmind-pub
---
<AsIndex filtering="true" />
```

> Note that `AsIndex` put an agile filter by titles

<!--
Additionally, you can add an `access.md` file like this:

```markdown
```
-->
## .vitepress/config.mjs example

For every project folder, like `content`, you can add the `.vitepress/config.mjs` file like this:

```js
import { defineConfig } from 'vitepress'
import { srcDir, nav, search, head, vueOptions } from '../../_common/.vitepress/config.mjs'

export default defineConfig({
  title: "My Blog",
  description: "This is a nice place",
  srcDir: srcDir,
  themeConfig: {
    nav: nav,
    ...
    search: search
  },
  head: head,
  vue: vueOptions
})
```

> Note that this import `srcDir`, `nav`, `search`, `head` and `vueOptions` from the common theme configuration.  
> Remember change `title` and `description`.  
