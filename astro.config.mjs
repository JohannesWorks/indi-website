import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import remarkAlert from "remark-github-blockquote-alert";

// https://astro.build/config
export default defineConfig({
  // SITE_URL is set by the deploy workflow: https://new.indilib.org for the test site
  site: process.env.SITE_URL ?? "https://indilib.org",
  // Pages are written as /page.html, matching the old Joomla URLs
  build: { format: "file" },
  markdown: {
    // The remark processor, for > [!TIP], > [!NOTE], > [!WARNING] and > [!CAUTION] boxes, like drivers-docs
    processor: unified({ remarkPlugins: [remarkAlert] }),
    shikiConfig: { theme: "github-dark-dimmed" },
  },
});
