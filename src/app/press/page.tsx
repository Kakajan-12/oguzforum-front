"use client";
import { useGetPressQuery } from "@/lib/api";
import ArticleListing from "@/components/news/ArticleListing";

export default function PressPage() {
  const { data, error, isLoading } = useGetPressQuery();

  return (
    <ArticleListing
      data={data}
      isLoading={isLoading}
      error={error}
      title="Press releases"
      subtitle="Official statements and announcements from OGUZ Forum & Expo."
      image="/header-bg.jpg"
      basePath="/press"
      searchPlaceholder="Search press releases"
      emptyText="No press releases found."
    />
  );
}
