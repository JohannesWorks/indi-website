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
| `src/pages/` | One file per page. `index.astro` is the home page |
| `src/styles/global.css` | Colors, type, header, footer and buttons for every page |
| `public/` | Images and files copied as they are |

Pages are built as `/name.html`, so old indilib.org URLs keep working.

## Deploy

Every push to `main` builds the site. GitHub Actions copies `dist/` to the server with rsync,
the same way as [drivers-docs](https://github.com/indilib/drivers-docs).
It needs the `REMOTE_HOST`, `REMOTE_USER` and `REMOTE_PRIVATE_KEY` secrets and the `DEPLOY_PATH` variable.
