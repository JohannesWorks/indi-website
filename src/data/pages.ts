import { getCollection, type CollectionEntry } from "astro:content";

export type Page = CollectionEntry<"pages">;
export const pageUrl = (p: Page | string) => `/${typeof p === "string" ? p : p.id}.html`;

/** Pages directly inside a folder, in reading order: news newest first, others by order then title. */
export async function childrenOf(folder: string) {
  const all = await getCollection("pages");
  const kids = all.filter((p) => p.id.startsWith(folder + "/") && !p.id.slice(folder.length + 1).includes("/"));
  if (folder === "about/news") {
    const t = (p: Page) => p.data.date?.getTime() ?? (p.data.legacyId ?? 0) * 1e9;
    return kids.sort((a, b) => t(b) - t(a));
  }
  return kids.sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999) || a.data.title.localeCompare(b.data.title));
}

export async function getPage(id: string) {
  return (await getCollection("pages")).find((p) => p.id === id);
}
