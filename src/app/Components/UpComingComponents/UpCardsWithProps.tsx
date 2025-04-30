"use client";
import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import { UpcomingEvent } from "@/app/Intarfaces/intarfaces";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import React from "react";
import { SliceText } from "@/app/Hooks/SliceTexts";
import { useRouter } from "next/navigation";
interface Props {
  event: UpcomingEvent[];
}

const UpCardsWithProps: React.FC<Props> = ({ event }) => {
  const slice = SliceText();
  const router = useRouter();

  return (
    <div className="container mx-auto md:px-7  flex flex-col md:gap-10 gap-5  pb-7 md:pb-10 px-2">
      {event.map((items) => {
        const locale = useAppLocale();
        const tittle = items[locale];
        const location = items[`location_${locale}`];
        const text = items[`text_${locale}`];

        return (
          <div className=" shadow-sm w-full border flex  p-3   sm:p-4 sm:pr-10   md:p-5 md:pr-10 lg:pr-14  justify-between lg:gap-10 gap-5 rounded-2xl  shadow-slate-400">
            <div className="md:w-1/3 min-[500px]:w-2/5 w-1/2  bg-red-400 h-32 min-[450px]:h-36 min-[500px]:h-44  sm:h-full  ">
              <Image
                width={800}
                height={800}
                className="w-full h-full rounded-2xl object-cover "
                alt="test"
                src={`/${items.image}`}
              />
            </div>
            <div className="w-2/3  flex flex-col justify-between gap-3">
              <div className="">
                <h3 className="lg:text-3xl text-lg leading-5 md:leading-none text-mainBlue font-extrabold">
                  <RichText htmlContent={tittle} />
                </h3>
                <span className="hidden md:flex  mt-2 items-center lg:text-[15px] xl:text-lg text-xs font-semibold text-mainBlue opacity-40">
                  {items.date} / <IoLocationSharp />
                  {location}
                </span>
                <div className=" lg:text-lg  hidden min-[410px]:block text-xs  md:text-sm mt-4 font-medium  text-mainBlue ">
                  <RichText
                    htmlContent={slice(text)}
                  />
                </div>
              </div>
              <div className="flex justify-between items-end gap-x-3 ">
                <p className="text-mainBlue opacity-40 font-semibold text-[8px] md:text-sm">
                  <span className="text-xs md:hidden">{items.date}</span>
                  <br /> www.tech-academy.com
                </p>
                <button onClick={() => router.push(`/upcoming/${items.id}`)} className="bg-mainBlue hidden md:block py-3 px-6 text-white  text-sm font-semibold rounded-xl">
                  Explore
                </button>
                <span className="flex  md:hidden items-center lg:text-lg text-[8px] text-end  font-semibold text-mainBlue opacity-40">
                  {/* {items.country} , {items.city}, <br /> {items.academy} */}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpCardsWithProps;
