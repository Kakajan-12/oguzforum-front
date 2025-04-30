import React from "react";
import NavigationBackKnob from "../ForBackKnob/NavigationBackKnob";

const ServicesName = () => {
  return (
    <div className="container mx-auto ">
      <div className="pt-12 pb-7 md:pb-10 md:pt-32  px-2">
        <h2 className="md:text-4xl flex items-center text-xl font-bold text-mainBlue">
          <NavigationBackKnob/>
          Services
        </h2>
      </div>
    </div>
  );
};

export default ServicesName;
