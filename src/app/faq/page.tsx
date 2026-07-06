"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { FiSearch, FiX } from "react-icons/fi";

import { useGetFaqQuery } from "@/lib/api";
import { stripHtml } from "@/lib/utils/cardHelpers";
import PageHero from "@/components/ui/PageHero";
import RichText from "@/components/ui/RichText";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function FaqPage() {
  const { data, error, isLoading } = useGetFaqQuery();
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const list = data ?? [];
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter((f) => stripHtml(f.en).toLowerCase().includes(q));
  }, [data, search]);

  return (
    <>
      <PageHero
        title="FAQ"
        subtitle="Find answers to the most frequently asked questions."
        image="/header-bg.jpg"
      />

      <section className="bg-white">
        <div className="px-4 lg:px-10 py-6 md:py-14 lg:py-20">
          <div className="mx-auto">
            {/* Search */}
            <div className="relative mb-8 w-full md:max-w-sm">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions"
                className="w-full rounded border border-[#797979] py-3 pl-4 pr-12 text-sm text-gray-900 outline-none transition focus:border-[#1268B3]"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#797979] transition hover:text-gray-600"
                >
                  <FiX size={20} />
                </button>
              ) : (
                <FiSearch
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#797979]"
                  size={20}
                />
              )}
            </div>

            {isLoading ? (
              <Spinner />
            ) : error ? (
              <ErrorMessage />
            ) : filtered.length === 0 ? (
              <p className="text-gray-500">No questions found.</p>
            ) : (
              <div className="space-y-4">
                {filtered.map((item) => {
                  const open = openId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="overflow-hidden rounded shadow-faq transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenId(open ? null : item.id)}
                        aria-expanded={open}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      >
                        <span className="text-base font-capitana-medium text-gray-900 sm:text-lg">
                          {stripHtml(item.en)}
                        </span>
                        <Image
                          src="/assets/link.svg"
                          width={16}
                          height={16}
                          alt=""
                          className={`shrink-0 [filter:brightness(0)] transition-transform duration-300 ${
                            open ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      {open && (
                        <div className="px-6 pb-6">
                          <RichText
                            htmlContent={item.text_en}
                            className="text-base leading-relaxed text-[#363049]"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
