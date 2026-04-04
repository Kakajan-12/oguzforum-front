"use client";
import BackgroundUi from "@/app/BackgroundUI/BackgroundUi";
import { useGetNewsByIdQuery } from "@/app/Apis/api";
import NewsSinglePageText from "@/app/Components/NewsComponents/NewSinglePageText/NewsSinglePageText";
import { useParams } from "next/navigation";
import React from "react";
import Spinner from "@/app/Components/UI/Spinner";
import ErrorMessage from "@/app/Components/UI/ErrorMessage";
import DataMessage from "@/app/Components/UI/DataMessage";

const page = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, error, isLoading } = useGetNewsByIdQuery({
    endpoint: "news",
    id: slug,
  });
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;
  if (!data) return <DataMessage />;

  console.log(data);

  return (
    <div className="">
      <BackgroundUi event={{ data: data, type: "news" }} />
      <NewsSinglePageText news={data} />
    </div>
  );
};

export default page;
