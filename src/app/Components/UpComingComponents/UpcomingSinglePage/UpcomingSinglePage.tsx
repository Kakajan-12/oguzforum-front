"use client";
import React from "react";
import NavigationBackKnob from "../../ForBackKnob/NavigationBackKnob";
import { UpcomingEvent } from "@/app/Intarfaces/intarfaces";
import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
interface Props {
  event: UpcomingEvent;
}

const UpcomingSinglePage: React.FC<Props> = ({ event }) => {
  const locale = useAppLocale();
  const tittle = event[locale];
  const location = event[`location_${locale}`];
  const text = event[`text_${locale}`];
  return (
    <div className="container mx-auto ">
      <div className="py-12 md:py-32    px-5">
        <div className="lg:text-4xl md:text-3xl flex items-center text-2xl font-bold text-mainBlue">
          <NavigationBackKnob />
          <RichText htmlContent={tittle} />
        </div>

        <div className=" mt-5  ">
          <p className="text-mainBlue opacity-35 md:text-xl text-sm font-semibold">
            {event.date} | {location}
          </p>
        </div>

        <div className="mt-5 leading-6 md:leading-8 text-sm md:text-xl text-mainBlue">
          <div>
            <RichText htmlContent={text} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingSinglePage;
