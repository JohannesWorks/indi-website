# INDI website

Source of [indilib.org](https://indilib.org), built with [Astro](https://astro.build).

## Run it locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Layout

| Path | What it is |
|---|---|
| `src/layouts/Base.astro` | Shared page shell: head, header and footer |
| `src/components/` | Header, footer and reusable parts such as the "How INDI works" diagram |
| `src/pages/` | One file per page. `index.astro` is the home page, `tutorials.astro` the tutorials list |
| `src/content/tutorials/` | The tutorials, one folder each, in Markdown |
| `src/styles/global.css` | Colors, type, header, footer and buttons for every page |
| `public/` | Images and files copied as they are |

Pages are built as `/name.html`. Old Joomla URLs get small redirect pages (see `src/pages/[...legacy].astro`).

## Add a tutorial

Each tutorial is a folder in `src/content/tutorials/` with an `index.md` and its images:

```
src/content/tutorials/my-tutorial/
  index.md
  screenshot.webp
```

`index.md` starts with a few fields, then the tutorial in Markdown:

```markdown
---
title: My tutorial
description: One sentence that says what the reader will do.
topic: setup          # setup, ekos, remote, observatory, diy or dev
author: Your Name
date: 2026-10-21
cover: ./screenshot.webp   # optional, shown on the list page
drivers: [indi_eqmod_telescope]   # optional
---

Text, code blocks and images: ![Ekos mount tab](./screenshot.webp)

> [!TIP]
> Tip, Note, Warning and Caution boxes work like on GitHub.
```

The page appears at `/tutorials/my-tutorial.html`. Topics are listed in `src/data/topics.ts`.

## Deploy

Every push to `main` builds the site. GitHub Actions copies `dist/` to the server with rsync,
the same way as [drivers-docs](https://github.com/indilib/drivers-docs).
It needs the `REMOTE_HOST`, `REMOTE_USER` and `REMOTE_PRIVATE_KEY` secrets and the `DEPLOY_PATH` variable.
