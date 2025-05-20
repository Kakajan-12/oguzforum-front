"use client";

import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import {Projects} from "@/app/Intarfaces/intarfaces";
import Image from "next/image";
import React, {useState} from "react";
import {BASE_API_URL} from "@/constant";
import {IoLocationSharp} from "react-icons/io5";
import {SliceText} from "@/app/Hooks/SliceTexts";
import Link from "next/link";
import {useTranslations} from "next-intl";

interface Props {
    event: Projects[];
    itemsPerPage?: number;
}

const fixImageUrl = (url: string): string => {
    if (!url) return "/default-image.png";
    const normalizedUrl = url.replace(/\\/g, '/');
    if (normalizedUrl.startsWith('http') || normalizedUrl.startsWith('/')) {
        return normalizedUrl;
    }
    return `${BASE_API_URL.slice(0, -3)}${normalizedUrl}`;
};

const UpCardsWithProps: React.FC<Props> = ({event, itemsPerPage = 10}) => {
    const t = useTranslations("explore")
    const slice = SliceText();
    const locale = useAppLocale();
    const [page, setPage] = useState(1); // Состояние для текущей страницы
    const totalPages = Math.ceil(event.length / itemsPerPage); // Рассчитываем общее количество страниц

    // Обработчик изменения страницы
    const handleChange = (_: any, value: number) => {
        setPage(value);
    };

    // Получаем проекты только для текущей страницы
    const currentData = event.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="container mx-auto md:px-7  flex flex-col md:gap-10 gap-5  pb-7 md:pb-10 px-2">
            {event.map((items) => {
                const locale = useAppLocale();
                const tittle = items[locale];
                const location = items[`location_${locale}`];
                const text = items[`text_${locale}`];

                return (
                    <div
                        className="shadow-sm w-full border flex p-3 sm:p-4 sm:pr-10 md:p-5 md:pr-10 lg:pr-14 justify-between lg:gap-10 gap-5 rounded-2xl shadow-slate-400"
                        key={items.id}>
                        <div className="w-1/3 max-h-72">
                            <Image
                                width={800}
                                height={800}
                                className="w-full h-full rounded-2xl object-cover "
                                alt="project"
                                objectFit="cover"
                                src={fixImageUrl(items.image)}
                                style={{objectPosition: "center"}}
                            />
                        </div>
                        <div className="w-2/3 flex flex-col justify-between gap-3">
                            <div>
                                <h3 className="text-md md:text-lg lg:text-2xl leading-5 md:leading-none text-mainBlue font-extrabold">
                                    <RichText htmlContent={tittle}/>
                                </h3>
                                <div
                                    className="hidden md:flex mt-2 items-center lg:text-[15px] xl:text-lg text-xs font-semibold text-mainBlue opacity-40">
                                    {items.date} | <IoLocationSharp/>{location}</div>
                                <div
                                    className="hidden md:block text-lg mt-4 font-medium text-mainBlue ">
                                    <RichText
                                        htmlContent={slice(text)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between items-end gap-x-3 ">
                                <p className="text-mainBlue opacity-40 font-semibold md:text-sm">
                                    <span className="md:hidden text-xs">{items.date}</span>
                                    <span className="text-[8px] md:text-lg">{items.link}</span>
                                </p>
                                <Link href={`/upcoming/${items.id}`}
                                      className="bg-mainBlue hidden md:block py-3 px-6 text-white  text-sm font-semibold rounded-xl">
                                    {t('name')}
                                </Link>

                                <span
                                    className="flex items-center md:hidden text-xs lg:text-lg text-start font-semibold text-mainBlue opacity-40">
                                    <IoLocationSharp className="text-3xl"/>{location}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>

    );
};

export default UpCardsWithProps;
