"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

import "./Main.css";
import { useTranslations } from "next-intl";
import { useGetSlidersQuery } from "@/app/Apis/api";
import RichText from "@/app/Hooks/Richtext";
import useAppLocale from "@/app/Hooks/GetLocale";
import {BASE_API_URL} from "@/constant";

const Main = () => {
  const t = useTranslations("BackText");
  const { data, error, isLoading } = useGetSlidersQuery();
  const locale = useAppLocale();

  return (
    <div className="md:h-screen  w-full">
      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        spaceBetween={0}
        navigation={{
          prevEl: ".swiper-button-prev-first",
          nextEl: ".swiper-button-next-first",
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper h-screen"
      >
        {data?.map((items) => {
          const selected = items[locale];
          return (
            <SwiperSlide className="relative">
                <div className="relative h-full w-full">
                    <Image
                        src={items.image.startsWith('http') ? items.image : `${BASE_API_URL.slice(0, -3)}${items.image}`}
                        alt={items.image}
                        width={1200}
                        height={800}
                        className="w-full h-full absolute inset-0 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-950/100 to-transparent"></div>
                </div>

              <div className="flex justify-center items-center h-full w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-white text-center text-3xl md:text-6xl md:max-w-[900px] px-5">
                  <RichText htmlContent={selected} />
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        <div className="swiper-button-prev swiper-button-prev-first"></div>
        <div className="swiper-button-next swiper-button-next-first"></div>
      </Swiper>
    </div>
  );
};

export default Main;
