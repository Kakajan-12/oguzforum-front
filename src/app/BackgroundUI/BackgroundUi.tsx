'use client';

import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import { Projects, Services } from "@/app/Intarfaces/intarfaces";
import { InsideNews } from "@/app/Intarfaces/SinglePageInterface";
import Image from "next/image";
import React from "react";
import { BASE_API_URL } from "@/constant";

type BackgroundEvent =
    | { type: "news"; data: InsideNews }
    | { type: "projects"; data: Projects }
    | { type: "services"; data: Services };

interface Props {
    event?: BackgroundEvent;
}

const BackgroundUi: React.FC<Props> = ({ event }) => {
    const locale = useAppLocale();
    const title = event?.data?.[locale] ?? '';

    const fixImageUrl = (url: string): string => {
        if (!url) return "/default-image.png";

        const normalizedUrl = url.replace(/\\/g, '/');
        if (normalizedUrl.startsWith('http') || normalizedUrl.startsWith('/')) {
            return normalizedUrl;
        }

        return `${BASE_API_URL.slice(0, -3)}${normalizedUrl}`;
    };

    const imageUrl = event?.data?.image ? event.data.image : '/default-image.jpg';
    return (
        <div className="my-container relative h-screen">
            <Image
                src={fixImageUrl(imageUrl)}
                alt={event?.data?.image || "background"}
                width={1920}
                height={1080}
                priority
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/100 to-transparent"></div>
            <div className="container mx-auto px-4">
                <div
                    className="flex justify-center items-center h-full max-w-[1600px] w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="text-white text-center text-xl md:text-3xl lg:text-4xl font-medium px-5">
                        <RichText htmlContent={title}/>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default BackgroundUi;
