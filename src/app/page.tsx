"use client";
import Main from "@/app/Components/MainComponents/Main/Main";
import EventsMain from "@/app/Components/MainComponents/EventsMain/EventsMain";
import NewsMain from "@/app/Components/MainComponents/NewsMain/NewsMain";
import OurPartnersMain from "@/app/Components/MainComponents/OurPartnersMain/OurPartnersMain";
import OurProjects from "@/app/Components/MainComponents/ProjectsMain/Projects";

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
