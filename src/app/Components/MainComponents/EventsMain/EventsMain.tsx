'use client';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import Image from "next/image";
import {useTranslations} from 'next-intl';
import {useGetProjectsQuery} from '@/app/Apis/api';
import useAppLocale from '@/app/Hooks/GetLocale';
import RichText from '@/app/Hooks/Richtext';
import Link from 'next/link';
import {BASE_API_URL} from "@/constant";
import "./EventsMain.css"
import { MdArrowForwardIos } from "react-icons/md";

const MainEvents = () => {
    const {data, error, isLoading} = useGetProjectsQuery()
    const locale = useAppLocale()

    const t = useTranslations("upcoming")

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
            <div className="flex flex-col items-center justify-center py-14 lg:py-24">
                <div className="w-full flex justify-between items-center mb-8">
                    <div
                        className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{t("upcoming-events")}</div>
                    <Link href="/events"
                          className="hidden sm:block main-background-color px-8 py-1 text-white rounded-md sm:text-md md:text-lg">{t('more')}</Link>
                </div>
                <div className="w-full mx-auto event-slider">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        centeredSlides={true}
                        slidesPerView={5}
                        loop={true}
                        spaceBetween={4}
                        pagination={{
                            clickable: true,
                            renderBullet: (index, className) => {
                                return `<span class="${className}"></span>`;
                            },
                        }}
                        navigation={{
                            prevEl: '.swiper-button-prev-second',
                            nextEl: '.swiper-button-next-second',
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            576: {
                                slidesPerView: 2,
                            },
                            992: {
                                slidesPerView: 3,
                            },
                        }}
                        className="h-[600px]"
                    >
                        {data
                            ?.filter(slide => new Date(slide.end_date) > new Date())
                            .map((slide) => {

                                const title = slide[locale]
                                return (
                                    <SwiperSlide key={slide.id}>
                                        <div className="shadow-xl border-2 rounded-xl bg-white p-2">
                                            <div
                                                className={`rounded-xl overflow-hidden transition-all duration-300`}
                                            >
                                                <Image
                                                    width={900}
                                                    height={900}
                                                    src={fixImageUrl(slide.image.replace(/\\/g, '/'))}
                                                    alt={`Slide ${title}`}
                                                    className="w-full h-72 object-fill"
                                                />
                                                <div className="pt-2">
                                                    <Image
                                                        width={300}
                                                        height={300}
                                                        src={fixImageUrl(slide.logo.replace(/\\/g, '/'))}
                                                        alt={`Slide ${title}`}
                                                        className="w-fit h-14"
                                                    />
                                                </div>
                                                <div className="text-black text-sm md:text-md lg:text-lg pt-4">
                                                    <RichText
                                                        htmlContent={ title.length > 90 ? title.slice(0, 50) + "..." : title}/>
                                                </div>
                                                <div
                                                    className="text-xs md:text-sm opacity-75 pt-4">{new Date(slide.date).toLocaleDateString("tm-TM")}
                                                </div>
                                                <div className="flex justify-end">
                                                    <Link href={`/events/${slide.id}`}>
                                                        <div className="flex items-center space-x-2">
                                                            <div className="main-background-color p-2 rounded-full text-white">
                                                                <MdArrowForwardIos />
                                                            </div>
                                                            <div className="text-sm">{t('read')}</div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                    </Swiper>
                    <div className="w-full flex items-center justify-center gap-4">
                        <div className="max-w-[300px] w-full flex justify-center items-center relative">
                            <button className="swiper-button-prev swiper-button-prev-second p-2 text-blue-600">
                                <ChevronLeft size={44}/>
                            </button>
                            <button
                                className="swiper-button-next swiper-button-next-second p-2 text-blue-600 w-56 h-96">
                                <ChevronRight size={44}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainEvents;