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

GitHub Actions copies the built site to the server with rsync, the same way as
[drivers-docs](https://github.com/indilib/drivers-docs).

- **Pull request:** build only.
- **Push to `main`**, or **Run workflow** in the Actions tab: build and deploy to the new server.

Secrets: `REMOTE_HOST`, `REMOTE_USER`, `REMOTE_PRIVATE_KEY`, `DEPLOY_PATH`, and `REMOTE_PORT` if SSH is not on port 22.
The deploy uses `rsync --delete`: everything in `DEPLOY_PATH` that is not part of the site is removed.
A check step refuses top-level folders such as `/`, `~` or `/var/www`.

On the server the deploy key is limited with `rrsync` in `~/.ssh/authorized_keys`:

```
command="/usr/bin/rrsync -wo /home/indi/www/indilib.org",restrict ssh-ed25519 AAAA... github-actions-deploy-indilib.org
```

The key can only write into that folder, and `DEPLOY_PATH` is relative to it (`/` is the folder itself).
The repository variable `DEPLOY_RRSYNC_ROOT` records this folder and lets the check accept `/`.

### Launch

new.indilib.org and indilib.org are both served from the new server. Until launch the site is built
for new.indilib.org and hidden from search engines (`noindex` and a closed `robots.txt`).

At launch:

1. Point the indilib.org DNS to the new server.
2. Set the repository variable `SITE_URL` to `https://indilib.org` (Settings → Secrets and variables → Actions → Variables).
3. Run the workflow. The site is rebuilt for indilib.org and opened to search engines.
