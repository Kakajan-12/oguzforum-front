"use client";
import React, { useState, useMemo } from "react";
import BackgroundUi from "../../BackgroundUI/BackgroundStatic";
import { useGetReferencesQuery } from "@/app/Apis/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import ReferencesFilter from "@/app/Components/References/ReferncesFilter";
import ReferencesCard from "@/app/Components/References/ReferencesCard";

const References = ()=>{
    const { data, error, isLoading } = useGetReferencesQuery();
    const locale = useAppLocale();
    const [filters, setFilters] = useState({ name: "", sort: "default" });

    const filteredReferences = useMemo(() => {
        if (!data) return [];

        let list = [...data];

        if (filters.name) {
            list = list.filter((references) => {
                const name = references[`name_${locale}`]?.toLowerCase() || "";
                return name.includes(filters.name.toLowerCase());
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
                list.sort((a, b) =>
                    (a[`name_${locale}`] || "").localeCompare(b[`name_${locale}`] || "")
                );
                break;
            case "title_desc":
                list.sort((a, b) =>
                    (b[`name_${locale}`] || "").localeCompare(a[`name_${locale}`] || "")
                );
                break;
        }

        return list;
    }, [data, filters, locale]);


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;
    if (!data) return <div>No event found</div>;

    return (
        <div>
            <BackgroundUi src="News.png" name="references" />
            <ReferencesFilter onFilterChange={setFilters} />
            <ReferencesCard event={filteredReferences} />
        </div>
    );
};

export default References;