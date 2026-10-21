import type { APIRoute } from "astro";

// The test site (new.indilib.org) is closed to search engines; the live site is open.
export const GET: APIRoute = ({ site }) => {
  const body = process.env.STAGING === "true"
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", site).href}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
};
