"use client";

import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import { Faq } from "@/app/Intarfaces/intarfaces";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import NavigationBackKnob from "../ForBackKnob/NavigationBackKnob";
import { useTranslations } from "next-intl";

interface Props {
    event: Faq[];
    activeId?: number | null; // добавили
}

const QuesTionsAndAnswers: React.FC<Props> = ({ event, activeId }) => {
    const t = useTranslations("BackText");
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const locale = useAppLocale();

    useEffect(() => {
        if (activeId !== undefined && activeId !== null) {
            const index = event.findIndex((item) => item.id === activeId);
            if (index !== -1) {
                setActiveIndex(index);

                setTimeout(() => {
                    const el = document.getElementById(`faq-${activeId}`);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        const offset = window.scrollY + rect.top - 200;
                        window.scrollTo({
                            top: offset,
                            behavior: "smooth",
                        });
                    }
                }, 100);

            }
        }
    }, [activeId, event]);


    return (
        <div className="container mx-auto py-20">
            <div className="pb-7 md:pb-10 flex px-2">
                <NavigationBackKnob />
                <h2 className="md:text-4xl text-xl font-extrabold text-mainBlue">
                    {t("faq")}
                </h2>
            </div>

            <div className="lg:px-40 md:px-32 px-10 flex flex-col gap-5 sm:gap-7">
                {event.map((items, index) => {
                    const title = items[locale];
                    const text = items[`text_${locale}`];

                    return (
                        <div
                            id={`faq-${items.id}`} // важный id
                            className="text-mainBlue flex flex-col pb-5 border-b-2"
                            key={items.id}
                        >
                            <div
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="flex justify-between items-center cursor-pointer"
                            >
                                <div
                                    className={`md:text-2xl text-sm flex ${
                                        activeIndex === index ? "font-semibold scale-110" : ""
                                    } transition-all duration-150`}
                                >
                                    <RichText htmlContent={title} />?
                                </div>
                                <Image
                                    width={200}
                                    height={100}
                                    className={`w-2 sm:w-3 ${
                                        activeIndex === index ? "rotate-180" : "rotate-0"
                                    } transition-all duration-200`}
                                    alt="test"
                                    src="/AccordionUpKnob.png"
                                />
                            </div>

                            <AnimatePresence initial={false}>
                                {activeIndex === index && (
                                    <motion.span
                                        initial={{ opacity: 0, height: "0px", overflow: "hidden" }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: "0px" }}
                                        transition={{ duration: 0.4 }}
                                        className="md:text-xl text-xs"
                                    >
                                        <div className="md:py-10 py-5 leading-5 md:leading-8 px-5 sm:px-10">
                                            <RichText htmlContent={text} />
                                        </div>
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QuesTionsAndAnswers;
