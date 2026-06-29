"use client";
import Main from "../Components/MainComponents/Main/Main";
import EventsMain from "@/app/Components/MainComponents/EventsMain/EventsMain";
import NewsMain from "@/app/Components/MainComponents/NewsMain/NewsMain";
import OurPartnersMain from "../Components/MainComponents/OurPartnersMain/OurPartnersMain";
import OurProjects from "../Components/MainComponents/ProjectsMain/Projects";

export default function Home() {
    return (
        <div>
            <Main/>
            <EventsMain/>
            <OurProjects/>
            <NewsMain/>
            <OurPartnersMain/>
        </div>
    );
}
