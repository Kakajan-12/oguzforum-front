export type NavLink = { labelKey: string; href: string };
export type NavItem =
    | { type: "link"; labelKey: string; href: string }
    | { type: "dropdown"; labelKey: string; items: NavLink[] };

export const makeNavItems = (locale: string, t: (k: string) => string) : NavItem[] => [
    { type: "link", labelKey: "home", href: `/${locale}` },
    {
        type: "dropdown",
        labelKey: "company",
        items: [
            { labelKey: "weare", href: `/${locale}/weare` },
            { labelKey: "upcoming", href: `/${locale}/events` },
            { labelKey: "references", href: `/${locale}/references` },
            { labelKey: "career", href: `/${locale}/career` },
        ],
    },
    { type: "link", labelKey: "projects", href: `/${locale}/projects` },
    {
        type: "dropdown",
        labelKey: "newsroom",
        items: [
            { labelKey: "news", href: `/${locale}/news` },
            { labelKey: "media", href: `/${locale}/media` },
            { labelKey: "press", href: `/${locale}/press` },
        ],
    },
    { type: "link", labelKey: "contacts", href: `/${locale}/contacts` },
];
