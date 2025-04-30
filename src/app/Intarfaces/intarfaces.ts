export type Slider = {
  id: number;
  en: string;
  ru: string;
  tk: string;
  image: string;
};

export type News = {
  id: number;
  image: string;
  en: string;
  ru: string;
  tk: string;
  text_en: string;
  text_ru: string;
  text_tk: string;
  date: string;
  cat_en: string;
  cat_ru: string;
  cat_tk: string;
};

export type Projects = {
  id: number;
  image: string; // пример: "uploads\\1744473848568.png"
  tk: string; // HTML в виде строки, например: "<p>1</p>"
  en: string;
  ru: string;
  text_tk: string;
  text_en: string;
  text_ru: string;
  location_tk: string;
  location_en: string;
  location_ru: string;
};

export type UpcomingEvent = {
  id: number;
  date: string;
  en: string;
  ru: string;
  tk: string;
  image: string;
  link: string;
  location_en: string;
  location_ru: string;
  location_tk: string;
  text_en: string;
  text_ru: string;
  text_tk: string;
};

export type Partners = {
  id: number;
  logo: string;
};

export type Contacts = {
  id: number;
  en: string;
  tk: string;
  ru: string;
  number: string;
  mail: string;
};

export type Gallery = {
  id: number;
  image: string;
  project_id: number;
};

export type Career = {
  id: number;
  date: string;
  en: string;
  ru: string;
  tk: string;
};

export type Faq = {
  id: number;
  en: string;
  ru: string;
  tk: string;
  text_en: string;
  text_ru: string;
  text_tk: string;
};

export type Services = {
  id: number;
  en: string;
  ru: string;
  tk: string;
  image: string;
  text_en: string;
  text_ru: string;
  text_tk: string;
};


//////---------------------------------------//////////////////////////////-----------------------------///////////////

export type applyAjob = {
  id: number,
  tk: string,
  en: string,
  ru: string,
  date: string,
}