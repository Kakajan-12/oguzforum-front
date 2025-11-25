"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

const NavigationBackKnob = () => {
  const navigate = useRouter();
  return (
    <button
      onClick={() => navigate.back()}
      className="hidden md:block"
    >
      <MdKeyboardArrowLeft
          size={35}
        className="blue-text"
      />
    </button>
  );
};

export default NavigationBackKnob;
