"use client";
import React, {useEffect, useState} from "react";
import NavigationBackKnob from "../../ForBackKnob/NavigationBackKnob";
import {Projects} from "@/app/Intarfaces/intarfaces";
import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import {useTranslations} from "next-intl";
import Image from "next/image";
import {BASE_API_URL} from "@/constant";
import axios from "axios";

interface Props {
    event: Projects;
}

interface GalleryItem {
    id: number;
    image: string;
    project_id: number;
}

interface ImageItem {
    key: string;
    image: string;
    height: number;
}

const UpcomingSinglePage: React.FC<Props> = ({event}) => {
    const locale = useAppLocale();
    const t = useTranslations("event");
    const location = event?.[`location_${locale}`] || event?.location_en || "Location not available";
    const text = event?.[`text_${locale}`] || event?.text_en || "<p>Text not available</p>";
    const date = event?.date ? new Date(event.date).toLocaleDateString("tm-TM") : "—";
    const [images, setImages] = useState<ImageItem[]>([]);

    const fixImageUrl = (url: string) => {
        if (!url) return "/default-image.png";

        const normalized = url.replace(/\\/g, "/");

        console.log('Original URL:', url); // Для отладки
        console.log('Normalized URL:', normalized); // Для отладки

        if (normalized.startsWith("https://api.oguzforum.com/")) {
            return normalized;
        }

        if (normalized.startsWith(".oguzforum.com")) {
            return `https://api${normalized}`;
        }

        if (normalized.startsWith("http://.oguzforum.com") || normalized.startsWith("https://.oguzforum.com")) {
            return normalized.replace("http://.", "https://api.")
                .replace("https://.", "https://api.");
        }

        if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
            if (normalized.includes("uploads/")) {
                const path = normalized.split("uploads/")[1];
                return `https://api.oguzforum.com/uploads/${path}`;
            }
            return normalized;
        }

        if (normalized.startsWith("uploads/")) {
            return `https://api.oguzforum.com/${normalized}`;
        }

        if (normalized.startsWith("/uploads")) {
            return `https://api.oguzforum.com${normalized}`;
        }

        return `https://api.oguzforum.com/uploads/${normalized}`;
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const galleryRes = await axios.get<GalleryItem[]>(
                    `${process.env.NEXT_PUBLIC_API_URL}/gallery/`
                );

                const galleryImages = galleryRes.data.filter(
                    (item: GalleryItem) => item.project_id === event.id
                );

                const allImages: ImageItem[] = galleryImages.map((item) => ({
                    key: `${item.id}`,
                    image: fixImageUrl(item.image),
                    height: 150 + Math.floor(Math.random() * 150),
                }));

                setImages(allImages);
            } catch (error) {
                console.error("Ошибка загрузки галереи:", error);
            }
        };

        fetchData();
    }, [event.id]);

    return (
        <div className="container mx-auto px-4">
            <div className="py-12">
                <div className="flex items-start">
                    <NavigationBackKnob/>
                    <div className="flex flex-col justify-between shadow-2xl p-2 w-full">
                        <div className="flex flex-col divide-y-2 divide-[#002A5F] sm:divide-y-0">

                            <div className="flex flex-wrap sm:justify-center flex-col sm:flex-row sm:space-y-4">
                                {[
                                    {label: t('speakers'), value: event.speakers},
                                    {label: t('delegates'), value: event.delegates},
                                    {label: t('countries'), value: event.countries},
                                    {label: t('companies'), value: event.companies},
                                    {label: t('media'), value: event.media},
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className={`
                                                flex justify-between sm:justify-center items-center py-2 sm:w-1/3 xl:w-1/5
                                        ${
                                            (index % 3 !== 0) ? "sm:border-l-2 sm:border-[#002A5F]" : ""
                                        }

                                        ${
                                            (index !== 0) ? "xl:border-l-2 xl:border-[#002A5F]" : ""
                                        }
                                        `}
                                    >

                                        <p className="text-sm md:text-md lg:text-lg font-medium">
                                            {item.label}:
                                        </p>
                                        <p className="text-md sm:text-lg md:text-xl font-medium sm:ml-2">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}

                            </div>
                        </div>

                        <div className="flex mt-4 border-t-2 border-[#002A5F]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 pt-4 w-full space-y-2 sm:space-y-0">
                                <div className="flex flex-col space-y-2">
                                    <div className="flex space-x-2">
                                        <p className="text-sm md:text-md lg:text-lg font-bold">{t('date')}</p>
                                        <p className="text-sm md:text-md lg:text-lg font-medium sm:ml-2"> {date}</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:space-x-2">
                                        <p className="text-sm md:text-md lg:text-lg font-bold">{t('location')}</p>
                                        <p className="text-sm md:text-md lg:text-lg font-medium sm:ml-2">{location}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm md:text-md lg:text-lg font-bold">{t('organizers')}</p>

                                    <div className="flex flex-wrap gap-2 mt-2">

                                        {event.organizers?.map((org) => {
                                            let logo = "";

                                            if (typeof org.organizer_logo === "string") {
                                                logo = org.organizer_logo;
                                            } else if (org.organizer_logo && typeof org.organizer_logo === "object") {
                                                logo = org.organizer_logo || "";
                                            }

                                            const logoUrl = fixImageUrl(logo);

                                            return (
                                                <div key={org.id} className="flex items-center space-x-2">
                                                    <div className="max-w-[100px]">
                                                        <Image
                                                            src={logoUrl}
                                                            alt={org[`organizer_${locale}`] || "Organizer logo"}
                                                            width={50}
                                                            height={50}
                                                            className="object-contain rounded w-full"
                                                        />
                                                    </div>


                                                    <p className="text-sm md:text-md lg:text-lg font-medium">
                                                        {org[`organizer_${locale}`]}
                                                    </p>
                                                </div>
                                            );
                                        })}

                                        {(!event.organizers || event.organizers.length === 0) && (
                                            <p className="text-gray-500 text-sm">No organizers available</p>
                                        )}

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 leading-6 md:leading-8 text-sm md:text-md lg:text-lg xl:text-xl blue-text">
                    <RichText htmlContent={text}/>
                </div>
                <div className="w-full mx-auto py-6">
                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                        {images.map((item) => (
                            <div
                                key={item.key}
                                className="mb-4 break-inside-avoid rounded-md overflow-hidden cursor-pointer"
                            >
                                <Image
                                    src={item.image}
                                    alt="gallery"
                                    width={300}
                                    height={400}
                                    className="w-full object-cover rounded-md transition-transform duration-300 hover:scale-105"
                                    style={{height: `${item.height}px`}}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingSinglePage;
