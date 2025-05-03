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

const ServicesCardProps: React.FC<Props> = ({ event, itemsPerPage = 6 }) => {
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
                <div className="shadow-sm w-full border flex py-3 px-3 sm:p-5 md:py-8 md:pl-8 md:pr-10 justify-between gap-5 rounded-2xl shadow-slate-400">
                  <div className="md:w-1/3 w-1/2">
                    <Image
                        className="w-full h-full rounded-2xl object-cover"
                        alt={items.image}
                        src={fixImageUrl(items.image)}
                        width={800}
                        height={800}
                    />
                  </div>
                  <div className="w-2/3 flex flex-col gap-3">
                    <h3 className="lg:text-3xl text-lg leading-5 text-mainBlue font-extrabold">
                      <RichText htmlContent={tittle} />
                    </h3>
                    <p className="hidden sm:block text-xs md:text-sm mt-4 font-medium line-clamp-2 text-mainBlue">
                      <RichText htmlContent={truncateText(text, 300)} />
                    </p>
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
