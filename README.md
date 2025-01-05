# OnMind-PUB

Pages, Universes &amp; Blogs (PUB)

You can add **MD** (Markdown) files under `content` or change this by setting the environmenta variable `PUB_HOME`

## How to use it

1. Clone the repository: `git clone https://github.com/kaesar/onmind-pub.git pub`
2. Open the folder and install modules, e.g.: `cd pub && npm install`
3. Write your content starting with `content/index.md` (see example)
4. Generate static files, e.g.: `bun run build`
5. Check with local preview: `bun run preview`

> You can use `npm` instead of `bun`.  
> For `bun`, remember check if it is installed.  

## Custom folder for content

You can change the `content` folder by using another path. First include a `.env` file and the `PUB_HOME` variable like this:

```bash
PUB_HOME=/Users/user/myblog/docs/
DOCS_DIR=/
```

Then, load the file or set the variable in the environment. Example:

```bash
source .env
```

## index.md example

Inside the `content` folder we can put an `index.md` like this:

```markdown
---
title: Pages ~ Universes ~ Blogs
navigation: false
layout: page
main:
  fluid: false
---

:ellipsis{right=0px width=75% blur=150px}

::block-hero
---
cta:
---

#title
Pages ~ Universes ~ Blogs

#description
Write pages in [**Markdown**](https://www.markdownguide.org/basic-syntax/), use [**Vue**](https://vuejs.org) components and enjoy your content with **OnMind-PUB**.
::

:card-board
```

> `block-hero` includes a block for the title in Home Page. `card-board` includes cards for content with filter.
