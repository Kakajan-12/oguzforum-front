"use client";
import BackgroundUi from "@/components/ui/PageBanner/PageBanner";
import { useGetNewsByIdQuery } from "@/lib/api";
import NewsSinglePageText from "@/components/news/NewsSinglePageText";
import { useParams } from "next/navigation";
import React from "react";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import DataMessage from "@/components/ui/DataMessage";

const page = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, error, isLoading } = useGetNewsByIdQuery({
    endpoint: "press",
    id: slug,
  });
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;
  if (!data) return <DataMessage />;

  return (
    <div className="">
      <BackgroundUi event={{ data: data, type: "news" }} />
      <NewsSinglePageText news={data} />
    </div>
  );
};

export default page;
