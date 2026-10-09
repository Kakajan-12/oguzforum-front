import type { MiceEventFact } from "./MiceEventAbout";
import type { MiceEventFigure } from "./MiceEventFigures";

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
  figures?: {
    title: string;
    subtitle?: string;
    items: MiceEventFigure[];
  };
  pavilion?: {
    title: string;
    description?: string;
    details: MiceEventFact[];
    sectorsTitle: string;
    sectors: string[];
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
    image: "/mice/CIIE_photo_3_CIIE_logo_mascot.jpg",
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
    figures: {
      title: "CIIE in Figures",
      subtitle: "Results of the 8th CIIE, 2025",
      items: [
        { value: "$83.49 bn", label: "Tentative deals for one-year purchases" },
        { value: "150+", label: "Participating countries and regions" },
        { value: "4,108", label: "Overseas exhibitors" },
        { value: "430,000+", label: "Square metres of exhibition space" },
        { value: "460,000+", label: "Registered professional visitors" },
      ],
    },
    pavilion: {
      title: "National Pavilion of Turkmenistan",
      description:
        "The official exposition of Turkmenistan in the Country Exhibition. The Pavilion presents the country's economic and export potential, investment and transit opportunities, culture and tourism in one place — and connects Turkmen companies directly with Chinese buyers, importers and investors.",
      details: [
        {
          title: "Location",
          text: "Country Exhibition, Hall 5.2, NECC Shanghai",
        },
        { title: "Pavilion area", text: "132 m² (12 × 11 m)" },
        {
          title: "Organiser",
          text: "Chamber of Commerce and Industry of Turkmenistan",
        },
        { title: "Co-organiser", text: "Oguz Forum & Expo" },
        {
          title: "Layout",
          text: "Exposition in 13 sectors, B2B meeting zone, presentation area",
        },
        {
          title: "Participants",
          text: "Ministries and sector agencies, state enterprises and concerns, private companies, tourism companies, official delegation",
        },
      ],
      sectorsTitle: "13 Sectors of the Pavilion",
      sectors: [
        "Energy",
        "Petrochemicals & Chemicals",
        "Textile Industry",
        "Carpet Weaving",
        "Food Products",
        "Agriculture",
        "Construction Materials",
        "Transport & Logistics",
        "Tourism",
        "Culture & Crafts",
        "State Commodity and Raw Materials Exchange of Turkmenistan",
        "Pharmaceuticals",
        "Innovation & Digital Economy",
      ],
    },
  },
];

export const getMiceEvent = (slug: string) =>
  MICE_EVENTS.find((event) => event.slug === slug);
