"use client";
import BackgroundUi from "@/app/BackgroundUI/BackgroundUi";
import { useGetUpcomingByIdQuery } from "@/app/Apis/api";
import UpcomingSinglePage from "@/app/Components/UpComingComponents/UpcomingSinglePage/UpcomingSinglePage";
import { useParams } from "next/navigation";

const page = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, error, isLoading } = useGetUpcomingByIdQuery({
    endpoint: "upcoming",
    id: slug,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data || data.length === 0) return <div>No event found</div>;
  return (
    <div className="">
      <BackgroundUi event={{ data: data[0], type: "upcoming" }} />
      <UpcomingSinglePage event={data[0]} />
    </div>
  );
};

export default page;
