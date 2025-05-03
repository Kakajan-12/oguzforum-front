'use client'
import React from "react";
import BackgroundUi from "../../BackgroundUI/BackgroundStatic";
import ServicesName from "../../Components/ServicesComponents/ServicesName";
import ServicesCardProps from "../../Components/ServicesComponents/ServicesCardProps";
import ServicesPagination from "../../Components/ServicesComponents/ServicesPagination";
import { useGetServicesQuery } from "@/app/Apis/api";

const page = () => {
  const {data, error , isLoading}= useGetServicesQuery()
  if (isLoading) return <p>loading</p>;
  if (error) return <p>error</p>;
  if (!data) return <p>notfound</p>;  
  return (
    <div>
      <BackgroundUi src="Services.png" name="services" />
      <ServicesName />
      <ServicesCardProps event={data} />
    </div>
  );
};

export default page;
