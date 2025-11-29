import React from "react";
import { useTranslations } from "next-intl";

const PhilosophyText = () => {
  const t = useTranslations("ourPhilopsophy");
  const f = useTranslations("WhyWe");
  return (
    <div className="container mx-auto px-2">
      <div className="py-12 flex flex-col gap-5">
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold blue-text">{t('title')}</h2>
        <p className="text-sm md:text-md lg:text-lg font-normal leading-5">
          {f('our-philosophy')}
        </p>
      </div>
    </div>
  );
};

export default PhilosophyText;
