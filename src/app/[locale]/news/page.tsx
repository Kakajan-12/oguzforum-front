"use client";
import React, { useMemo, useState } from "react";
import BackgroundUi from "../../BackgroundUI/BackgroundStatic";
import NewsFiltr from "../../Components/NewsComponents/NewsFiltr";
import NewsCardProps from "../../Components/NewsComponents/NewsCardProps";
import { useGetNewsQuery } from "@/app/Apis/api";
import useAppLocale from "@/app/Hooks/GetLocale";

const Page = () => {
    const { data, error, isLoading } = useGetNewsQuery();
    const locale = useAppLocale();

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
                const title = item?.[locale]?.toLowerCase() || "";
                return title.includes(filters.title.toLowerCase());
            });
        }

        if (filters.date) {
            list = list.filter((item) => item.date?.includes(filters.date));
        }

        list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return list;
    }, [data, filters, locale]);

    if (isLoading) return <p>loading</p>;
    if (error) return <p>error</p>;

    return (
        <div>
            <BackgroundUi src="News.png" name="news" />
            <NewsFiltr onFilterChange={setFilters} type="news"/>
            <NewsCardProps news={filteredNews} type="news"/>
        </div>
    );
};

export default Page;