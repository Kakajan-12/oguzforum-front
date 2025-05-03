import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import { News } from "@/app/Intarfaces/intarfaces";
import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import {BASE_API_URL} from "@/constant";
import Pagination from "@mui/material/Pagination";

interface Props {
  event: News[];
  itemsPerPage?: number;
}

const NewsCardProps: React.FC<Props> = ({ event, itemsPerPage = 6 }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(event.length / itemsPerPage);

  const handleChange = (_: any, value: number) => {
    setPage(value);
  };

  const currentData = event.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
  );

  const truncateText = (text: string, limit: number) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  const fixImageUrl = (url: string): string => {
    if (!url) return "/default-image.png";
    const normalizedUrl = url.replace(/\\/g, '/');
    if (normalizedUrl.startsWith('http') || normalizedUrl.startsWith('/')) {
      return normalizedUrl;
    }
    return `${BASE_API_URL.slice(0, -3)}${normalizedUrl}`;
  };


  return (
      <div className="container mx-auto md:px-7  flex flex-col md:gap-10 gap-5  pb-7 md:pb-10 px-2">
        {event.map((items) => {
          const locale = useAppLocale();
          const tittle = items[locale];
          const text = items[`text_${locale}`];
          const cat = items[`cat_${locale}`];
          return (
              <Link href={`/news/${items.id}`}>
                <div
                    className=" shadow-sm w-full border flex  p-3 max-h-32 min-h-fit sm:max-h-fit sm:p-4 sm:pr-10   md:p-5 md:pr-14  justify-between lg:gap-10 gap-5 rounded-2xl  shadow-slate-400">
                  <div className="md:w-1/3 w-1/2  max-h-32 sm:max-h-[410px]  ">
                    <Image
                        width={800}
                        height={800}
                        className="w-full h-full rounded-2xl object-cover"
                        alt={`${items.image}`}
                        src={fixImageUrl(items.image)}
                    />
                  </div>

                  <div className="w-2/3  flex flex-col justify-between gap-3">
                    <div className="">
                      <h3 className="lg:text-3xl text-lg leading-5 md:leading-none text-mainBlue font-extrabold">
                        <RichText htmlContent={tittle}/>
                      </h3>
                      <span
                          className="hidden md:flex  mt-2 items-center lg:text-lg text-xs font-semibold text-mainBlue opacity-40">
                    {items.date} {}
                  </span>
                      <div
                          className="hidden lg:text-lg  sm:block text-xs  md:text-sm mt-4 font-medium line-clamp-2  text-mainBlue ">
                        <RichText htmlContent={truncateText(text, 300)}/>
                      </div>
                    </div>
                    <div className="flex md:justify-end items-end gap-x-3 ">
                      <button
                          className="bg-mainBlue hidden md:block  py-2 px-4 lg:py-3 lg:px-6  text-white  text-xs lg:text-sm font-semibold rounded-xl">
                        Explore
                      </button>
                      <span
                          className="flex w-full  md:hidden items-center justify-between lg:text-lg text-[8px] sm:text-xs text-end  font-semibold text-mainBlue opacity-40">
                    <p>{items.date}</p>
                    <p> {cat}</p>
                  </span>
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

export default NewsCardProps;
