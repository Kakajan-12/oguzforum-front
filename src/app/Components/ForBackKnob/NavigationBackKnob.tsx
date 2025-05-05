"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const NavigationBackKnob = () => {
  const navigate = useRouter();
  return (
    <button
      onClick={() => navigate.back()}
      className=" rotate-90 mr-5 text-white "
    >
      <MdOutlineKeyboardArrowLeft
        className="md:w-10 md:h-10 w-5 h-4 -rotate-90 text-mainBlue"
      />
    </button>
  );
};

export default NavigationBackKnob;
