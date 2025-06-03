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
  image: string;
  tk: string;
  en: string;
  ru: string;
  text_tk: string;
  text_en: string;
  text_ru: string;
  date: string;
  end_date: string;
  link: string;
  location_tk: string;
  location_en: string;
  location_ru: string;
};

export type Partners = {
  id: number;
  logo: string;
};

export type Contacts = {
  id: number;
  number: string;
  mail: string;
};

export type ContactsAddress = {
  id: number;
  en: string;
  ru: string;
  tk: string;
  location_en: string;
  location_tk: string;
  location_ru: string;
  iframe_code: string;
};

export type Links = {
  id: number;
  icon: string;
  url: string;
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

export type Privacy = {
  id: number;
  en: string;
  ru: string;
  tk: string;
};

export type Cookie = {
  id: number;
  en: string;
  ru: string;
  tk: string;
};

//////---------------------------------------//////////////////////////////-----------------------------///////////////

export type applyAjob = {
  id: number,
  tk: string,
  en: string,
  ru: string,
  date: string,
}