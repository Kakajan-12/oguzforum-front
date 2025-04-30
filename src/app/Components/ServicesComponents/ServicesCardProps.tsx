"use client";
import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import { Services } from "@/app/Intarfaces/intarfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  event: Services[];
}

const ServicesCardProps: React.FC<Props> = ({ event }) => {
  const truncateText = (text: string, limit: number) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };
  return (
    <div className="container mx-auto md:px-7  flex flex-col md:gap-10 gap-5  pb-7 md:pb-10 px-2">
      {event.map((items) => {
        const locale = useAppLocale();
        const tittle = items[locale];
        const text = items[`text_${locale}`];
        return (
          <Link href={`/services/${items.id}`} >
            <div className=" shadow-sm w-full border flex  py-3 px-3 sm:p-5 max-h-32 min-h-fit sm:max-h-fit   md:py-8 md:pl-8 md:pr-10 justify-between  lg:gap-10 gap-5 rounded-2xl  shadow-slate-400">
              <div className="md:w-1/3 w-1/2  max-h-32 sm:max-h-[410px]  ">
                <Image
                  className="w-full h-full rounded-2xl object-cover"
                  alt={`${items.image}`}
                  src={`/${items.image}`}
                  width={800}
                  height={800}
                />
              </div>

              <div className="w-2/3  flex flex-col justify-center sm:justify-start  gap-3">
                <div className="">
                  <h3 className="lg:text-3xl text-lg leading-5 md:leading-none text-mainBlue font-extrabold">
                    <RichText htmlContent={tittle} />
                  </h3>
                  <p className="hidden lg:text-lg  sm:block text-xs  md:text-sm mt-4 font-medium line-clamp-2  text-mainBlue ">
                    <RichText htmlContent={truncateText(text, 300)} />{" "}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ServicesCardProps;
