"use client";
import Main from "@/components/home/Hero/Hero";
import EventsMain from "@/components/home/Events/Events";
import NewsMain from "@/components/home/News/News";
import OurPartnersMain from "@/components/home/Partners/Partners";
import OurProjects from "@/components/home/Projects/Projects";

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
