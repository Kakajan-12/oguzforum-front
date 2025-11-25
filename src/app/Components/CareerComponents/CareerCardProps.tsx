"use client";
import useAppLocale from "@/app/Hooks/GetLocale";
import {Career} from "@/app/Intarfaces/intarfaces";
import {AnimatePresence, motion} from "motion/react";
import React, {useState} from "react";
import {useTranslations} from "next-intl";

interface Props {
    event: Career[];
    onSelect?: (vacancyId: number) => void;
}


const CareerCardProps: React.FC<Props> = ({event, onSelect}) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const ForToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const t = useTranslations("select");
    return (
        <div className="container mx-auto px-4 space-y-2 mb-4">
            {event.map((items, index) => {
                const locale = useAppLocale()
                const title = items[locale]
                return (
                    <div key={items.id} onClick={() => ForToggle(index)} className="
          cursor-pointer shadow-sm w-full border flex flex-col p-2
           max-h-32 min-h-fit sm:max-h-fit justify-between rounded-xl
          shadow-slate-400 py-4">
                        <div className="flex justify-between w-full items-center px-3">
                            <p className={`text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl transition-all duration-150 text-mainBlue ${activeIndex === index ? 'font-bold' : 'font-normal'} `}>{title}</p>
                            <p className="text-xs sm:text-sm lg-text-md text-mainBlue opacity-40 font-medium">
                                {items.date}
                            </p>
                        </div>
                        <AnimatePresence initial={false}>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{opacity: 0, height: "0px"}}
                                    animate={{opacity: 1, height: 'auto'}}
                                    exit={{opacity: 0, height: '0px'}}
                                    transition={{duration: 0.3}}
                                    className="overflow-hidden text-mainBlue font-normal flex flex-col">
                                    <p className={`px-8 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl ${'mt-2'}`}>{title}</p>
                                    <div className="w-full flex justify-end">
                                        <button
                                            className="text-xs sm:text-sm md:text-md bg-mainBlue text-white py-1 px-2 md:py-2 md:px-4 rounded-md w-fit"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSelect?.(items.id);
                                            }}
                                        >
                                            {t('select')}
                                        </button>

                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
};

export default CareerCardProps;
