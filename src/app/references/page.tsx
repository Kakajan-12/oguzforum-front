"use client";
import React, { useState, useMemo } from "react";
import BackgroundUi from "@/app/BackgroundUI/BackgroundStatic";
import { useGetReferencesQuery } from "@/app/Apis/api";

import ReferencesFilter from "@/app/Components/References/ReferncesFilter";
import ReferencesCard from "@/app/Components/References/ReferencesCard";
import Spinner from "@/app/Components/UI/Spinner";
import ErrorMessage from "@/app/Components/UI/ErrorMessage";
import DataMessage from "@/app/Components/UI/DataMessage";

const References = () => {
  const { data, error, isLoading } = useGetReferencesQuery();

  const [filters, setFilters] = useState({ name: "", sort: "default" });

  const filteredReferences = useMemo(() => {
    if (!data) return [];

    let list = [...data];

    if (filters.name) {
      list = list.filter((references) => {
        const name = references.name_en?.toLowerCase() || "";
        return name.includes(filters.name.toLowerCase());
      });
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
          (a.name_en || "").localeCompare(b.name_en || ""),
        );
        break;
      case "title_desc":
        list.sort((a, b) =>
          (b.name_en || "").localeCompare(a.name_en || ""),
        );
        break;
    }

    return list;
  }, [data, filters]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;
  if (!data) return <DataMessage />;

  return (
    <div>
      <BackgroundUi src="News.webp" name="references" />
      <ReferencesFilter onFilterChange={setFilters} />
      <ReferencesCard event={filteredReferences} />
    </div>
  );
};

export default References;
