"use client";
import React, { useState } from "react";
import BackgroundUi from "../../BackgroundUI/BackgroundStatic";
import NewsFiltr from "../../Components/NewsComponents/NewsFiltr";
import NewsCardProps from "../../Components/NewsComponents/NewsCardProps";
import { useGetNewsQuery } from "@/app/Apis/api";
import useAppLocale from "@/app/Hooks/GetLocale";

const page = () => {
  const { data, error, isLoading } = useGetNewsQuery();
    const locale = useAppLocale(); // ✅ всегда вызывается

    const [filters, setFilters] = useState({ title: "", date: "" }); // ✅ тоже всегда

    if (isLoading) return <p>loading</p>;
  if (error) return <p>error</p>;
  if (!data) return <p>notfound</p>;

    const filteredNews = data.filter((project) => {
        const title = project?.[locale]?.toLowerCase() || "";
        const date = project?.date || "";

        const matchesTitle = title.includes(filters.title.toLowerCase());
        const matchesDate = date.includes(filters.date); // дата уже строка!

        return matchesTitle && matchesDate;
    });
  return (
    <div>
      <BackgroundUi src="News.png" name="news" />
      <NewsFiltr onFilterChange={setFilters} />
      <NewsCardProps event={filteredNews} />
    </div>
  );
};

export default page;
