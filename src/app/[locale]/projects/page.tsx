'use client'

import ProjectsFiltr from "../../Components/ProjectsComponents/ProjectsFilter";
import BackgroundUi from "../../BackgroundUI/BackgroundStatic";
import ProjectsCardProps from "../../Components/ProjectsComponents/ProjectsCardProps";
import { useGetProjectsQuery } from "@/app/Apis/api";
import React, {useState} from "react";
import useAppLocale from "@/app/Hooks/GetLocale";

const Page = () => {
    const { data, error, isLoading } = useGetProjectsQuery();
    const locale = useAppLocale(); // ✅ всегда вызывается

    const [filters, setFilters] = useState({ title: "", date: "" }); // ✅ тоже всегда

    if (isLoading) return <p>loading...</p>;
    if (error) return <p>error</p>;
    if (!data) return <p>not found</p>;

    const filteredProjects = data.filter((project) => {
        const title = project?.[locale]?.toLowerCase() || "";
        const date = project?.date || "";

        const matchesTitle = title.includes(filters.title.toLowerCase());
        const matchesDate = date.includes(filters.date); // дата уже строка!

        return matchesTitle && matchesDate;
    });


    return (
        <div>
            <BackgroundUi src="Projects.png" name="projects" />
            <ProjectsFiltr onFilterChange={setFilters} />
            <ProjectsCardProps event={filteredProjects} />
        </div>
    );
};


export default Page;
