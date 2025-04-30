"use client";
import React from "react";
import CareerCardProps from "../../../Components/CareerComponents/CareerCardProps";
import { arrayManager } from "../../../Components/CareerComponents/CareersArray";
import CareerPagiatnion from "@/app/Components/CareerComponents/CareerPagination";
import { useGetCareerQuery } from "@/app/Apis/api";

const page = () => {
  const { data, error, isLoading } = useGetCareerQuery();
  if (isLoading) return <p>loading</p>;
  if (error) return <p>error</p>;
  if (!data) return <p>not found</p>;

  return (
    <div>
      <CareerCardProps event={data} />
    </div>
  );
};

export default page;
