"use client";
import { useGetNewsQuery } from "@/lib/api";
import ArticleListing from "@/components/news/ArticleListing";

export default function NewsPage() {
  const { data, error, isLoading } = useGetNewsQuery();

  return (
    <ArticleListing
      data={data}
      isLoading={isLoading}
      error={error}
      title="Newsroom"
      subtitle="Latest updates, insights, and highlights from our activities."
      image="/header-bg.jpg"
      basePath="/news"
      searchPlaceholder="Search news"
      emptyText="No news found."
    />
  );
}
