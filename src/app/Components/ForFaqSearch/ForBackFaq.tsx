"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import search from "../../../../public/Search_alt_light (1).png";
import { useTranslations } from "next-intl";
import useAppLocale from "@/app/Hooks/GetLocale";
import { Faq } from "@/app/Intarfaces/intarfaces";

interface ForFaqProps {
  faqData: Faq[];
  onQuestionClick: (id: number) => void;
}

const ForFaq: React.FC<ForFaqProps> = ({ faqData, onQuestionClick }) => {
  const t = useTranslations("BackText");
  const s = useTranslations("searchPanel");
  const [visible, setVisible] = useState(false);
  const forEl = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const [filteredFaq, setFilteredFaq] = useState<Faq[]>([]);
  const locale = useAppLocale();

  const forToggleVisible = (event: MouseEvent) => {
    if (forEl.current && !forEl.current.contains(event.target as Node)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", forToggleVisible);
    return () => {
      document.removeEventListener("click", forToggleVisible);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);

    if (value.trim().length > 0) {
      const filtered = faqData.filter((item) =>
          item[locale]?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFaq(filtered);
      setVisible(true);
    } else {
      setFilteredFaq([]);
    }
  };

  const handleSuggestionClick = (id: number) => {
    setText("");
    setVisible(false);
    onQuestionClick(id); // Scroll and expand
  };

  return (
      <div className="w-full h-screen relative">
        <Image
            src="/News.png"
            alt="background"
            width={800}
            height={800}
            objectFit="cover"
            className="w-full h-full object-cover"
        />
        <div className="flex justify-center gap-10 flex-col items-center h-full w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-white text-center text-3xl md:text-6xl font-bold md:max-w-[900px] px-5">
            {t("faq")}
          </div>
          <div ref={forEl} className="relative flex bg-transparent max-w-[700px] px-2 md:px-10 w-full">
            <input
                onChange={handleChange}
                value={text}
                type="text"
                placeholder={`${s("search")}...`}
                className={`${
                    visible ? "pl-5" : "pl-12"
                } text-white text-lg py-3 backdrop-blur-[45px] outline-none border-none rounded-3xl p-2 bg-transparent w-full`}
                onClick={() => setVisible(true)}
            />
            {!visible && (
                <span className="absolute w-8 left-12 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Image className="w-full h-full" src={search} alt="search icon" />
            </span>
            )}

            {visible && filteredFaq.length > 0 && (
                <div
                    className="fixed left-1/2 top-[calc(100%-340px)] transform -translate-x-1/2 mt-2 max-w-[90%] md:max-w-[620px] w-full bg-white/10 backdrop-blur-md rounded-xl shadow-lg z-50 max-h-60 overflow-auto"
                >
                  {filteredFaq.map((item) => (
                      <div
                          key={item.id}
                          className="px-5 py-3 text-white hover:bg-mainBlue cursor-pointer"
                          onClick={() => handleSuggestionClick(item.id)}
                      >
                        {item[locale]}
                      </div>
                  ))}
                </div>
            )}

          </div>
        </div>
      </div>
  );
};

export default ForFaq;
