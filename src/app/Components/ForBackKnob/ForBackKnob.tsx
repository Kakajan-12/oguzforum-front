"use client";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import UpKnob from "../../../../public/UpKnob.png";
const ForBackKnob = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 800);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  return (
    <AnimatePresence initial={false}>
      {isScrolled && (
        <motion.button
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: [0, -50, 0] }}
          exit={{ opacity: 0, y: 100 }}
          onClick={scrollToTop}
          transition={{
            duration: 0.5, 
            ease: "easeInOut",
          }}
          className="fixed  sm:block bottom-20 md:bottom-32  md:right-10 right-10 z-50 rounded-full bg-mainBlue border-[1px] border-white text-white p-4 md:p-4"
        >
          <Image className="md:w-2.5 w-3" alt="up" src={UpKnob} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ForBackKnob;
