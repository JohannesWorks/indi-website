// Tutorial topics, in the order they appear on the tutorials page.
export const TOPICS = [
  {
    id: "setup",
    name: "Setup and installation",
    description: "Install INDI and get your computer talking to your equipment.",
    icon: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
  },
  {
    id: "ekos",
    name: "Ekos and imaging",
    description: "Align, capture and build mosaics with KStars and Ekos.",
    icon: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
  },
  {
    id: "remote",
    name: "Remote control",
    description: "Run your gear from indoors, or from the other side of the world.",
    icon: '<path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.4a9.5 9.5 0 0 1 13 0M8.6 15.7a5 5 0 0 1 6.8 0"/><circle cx="12" cy="19" r="1"/>',
  },
  {
    id: "observatory",
    name: "Observatory and devices",
    description: "Roofs, power, safety, smart telescopes and new hardware.",
    icon: '<path d="M2.5 20.5h19M4.5 20.5v-6h15v6M4.8 14.5a7.2 7.2 0 0 1 14.4 0M11 7.4v7.1M13 7.4v7.1"/>',
  },
  {
    id: "diy",
    name: "DIY hardware",
    description: "Build your own focuser, dust cap or weather station.",
    icon: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4Z"/>',
  },
  {
    id: "dev",
    name: "Development",
    description: "Write drivers and clients, and script INDI from Python.",
    icon: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  },
] as const;

export type TopicId = (typeof TOPICS)[number]["id"];
export const TOPIC_IDS = TOPICS.map((t) => t.id) as [TopicId, ...TopicId[]];
export const topicName = (id: TopicId) => TOPICS.find((t) => t.id === id)!.name;
