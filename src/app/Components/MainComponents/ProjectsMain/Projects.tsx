"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import { useGetProjectsQuery } from "@/app/Apis/api";
import {BASE_API_URL} from "@/constant";
import Link from "next/link";
import RichText from "@/app/Hooks/Richtext";
import useAppLocale from "@/app/Hooks/GetLocale";
import {useTranslations} from "next-intl";
import "./Projects.css"

export default function OurProjects() {
  const t = useTranslations("OurProjects");
  const { data, error, isLoading } = useGetProjectsQuery();
  const locale = useAppLocale();

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
    <div className="container mx-auto md:py-40 py-24 flex flex-col md:gap-24 gap-20 px-2">
      <h5 className="font-bold text-2xl md:text-5xl max-w-1/3">
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
              slidesPerView: 2, // Для экранов меньше 640px
            },
            1100: {
              slidesPerView: 3, // Для экранов 1280px и шире
            },
            1400: {
              slidesPerView: 5, // Для экранов 1280px и шире
            },
          }}
          loop={true}
          modules={[Navigation]}
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
                    <div className="relative group overflow-hidden h-56 lg:h-96 w-full">
                      <Image
                          src={fixImageUrl(items.image.replace(/\\/g, '/'))}
                          width={600}
                          height={600}
                          alt={`${items.image}`}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Название проекта */}
                      <div className="absolute bottom-0 left-0 top-0 w-full bg-black bg-opacity-60 text-white text-center py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex justify-center items-center">
                        <RichText htmlContent={texts} />
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
