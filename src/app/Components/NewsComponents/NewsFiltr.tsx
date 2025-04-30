import React from "react";
import NavigationBackKnob from "../ForBackKnob/NavigationBackKnob";

const NewsFiltr = () => {
  return (
    <div className="container mx-auto ">
      <div className="pt-12 pb-7 md:pb-10 md:pt-32  px-2">
        <h2 className="md:text-4xl text-xl font-bold text-mainBlue flex items-center"> <NavigationBackKnob/> News </h2>

        <div className="grid grid-cols-3 md:grid-cols-5 md:gap-x-5 gap-y-5 gap-x-5 mt-5 md:mt-10 md:px-5">
          <input className="border outline-none focus:border-mainBlue  col-span-full md:col-span-1 border-slate-400 rounded-lg md:py-1 py-2 px-4 md:px-2" type="text" placeholder="Title " />
          <input className="border outline-none focus:border-mainBlue  col-span-full md:col-span-1 border-slate-400 rounded-lg md:py-1 py-2 px-4 md:px-2" type="text" placeholder="Country" />
          <input className="border outline-none focus:border-mainBlue  col-span-2 md:col-span-1 border-slate-400 rounded-lg md:py-1    py-2 px-4 md:px-2" type="text" placeholder="Date" />

          <button className="bg-mainBlue  col-span-1 py-2 w-full md:w-2/3 lg:w-1/2   text-centerds  justify-self-end md:col-start-5 rounded-md text-white text-sm  font-bold">Search</button>
        </div>
      </div>
    </div>
  );
};

export default NewsFiltr;
