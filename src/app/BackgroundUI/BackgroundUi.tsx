'use client';

import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import { Projects, Services, UpcomingEvent } from "@/app/Intarfaces/intarfaces";
import { InsideNews } from "@/app/Intarfaces/SinglePageInterface";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

type BackgroundEvent =
    | { type: "news"; data: InsideNews }
    | { type: "upcoming"; data: UpcomingEvent }
    | { type: "projects"; data: Projects }
    | { type: "services"; data: Services };

interface Props {
    event?: BackgroundEvent; // <- Ставим "?" чтобы event может быть undefined
}

const BackgroundUi: React.FC<Props> = ({ event }) => {
    const t = useTranslations("BackText");
    const locale = useAppLocale();
    const tittle = event?.data?.[locale] ?? '';

    const imageUrl = event?.data?.image ? `/${event.data.image}` : '/default-image.jpg'; // без краша если нет картинки

    return (
        <div className="relative w-full h-screen">
            <Image
                src={imageUrl}
                alt={event?.data?.image || "background"}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
            />
            <div className="flex justify-center items-center h-full w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-white text-center text-3xl md:text-6xl font-bold md:max-w-[900px] px-5">
                    <RichText htmlContent={tittle} />
                </div>
            </div>
        </div>
    );
};

export default BackgroundUi;
