import React from "react";
import NavigationBackKnob from "../../ForBackKnob/NavigationBackKnob";
import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import { InsideNews } from "@/app/Intarfaces/SinglePageInterface";
interface Props {
  event: InsideNews;
}
const NewsSinglePageText: React.FC<Props> = ({ event }) => {
  const locale = useAppLocale();
  const tittle = event[locale];
  const text = event[`text_${locale}`];

  return (
    <div className="container mx-auto ">
      <div className="py-12 md:py-32    px-5">
        <h2 className="md:text-4xl flex items-centers text-xl font-bold text-mainBlue">
          <NavigationBackKnob />
          <RichText htmlContent={tittle} />
        </h2>

        <div className=" mt-5  ">
          <p className="text-mainBlue opacity-35 md:text-xl text-sm font-semibold">
            {new Date(event.date).toLocaleDateString("tm-TM")}
          </p>
        </div>

        <div className="mt-5 leading-6 md:leading-8 text-sm md:text-xl text-mainBlue">
          <RichText htmlContent={text} />
        </div>
      </div>
    </div>
  );
};

export default NewsSinglePageText;
