"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import UpEvents from "../../Components/UpComingComponents/UpEventsFilter";
import UpCardsWithProps from "../../Components/UpComingComponents/UpCardsWithProps";
import UpPagination from "../../Components/UpComingComponents/UpPagination";
import BackgroundUi from "../../BackgroundUI/BackgroundStatic";
import { useGetProjectsQuery } from "@/app/Apis/api";
import Spinner from "@/app/Components/UI/Spinner";
import ErrorMessage from "@/app/Components/UI/ErrorMessage";
import useAppLocale from "@/app/Hooks/GetLocale";
import DataMessage from "@/app/Components/UI/DataMessage";

const parseDate = (d: string | null | undefined) => {
  const t = new Date(d || 0);
  return isNaN(t.getTime()) ? 0 : t.getTime();
};

const Page = () => {
  const { data, error, isLoading } = useGetProjectsQuery();
  // console.log("data events", data); //для проверки данных
  const locale = useAppLocale();
  const [filters, setFilters] = useState({
    title: "",
    date: "",
    sort: "date_desc",
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filteredEvents = useMemo(() => {
    if (!data) return [];

    const now = new Date();
    let list = [...data];

    if (filters.title) {
      list = list.filter((project) => {
        const title = project?.[locale]?.toLowerCase() || "";
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

    list = list.filter((item) => new Date(item.end_date) > now);

    switch (filters.sort) {
      case "date_desc":
        list.sort((a, b) => parseDate(b.date) - parseDate(a.date));
        break;
      case "date_asc":
        list.sort((a, b) => parseDate(a.date) - parseDate(b.date));
        break;
      case "title_asc":
        list.sort((a, b) =>
          (a?.[locale] || "").localeCompare(b?.[locale] || ""),
        );
        break;
      case "title_desc":
        list.sort((a, b) =>
          (b?.[locale] || "").localeCompare(a?.[locale] || ""),
        );
        break;
      default:
        list.sort((a, b) => parseDate(b.date) - parseDate(a.date));
        break;
    }

    return list;
  }, [data, filters, locale]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const currentData = filteredEvents.slice(
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
  if (!data) return <DataMessage />;

  return (
    <div>
      <BackgroundUi src="UpBack.webp" name="upcoming" />
      <UpEvents onFilterChange={setFilters} />
      <div ref={cardsTopRef}>
        <UpCardsWithProps event={currentData} />
      </div>
      <UpPagination
        totalPages={totalPages}
        currentPage={page}
        onChange={(event, value) => setPage(value)}
      />
    </div>
  );
};

export default Page;
