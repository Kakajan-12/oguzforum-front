"use client";
import { useMemo, useRef, useState } from "react";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { useGetProjectsQuery } from "@/lib/api";
import { stripHtml } from "@/lib/utils/cardHelpers";
import PageHero from "@/components/ui/PageHero";
import ProjectGridCard from "@/components/projects/ProjectGridCard";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

const PER_PAGE = 9;

const SORTS = [
  { value: "date_desc", label: "By date (new - old)" },
  { value: "date_asc", label: "By date (old - new)" },
  { value: "title_asc", label: "By name (A - Z)" },
  { value: "title_desc", label: "By name (Z - A)" },
];

// Windowed page list with ellipsis: 1 … current±1 … last
function getPageList(current: number, total: number): (number | "dots")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  const pages: (number | "dots")[] = [1];
  if (left > 2) pages.push("dots");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("dots");
  pages.push(total);
  return pages;
}

export default function ProjectsPage() {
  const { data, error, isLoading } = useGetProjectsQuery();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date_desc");
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const now = Date.now();
    // Projects = past editions (event already finished).
    let list = (data ?? []).filter(
      (p) => new Date(p.end_date).getTime() <= now,
    );

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => stripHtml(p.en).toLowerCase().includes(q));
    }

    const byDate = (v: string) => new Date(v).getTime() || 0;
    switch (sort) {
      case "date_asc":
        list.sort((a, b) => byDate(a.date) - byDate(b.date));
        break;
      case "title_asc":
        list.sort((a, b) => stripHtml(a.en).localeCompare(stripHtml(b.en)));
        break;
      case "title_desc":
        list.sort((a, b) => stripHtml(b.en).localeCompare(stripHtml(a.en)));
        break;
      default:
        list.sort((a, b) => byDate(b.date) - byDate(a.date));
    }

    return list;
  }, [data, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (current - 1) * PER_PAGE,
    current * PER_PAGE,
  );

  const goTo = (p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetPage = () => setPage(1);

  return (
    <>
      <PageHero
        title="Projects"
        subtitle="Delivering initiatives that create lasting impact and meaningful connections."
        image="/header-bg.jpg"
      />

      <section className="bg-white">
        <div className="px-4 lg:px-10 py-6 md:py-14 lg:py-20">
          <div ref={topRef} className="scroll-mt-24" />

          {/* Toolbar: search + sort */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center justify-start">
            <div className="relative w-full sm:max-w-sm">
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  resetPage();
                }}
                placeholder="Search projects"
                className="w-full h-11 rounded border border-[#797979] bg-white py-3 pl-5 pr-14 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition focus:border-[#1268B3]"
              />
              <FiSearch
                className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                size={22}
              />
            </div>

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                resetPage();
              }}
              className="w-full h-11 rounded border border-[#797979] bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#1268B3] sm:w-64"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {isLoading ? (
            <Spinner />
          ) : error ? (
            <ErrorMessage />
          ) : pageItems.length === 0 ? (
            <p className="text-gray-500">No projects found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pageItems.map((p) => (
                  <ProjectGridCard key={p.id} project={p} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-14 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => goTo(current - 1)}
                    disabled={current === 1}
                    aria-label="Previous page"
                    className="flex h-10 w-10 items-center justify-center rounded border border-gray-200 text-gray-600 transition hover:border-[#1268B3] hover:text-[#1268B3] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FiChevronLeft size={18} />
                  </button>

                  {getPageList(current, totalPages).map((p, i) =>
                    p === "dots" ? (
                      <span
                        key={`dots-${i}`}
                        className="flex h-10 w-10 items-center justify-center text-gray-400"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        onClick={() => goTo(p)}
                        className={`h-10 w-10 rounded border text-sm font-medium transition ${
                          p === current
                            ? "border-[#1268B3] bg-[#1268B3] text-white"
                            : "border-gray-200 text-gray-700 hover:border-[#1268B3] hover:text-[#1268B3]"
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}

                  <button
                    type="button"
                    onClick={() => goTo(current + 1)}
                    disabled={current === totalPages}
                    aria-label="Next page"
                    className="flex h-10 w-10 items-center justify-center rounded border border-gray-200 text-gray-600 transition hover:border-[#1268B3] hover:text-[#1268B3] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FiChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
