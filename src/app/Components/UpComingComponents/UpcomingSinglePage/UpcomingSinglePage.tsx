"use client";
import React from "react";
import NavigationBackKnob from "../../ForBackKnob/NavigationBackKnob";
import { Projects } from "@/app/Intarfaces/intarfaces";
import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";

interface Props {
  event: Projects;
}

const UpcomingSinglePage: React.FC<Props> = ({ event }) => {
  const locale = useAppLocale();

  // Проверка: если нет контента — fallback на 'en'
  const title = event?.[locale] || event?.en || "<p>Title not available</p>";
  const location = event?.[`location_${locale}`] || event?.location_en || "Location not available";
  const text = event?.[`text_${locale}`] || event?.text_en || "<p>Text not available</p>";
  const date = event?.date ? new Date(event.date).toLocaleDateString("tm-TM") : "—";

  return (
      <div className="container mx-auto">
        <div className="py-12 md:py-32 px-5">
          <div className="lg:text-4xl md:text-3xl flex items-center text-2xl font-bold text-mainBlue">
            <NavigationBackKnob />
            <RichText htmlContent={title} />
          </div>

          <div className="mt-5">
            <p className="text-mainBlue opacity-35 md:text-xl text-sm font-semibold">
              {date} | {location}
            </p>
          </div>

          <div className="mt-5 leading-6 md:leading-8 text-sm md:text-xl text-mainBlue">
            <RichText htmlContent={text} />
          </div>
        </div>
      </div>
  );
};

export default UpcomingSinglePage;
