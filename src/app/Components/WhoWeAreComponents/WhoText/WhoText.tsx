import React from "react";
import NavigationBackKnob from "../../ForBackKnob/NavigationBackKnob";
import { useTranslations } from "next-intl";

const WhoText = () => {
  const t = useTranslations("WhyWe");
  return (
    <div className="container mx-auto px-2">
      <div className="pt-12 flex flex-col gap-5">
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold flex items-center blue-text"> <NavigationBackKnob/>{t('whymain')}</h2>
        <p className="text-sm md:text-md lg:text-lg font-normal leading-5">
          {t('we-are')}
        </p>
      </div>
    </div>
  );
};

export default WhoText;
