"use client";
import React, {useState} from "react";
import UpEvents from "../../Components/UpComingComponents/UpEventsFiltr";
import UpCardsWithProps from "../../Components/UpComingComponents/UpCardsWithProps";
import BackgroundUi from "../../BackgroundUI/BackgroundStatic";
import {useGetUpcomingQuery} from "@/app/Apis/api";
import useAppLocale from "@/app/Hooks/GetLocale";

const page = () => {
    const {data, error, isLoading} = useGetUpcomingQuery();
    const locale = useAppLocale();

    const [filters, setFilters] = useState({title: "", date: ""});

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;
    if (!data) return <div>No event found</div>;

    const filteredProjects = data.filter((project) => {
        const title = project?.[locale]?.toLowerCase() || "";
        const date = project?.date || "";

        const matchesTitle = title.includes(filters.title.toLowerCase());
        const matchesDate = date.includes(filters.date); // дата уже строка!

        return matchesTitle && matchesDate;
    });

    return (
        <div>
            <BackgroundUi src="UpBack.png" name="upcoming"/>
            <UpEvents onFilterChange={setFilters}/>
            <UpCardsWithProps event={filteredProjects}/>
        </div>
    );
};

export default page;
