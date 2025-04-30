"use client";
import React, { useState } from "react";
import { arrayQuestions } from "../UpComingComponents/productsProjects";
import { div } from "motion/react-client";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import NavigationBackKnob from "../ForBackKnob/NavigationBackKnob";

const QuesTionsAndAnswers = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const ForToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="container mx-auto  py-20">
      <div className=" pb-7 md:pb-10 flex    px-2">
        <NavigationBackKnob />
        <h2 className="md:text-4xl text-xl font-extrabold text-mainBlue">
          FAQ
        </h2>
      </div>

      <div className="lg:px-40 md:px-32 px-10 flex flex-col gap-5 sm:gap-7">
        {arrayQuestions.map((items, index) => {
          return (
            <div className="text-mainBlue flex flex-col  max-w-[685px] pb-5  border-b-[1px]">
              <div
                onClick={() => ForToggle(index)}
                className="flex justify-between items-center  cursor-pointer "
              >
                <p className={`md:text-2xl text-sm  ${activeIndex === index ? "font-semibold scale-110" : ""} transition-all duration-150`}> {items.question}? </p>
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
                    <p className="md:py-10 py-5 leading-5 md:leading-8 px-5 sm:px-10 ">{items.answer}</p>
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
