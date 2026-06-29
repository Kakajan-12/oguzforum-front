// Top-level "edition" links shown in the centre of the desktop header.
// These are separate forum landing pages (to be built later).
export type Edition = { label: string; href: string };

export const EDITIONS: Edition[] = [
    { label: "ITTC 2026", href: `/ittc-2026` },
    { label: "TIF 2026", href: `/tif-2026` },
    { label: "TurkmenTEL 2026", href: `/turkmentel-2026` },
];

// Mega-menu groups revealed under "Company profile".
export type MegaLink = { label: string; href: string };
export type MegaGroup = { title: string; links: MegaLink[] };

export const MEGA_GROUPS: MegaGroup[] = [
    {
        title: "Company",
        links: [
            { label: "About us", href: `/weare` },
            { label: "Mission", href: `/weare` },
            { label: "Careers", href: `/career` },
            { label: "Contacts", href: `/contacts` },
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
            { label: "Media Center", href: `/media` },
            { label: "Press Release", href: `/press` },
        ],
    },
];

// Shared contact details shown in the mega-menu / footer.
export const CONTACT_PHONE = "+99360 480 080";
export const CONTACT_EMAIL = "info@oguzforum.com";
