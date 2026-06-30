"use client";
import React, { useMemo, useState } from "react";
import BackgroundUi from "@/app/BackgroundUI/BackgroundStatic";
import NewsFiltr from "@/app/Components/NewsComponents/NewsFiltr";
import NewsCardProps from "@/app/Components/NewsComponents/NewsCardProps";
import { useGetNewsQuery } from "@/app/Apis/api";

import Spinner from "@/app/Components/UI/Spinner";
import ErrorMessage from "@/app/Components/UI/ErrorMessage";

const Page = () => {
  const { data, error, isLoading } = useGetNewsQuery();

  const [filters, setFilters] = useState({
    title: "",
    date: "",
    sort: "date_desc",
  });

  const filteredNews = useMemo(() => {
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
    }

    return list;
  }, [data, filters]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;

  return (
    <div>
      <BackgroundUi src="News.webp" name="news" />
      <NewsFiltr onFilterChange={setFilters} type="news" />
      <NewsCardProps news={filteredNews} type="news" isLoading={isLoading} />
    </div>
  );
};

export default Page;
