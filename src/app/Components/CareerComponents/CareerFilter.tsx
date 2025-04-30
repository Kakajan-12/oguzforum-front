"use client";
import React, { useState } from "react";
import NavigationBackKnob from "../ForBackKnob/NavigationBackKnob";
import { usePathname, useRouter } from "next/navigation";

const CareerFilter = () => {
  const [toggle, setToggle] = useState(true);
  const router = useRouter();
  const toggleFunction = (e : any) => {
    const forCheking  =  e.target.value
    
    if(forCheking === 'apply-job'){
      setToggle(true)
      router.push('/career/apply-job')
    }else{
      router.push('/career/vacancies')
      setToggle(false)
    }
  };

  return (
    <div className="container mx-auto ">
      <div className="pt-12 pb-7 md:pb-10 md:pt-32 flex items-center justify-between md:justify-start md:gap-20   md:px-7 px-2 gap-7">
        <h2 className="md:text-4xl text-xl font-extrabold text-mainBlue flex items-center">
          <NavigationBackKnob />
          CAREERS
        </h2>
        <div className="flex  flex-col  min-[340px]:flex-row  border-[1px]  border-slate-400 relative rounded-lg">
          <button
            value='vacancies'
            className={`md:px-7 md:py-2.5 py-[10px] px-3 text-[10px] w-full md:text-lg font-semibold rounded-lg ${
              !toggle
              ? "bg-mainBlue  text-white"
              : "text-mainBlue text-opacity-30"
            }`}
            onClick={toggleFunction}
            >
            Vacancies
          </button>
          <button
            value='apply'
            className={`md:px-7 md:py-2.5 py-[10px] px-3 whitespace-nowrap text-[10px] w-full md:text-lg font-semibold  rounded-lg ${
              toggle
                ? "bg-mainBlue text-white"
                : "text-mainBlue text-opacity-30"
            }`}
            onClick={toggleFunction}
          >
            Apply for job
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerFilter;
