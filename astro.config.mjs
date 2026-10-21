import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://indilib.org",
  // Pages are written as /page.html, matching the old Joomla URLs
  build: { format: "file" },
});
