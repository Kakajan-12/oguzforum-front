"use client";
import React from "react";
import UpEvents from "../../Components/UpComingComponents/UpEventsFiltr";
import UpCardsWithProps from "../../Components/UpComingComponents/UpCardsWithProps";
import { productsArray } from "../../Components/UpComingComponents/productsProjects";
import UpPagination from "../../Components/UpComingComponents/UpPagination";
import BackgroundUi from "../../BackgroundUI/BackgroundStatic";
import { useGetUpcomingQuery } from "@/app/Apis/api";
const page = () => {
  const { data, error, isLoading } = useGetUpcomingQuery();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>No event found</div>;

  return (
    <div>
      <BackgroundUi src="UpBack.png" name="upcoming" />
      <UpEvents />
      <UpCardsWithProps event={data} />
      <UpPagination />
    </div>
  );
};

export default page;
