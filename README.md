# INDI website

Source of [indilib.org](https://indilib.org), built with [Astro](https://astro.build).

Anyone can suggest a change: fix a typo, add a tutorial, post news, or improve a page.
Every change goes through a pull request. Checks run on it automatically, and a member of the
indi-platform team reviews it. When it is merged, the website updates by itself within a few minutes.

- [How a change reaches the website](#how-a-change-reaches-the-website)
- [Small change in the browser](#small-change-in-the-browser)
- [Bigger change on your computer](#bigger-change-on-your-computer)
- [Common tasks](#common-tasks)
- [Checks on every pull request](#checks-on-every-pull-request)
- [Review and merge](#review-and-merge)
- [Where things are](#where-things-are)
- [Old URLs](#old-urls)
- [Deploy (maintainers)](#deploy-maintainers)

## How a change reaches the website

```
your branch ──► pull request ──► checks pass ──► indi-platform approves ──► merge to main ──► deploy ──► indilib.org
```

1. You make your change on a branch (or on your fork).
2. You open a pull request to `main`.
3. GitHub runs the checks. They take about a minute.
4. Someone from the indi-platform team reviews and approves it.
5. The pull request is merged. GitHub Actions builds the site and copies it to the server.

Nobody can push to `main` directly, not even admins. Pull requests never deploy anything.
Only a merge to `main` updates the live site.

## Small change in the browser

For a typo or a few sentences you don't need to install anything.

1. Find the file. Most pages are Markdown files in `src/content/`. See [Where things are](#where-things-are).
   The URL tells you the file: `/about/features.html` is `src/content/pages/about/features/index.md`.
2. Open the file on GitHub and click the pencil icon (**Edit this file**).
   If you can't push to this repository, GitHub makes a fork for you. That is expected.
3. Make the change. Use **Preview** to see the Markdown.
4. Click **Commit changes…**, choose **Create a new branch** and give it a short name like `fix-features-typo`.
5. Click **Propose changes**, then **Create pull request**.
   Fill in the template: say in a sentence or two what you changed and why.

The checks start on their own. If you are a first-time contributor from a fork, a maintainer
has to click **Approve and run** before they start.

## Bigger change on your computer

For new pages, images, layout changes, or anything you want to see before sending.

### What you need

- [Node.js](https://nodejs.org) 22
- Git

### Get the code

If you can push to this repository:

```sh
git clone https://github.com/indilib/indi-website.git
cd indi-website
```

If you can't, fork it first (**Fork** button at the top of the GitHub page), then clone your fork:

```sh
git clone https://github.com/YOUR-NAME/indi-website.git
cd indi-website
git remote add upstream https://github.com/indilib/indi-website.git
```

### Make the change

```sh
git checkout main
git pull                       # or: git pull upstream main, on a fork
git checkout -b my-change      # a short name that says what it is

npm install
npm run dev                    # open http://localhost:4321
```

The dev server reloads the page each time you save a file. Make your changes and look at them.

Before you send them, run the main checks:

```sh
npm run check                  # type check, build, and link check
```

If it ends with `0 broken targets` you are ready.

### Send it

```sh
git add -A
git commit -m "Tutorials: add a guide for the new focuser driver"
git push -u origin my-change
```

Git prints a link to open a pull request. You can also open one on GitHub
(**Pull requests → New pull request**). Pick `main` as the base and fill in the template.
If you changed pages, components or styles, add screenshots
(see [Content changes and site code changes](#content-changes-and-site-code-changes)).

Write commit messages like the ones in `git log`: start with the part of the site
(`Home:`, `Tutorials:`, `News:`, `CI:`), then say what changed in plain words.

### Update a pull request

Push more commits to the same branch. The checks run again and the pull request updates.
Approvals given before the new commits are cleared, so the reviewer looks again.

If GitHub says the branch is **out of date with the base branch**, click **Update branch**
on the pull request, or run:

```sh
git pull origin main           # or: git pull upstream main, on a fork
git push
```

## Common tasks

### Fix or change a page

Find the file from the URL:

| URL | File |
|---|---|
| `/about/features.html` | `src/content/pages/about/features/index.md` |
| `/tutorials/pifinder.html` | `src/content/tutorials/pifinder/index.md` |
| `/` (home page) | `src/pages/index.astro` |
| `/about.html`, `/develop.html`, `/support.html`, `/download.html` | `src/pages/<name>.astro` |
| `/tutorials.html` | `src/pages/tutorials.astro` |

Pages in `src/content/` are Markdown with a few fields at the top between `---` lines.
Images go in the same folder as the `index.md` and are linked with `./name.webp`.

### Add a tutorial

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
The build fails if a required field is missing or `topic` is not one of the list, so you'll know.

### Post news

Add a folder in `src/content/pages/about/news/`. Start the folder name with the next free number
(look at the last one in the folder), then a short title:

```
src/content/pages/about/news/237-indi-library-v2-3-0/index.md
```

```markdown
---
title: "INDI Library v2.3.0 released"
description: "One sentence for the news list and search results."
date: "2026-11-01"
author: "Your Name"
---

The news in Markdown.
```

### Add a page

Make a folder under `src/content/pages/` with an `index.md`. The folder path is the URL:
`src/content/pages/support/my-page/index.md` is `/support/my-page.html`.

```markdown
---
title: "My page"
description: "One sentence about the page."
---
```

Link to it from the page where people will look for it.

### Rename or move a page

Old links from forums and other sites must keep working. When a page moves, add a line to
`src/data/redirects.json` from the old path to the new one:

```json
"/about/old-name.html": "/about/new-name.html",
```

The link check fails if a page still links to the old path, so fix those links too.

### Add a gallery image

Put the image in `src/assets/gallery/<album>/` (`deep-sky` or `setups`), as `.webp` if you can,
and add an entry to `src/data/gallery.ts`:

```ts
{
  "album": "deep-sky",
  "file": "deep-sky/m42.webp",
  "title": "M42 Orion Nebula",
  "caption": "Equipment, exposure and processing in one or two sentences."
},
```

### Add a sponsor

Put the logo in `public/img/sponsors/` and add a line to `src/data/sponsors.ts`.

### Images

- Use `.webp` when you can, and keep images under about 500 KB.
- Every image needs alt text: `![What the image shows](./image.webp)`.

## Checks on every pull request

These run on GitHub for every pull request. All must pass before it can be merged.

| Check | What it does | If it fails |
|---|---|---|
| Build and check site → Type check | `astro check` finds type errors in pages, components and data files | Open the log, it names the file and line |
| Build and check site → Build site | Builds the whole site. Also checks the fields at the top of every Markdown file | A missing or wrong field is named in the log |
| Build and check site → Check links | Every link and image inside the site must point to a file that exists | The log lists each broken link and the pages that have it |
| Build and check site → legacy-ids.map | The nginx list of old article numbers must match the content | Run `node scripts/legacy-ids.mjs` and commit the file |
| Build and check site → nginx and old URLs | Starts nginx with the rules in `deploy/nginx/`, serves the built site, and opens every old URL in `scripts/legacy-urls.txt` | The log lists each old URL that no longer works. Add a redirect |
| Lint workflows | Checks the files in `.github/workflows/` with actionlint | Fix the line it names |
| Dependency review | Fails when a pull request adds a package with a high or critical security advisory | Pick another version or package |
| Change type and screenshots | Sorts the changed files (see below), labels the pull request, and posts a summary comment | Add screenshots to the description |

`npm run check` runs the first three on your computer.

### Content changes and site code changes

Every pull request gets a summary comment and labels that say what kind of change it is:

| Label | Files | Screenshots |
|---|---|---|
| `content` | Markdown and its images in `src/content/`, gallery images and list, redirects, files in `public/` | Not needed |
| `site code` | `src/pages/`, `src/components/`, `src/layouts/`, `src/styles/`, other `src/data/` files, the Astro config, any `.astro`, `.css`, `.js` or `.html` file | **Needed** |
| `infrastructure` | `.github/`, `deploy/`, `scripts/`, `package.json`, `package-lock.json` | Not needed, but the platform team reviews it closely |

The comment also names new tutorials, news posts and pages, and warns when a page is moved or
removed, because old links to it need a redirect.

When a pull request has the `site code` label, add screenshots of each changed page to the
description, on a wide screen and on a phone. Drag the images into the description box on GitHub.
The check runs again when you save the description and turns green.

If site code changed but nothing looks different (a refactor, a type fix), a platform team member
can add the `no visual change` label instead.

To see why a check failed, click **Details** next to it on the pull request, then open the red step.

## Review and merge

- Every pull request needs one approval from the **indi-platform** team.
- All checks must pass, and the branch must be up to date with `main`.
- A new commit after approval clears the approval, so the last version is always the one reviewed.
- After approval, a platform team member merges it. Use **Squash and merge** for small changes.
- The deploy starts right after the merge. Watch it in the **Actions** tab, under **Build and deploy website**.
  When it is green, the change is live.

Reviewers, check that:

- the text is clear and correct, in American English
- links and images work (the checks cover links inside the site, not links to other sites)
- moved pages have a redirect
- nothing private is in the change: passwords, tokens, server details

## Where things are

| Path | What it is |
|---|---|
| `src/content/pages/` | Most pages, in Markdown. The folder path is the URL: `about/features/index.md` is `/about/features.html` |
| `src/content/tutorials/` | The tutorials, one folder each, in Markdown |
| `src/pages/` | Pages built in Astro: `index.astro` is the home page, `tutorials.astro` the tutorials list |
| `src/layouts/Base.astro` | Shared page shell: head, header and footer |
| `src/components/` | Header, footer and reusable parts such as the "How INDI works" diagram |
| `src/data/` | Tutorial topics, sections, gallery list, sponsors, redirects for old URLs |
| `src/assets/gallery/` | Gallery images |
| `src/styles/global.css` | Colors, type, header, footer and buttons for every page |
| `public/` | Files copied as they are: videos in `images/videos/`, `jdownloads/`, the INDI white paper in `files/`, sponsor logos |
| `deploy/nginx/` | nginx rules for old URL patterns (see its README) |
| `scripts/` | `check-links.mjs` checks links inside the built site; `classify-changes.mjs` sorts pull request changes; `check-old-urls.mjs` checks old URLs; `legacy-ids.mjs` writes the article number map |
| `.github/workflows/` | `checks.yml` and `pr-changes.yml` run on pull requests; `deploy.yml` deploys after a merge |

Other commands:

```sh
npm run dev       # dev server at http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve dist/ at http://localhost:4321
npm run check     # type check, build, and link check
```

## Old URLs

The old indilib.org (Joomla) URLs keep working, because other sites and old forum posts link to them.

- Pages keep their old paths and are built as `/name.html`.
- Pages that moved get a small redirect page, from `src/data/redirects.json` and the tutorials' `legacyUrl`.
- nginx handles URL patterns that can't be files: `/forum/...`, `index.php?...`, article numbers
  and feeds (`deploy/nginx/`).

`scripts/legacy-urls.txt` lists the old URLs. The pull request checks open every one of them.
To check the live site: `node scripts/check-old-urls.mjs https://indilib.org`.

The API reference at `/api/` is generated by the deploy workflow from the INDI source with Doxygen.
It is not in this repository and is not built on pull requests.

## Deploy (maintainers)

`deploy.yml` runs on a push to `main` (that is, after a merge), or from **Run workflow** in the
Actions tab. It builds the site and the API reference, then copies them to the server with rsync,
the same way as [drivers-docs](https://github.com/indilib/drivers-docs).

The deploy job runs in the `production` environment, which only accepts the `main` branch.
A deploy can't be started from any other branch.

Repository secrets: `REMOTE_HOST`, `REMOTE_USER`, `REMOTE_PRIVATE_KEY`, `DEPLOY_PATH`, and
`REMOTE_PORT` if SSH is not on port 22. Repository variables: `SITE_URL` (`https://indilib.org`)
and `DEPLOY_RRSYNC_ROOT`.

The deploy uses `rsync --delete`: everything in `DEPLOY_PATH` that is not part of the site is removed.
A check step refuses top-level folders such as `/`, `~` or `/var/www`.

On the server the deploy key is limited with `rrsync` in `~/.ssh/authorized_keys`:

```
command="/usr/bin/rrsync -wo /home/indi/www/indilib.org",restrict ssh-ed25519 AAAA... github-actions-deploy-indilib.org
```

The key can only write into that folder, and `DEPLOY_PATH` is relative to it (`/` is the folder itself).
The variable `DEPLOY_RRSYNC_ROOT` records this folder and lets the check accept `/`.

### Branch rules

The `main protection` ruleset (Settings → Rules) enforces:

- no direct pushes, force pushes or deletion of `main`
- a pull request with one approval from the indi-platform team, cleared by new commits
- the checks above must pass on a branch that is up to date with `main`

Nobody can bypass it.
