"use client";
import RichText from "@/components/ui/RichText";
import { Projects, Services } from "@/types";
import { InsideNews } from "@/types/singlePage";
import Image from "next/image";
import React from "react";
import { resolveMediaUrl } from "@/constant";

type BackgroundEvent =
  | { type: "news"; data: InsideNews }
  | { type: "projects"; data: Projects }
  | { type: "services"; data: Services };

interface Props {
  event?: BackgroundEvent;
}

const BackgroundUi: React.FC<Props> = ({ event }) => {
  const title = event?.data?.en ?? "";

  const imageUrl = event?.data?.image ? event.data.image : "/default-image.jpg";
  return (
    <div className="px-4 lg:px-10 relative h-screen">
      <Image
        src={resolveMediaUrl(imageUrl)}
        alt={event?.data?.image || "background"}
        width={1920}
        height={1080}
        priority
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/100 to-transparent"></div>
      <div className="px-4 lg:px-10">
        <div className="flex justify-center items-center h-full max-w-[1600px] w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-white text-center text-xl md:text-3xl lg:text-4xl font-medium px-5">
            <RichText htmlContent={title} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundUi;
