import type { MiceEventFact } from "./MiceEventAbout";

export type MiceEvent = {
  slug: string;
  status: string;
  badge: string;
  title: string;
  description: string;
  date: string;
  location: string;
  fullLocation: string;
  image: string;
  about: {
    paragraphs: string[];
    image: string;
    facts: MiceEventFact[];
  };
};

export const MICE_EVENTS: MiceEvent[] = [
  {
    slug: "ciie-2026",
    status: "Upcoming Event",
    badge: "National Pavilion of Turkmenistan",
    title: "CIIE 2026",
    description:
      "The 9th China International Import Expo — the world's first national-level expo dedicated to imports. Turkmenistan takes part with its National Pavilion in the Country Exhibition.",
    date: "5-10 November, 2026",
    location: "NECC, Shanghai, China",
    fullLocation: "National Exhibition and Convention Center, Shanghai",
    image: "/mice/miceImage.jpg",
    about: {
      paragraphs: [
        "The China International Import Expo (CIIE) has been held every November in Shanghai since 2018. It is designed to turn China's vast market into a shared platform of opportunities for the world, bringing together governments, exporters, Chinese buyers and investors in one place.",
        "Alongside the exhibition, the Expo hosts the Hongqiao International Economic Forum, business matchmaking sessions and cultural exchange events, making it one of the key annual venues for trade and investment dialogue with China.",
      ],
      image: "/mice/CIIE_photo_1_NECC_facade.jpg",
      facts: [
        {
          title: "Hosts",
          text: "Ministry of Commerce of the People's Republic of China; Shanghai Municipal People's Government",
        },
        {
          title: "Organisers",
          text: "China International Import Expo Bureau; National Exhibition and Convention Center (Shanghai)",
        },
        {
          title: "International partners",
          text: "WTO, UNDP, UNCTAD, FAO, UNIDO, International Trade Centre",
        },
        {
          title: "Structure",
          text: "Country Exhibition, Enterprise & Business Exhibition, Hongqiao International Economic Forum, business and cultural events",
        },
      ],
    },
  },
];

export const getMiceEvent = (slug: string) =>
  MICE_EVENTS.find((event) => event.slug === slug);
