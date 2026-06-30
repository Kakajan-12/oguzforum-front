"use client";

import { useGetPressQuery } from "@/app/Apis/api";

import Spinner from "@/app/Components/UI/Spinner";
import ErrorMessage from "@/app/Components/UI/ErrorMessage";
import React, { useMemo, useState, useEffect, useRef } from "react";
import BackgroundUi from "@/app/BackgroundUI/BackgroundStatic";
import NewsFiltr from "@/app/Components/NewsComponents/NewsFiltr";
import NewsCardProps from "@/app/Components/NewsComponents/NewsCardProps";
import ProjectsPagination from "@/app/Components/ProjectsComponents/ProjectsPagination";

const Press = () => {
  const { data, error, isLoading } = useGetPressQuery();

  const [filters, setFilters] = useState({
    title: "",
    date: "",
    sort: "date_desc",
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const filteredPress = useMemo(() => {
    if (!data) return [];

    let list = [...data];

    if (filters.title) {
      list = list.filter((item) => {
        const title = item?.en?.toLowerCase() || "";
        return title.includes(filters.title.toLowerCase());
      });
    }

    if (filters.date) {
      list = list.filter((item) => item.date?.includes(filters.date));
    }

    switch (filters.sort) {
      case "date_desc":
        list.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
      case "date_asc":
        list.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
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
        list.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
    }

    return list;
  }, [data, filters]);

  const totalPages = Math.ceil(filteredPress.length / itemsPerPage);
  const currentData = filteredPress.slice(
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

  return (
    <div>
      <BackgroundUi src="News.webp" name="press" />
      <NewsFiltr onFilterChange={setFilters} type="press" />
      <div ref={cardsTopRef}>
        <NewsCardProps
          news={currentData}
          type="press"
          paginatedByParent
          itemsPerPage={itemsPerPage}
        />
      </div>
      <ProjectsPagination
        totalPages={totalPages}
        currentPage={page}
        onChange={(event, value) => setPage(value)}
      />
    </div>
  );
};

export default Press;
