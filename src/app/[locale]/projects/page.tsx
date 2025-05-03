"use client";
import React from "react";
import ProjectsFiltr from "../../Components/ProjectsComponents/ProjectsFilter";
import BackgroundUi from "../../BackgroundUI/BackgroundStatic";
import ProjectsCardProps from "../../Components/ProjectsComponents/ProjectsCardProps";
import ProjectsPagination from "../../Components/ProjectsComponents/ProjectsPagination";
import { useGetProjectsQuery } from "@/app/Apis/api";

const page = () => {
  const { data, error, isLoading } = useGetProjectsQuery();
  if (isLoading) return <p>loading</p>;
  if (error) return <p>error</p>;
  if (!data) return <p>notfound</p>;
  console.log(data);
  
  return (
    <div>
      <BackgroundUi src="News.png" name="projects" />
      <ProjectsFiltr />
      <ProjectsCardProps event={data} />
    </div>
  );
};

export default page;
