// Check that every link and image inside the built site points to a file that exists.
// Usage: node scripts/check-links.mjs [dist folder]
//   Run after `npm run build`. Links to other sites are not fetched.
//   /api/ is skipped: the deploy workflow builds it from the INDI source.
import fs from "node:fs";
import path from "node:path";

const dist = path.resolve(process.argv[2] ?? "dist");
const SITE = /^https?:\/\/(www\.)?indilib\.org(?=\/|$)/;
// Built elsewhere, or answered by nginx (deploy/nginx/legacy-locations.conf)
const SKIP = [/^\/api(\/|$)/, /^\/forum(\/|$)/, /^\/kunena/, /^\/index\.php/];

function* htmlFiles(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith(".html")) yield p;
  }
}

function exists(urlPath) {
  const p = path.join(dist, decodeURIComponent(urlPath));
  if (!p.startsWith(dist)) return false;
  return [p, path.join(p, "index.html"), p + ".html"].some((f) => fs.existsSync(f) && fs.statSync(f).isFile());
}

const broken = new Map();
let checked = 0;
for (const file of htmlFiles(dist)) {
  const html = fs.readFileSync(file, "utf8");
  const page = "/" + path.relative(dist, file).split(path.sep).join("/");
  const refs = [...html.matchAll(/\s(?:href|src)="([^"]*)"/g)].map((m) => m[1]);
  for (const m of html.matchAll(/\ssrcset="([^"]*)"/g)) refs.push(...m[1].split(",").map((s) => s.trim().split(/\s+/)[0]));
  for (const m of html.matchAll(/<meta http-equiv="refresh" content="0; url=([^"]+)"/gi)) refs.push(m[1]);
  for (let ref of refs) {
    ref = ref.replace(/&amp;/g, "&");
    if (SITE.test(ref)) ref = ref.replace(SITE, "") || "/";
    if (!ref || /^(#|[a-z][a-z0-9+.-]*:|\/\/)/i.test(ref)) continue;
    const target = new URL(ref, "http://x" + page).pathname;
    if (SKIP.some((r) => r.test(target))) continue;
    checked++;
    if (!exists(target)) {
      if (!broken.has(target)) broken.set(target, new Set());
      broken.get(target).add(page);
    }
  }
}

for (const [target, pages] of broken) {
  const list = [...pages];
  console.log(`::error::Broken link ${target} on ${list.slice(0, 3).join(", ")}${list.length > 3 ? ` and ${list.length - 3} more` : ""}`);
}
console.log(`${checked} links checked, ${broken.size} broken targets.`);
process.exit(broken.size ? 1 : 0);
