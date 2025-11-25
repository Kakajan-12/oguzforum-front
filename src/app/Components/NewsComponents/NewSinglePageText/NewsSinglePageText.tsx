import React from "react";
import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import { InsideNews } from "@/app/Intarfaces/SinglePageInterface";
interface Props {
  news: InsideNews;
}
const NewsSinglePageText: React.FC<Props> = ({ news }) => {
  const locale = useAppLocale();
  const text = news[`text_${locale}`];

  return (
    <div className="container mx-auto px-4">
      <div className="space-y-2 py-4">
          <p className="text-sm md:text-md lg:text-lg font-semibold text-mainBlue opacity-35">
            {new Date(news.date).toLocaleDateString("tm-TM")}
          </p>

        <div className="mt-5 leading-6 text-sm md:text-md lg:text-lg xl:text-xl text-mainBlue">
          <RichText htmlContent={text} />
        </div>
      </div>
    </div>
  );
};

export default NewsSinglePageText;
