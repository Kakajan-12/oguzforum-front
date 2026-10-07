"use client";
import { useGetPressQuery } from "@/lib/api";
import SectionHeader from "@/components/layout/SectionHeader";
import NewsGridCard from "@/components/news/NewsGridCard";

// Homepage "Press releases" section: the 3 latest press releases.
const PressMain = () => {
  const { data } = useGetPressQuery();
  const latest = data
    ? [...data]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3)
    : [];

  if (latest.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="px-4 lg:px-10 py-6 md:py-14 lg:py-20">
        <SectionHeader
          title="Press releases"
          link={{ href: "/press", label: "All press releases" }}
          theme="light"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((p) => (
            <NewsGridCard key={p.id} n={p} basePath="/press" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressMain;
