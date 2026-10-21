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

export const collections = { tutorials };
