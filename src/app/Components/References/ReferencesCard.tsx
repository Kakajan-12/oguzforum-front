"use client";
import { References } from "@/app/Intarfaces/intarfaces";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ReferencesPagination from "./ReferencesPagination";
import { resolveMediaUrl } from "@/constant";
import Image from "next/image";

interface Props {
  event: References[];
  itemsPerPage?: number;
}

const ReferencesCard: React.FC<Props> = ({ event, itemsPerPage = 10 }) => {
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const cardsTopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  const now = new Date();
  const totalPages = Math.ceil(event.length / itemsPerPage);
  const currentData = [...event]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const prevPageRef = useRef(page);

  useEffect(() => {
    if (prevPageRef.current !== page) {
      if (cardsTopRef.current) {
        const element = cardsTopRef.current.getBoundingClientRect();
        const offset = window.scrollY + element.top - 250;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }
    prevPageRef.current = page;
  }, [page]);

  return (
    <div ref={cardsTopRef} className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentData.map((items) => {
          const name = (items as any).name_en || "";

          return (
            <div
              key={items.id}
              onClick={() => window.open(resolveMediaUrl(items.file), "_blank")}
              className="cursor-pointer shadow-sm w-full border p-1 hover:shadow-md transition"
            >
              <div className="w-full">
                <Image
                  src={resolveMediaUrl(items.preview)}
                  alt={items.preview}
                  width={800}
                  height={800}
                />
              </div>

              <div className="w-full text-center pb-2">
                <h6 className="text-md md:text-lg lg:text-xl font-medium">
                  {name}
                </h6>
              </div>
            </div>
          );
        })}
      </div>

      <ReferencesPagination
        totalPages={totalPages}
        currentPage={page}
        onChange={(event, value) => setPage(value)}
      />
    </div>
  );
};
export default ReferencesCard;
