import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { TOPIC_IDS } from "./data/topics";

// One folder per tutorial: src/content/tutorials/<slug>/index.md, with its images next to it.
const tutorials = defineCollection({
  loader: glob({
    pattern: "*/index.md",
    base: "./src/content/tutorials",
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ""),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // One sentence, shown on the list page and in search results
      description: z.string(),
      topic: z.enum(TOPIC_IDS),
      author: z.string().optional(),
      date: z.coerce.date().optional(),
      cover: image().optional(),
      // Driver executables this tutorial is about, for example indi_safetymonitor
      drivers: z.array(z.string()).optional(),
      // True when the tutorial is mainly a video
      video: z.boolean().default(false),
      // Address on the old Joomla site, redirected to the new page
      legacyUrl: z.string().optional(),
      // Joomla article number, used to sort the older tutorials
      legacyId: z.number().optional(),
    }),
});

// Every other page of the site: about, Ekos, news, developer manual, Arduino, support, contributors
// and downloads. The folder path is the URL: src/content/pages/about/features/index.md is
// /about/features.html, so old indilib.org links keep working.
const pages = defineCollection({
  loader: glob({
    pattern: "**/index.md",
    base: "./src/content/pages",
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ""),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      // News posts: publish date and author
      date: z.coerce.date().optional(),
      author: z.string().optional(),
      // Position in its list (developer manual chapters, Ekos modules, contributors)
      order: z.number().optional(),
      // Joomla article number, used to sort news
      legacyId: z.number().optional(),
      // Contributors
      role: z.string().optional(),
      website: z.string().optional(),
      photo: image().optional(),
      // Download pages
      system: z.string().optional(),
    }),
});

export const collections = { tutorials, pages };
