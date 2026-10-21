// Site sections: names for breadcrumbs, and which folders hold lists of pages.
export const SECTION_NAMES: Record<string, string> = {
  about: "About",
  "about/ekos": "Ekos",
  "about/news": "News",
  "about/contributors": "Contributors",
  develop: "Develop",
  "develop/developer-manual": "Developer manual",
  "develop/arduino": "Arduino",
  support: "Support",
  download: "Download",
};

/** Breadcrumb trail for a page id like "about/ekos/focus-module". */
export function crumbs(id: string) {
  const parts = id.split("/");
  const trail: { name: string; href: string }[] = [];
  for (let i = 1; i < parts.length; i++) {
    const key = parts.slice(0, i).join("/");
    if (SECTION_NAMES[key]) trail.push({ name: SECTION_NAMES[key], href: `/${key}.html` });
  }
  return trail;
}

/** The folder that groups a page with its siblings, for example "develop/developer-manual". */
export const parentOf = (id: string) => id.split("/").slice(0, -1).join("/");
