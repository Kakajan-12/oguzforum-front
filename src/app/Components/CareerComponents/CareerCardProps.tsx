"use client";
import useAppLocale from "@/app/Hooks/GetLocale";
import { Career } from "@/app/Intarfaces/intarfaces";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import {useTranslations} from "next-intl";

interface Props {
  event: Career[];
  onSelect?: (vacancyId: number) => void;
}


const CareerCardProps: React.FC<Props> = ({ event, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const ForToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const t = useTranslations("select");
  return (
    <div className="container mx-auto px-2 flex flex-col gap-4 pb-10">
      {event.map((items,  index) => {
        const locale =  useAppLocale()
        const title= items[locale]
        return (
          <div key={items.id} onClick={()=>ForToggle(index)} className="
          cursor-pointer  shadow-sm w-full border flex flex-col  p-3
           max-h-32 min-h-fit sm:max-h-fit justify-between rounded-xl
          shadow-slate-400">
            <div className="flex justify-between w-full items-center  ">
              <p className={`lg:text-2xl md:text-xl sm:text-md transition-all duration-150 text-mainBlue  text-sm  ${activeIndex === index ? 'font-bold' : 'font-normal'} `}>{title}</p>
              <p className="lg:text-xl md:text-md sm:text-sm text-mainBlue opacity-40 font-medium">
                {items.date}
              </p>
            </div>
            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                initial={{opacity: 0 , height: "0px"}}
                animate={{opacity: 1, height: 'auto'}}
                exit={{opacity: 0 , height: '0px'}} 
                transition={{duration: 0.3}}
                 className="overflow-hidden text-mainBlue font-normal flex flex-col ">
                  <p className={`md:px-10 px-2 text-md lg:text-lg ${ 'mt-2'}`}>{title}</p>
                  <div className="w-full flex justify-end">
                    <button
                        className="bg-mainBlue text-white py-2 px-4 rounded-md w-fit"
                        onClick={(e) => {
                          e.stopPropagation(); // чтобы не триггерить раскрытие снова
                          onSelect?.(items.id); // вызвать колбэк, если передан
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
