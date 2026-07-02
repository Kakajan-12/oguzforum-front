"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { resolveMediaUrl } from "@/constant";
import type { Participant } from "@/types";

export default function ParticipantCompanies({
  participants,
}: {
  participants: Participant[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  const items = participants.filter((p) => p.participant_logo);

  const recompute = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || el.clientWidth === 0) return;
    const ratio = el.scrollWidth / el.clientWidth;
    // Show nav whenever the strip overflows (small tolerance to ignore rounding).
    const p = Number.isFinite(ratio) && ratio > 1.02 ? Math.ceil(ratio) : 1;
    setPages(Math.max(1, p));
    setPage(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    recompute();
    const onScroll = () =>
      setPage(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", recompute);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", recompute);
    };
  }, [recompute, items.length]);

  if (items.length === 0) return null;

  const scrollByPage = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  const goToPage = (p: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: p * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((p, i) => (
          <div
            key={p.id ?? i}
            className="w-[45%] shrink-0 snap-start sm:w-[30%] md:w-[22%] lg:w-[13.6%]"
          >
            <div className="flex h-28 items-center justify-center rounded-lg bg-gray-100 p-4">
              <div className="relative h-full w-full">
                <Image
                  src={resolveMediaUrl(p.participant_logo ?? "")}
                  alt={p.participant_en || ""}
                  fill
                  sizes="200px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {pages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label="Previous"
            className="text-gray-400 transition-colors hover:text-[#1268B3]"
          >
            <FiChevronLeft size={22} />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToPage(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === page ? "w-2 bg-[#1268B3]" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByPage(1)}
            aria-label="Next"
            className="text-gray-400 transition-colors hover:text-[#1268B3]"
          >
            <FiChevronRight size={22} />
          </button>
        </div>
      )}
    </div>
  );
}
