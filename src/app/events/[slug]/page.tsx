"use client";
import BackgroundUi from "@/app/BackgroundUI/BackgroundUi";
import { useGetProjectsByIdQuery } from "@/app/Apis/api";
import UpcomingSinglePage from "@/app/Components/UpComingComponents/UpcomingSinglePage/UpcomingSinglePage";
import { useParams } from "next/navigation";
import Spinner from "@/app/Components/UI/Spinner";
import ErrorMessage from "@/app/Components/UI/ErrorMessage";
import DataMessage from "@/app/Components/UI/DataMessage";

const Page = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, error, isLoading } = useGetProjectsByIdQuery({
    endpoint: "projects",
    id: slug,
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;

  if (!data) return <DataMessage />;

  return (
    <div>
      <BackgroundUi event={{ data: data, type: "projects" }} />
      <UpcomingSinglePage event={data} />
    </div>
  );
};

export default Page;
