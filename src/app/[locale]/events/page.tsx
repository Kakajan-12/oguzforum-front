"use client";
import React, { useState, useMemo } from "react";
import UpEvents from "../../Components/UpComingComponents/UpEventsFilter";
import UpCardsWithProps from "../../Components/UpComingComponents/UpCardsWithProps";
import BackgroundUi from "../../BackgroundUI/BackgroundStatic";
import { useGetProjectsQuery } from "@/app/Apis/api";
import useAppLocale from "@/app/Hooks/GetLocale";

const Page = () => {
    const { data, error, isLoading } = useGetProjectsQuery();
    const locale = useAppLocale();
    const [filters, setFilters] = useState({ title: "", sort: "default" });

    const filteredProjects = useMemo(() => {
        if (!data) return [];

        let list = [...data];

        if (filters.title) {
            list = list.filter((project) => {
                const title = project?.[locale]?.toLowerCase() || "";
                return title.includes(filters.title.toLowerCase());
            });
        }

        switch (filters.sort) {
            case "date_desc":
                list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                break;
            case "date_asc":
                list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                break;
            case "title_asc":
                list.sort((a, b) => (a?.[locale] || "").localeCompare(b?.[locale] || ""));
                break;
            case "title_desc":
                list.sort((a, b) => (b?.[locale] || "").localeCompare(a?.[locale] || ""));
                break;
        }

        return list;
    }, [data, filters, locale]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;
    if (!data) return <div>No event found</div>;

    return (
        <div>
            <BackgroundUi src="UpBack.png" name="upcoming" />
            <UpEvents onFilterChange={setFilters} />
            <UpCardsWithProps event={filteredProjects} />
        </div>
    );
};

export default Page;
