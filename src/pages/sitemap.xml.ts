import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// All real pages (not redirects), for search engines.
export const GET: APIRoute = async ({ site }) => {
  const fixed = ["/", "/tutorials.html", "/about.html", "/about/news.html", "/about/ekos.html", "/about/contributors.html",
    "/develop.html", "/develop/developer-manual.html", "/develop/arduino.html", "/support.html", "/support/gallery.html",
    "/download.html", "/api/index.html"];
  const tutorials = (await getCollection("tutorials")).map((t) => `/tutorials/${t.id}.html`);
  const pages = (await getCollection("pages")).map((p) => `/${p.id}.html`);
  const urls = [...fixed, ...tutorials, ...pages].map((u) => `  <url><loc>${new URL(u, site).href}</loc></url>`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
};
