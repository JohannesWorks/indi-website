// Sort the files changed in a pull request into content, site code and infrastructure,
// and decide whether the pull request needs screenshots.
// Usage: node scripts/classify-changes.mjs < files.tsv
//   Each input line: status<TAB>path<TAB>previous path (GitHub's pull request files list).
//   PR_BODY and PR_LABELS (comma separated) come from the environment.
// Writes the summary as Markdown to stdout. Exit code 3 when screenshots are missing.
// With GITHUB_OUTPUT set, also writes labels=<comma separated> for the workflow.
import fs from "node:fs";

const NO_VISUAL_LABEL = "no visual change";

// Markdown and the files that go with it: the regular checks are enough
const CONTENT = [
  /^src\/content\//,
  /^src\/assets\/gallery\//,
  /^src\/data\/(gallery\.ts|redirects\.json|intros\/)/,
  /^public\/(?!.*\.(css|js|mjs|html)$)/,
];
// Build, deploy and checks: the platform team looks at these closely
const INFRA = [/^\.github\//, /^deploy\//, /^scripts\//, /^package(-lock)?\.json$/, /^tsconfig\.json$/, /^\.gitignore$/];
// Everything else in src/, the Astro config and any code file changes how the site looks or works
const SITE = [/^src\//, /^astro\.config\./, /\.(astro|css|js|mjs|ts|html)$/];

const groupOf = (f) =>
  CONTENT.some((r) => r.test(f)) ? "content"
  : INFRA.some((r) => r.test(f)) ? "infrastructure"
  : SITE.some((r) => r.test(f)) ? "site code"
  : "other";

// src/content/pages/about/news/237-x/index.md -> /about/news/237-x.html
const pageUrl = (f) => {
  const m = f.match(/^src\/content\/(pages|tutorials)\/(.+)\/index\.md$/);
  if (!m) return null;
  return { kind: m[1], url: m[1] === "tutorials" ? `/tutorials/${m[2]}.html` : `/${m[2]}.html`, news: m[2].startsWith("about/news/") };
};

const files = fs.readFileSync(0, "utf8").split("\n").filter(Boolean).map((l) => {
  const [status, path, previous] = l.split("\t");
  return { status, path, previous, group: groupOf(path) };
});
const body = process.env.PR_BODY ?? "";
const labels = (process.env.PR_LABELS ?? "").split(",").map((s) => s.trim()).filter(Boolean);

const groups = new Set(files.map((f) => f.group));
const hasScreenshot = /!\[[^\]]*\]\([^)]+\)|<img\s|<video\s|https:\/\/github\.com\/user-attachments\/assets\//i.test(body);
const skipScreenshots = labels.includes(NO_VISUAL_LABEL);
const needsScreenshots = groups.has("site code") && !hasScreenshot && !skipScreenshots;

// New and removed pages, by name
const notes = [];
for (const f of files) {
  const p = pageUrl(f.path);
  if (!p) continue;
  const what = p.kind === "tutorials" ? "tutorial" : p.news ? "news post" : "page";
  if (f.status === "added") notes.push(`New ${what}: \`${p.url}\``);
  if (f.status === "removed") notes.push(`⚠️ Removed ${what}: \`${p.url}\`. Old links to it need a redirect in \`src/data/redirects.json\`.`);
  if (f.status === "renamed") {
    const old = pageUrl(f.previous ?? "");
    if (old) notes.push(`⚠️ Moved ${what}: \`${old.url}\` → \`${p.url}\`. Old links need a redirect in \`src/data/redirects.json\`.`);
  }
}

const TITLES = { content: "📝 Content", "site code": "🎨 Site code", infrastructure: "⚙️ Infrastructure", other: "📄 Other" };
const out = ["<!-- pr-changes -->", "## What this pull request changes", ""];
if (!files.length) out.push("No files changed.");
for (const g of Object.keys(TITLES).filter((g) => groups.has(g))) {
  const list = files.filter((f) => f.group === g);
  out.push(`<details${g === "content" ? "" : " open"}><summary><b>${TITLES[g]}</b> (${list.length} file${list.length === 1 ? "" : "s"})</summary>`, "");
  for (const f of list) out.push(`- ${f.status}: \`${f.path}\``);
  out.push("", "</details>", "");
}
if (notes.length) out.push(...notes.map((n) => `- ${n}`), "");

if (groups.has("site code")) {
  if (hasScreenshot) out.push("✅ **Screenshots:** found in the description.");
  else if (skipScreenshots) out.push(`✅ **Screenshots:** not needed, a maintainer added the \`${NO_VISUAL_LABEL}\` label.`);
  else out.push(
    "❌ **Screenshots needed.** This pull request changes how the site looks or works.",
    "Edit the description and drag in screenshots of each changed page, on a wide screen and on a phone.",
    "This check runs again when you save the description.",
  );
} else if (groups.has("content")) {
  out.push("✅ Content only. The regular checks are enough.");
}
if (groups.has("infrastructure")) out.push("", "⚙️ Build, deploy or check files changed. The platform team should review these closely.");

console.log(out.join("\n"));
if (process.env.GITHUB_OUTPUT) {
  const add = [...groups].filter((g) => g !== "other");
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `labels=${add.join(",")}\n`);
}
process.exit(needsScreenshots ? 3 : 0);
