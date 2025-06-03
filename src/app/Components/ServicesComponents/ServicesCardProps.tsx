'use client';

import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import { Services } from "@/app/Intarfaces/intarfaces";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BASE_API_URL } from "@/constant";
import Pagination from "@mui/material/Pagination";

interface Props {
  event: Services[];
  itemsPerPage?: number; // добавим настраиваемость
}

const ServicesCardProps: React.FC<Props> = ({ event, itemsPerPage = 10 }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(event.length / itemsPerPage);

  const handleChange = (_: any, value: number) => {
    setPage(value);
  };

  const currentData = event.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
  );

  const truncateText = (text: string, limit: number) =>
      text.length > limit ? text.slice(0, limit) + "..." : text;

  const fixImageUrl = (url: string): string => {
    if (!url) return "/default-image.png";
    const normalizedUrl = url.replace(/\\/g, '/');
    if (normalizedUrl.startsWith('http') || normalizedUrl.startsWith('/')) {
      return normalizedUrl;
    }
    return `${BASE_API_URL.slice(0, -3)}${normalizedUrl}`;
  };

  const locale = useAppLocale();

  return (
      <div className="container mx-auto md:px-7 flex flex-col gap-5 pb-7 px-2">
        {currentData.map((items) => {
          const tittle = items[locale];
          const text = items[`text_${locale}`];
          return (
              <Link key={items.id} href={`/services/${items.id}`}>
                <div className="shadow-sm w-full border flex flex-col sm:flex-row p-3 sm:gap-4 rounded-md shadow-slate-400">
                  <div className="w-1/3 sm:w-2/3">
                    <Image
                        className="w-2/3 h-full rounded-md object-cover"
                        alt={items.image}
                        src={fixImageUrl(items.image)}
                        width={800}
                        height={800}
                    />
                  </div>
                  <div className="w-full pt-5 sm:pt-0">
                    <h3 className="text-md sm:text-lg xl:text-2xl text-mainBlue font-bold leading-1">
                      <RichText htmlContent={tittle} />
                    </h3>
                    <div className="hidden sm:block text-xs md:text-lg mt-4 font-medium line-clamp-2 text-mainBlue">
                      <RichText htmlContent={truncateText(text, 300)} />
                    </div>
                  </div>
                </div>
              </Link>
          );
        })}

        <div className="flex justify-center pt-4">
          <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
              variant="outlined"
              shape="rounded"
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

export default ServicesCardProps;
