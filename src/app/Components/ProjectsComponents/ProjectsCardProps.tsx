"use client";
import RichText from "@/app/Hooks/Richtext";
import { Projects } from "@/app/Intarfaces/intarfaces";
import Image from "next/image";
import React from "react";
import { resolveMediaUrl } from "@/constant";
import { IoLocationSharp } from "react-icons/io5";
import { SliceText } from "@/app/Hooks/SliceTexts";
import Link from "next/link";

import { PiCalendarBlankDuotone } from "react-icons/pi";
interface Props {
  event: Projects[];
}

const normalizeUrl = (url?: string) => {
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const ProjectsCardProps: React.FC<Props> = ({ event }) => {
  const slice = SliceText();
  return (
    <div className="container mx-auto md:px-7 flex flex-col md:gap-10 gap-5 pb-7 md:pb-10 px-2">
      {event.map((items) => {
        const title = items.en;
        const location = items.location_en;
        const type = items.type_en;

        return (
          <div
            key={items.id}
            className="cursor-pointer shadow-sm w-full border p-3 justify-between lg:gap-10 gap-5 rounded-md shadow-slate-400 flex flex-col md:flex-row hover:bg-gray-50 transition"
          >
            <div className="w-full md:w-1/3">
              <Image
                width={800}
                height={800}
                className="w-full h-full rounded-md object-cover"
                alt="project"
                src={resolveMediaUrl(items.image)}
                style={{ objectPosition: "center" }}
              />
            </div>

            <div className="flex flex-col justify-between gap-3 md:w-2/3">
              <div className="flex items-center text-sm sm:text-md text-start font-semibold">
                <IoLocationSharp className="text-xl blue-text opacity-40" />
                {location}
              </div>
              <div className="flex items-center text-sm sm:text-md text-start font-normal blue-text opacity-40">
                {type}
              </div>
              <h3 className="text-lg sm:text-lg md:text-xl leading-1 md:leading-none text-mainBlue font-semibold">
                <RichText htmlContent={slice(title)} />
              </h3>

              {items.organizers && items.organizers.length > 0 && (
                <div>
                  <div className="font-semibold text-sm mb-1">
                    {"Organizers"}:
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {items.organizers.map((org, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {org.organizer_logo && (
                          <Image
                            src={resolveMediaUrl(org.organizer_logo)}
                            alt={org.organizer_en || "Organizer"}
                            width={50}
                            height={50}
                            className="object-cover w-14"
                          />
                        )}
                        <span className="text-sm font-medium">
                          {org.organizer_en}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:space-y-0">
                <div className="flex items-center space-x-2">
                  <PiCalendarBlankDuotone className="blue-text" />
                  <div className="text-sm font-semibold blue-text">
                    {new Date(items.date).toLocaleDateString("tm-TM")}
                  </div>
                  <div>-</div>
                  <div className="text-sm font-semibold blue-text">
                    {new Date(items.end_date).toLocaleDateString("tm-TM")}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 w-full">
                  <a
                    href={normalizeUrl(items.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="main-background-color py-2 px-4 text-white rounded-full w-full text-center"
                  >
                    {items.link}
                  </a>
                  <Link
                    href={`/projects/${items.id}`}
                    className="main-background-color py-2 px-4 text-white rounded-full w-full text-center"
                  >
                    {"Explore"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ProjectsCardProps;
