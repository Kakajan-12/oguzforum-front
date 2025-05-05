"use client";
import useAppLocale from "@/app/Hooks/GetLocale";
import { Career } from "@/app/Intarfaces/intarfaces";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";


interface Props {
  event: Career[];
}

const CareerCardProps: React.FC<Props> = ({ event }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const ForToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
    
  };
  return (
    <div className="container mx-auto md:px-20 md:py-20 md:pb-32 py-10 pb-20  flex flex-col md:gap-10 gap-5   px-2">
      {event.map((items,  index) => {
        const locale =  useAppLocale()
        const title= items[locale]
        return (
          <div key={items.id} onClick={()=>ForToggle(index)} className="
          cursor-pointer  shadow-sm w-full border flex flex-col  py-3 px-3
           max-h-32 min-h-fit sm:max-h-fit   md:py-7 md:pl-6 md:pr-10 justify-between  rounded-2xl
          shadow-slate-400">
            <div className="flex justify-between w-full items-center  ">
              <p className={`lg:text-2xl md:text-xl sm:text-sm transition-all duration-150 text-mainBlue  text-sm  ${activeIndex === index ? 'font-bold' : 'font-normal'} `}>{title}</p>
              <p className="lg:text-xl md:text-sm text-[10px] sm:text-xs text-mainBlue opacity-40 font-medium">
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
                 className="  overflow-hidden text-mainBlue  font-normal flex flex-col ">
                  <p className={`md:px-10 px-2 text-[12px] lg:text-lg  md:text-sm ${ 'mt-5'}`}>{title}</p>
                  <div className="w-full flex justify-end">
                    <button className="bg-mainBlue text-white py-2 px-4 rounded-md w-fit">Explore</button>
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
