// Check that old indilib.org URLs still lead somewhere on the new site.
// Usage: node scripts/check-old-urls.mjs [base URL] [url list files...]
//   base defaults to https://new.indilib.org, lists default to scripts/legacy-urls.txt.
//   A list can be plain paths, full URLs, or a Google Search Console CSV export.
// Follows HTTP redirects and the site's redirect pages (meta refresh), up to 6 hops.
import fs from "node:fs";
import path from "node:path";

const here = import.meta.dirname;
const [base = "https://new.indilib.org", ...lists] = process.argv.slice(2);
const files = lists.length ? lists : [path.join(here, "legacy-urls.txt")];
const OLD_HOSTS = /^https?:\/\/(www\.)?indilib\.org/;

const paths = new Set();
for (const f of files) {
  for (let line of fs.readFileSync(f, "utf8").split(/\r?\n/)) {
    line = line.split(",")[0].replace(/^"|"$/g, "").trim();
    if (!line || line.startsWith("#") || /^(url|top pages|page)$/i.test(line)) continue;
    if (OLD_HOSTS.test(line)) line = line.replace(OLD_HOSTS, "") || "/";
    if (line.startsWith("/")) paths.add(line);
  }
}

async function follow(url) {
  const hops = [];
  for (let i = 0; i < 6; i++) {
    // Leaving the site (forum, drivers): record where it goes, don't fetch the other site
    if (!url.startsWith(base)) return { status: 301, url, hops };
    const res = await fetch(url, { redirect: "manual", headers: { "User-Agent": "indi-url-check" } });
    const loc = res.headers.get("location");
    if (res.status >= 300 && res.status < 400 && loc) { url = new URL(loc, url).href; hops.push(res.status + " " + url); continue; }
    if (res.status === 200 && (res.headers.get("content-type") ?? "").includes("text/html")) {
      const html = await res.text();
      const m = html.match(/<meta http-equiv="refresh" content="0; url=([^"]+)"/i);
      if (m) { url = new URL(m[1], url).href; hops.push("page " + url); continue; }
    }
    return { status: res.status, url, hops };
  }
  return { status: "loop", url, hops };
}

const results = [];
const queue = [...paths];
await Promise.all(Array.from({ length: 8 }, async () => {
  while (queue.length) {
    const p = queue.shift();
    try { results.push({ p, ...(await follow(base + p)) }); }
    catch (e) { results.push({ p, status: "error " + e.message, url: "", hops: [] }); }
  }
}));

results.sort((a, b) => a.p.localeCompare(b.p));
const ok = results.filter((r) => r.status === 200 || (typeof r.status === "number" && r.status < 400 && !r.url.startsWith(base)));
const external = ok.filter((r) => !r.url.startsWith(base));
const bad = results.filter((r) => !ok.includes(r));
console.log(`${results.length} old URLs checked against ${base}`);
console.log(`  ${ok.length - external.length} reach a page on the site, ${external.length} go to another site (forum, drivers), ${bad.length} fail`);
if (bad.length) {
  console.log("\nFailing:");
  for (const r of bad) console.log(`  ${r.status}  ${r.p}${r.hops.length ? "  (via " + r.hops.join(" -> ") + ")" : ""}`);
  process.exitCode = 1;
}
