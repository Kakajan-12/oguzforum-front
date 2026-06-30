"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import ProjectsFiltr from "@/app/Components/ProjectsComponents/ProjectsFilter";
import ProjectsPagination from "@/app/Components/ProjectsComponents/ProjectsPagination";
import ProjectsCardProps from "@/app/Components/ProjectsComponents/ProjectsCardProps";
import BackgroundUi from "@/app/BackgroundUI/BackgroundStatic";
import { useGetProjectsQuery } from "@/app/Apis/api";
import Spinner from "@/app/Components/UI/Spinner";
import ErrorMessage from "@/app/Components/UI/ErrorMessage";

const parseDate = (d: string | null | undefined) => {
  const t = new Date(d || 0);
  return isNaN(t.getTime()) ? 0 : t.getTime();
};

const Page = () => {
  const { data, error, isLoading } = useGetProjectsQuery();

  const [filters, setFilters] = useState({
    title: "",
    date: "",
    sort: "date_desc",
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProjects = useMemo(() => {
    if (!data) return [];

    let list = [...data];

    if (filters.title) {
      list = list.filter((project) => {
        const title = project?.en?.toLowerCase() || "";
        return title.includes(filters.title.toLowerCase());
      });
    }

    if (filters.date) {
      list = list.filter(
        (project) =>
          project.date?.includes(filters.date) ||
          project.end_date?.includes(filters.date),
      );
    }

    switch (filters.sort) {
      case "date_desc":
        list.sort((a, b) => parseDate(b.date) - parseDate(a.date));
        break;
      case "date_asc":
        list.sort((a, b) => parseDate(a.date) - parseDate(b.date));
        break;
      case "title_asc":
        list.sort((a, b) =>
          (a?.en || "").localeCompare(b?.en || ""),
        );
        break;
      case "title_desc":
        list.sort((a, b) =>
          (b?.en || "").localeCompare(a?.en || ""),
        );
        break;
      default:
        list.sort((a, b) => parseDate(b.date) - parseDate(a.date));
        break;
    }

    return list;
  }, [data, filters]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentData = filteredProjects.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const cardsTopRef = useRef<HTMLDivElement | null>(null);
  const prevPageRef = useRef(page);

  useEffect(() => {
    setPage(1);
  }, [filters.title, filters.date, filters.sort]);

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

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;
  if (!data || data.length === 0) return <div>No projects found</div>;

  // console.log("currentData", currentData);

  return (
    <div>
      <BackgroundUi src="Projects.webp" name="projects" />
      <ProjectsFiltr onFilterChange={setFilters} />
      <div ref={cardsTopRef}>
        <ProjectsCardProps event={currentData} />
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
