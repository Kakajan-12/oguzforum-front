"use client";
import Main from "../Components/MainComponents/Main/Main";
import AboutMain from "@/app/Components/MainComponents/AboutMain/AboutMain";
import EventsMain from "@/app/Components/MainComponents/EventsMain/EventsMain";
import ServicesMain from "@/app/Components/MainComponents/ServicesMain/ServicesMain";
import NewsMain from "@/app/Components/MainComponents/NewsMain/NewsMain";
import OurPartnersMain from "../Components/MainComponents/OurPartnersMain/OurPartnersMain";
import OurProjects from "../Components/MainComponents/ProjectsMain/Projects";

export default function Home() {
    return (
    <div>
      <Main />
      <AboutMain />
      <EventsMain />
      <ServicesMain />
      <NewsMain />
      <OurProjects/>
      <OurPartnersMain />
    </div>
  );
}
