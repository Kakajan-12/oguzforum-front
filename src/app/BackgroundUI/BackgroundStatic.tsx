

import Image from "next/image";
import React from "react";

const BACK_LABELS: Record<string, string> = {
  career: "Career",
  weare: "Who We Are",
  upcoming: "Upcoming events",
  references: "References Letter",
  projects: "Projects",
  news: "News",
  contacts: "Contacts",
  cookie: "Cookie Terms",
  privacy: "Privacy Policy",
  faq: "FAQ",
  press: "Press",
};

interface Props {
  src: string;
  name: string;
}
const BackgroundUi: React.FC<Props> = ({ src, name }) => {
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
          {BACK_LABELS[name] ?? name}
        </div>
      </div>
    </div>
  );
};

export default BackgroundUi;
