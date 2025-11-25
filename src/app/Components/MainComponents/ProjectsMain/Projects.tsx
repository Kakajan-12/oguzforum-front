"use client";
import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import {useGetProjectsQuery} from "@/app/Apis/api";
import {BASE_API_URL} from "@/constant";
import Link from "next/link";
import RichText from "@/app/Hooks/Richtext";
import useAppLocale from "@/app/Hooks/GetLocale";
import {useTranslations} from "next-intl";
import "./Projects.css"

export default function OurProjects() {
    const t = useTranslations("OurProjects");
    const {data, error, isLoading} = useGetProjectsQuery();
    const locale = useAppLocale();

    function fixImageUrl(url: string): string {
        if (!url) return "/default-image.png";
        const normalizedUrl = url.replace(/\\/g, '/');

        if (normalizedUrl.startsWith('http')) {
            return normalizedUrl;
        }

        if (normalizedUrl.startsWith('/')) {
            return normalizedUrl;
        }

        return `${BASE_API_URL.slice(0, -3)}${normalizedUrl}`;
    }

    return (
        <div className="container mx-auto py-2 md:py-4 lg:py-12 flex flex-col gap-10 px-2">
            <h5 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-1/3">
                {t('ourmain')}
            </h5>
            <div className="w-full ">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        600: {
                            slidesPerView: 2,
                        },
                        1100: {
                            slidesPerView: 3,
                        },
                        1400: {
                            slidesPerView: 4,
                        },
                    }}
                    loop={true}
                    autoplay={true}
                    modules={[Navigation, Autoplay]}
                    className="mySwiper "
                    navigation={{
                        prevEl: ".swiper-button-prev-projects",
                        nextEl: ".swiper-button-next-projects",
                    }}
                >
                    {data?.map((items, i) => {
                        const texts = items[locale];
                        return (
                            <SwiperSlide key={items.id}>
                                <Link href={`/projects/${items.id}`}>
                                    <div className="relative group overflow-hidden h-72 w-full">
                                        <Image
                                            src={fixImageUrl(items.image.replace(/\\/g, '/'))}
                                            width={600}
                                            height={600}
                                            alt={`${items.image}`}
                                            className="object-fill w-full h-full transition-transform duration-300 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 w-full bg-black bg-opacity-60 text-white text-center py-3
                translate-y-0 md:translate-y-full md:group-hover:translate-y-0
                transition-transform duration-500 flex justify-center items-center">
                                            <RichText htmlContent={texts}/>
                                        </div>

                                    </div>
                                </Link>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}
