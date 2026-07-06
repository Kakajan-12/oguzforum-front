// Top-level "edition" links shown in the centre of the desktop header.
// Populated dynamically from upcoming events (see Header.tsx).
export type Edition = { label: string; href: string };

// Mega-menu groups revealed under "Company profile".
export type MegaLink = { label: string; href: string };
export type MegaGroup = { title: string; links: MegaLink[] };

export const MEGA_GROUPS: MegaGroup[] = [
  {
    title: "Company",
    links: [
      { label: "About us", href: `/about` },
      { label: "Mission", href: `/mission` },
      { label: "Careers", href: `/career` },
      { label: "Contacts", href: `/contacts` },
      { label: "FAQ", href: `/faq` },
    ],
  },
  {
    title: "Our work",
    links: [
      { label: "Projects", href: `/projects` },
      { label: "Events", href: `/events` },
    ],
  },
  {
    title: "Newsroom",
    links: [
      { label: "News", href: `/news` },
      { label: "Media center", href: `/media` },
      { label: "Press releases", href: `/press` },
    ],
  },
];
