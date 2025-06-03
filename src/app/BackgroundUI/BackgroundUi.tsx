'use client';

import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import { Projects, Services } from "@/app/Intarfaces/intarfaces";
import { InsideNews } from "@/app/Intarfaces/SinglePageInterface";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { BASE_API_URL } from "@/constant";

type BackgroundEvent =
    | { type: "news"; data: InsideNews }
    | { type: "projects"; data: Projects }
    | { type: "services"; data: Services };

interface Props {
    event?: BackgroundEvent; // Ставим "?" чтобы event может быть undefined
}

const BackgroundUi: React.FC<Props> = ({ event }) => {
    const t = useTranslations("BackText");
    const locale = useAppLocale();
    const title = event?.data?.[locale] ?? ''; // Получаем заголовок с учётом локали

    const fixImageUrl = (url: string): string => {
        if (!url) return "/default-image.png"; // Возвращаем изображение по умолчанию, если URL пустой

        const normalizedUrl = url.replace(/\\/g, '/'); // Преобразуем обратные слэши в прямые
        if (normalizedUrl.startsWith('http') || normalizedUrl.startsWith('/')) {
            return normalizedUrl; // Если это уже абсолютный или локальный путь, возвращаем как есть
        }

        return `${BASE_API_URL.slice(0, -3)}${normalizedUrl}`; // Формируем полный путь для API, если это локальный путь
    };

    // Проверяем, если изображение есть, то используем его, иначе ставим изображение по умолчанию
    const imageUrl = event?.data?.image ? event.data.image : '/default-image.jpg';
    console.log('Image URL:', fixImageUrl(imageUrl));
    return (
        <div className="relative w-full h-screen">
            <Image
                src={fixImageUrl(imageUrl)}
                alt={event?.data?.image || "background"}
                width={1920}
                height={1080}
                priority
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/100 to-transparent"></div>


            <div
                className="flex justify-center items-center h-full w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-white text-center text-3xl md:text-6xl font-bold md:max-w-[900px] px-5">
                    <RichText htmlContent={title}/>
                </div>
            </div>
        </div>
    );
};

export default BackgroundUi;
