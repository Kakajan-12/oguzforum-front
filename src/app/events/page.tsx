"use client";
import { useMemo, useRef, useState } from "react";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { useGetProjectsQuery } from "@/lib/api";
import { stripHtml } from "@/lib/utils/cardHelpers";
import PageHero from "@/components/ui/PageHero";
import EventGridCard from "@/components/events/EventGridCard";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

const PER_PAGE = 9;

const SORTS = [
  { value: "date_asc", label: "By date (soonest first)" },
  { value: "date_desc", label: "By date (latest first)" },
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

export default function EventsPage() {
  const { data, error, isLoading } = useGetProjectsQuery();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date_asc");
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const now = Date.now();
    // Events = upcoming only (end_date in the future).
    let list = (data ?? []).filter(
      (e) => new Date(e.end_date).getTime() > now
    );

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((e) => stripHtml(e.en).toLowerCase().includes(q));
    }

    const byDate = (v: string) => new Date(v).getTime() || 0;
    switch (sort) {
      case "date_desc":
        list.sort((a, b) => byDate(b.date) - byDate(a.date));
        break;
      case "title_asc":
        list.sort((a, b) => stripHtml(a.en).localeCompare(stripHtml(b.en)));
        break;
      case "title_desc":
        list.sort((a, b) => stripHtml(b.en).localeCompare(stripHtml(a.en)));
        break;
      default:
        list.sort((a, b) => byDate(a.date) - byDate(b.date));
    }

    return list;
  }, [data, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const goTo = (p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetPage = () => setPage(1);

  return (
    <>
      <PageHero
        title="Events"
        subtitle="Discover the next forums, congresses, and strategic dialogues."
        image="/header-bg.jpg"
      />

      <section className="bg-white">
        <div className="container mx-auto px-4 py-14 lg:py-20">
          <div ref={topRef} className="scroll-mt-24" />

          {/* Toolbar: search + sort */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <FiSearch
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  resetPage();
                }}
                placeholder="Search events"
                className="w-full rounded-md border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#1268B3]"
              />
            </div>

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                resetPage();
              }}
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#1268B3] sm:w-64"
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
            <p className="text-gray-500">No upcoming events at the moment.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {pageItems.map((e) => (
                  <EventGridCard key={e.id} event={e} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-14 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => goTo(current - 1)}
                    disabled={current === 1}
                    aria-label="Previous page"
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-600 transition hover:border-[#1268B3] hover:text-[#1268B3] disabled:cursor-not-allowed disabled:opacity-40"
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
                        className={`h-10 w-10 rounded-md border text-sm font-medium transition ${
                          p === current
                            ? "border-[#1268B3] bg-[#1268B3] text-white"
                            : "border-gray-200 text-gray-700 hover:border-[#1268B3] hover:text-[#1268B3]"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    onClick={() => goTo(current + 1)}
                    disabled={current === totalPages}
                    aria-label="Next page"
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-600 transition hover:border-[#1268B3] hover:text-[#1268B3] disabled:cursor-not-allowed disabled:opacity-40"
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
