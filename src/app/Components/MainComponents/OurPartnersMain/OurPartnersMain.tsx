"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useGetPartnersQuery } from "@/app/Apis/api";
import { resolveMediaUrl } from "@/constant";
import { useTranslations } from "next-intl";
import "./OurPartners.css";
import Spinner from "../../UI/Spinner";
import ErrorMessage from "../../UI/ErrorMessage";
import DataMessage from "../../UI/DataMessage";

export default function OurPartnersMain() {
  const t = useTranslations("OurPartners");
  const { data, error, isLoading } = useGetPartnersQuery();
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [copyCount, setCopyCount] = useState(2);

  useLayoutEffect(() => {
    if (!data?.length) return;
    const container = containerRef.current;
    const group = groupRef.current;
    if (!container || !group) return;

    const update = () => {
      const cw = container.clientWidth;
      const gw = group.getBoundingClientRect().width;
      if (cw <= 0 || gw <= 0) return;
      const n = Math.max(2, Math.ceil(cw / gw) + 1);
      setCopyCount((prev) => (prev === n ? prev : n));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(container);
    ro.observe(group);
    return () => ro.disconnect();
  }, [data]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;
  if (!data) return <DataMessage />;

  return (
    <div className="container mx-auto px-2">
      <div className="flex flex-col items-center gap-10 py-10">
        <div className="flex items-end w-full space-x-2">
          <h5 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-nowrap">
            {t("ourmain")}
          </h5>
          <div className="w-full border-b-2 border-[#002A5F]"></div>
        </div>
        <div ref={containerRef} className="overflow-hidden w-full">
          <div
            className="marquee-track"
            style={
              { "--marquee-copies": copyCount } as React.CSSProperties
            }
          >
            {Array.from({ length: copyCount }, (_, copyIndex) => (
              <div
                key={copyIndex}
                ref={copyIndex === 0 ? groupRef : undefined}
                className="marquee-group"
                aria-hidden={copyIndex > 0 || undefined}
              >
                {data.map((partner) => (
                  <div
                    key={`${copyIndex}-${partner.id}`}
                    className="shrink-0 h-14 flex items-center justify-center px-8"
                  >
                    <Image
                      src={resolveMediaUrl(partner.logo)}
                      alt={
                        copyIndex === 0
                          ? `Partner ${partner.id}`
                          : ""
                      }
                      width={1800}
                      height={1800}
                      sizes="(max-width: 768px) 112px, 160px"
                      className="h-full w-auto max-h-14 object-contain"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* <div className="w-full">
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
            // autoplay={true}
            autoplay={{
              delay: 800,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            className="mySwiper w-full "
          >
            {data?.map((items) => {
              return (
                <SwiperSlide key={items.id} className="rounded-2xl">
                  <div className="flex items-center justify-center w-full h-48">
                    <Image
                      width={1800}
                      height={1800}
                      src={resolveMediaUrl(items.logo.replace(/\\/g, "/"))}
                      alt={`${items.logo}`}
                      className="object-contain w-full h-48"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div> */}
      </div>
    </div>
  );
}
