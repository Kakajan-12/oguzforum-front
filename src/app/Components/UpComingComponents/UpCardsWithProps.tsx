"use client";

import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import {Projects} from "@/app/Intarfaces/intarfaces";
import Image from "next/image";
import React, {useState, useEffect, useRef} from "react";
import {BASE_API_URL} from "@/constant";
import {IoLocationSharp} from "react-icons/io5";
import {SliceText} from "@/app/Hooks/SliceTexts";
import Link from "next/link";
import {useTranslations} from "next-intl";
import {PiCalendarBlankDuotone} from "react-icons/pi";
import UpPagination from "./UpPagination";


interface Props {
    event: Projects[];
    itemsPerPage?: number;
}

const fixImageUrl = (url: string): string => {
    if (!url) return "/default-image.png";
    const normalizedUrl = url.replace(/\\/g, "/");
    if (normalizedUrl.startsWith("http") || normalizedUrl.startsWith("/")) {
        return normalizedUrl;
    }
    return `${BASE_API_URL.slice(0, -3)}${normalizedUrl}`;
};

const UpCardsWithProps: React.FC<Props> = ({event, itemsPerPage = 10}) => {
    const t = useTranslations("OurProjects");
    const slice = SliceText();
    const locale = useAppLocale();
    const [page, setPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const cardsTopRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const checkMobile = () => setIsMobile(window.innerWidth < 768);
            checkMobile();
            window.addEventListener("resize", checkMobile);
            return () => window.removeEventListener("resize", checkMobile);
        }
    }, []);

    const now = new Date();
    const futureEvents = event.filter(item => new Date(item.end_date) > now);
    const totalPages = Math.ceil(futureEvents.length / itemsPerPage);
    const currentData = [...futureEvents]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const prevPageRef = useRef(page);

    useEffect(() => {
        if (prevPageRef.current !== page) {
            if (cardsTopRef.current) {
                const element = cardsTopRef.current.getBoundingClientRect();
                const offset = window.scrollY + element.top - 250;
                window.scrollTo({ top: offset, behavior: "smooth" });
            }
        }
        prevPageRef.current = page;
    }, [page]);

    return (
        <div
            ref={cardsTopRef}
            className="container mx-auto md:px-7 flex flex-col md:gap-10 gap-5 pb-7 md:pb-10 px-2">
            {currentData.map((items) => {
                const title = items[locale];
                const location = items[`location_${locale}`];
                const type = items[`type_${locale}`];

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
                                src={fixImageUrl(items.image)}
                                style={{objectPosition: "center"}}
                            />
                        </div>

                        <div className="flex flex-col justify-between gap-3 md:w-2/3">
                            <div
                                className="flex items-center text-sm sm:text-md text-start font-semibold">
                                <IoLocationSharp className="text-xl blue-text opacity-40"/>
                                {location}
                            </div>
                            <div
                                className="flex items-center text-sm sm:text-md text-start font-normal blue-text opacity-40">
                                {type}
                            </div>
                            <h3 className="text-lg sm:text-lg md:text-xl leading-1 md:leading-none text-mainBlue font-semibold">
                                <RichText htmlContent={slice(title)}/>
                            </h3>

                            <div className="">
                                {items.organizers && items.organizers.length > 0 ? (
                                    <div>
                                        <div className="font-semibold text-sm mb-1">{t('organizers')}:</div>
                                        <div className="flex flex-wrap items-center gap-3">
                                            {items.organizers.map((org, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    {org.organizer_logo && (
                                                        <Image
                                                            src={fixImageUrl(org.organizer_logo)}
                                                            alt={org[`organizer_${locale}`] || "Organizer"}
                                                            width={50}
                                                            height={50}
                                                            className="object-cover w-14"
                                                        />
                                                    )}
                                                    <span className="text-sm font-medium">
                            {org[`organizer_${locale}`]}
                        </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-gray-500"></div>
                                )}
                            </div>
                            <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:space-y-0">
                                <div className="flex items-center space-x-2">
                                    <PiCalendarBlankDuotone className="blue-text"/>
                                    <div
                                        className="text-sm font-semibold blue-text">
                                        {new Date(items.date).toLocaleDateString("tm-TM")}
                                    </div>
                                    <div>-</div>
                                    <div
                                        className="text-sm font-semibold blue-text">
                                        {new Date(items.end_date).toLocaleDateString("tm-TM")}
                                    </div>
                                </div>
                                <div
                                    className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 w-full">
                                    <Link href={items.link}
                                          className="main-background-color py-2 px-4 text-white rounded-full w-full text-center">
                                        {items.link}
                                    </Link>
                                    <Link href={`/events/${items.id}`}
                                          className="main-background-color py-2 px-4 text-white rounded-full w-full text-center">
                                        {t('explore')}
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                );
            })}
            <UpPagination
                totalPages={totalPages}
                currentPage={page}
                onChange={(event, value) => setPage(value)}
            />

        </div>
    );
};
export default UpCardsWithProps;
