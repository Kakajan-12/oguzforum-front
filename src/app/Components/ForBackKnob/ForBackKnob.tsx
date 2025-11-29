"use client";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

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
          className="fixed bottom-28 right-4 z-50 rounded-full bg-mainBlue border-[1px] border-white text-white p-4"
        >
          <IoIosArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ForBackKnob;
