import React from "react";
import NavigationBackKnob from "../../ForBackKnob/NavigationBackKnob";


const WhoText = () => {
  return (
    <div className="container mx-auto px-2">
      <div className="pt-12 flex flex-col gap-5">
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold flex items-center blue-text"> <NavigationBackKnob/>{"WHY YOU SHOULD CHOOSE US"}</h2>
        <p className="text-sm md:text-md lg:text-lg font-normal leading-5">
          {"We understand that every project is unique, which is why we provide a tailored approach to each client. Our team combines extensive experience in event management with modern digital solutions, enabling us to deliver projects of any scale at the highest level. We ensure full support — from concept to execution — minimizing risks and maximizing impact for your business. Partnering with us means professionalism, reliability, and innovation at every step."}
        </p>
      </div>
    </div>
  );
};

export default WhoText;
