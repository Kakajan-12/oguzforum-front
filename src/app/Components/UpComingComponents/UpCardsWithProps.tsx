"use client";

import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import { Projects } from "@/app/Intarfaces/intarfaces";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { BASE_API_URL } from "@/constant";
import { IoLocationSharp } from "react-icons/io5";
import { SliceText } from "@/app/Hooks/SliceTexts";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

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

const UpCardsWithProps: React.FC<Props> = ({ event, itemsPerPage = 10 }) => {
    const t = useTranslations("explore");
    const slice = SliceText();
    const locale = useAppLocale();
    const [page, setPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const checkMobile = () => setIsMobile(window.innerWidth < 768);
            checkMobile();
            window.addEventListener("resize", checkMobile);
            return () => window.removeEventListener("resize", checkMobile);
        }
    }, []);

    // ✅ Фильтрация проектов, у которых end_date > текущей даты
    const now = new Date();
    const futureEvents = event.filter(item => new Date(item.end_date) > now);

    const totalPages = Math.ceil(futureEvents.length / itemsPerPage);
    const currentData = futureEvents.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="container mx-auto md:px-7 flex flex-col md:gap-10 gap-5 pb-7 md:pb-10 px-2">
            {currentData.map((items) => {
                const tittle = items[locale];
                const location = items[`location_${locale}`];
                const text = items[`text_${locale}`];
                const cardHref = `/upcoming/${items.id}`;

                return (
                    <div
                        key={items.id}
                        onClick={() => isMobile && router.push(cardHref)}
                        className="cursor-pointer shadow-sm w-full border p-3 justify-between lg:gap-10 gap-5 rounded-md shadow-slate-400 flex flex-col md:flex-row hover:bg-gray-50 transition"
                    >
                        <div className="w-full md:w-1/3">
                            <Image
                                width={800}
                                height={800}
                                className="w-full h-full rounded-md object-cover"
                                alt="project"
                                src={fixImageUrl(items.image)}
                                style={{ objectPosition: "center" }}
                            />
                        </div>

                        <div className="flex flex-col justify-between gap-3 md:w-2/3">
                            <div>
                                <h3 className="text-md sm:text-lg md:text-xl leading-1 md:leading-none text-mainBlue font-semibold">
                                    <RichText htmlContent={tittle} />
                                </h3>

                                <div className="hidden md:flex mt-2 items-center text-sm xl:text-lg font-semibold text-mainBlue opacity-40">
                                    {new Date(items.date).toLocaleDateString("tm-TM")} | <IoLocationSharp /> {location}
                                </div>

                                <div className="hidden md:block text-lg mt-4 font-medium text-mainBlue">
                                    <RichText htmlContent={slice(text)} />
                                </div>
                            </div>

                            <div className="flex justify-between items-end gap-x-3">
                                <p className="text-mainBlue opacity-40 font-semibold md:text-sm flex flex-col">
                                    <span className="md:hidden text-sm">{new Date(items.date).toLocaleDateString("tm-TM")}</span>
                                    <span className="text-xs md:text-lg">{items.link}</span>
                                </p>

                                <Link
                                    href={cardHref}
                                    className="bg-mainBlue hidden md:block py-3 px-6 text-white text-sm font-semibold rounded-xl"
                                >
                                    {t("name")}
                                </Link>

                                <span className="flex items-center md:hidden text-xs sm:text-md text-start font-semibold text-mainBlue opacity-40">
                                    <IoLocationSharp className="text-3xl" />
                                    {location}
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
