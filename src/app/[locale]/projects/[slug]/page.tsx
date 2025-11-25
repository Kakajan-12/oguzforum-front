"use client";
import BackgroundUi from "@/app/BackgroundUI/BackgroundUi";
import { useGetProjectsByIdQuery } from "@/app/Apis/api";
import UpcomingSinglePage from "@/app/Components/UpComingComponents/UpcomingSinglePage/UpcomingSinglePage";
import { useParams } from "next/navigation";

const Page = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, error, isLoading } = useGetProjectsByIdQuery({
    endpoint: "projects",
    id: slug,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  if (!data) return <div>No event found</div>;

  return (
      <div>
        <BackgroundUi event={{ data: data, type: "projects" }} />
        <UpcomingSinglePage event={data} />
      </div>
  );
};

export default Page;
