
import RichText from "@/components/ui/RichText";
import { News, Press } from "@/types";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { resolveMediaUrl } from "@/constant";
import Pagination from "@mui/material/Pagination";

import Link from "next/link";

interface Props {
  news: News[] | Press[];
  itemsPerPage?: number;
  type: "news" | "press";
  isLoading?: boolean;
  /** Слайс и пагинация на стороне страницы (projects/events-паттерн) */
  paginatedByParent?: boolean;
}

const NewsCardProps: React.FC<Props> = ({
  news,
  itemsPerPage = 12,
  type,
  paginatedByParent = false,
}) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const cardsTopRef = useRef<HTMLDivElement | null>(null);
  const prevPageRef = useRef(page);

  useEffect(() => {
    if (!paginatedByParent) setPage(1);
  }, [news, paginatedByParent]);

  useEffect(() => {
    if (paginatedByParent) return;
    if (prevPageRef.current !== page && cardsTopRef.current) {
      const top = cardsTopRef.current.getBoundingClientRect().top;
      const offset = window.scrollY + top - 250;
      window.scrollTo({ top: Math.max(0, offset), behavior: "smooth" });
    }
    prevPageRef.current = page;
  }, [page, paginatedByParent]);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const displayNews = paginatedByParent
    ? news
    : news.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  //   const truncateText = (text: string, limit: number) => {
  //     return text.length > limit ? text.slice(0, limit) + "..." : text;
  //   };

  return (
    <div className="container mx-auto px-4">
      <div
        ref={cardsTopRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
      >
        {displayNews.map((items) => {
          const title = items.en;
          const text = items.text_en;
          const cat = items.cat_en;
          return (
            <div
              key={items.id}
              className="shadow-sm w-full border flex flex-col p-4 rounded-md shadow-slate-400"
            >
              <div className="w-full h-56 relative">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-56 rounded-md object-contain"
                  alt={`${items.image}`}
                  src={resolveMediaUrl(items.image)}
                />
                {/* <Image
                  //   width={300}
                  //   height={300}
                  fill
                  className="rounded-md object-cover"
                  alt={`${items.image}`}
                  src={resolveMediaUrl(items.image)}
                /> */}
              </div>

              <div className="w-full h-full flex flex-col">
                <div className="flex justify-between pt-4">
                  <div className="text-xs md:text-sm font-semibold text-mainBlue opacity-40">
                    {cat &&
                    !["press en1", "press ru1", "press tk1"].includes(cat)
                      ? cat
                      : ""}
                  </div>
                  <div className="text-xs md:text-sm font-semibold text-mainBlue opacity-40">
                    {new Date(items.date).toLocaleDateString("tm-TM")}
                  </div>
                </div>

                <h3 className="text-mainBlue font-semibold text-sm md:text-md lg:text-lg">
                  <RichText htmlContent={title} className="line-clamp-2" />
                </h3>

                <div className="mt-2 font-medium text-mainBlue text-xs md:text-sm lg:text-md">
                  <RichText htmlContent={text} className="line-clamp-3" />
                </div>

                <div className="pt-5 mt-auto flex justify-end">
                  <Link
                    href={`/${type}/${items.id}`}
                    className="bg-mainBlue py-2 px-4 lg:py-3 lg:px-6 text-white text-xs lg:text-sm font-semibold rounded-md"
                  >
                    {"Read more"}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!paginatedByParent && totalPages > 1 ? (
        <div className="flex justify-center py-8 ">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
            boundaryCount={1}
            siblingCount={1}
            size="medium"
            sx={{
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#002A5F",
                color: "white",
                scale: "1.1",
              },
              "& .MuiPaginationItem-root": {
                color: "white",
                backgroundColor: "#002A5F66",
                padding: "8px",
                margin: "2px",
              },
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default NewsCardProps;
