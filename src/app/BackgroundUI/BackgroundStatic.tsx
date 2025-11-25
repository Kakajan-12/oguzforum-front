
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface Props {
  src: string;
  name: string;
}
const BackgroundUi: React.FC<Props> = ({ src, name }) => {
  const t = useTranslations("BackText");

  return (
    <div className="w-full h-screen">
      <Image
        src={`/${src}`}
        alt={`${src}`}
        width={1920}
        height={1080}
        quality={90}
        objectFit="cover"
        className="w-full h-full object-cover"
      />
      <div className="flex justify-center items-center h-full w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-white text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold md:max-w-[900px] px-5">
          {t(`${name}`)}
        </div>
      </div>
    </div>
  );
};

export default BackgroundUi;
