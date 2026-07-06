// Top-level "edition" links shown in the centre of the desktop header.
// Populated dynamically from upcoming events (see Header.tsx).
export type Edition = { label: string; href: string };

// Mega-menu groups revealed under "Company profile".
export type MegaLink = { label: string; href: string };
export type MegaGroup = { title: string; links: MegaLink[] };

export const MEGA_GROUPS: MegaGroup[] = [
  {
    title: "company",
    links: [
      { label: "about", href: `/about` },
      { label: "mission", href: `/mission` },
      { label: "careers", href: `/career` },
      { label: "contacts", href: `/contacts` },
      { label: "faq", href: `/faq` },
    ],
  },
  {
    title: "work",
    links: [
      { label: "projects", href: `/projects` },
      { label: "events", href: `/events` },
    ],
  },
  {
    title: "newsroom",
    links: [
      { label: "news", href: `/news` },
      { label: "media", href: `/media` },
      { label: "press", href: `/press` },
    ],
  },
];
