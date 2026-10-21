import { getCollection, type CollectionEntry } from "astro:content";
import { TOPICS } from "./topics";

export type Tutorial = CollectionEntry<"tutorials">;

/** Reading time in minutes, from the Markdown body. */
export function minutes(t: Tutorial) {
  const words = (t.body ?? "").replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export const hasCode = (t: Tutorial) => /```/.test(t.body ?? "");
export const tutorialUrl = (t: Tutorial) => `/tutorials/${t.id}.html`;

/** All tutorials, grouped in topic order. Older tutorials first within a topic, new ones after. */
export async function sortedTutorials() {
  const all = await getCollection("tutorials");
  const key = (t: Tutorial) => t.data.legacyId ?? 10_000 + (t.data.date?.getTime() ?? 0) / 1e12;
  return TOPICS.flatMap((tp) => all.filter((t) => t.data.topic === tp.id).sort((a, b) => key(a) - key(b)));
}

/** The newest tutorials that have a cover image. */
export async function latestTutorials(count = 3) {
  const all = await getCollection("tutorials");
  // Old Joomla tutorials rank by article number; new ones (no number) come first, newest on top
  const rank = (t: Tutorial) => t.data.legacyId ?? 1_000 + (t.data.date?.getTime() ?? 0) / 1e12;
  return all.filter((t) => t.data.cover).sort((a, b) => rank(b) - rank(a)).slice(0, count);
}
