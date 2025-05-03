"use client";
import React from "react";
import {Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {Swiper, SwiperSlide} from "swiper/react";
import Image from "next/image";
import {useGetPartnersQuery} from "@/app/Apis/api";
import {BASE_API_URL} from "@/constant";
import {useTranslations} from "next-intl";
import "./OurPartners.css"

export const oguzform = {
    name: "Oguz Forum",
};
export const arrayOguzForm = new Array(10).fill(oguzform);

export default function OurPartnersMain() {
    const t = useTranslations("OurPartners");
    const {data, error, isLoading} = useGetPartnersQuery()

    function fixImageUrl(url: string): string {
        if (!url) return "/default-image.png"; // если нет картинки, отдать заглушку
        const normalizedUrl = url.replace(/\\/g, '/');

        if (normalizedUrl.startsWith('http')) {
            return normalizedUrl; // уже нормальный внешний URL
        }

        if (normalizedUrl.startsWith('/')) {
            return normalizedUrl; // локальный путь
        }

        return `${BASE_API_URL.slice(0, -3)}${normalizedUrl}`; // если просто uploads/....
    }

    return (
        <div className="w-full bg-mainBlue">
            <div className="container relative mx-auto py-14 px-2 flex flex-col items-center gap-10 md:gap-11">
                <h5 className="font-bold text-2xl md:text-5xl max-w-1/3 text-white">
                    {t('ourmain')}
                </h5>

                <div className="w-full md:px-10 px-8">
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={20}
                        loop={true}
                        breakpoints={{
                            320: {
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
                        modules={[Navigation]}
                        className="mySwiper w-full "
                    >
                        {data?.map((items) => {
                            return (
                                <SwiperSlide key={items.id} className="rounded-2xl">
                                    <div
                                        className="h-36 flex items-center justify-center">
                                        <Image width={800} height={800}
                                               src={fixImageUrl(items.logo.replace(/\\/g, '/'))} alt={`${items.logo}`}/>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>

                <div
                    className="relative lg:bottom-[108px] md:bottom-24  bottom-[70px] z-10 w-full flex items-center justify-center bg-red-400 gap-4">
                    <div className="w-full flex justify-center items-center absolute h-10">
                        <button className="swiper-button-prev-partners w-10">
                            <Image src="/UpKnob.png" alt="prev"
                                   width={50}
                                   height={50}
                            style={{
                                width: "50px",
                                height: "20px",
                                transform: "rotate(270deg)",
                            }}/>
                        </button>
                        <button className="swiper-button-next-partners w-10">
                            <Image src="/UpKnob.png" alt="next"
                                   width={50}
                                   height={50}
                                   style={{
                                       width: "50px",
                                       height: "20px",
                                       transform: "rotate(90deg)",
                                   }}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
