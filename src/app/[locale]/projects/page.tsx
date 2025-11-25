'use client';

import React, { useMemo, useState, useEffect, useRef } from "react";
import ProjectsFiltr from "../../Components/ProjectsComponents/ProjectsFilter";
import ProjectsPagination from "@/app/Components/ProjectsComponents/ProjectsPagination";
import ProjectsCardProps from "../../Components/ProjectsComponents/ProjectsCardProps";
import BackgroundUi from "../../BackgroundUI/BackgroundStatic";
import { useGetProjectsQuery } from "@/app/Apis/api";
import useAppLocale from "@/app/Hooks/GetLocale";

const parseDate = (d: string | null | undefined) => {
    const t = new Date(d || 0);
    return isNaN(t.getTime()) ? 0 : t.getTime();
};

const Page = () => {
    const { data, error, isLoading } = useGetProjectsQuery();
    const locale = useAppLocale();
    const [filters, setFilters] = useState({ title: "", sort: "default" });
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

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
                list.sort((a, b) => parseDate(b.date) - parseDate(a.date));
                break;
            case "date_asc":
                list.sort((a, b) => parseDate(a.date) - parseDate(b.date));
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

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const currentData = filteredProjects.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const cardsTopRef = useRef<HTMLDivElement | null>(null);
    const prevPageRef = useRef(page);

    useEffect(() => {
        if (prevPageRef.current !== page) {
            if (cardsTopRef.current) {
                const element = cardsTopRef.current.getBoundingClientRect();
                const offset = window.scrollY + element.top - 250;
                window.scrollTo({ top: offset, behavior: "smooth" });
            }
        }
        prevPageRef.current = page;
    }, [page]);



    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;
    if (!data || data.length === 0) return <div>No projects found</div>;

    return (
        <div>
            <BackgroundUi src="Projects.png" name="projects" />
            <ProjectsFiltr onFilterChange={setFilters} />
            <div ref={cardsTopRef}>
                <ProjectsCardProps event={currentData} itemsPerPage={itemsPerPage} />
            </div>
            <ProjectsPagination
                totalPages={totalPages}
                currentPage={page}
                onChange={(event, value) => setPage(value)}
            />
        </div>
    );
};

export default Page;
