# nginx rules for old indilib.org URLs

The site keeps old URLs in two ways:

1. **In the site itself.** Pages keep their old paths (for example `/about/ekos/focus-module.html`),
   and pages that moved get a small redirect page (`src/data/redirects.json`, tutorials' `legacyUrl`).
   This works on any host with no server setup.
2. **In nginx (these files).** Patterns that can't be static files: `/forum/...`, `index.php?...`,
   article numbers, feeds, login pages, old `/images/` files, and folder URLs with a trailing slash.

## Install on the server (once)

```sh
sudo mkdir -p /etc/nginx/indilib
sudo cp legacy-maps.conf legacy-locations.conf legacy-ids.map /etc/nginx/indilib/
```

In `/etc/nginx/nginx.conf`, inside `http { }`:

```nginx
include /etc/nginx/indilib/legacy-maps.conf;
```

In the server block for `indilib.org` and `new.indilib.org` (after `root`):

```nginx
root /home/indi/www/indilib.org;
index index.html;
include /etc/nginx/indilib/legacy-locations.conf;
```

Remove any existing `location / { ... }` from that server block; `legacy-locations.conf` has its own.
Then `sudo nginx -t && sudo systemctl reload nginx`.

## Old images and files

Other sites and old forum posts link straight to files on the old server, like
`https://indilib.org/images/...`. Copy the old site's `images/` and `media/` folders once:

```sh
mkdir -p /home/indi/www/legacy
rsync -a OLD_SERVER:/path/to/joomla/images /home/indi/www/legacy/
rsync -a OLD_SERVER:/path/to/joomla/media  /home/indi/www/legacy/
```

They live outside the deploy folder, so `rsync --delete` from GitHub Actions never touches them.
The site's own files under `/images/` (videos) are served first.

## When content changes

`legacy-ids.map` lists old Joomla article numbers. Regenerate it with `node scripts/legacy-ids.mjs`
after adding content with a `legacyId`, copy it to `/etc/nginx/indilib/` and reload nginx.

## Check

```sh
node scripts/check-old-urls.mjs https://new.indilib.org
node scripts/check-old-urls.mjs https://new.indilib.org path/to/search-console-export.csv
```
