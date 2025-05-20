'use client'; // Добавлено для клиентского рендеринга
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import Image from "next/image";
import './EventsMain.css';
import { useTranslations } from 'next-intl';
import { useGetUpcomingQuery } from '@/app/Apis/api';
import useAppLocale from '@/app/Hooks/GetLocale';
import RichText from '@/app/Hooks/Richtext';
import Link from 'next/link';
import {BASE_API_URL} from "@/constant";

const MainEvents = () => {
    const {data, error, isLoading}   = useGetUpcomingQuery()
    const locale =  useAppLocale()
    
    const t = useTranslations("UpComingPage")
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
        <div className="container mx-auto px-2">
            <div className="flex flex-col items-center justify-center py-40">
                <div className="title-color font-bold text-3xl md:text-6xl">{t("upmain")}</div>
                <div className="relative w-full mx-auto event-slider">
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
                                slidesPerView: 1, // Для экранов меньше 640px
                            },
                            500: {
                                slidesPerView: 3, // Для экранов меньше 640px
                            },
                            1300: {
                                slidesPerView: 5, // Для экранов 1280px и шире
                            },
                        }}
                        className="py-8"
                        style={{ height: "600px" }}
                    >
                        {data?.map((slide) => {
                            const location = slide[`location_${locale}`]
                            const text = slide[locale]
                            return(
                                    <SwiperSlide key={slide.id}>
                                        {({ isActive }) => (
                                           <Link href={`/upcoming/${slide.id}`}>
                                             <div className={`relative rounded-3xl overflow-hidden transition-all duration-300 h-96  top-20
                            ${isActive ? 'scale-125 relative right-20 active-slide shadow-2xl xl:w-auto xl:right-0 opacity-100 !z-10' : 'opacity-50'}`}
                                            >
                                                <Image
                                                    width={600}
                                                    height={800}
                                                    src={fixImageUrl(slide.image.replace(/\\/g, '/'))}
                                                    alt={`Slide ${text}`}
                                                    className="w-full h-full object-cover scale-125"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                <div className={`absolute bottom-2 left-2 right-2 p-1 sm:p-2 md:p-3 text-white backdrop-blur-md
                              ${isActive ? 'bg-white/30' : 'opacity-50'}`} style={{ borderRadius: "15px" }}>
                                                    <div className="text-center">
                                                        <span className="opacity-90 text-sm md:text-md"><RichText
                                                            htmlContent={text}/></span>
                                                        <span className="font-semibold text-sm md:text-md"> <RichText
                                                            htmlContent={location}/></span>
                                                    </div>
                                                    <div className="text-xs md:text-sm opacity-75 text-center">{slide.date}</div>
                                                </div>
                                            </div>
                                           </Link>
                                        )}
                                    </SwiperSlide>
                            )
                        })}
                    </Swiper>

                    <div className="relative w-full flex items-center justify-center gap-4">
                        <div className="max-w-[300px] w-full flex justify-center items-center relative">
                            <button className="swiper-button-prev swiper-button-prev-second p-2 text-blue-600">
                                <ChevronLeft size={44}/>
                            </button>
                            <button className="swiper-button-next swiper-button-next-second p-2 text-blue-600 w-56 h-96">
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