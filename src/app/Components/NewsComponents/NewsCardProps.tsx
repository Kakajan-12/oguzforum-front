import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import { News } from "@/app/Intarfaces/intarfaces";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { resolveMediaUrl } from "@/constant";
import Pagination from "@mui/material/Pagination";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface Props {
  news: News[];
  itemsPerPage?: number;
  type: "news" | "press";
  isLoading?: boolean;
}

const NewsCardProps: React.FC<Props> = ({ news, itemsPerPage = 6, type }) => {
  console.log("news", news);
  const t = useTranslations("upcoming");
  const locale = useAppLocale();
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(news.length / itemsPerPage);

  useEffect(() => {
    setPage(1);
  }, [news]);

  const handleChange = (_: any, value: number) => {
    setPage(value);
  };

  const paginatedNews = news.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  //   const truncateText = (text: string, limit: number) => {
  //     return text.length > limit ? text.slice(0, limit) + "..." : text;
  //   };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginatedNews.map((items) => {
          const title = items[locale];
          const text = items[`text_${locale}`];
          const cat = items[`cat_${locale}`];
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
                    href={`/${locale}/${type}/${items.id}`}
                    className="bg-mainBlue py-2 px-4 lg:py-3 lg:px-6 text-white text-xs lg:text-sm font-semibold rounded-md"
                  >
                    {t("read")}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
    </div>
  );
};

export default NewsCardProps;
