"use client";
import React from "react";
import {Navigation, Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {Swiper, SwiperSlide} from "swiper/react";
import Image from "next/image";
import {useGetPartnersQuery} from "@/app/Apis/api";
import {BASE_API_URL} from "@/constant";
import {useTranslations} from "next-intl";
import "./OurPartners.css"

export default function OurPartnersMain() {
    const t = useTranslations("OurPartners");
    const {data, error, isLoading} = useGetPartnersQuery()

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
            <div className="container mx-auto px-2">
                <div className="flex flex-col items-center gap-10 py-10">
                    <div className="flex items-end w-full space-x-2">
                        <h5 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-nowrap">
                            {t('ourmain')}
                        </h5>
                        <div className="w-full border-b-2 border-[#002A5F]"></div>
                    </div>


                    <div className="w-full">
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={20}
                            loop={true}
                            breakpoints={{
                                220: {
                                    slidesPerView: 2,
                                    spaceBetween: 25,
                                },
                                640: {
                                    slidesPerView: 3,
                                },
                                768: {
                                    slidesPerView: 4,
                                },
                                1000: {
                                    slidesPerView: 5,
                                    spaceBetween: 30,
                                },
                                1200: {
                                    slidesPerView: 6,
                                    spaceBetween: 50,
                                },
                            }}
                            navigation={{
                                prevEl: ".swiper-button-prev-partners",
                                nextEl: ".swiper-button-next-partners",
                            }}
                            autoplay={true}
                            modules={[Navigation, Autoplay]}
                            className="mySwiper w-full "
                        >
                            {data?.map((items) => {
                                return (
                                    <SwiperSlide key={items.id} className="rounded-2xl">
                                        <div
                                            className="flex items-center justify-center w-full h-48">
                                            <Image width={1800} height={1800}
                                                   src={fixImageUrl(items.logo.replace(/\\/g, '/'))}
                                                   alt={`${items.logo}`}
                                            className="object-contain w-full h-48" />
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
    );
}
