"use client";

import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import { Faq } from "@/app/Intarfaces/intarfaces";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import NavigationBackKnob from "../ForBackKnob/NavigationBackKnob";
import { useTranslations } from "next-intl";
import searchIcon from "../../../../public/Search_alt_light (1).png";

interface Props {
    event: Faq[];
    activeId?: number | null;
}

const QuesTionsAndAnswers: React.FC<Props> = ({ event, activeId }) => {
    const t = useTranslations("BackText");
    const s = useTranslations("searchPanel");
    const locale = useAppLocale();

    const [visible, setVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [text, setText] = useState("");
    const [filteredFaq, setFilteredFaq] = useState<Faq[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setVisible(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

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
                        window.scrollTo({ top: offset, behavior: "smooth" });
                    }
                }, 100);
            }
        }
    }, [activeId, event]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setText(value);

        if (value.trim().length > 0) {
            const filtered = event.filter((item) =>
                item[locale]?.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredFaq(filtered);
            setVisible(true);
        } else {
            setFilteredFaq([]);
            setVisible(false);
        }
    };

    const handleSuggestionClick = (id: number) => {
        const index = event.findIndex((item) => item.id === id);
        if (index !== -1) setActiveIndex(index);
        setText("");
        setVisible(false);

        const el = document.getElementById(`faq-${id}`);
        if (el) {
            const rect = el.getBoundingClientRect();
            const offset = window.scrollY + rect.top - 200;
            window.scrollTo({ top: offset, behavior: "smooth" });
        }
    };

    const highlightText = (str: string, query: string) => {
        if (!query) return str;
        const regex = new RegExp(`(${query})`, "gi");
        const parts = str.split(regex);
        return parts.map((part, i) =>
            regex.test(part) ? (
                <span key={i} className="bg-yellow-300 text-black rounded-sm px-0.5">{part}</span>
            ) : (
                part
            )
        );
    };

    return (
        <div className="container mx-auto px-4">
            <div className="py-6 flex items-center">
                <NavigationBackKnob />
                <h2 className="md:text-4xl text-xl font-extrabold text-mainBlue">{t("faq")}</h2>
            </div>

            <div ref={containerRef} className="relative border border-[#002A5F] rounded-md">
                <input
                    onChange={handleChange}
                    value={text}
                    type="text"
                    placeholder={`${s("search")}...`}
                    className={`text-[#002A5F] text-xl py-3 pl-10 pr-4 outline-none border-none bg-transparent w-full`}
                    onClick={() => setVisible(true)}
                />
                <span className="absolute w-8 left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Image src={searchIcon} alt="search icon" className="w-full h-full" />
        </span>

                <AnimatePresence>
                    {visible && filteredFaq.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full mt-2 max-w-full w-full rounded-xl shadow-lg z-50 max-h-60 overflow-auto bg-mainBlue"
                        >
                            {filteredFaq.map((item) => (
                                <div
                                    key={item.id}
                                    className="px-5 py-3 text-white hover:bg-white hover:text-[#002A5F] cursor-pointer"
                                    onClick={() => handleSuggestionClick(item.id)}
                                >
                                    {highlightText(item[locale] || "", text)}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex flex-col gap-4 py-8 space-y-2">
                {event.map((item, index) => {
                    const title = item[locale];
                    const content = item[`text_${locale}`];

                    return (
                        <div
                            id={`faq-${item.id}`}
                            className="text-mainBlue flex flex-col border-2 p-4 rounded-md"
                            key={item.id}
                        >
                            <div
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="flex justify-between items-center cursor-pointer"
                            >
                                <div
                                    className={`md:text-2xl text-sm flex ${
                                        activeIndex === index ? "font-semibold" : ""
                                    } transition-all duration-150`}
                                >
                                    <RichText htmlContent={title} />?
                                </div>
                                <Image
                                    width={200}
                                    height={100}
                                    className={`w-2 sm:w-3 ${activeIndex === index ? "rotate-180" : "rotate-0"} transition-all duration-200`}
                                    alt="toggle"
                                    src="/AccordionUpKnob.png"
                                />
                            </div>

                            <AnimatePresence initial={false}>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="md:text-xl text-xs"
                                    >
                                        <div className="py-2">
                                            <RichText htmlContent={content} />
                                        </div>
                                    </motion.div>
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
