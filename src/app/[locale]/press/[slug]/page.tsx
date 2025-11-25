"use client";
import BackgroundUi from "@/app/BackgroundUI/BackgroundUi";
import {useGetNewsByIdQuery} from "@/app/Apis/api";
import NewsSinglePageText from "@/app/Components/NewsComponents/NewSinglePageText/NewsSinglePageText";
import {useParams} from "next/navigation";
import React from "react";

const page = () => {
    const {slug} = useParams<{ slug: string }>();
    const {data, error, isLoading} = useGetNewsByIdQuery({
        endpoint: "news",
        id: slug,
    });
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;
    if (!data) return <div>No event found</div>;

    console.log(data);

    return (
        <div className="">
            <BackgroundUi event={{data: data, type: "news"}}/>
            <NewsSinglePageText news={data}/>
        </div>
    );
};

export default page;
