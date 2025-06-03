'use client';
import ProjectsFiltr from "../../Components/ProjectsComponents/ProjectsFilter";
import BackgroundUi from "../../BackgroundUI/BackgroundStatic";
import ProjectsCardProps from "../../Components/ProjectsComponents/ProjectsCardProps";
import { useGetProjectsQuery } from "@/app/Apis/api";
import React, { useState } from "react";
import useAppLocale from "@/app/Hooks/GetLocale";

const Page = () => {
    const { data, error, isLoading } = useGetProjectsQuery();
    const locale = useAppLocale();

    const [filters, setFilters] = useState({ title: "", date: "" });

    const handleFilterChange = (f: { title: string; date: string }) => setFilters(f);

    if (isLoading) return <p>Loading…</p>;
    if (error)    return <p>Error loading data</p>;
    if (!data)    return <p>Not found</p>;

    /** ── фильтрация ────────────────────────── */
    const filtered = data.filter((pr) => {
        const title = (pr?.[locale] ?? "").toLowerCase();
        const date  = pr?.date ?? "";
        return title.includes(filters.title.toLowerCase()) && date.includes(filters.date);
    });

    return (
        <div>
            <BackgroundUi src="Projects.png" name="projects" />
            <ProjectsFiltr onFilterChange={handleFilterChange} />
            <ProjectsCardProps event={filtered} itemsPerPage={9} />
        </div>
    );
};

export default Page;
