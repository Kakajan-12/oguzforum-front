"use client";
import { useGetServicesByIdQuery } from "@/app/Apis/api";
import BackgroundUi from "@/app/BackgroundUI/BackgroundUi";
import ServicesSinglePage from "@/app/Components/ServicesComponents/ServicesSinglePage/ServicesSinglePage";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, error, isLoading } = useGetServicesByIdQuery({
    endpoint: "services",
    id: slug,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>No event found</div>;

  return (
    <div>
      <BackgroundUi event={{ data: data[0], type: "services" }} />
      <ServicesSinglePage event={data[0]} />
    </div>
  );
};

export default page;
