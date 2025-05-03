"use client";
import React from "react";
import BackgroundUi from "../../BackgroundUI/BackgroundStatic";
import NewsFiltr from "../../Components/NewsComponents/NewsFiltr";
import NewsCardProps from "../../Components/NewsComponents/NewsCardProps";
import { useGetNewsQuery } from "@/app/Apis/api";

const page = () => {
  const { data, error, isLoading } = useGetNewsQuery();
  if (isLoading) return <p>loading</p>;
  if (error) return <p>error</p>;
  if (!data) return <p>notfound</p>;

  return (
    <div>
      <BackgroundUi src="News.png" name="news" />
      <NewsFiltr />
      <NewsCardProps event={data} />
    </div>
  );
};

export default page;
