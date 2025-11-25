import React from "react";
import NavigationBackKnob from "../ForBackKnob/NavigationBackKnob";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslations } from "next-intl";

interface Props {
  onFilterChange: (filters: { title: string; date: string; sort: string }) => void;
  type: "news" | "press";
}

const NewsFiltr: React.FC<Props> = ({ onFilterChange, type }) => {
  const t = useTranslations("Header");
  const f = useTranslations("Filter");

  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    const debounce = setTimeout(() => {
      const formattedDate = date ? date.toLocaleDateString("sv-SE") : "";
      onFilterChange({ title, date: formattedDate, sort });
    }, 400);

    return () => clearTimeout(debounce);
  }, [title, date, sort]);

  return (
      <div className="container mx-auto px-4">
        <div className="py-8">
          <h2 className="md:text-4xl text-xl font-bold text-mainBlue flex items-center">
            <NavigationBackKnob /> {t(type)}
          </h2>

          <div className="flex flex-col md:flex-row justify-end gap-y-5 gap-x-5 mt-5 md:mt-10 w-full">

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border outline-none focus:border-mainBlue border-slate-400 rounded-lg w-full py-2 px-4 md:w-2/3 lg:w-1/3"
                type="text"
                placeholder="Search"
            />

            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-slate-400 rounded-lg py-2 px-4 w-full md:w-1/3 lg:w-1/4 focus:border-mainBlue outline-none"
            >
              <option value="default">{f("default")}</option>
              <option value="date_desc">{f("date-desc")}</option>
              <option value="date_asc">{f("date-asc")}</option>
              <option value="title_asc">{f("title-asc")}</option>
              <option value="title_desc">{f("title-desc")}</option>
            </select>
          </div>
        </div>
      </div>
  );
};

export default NewsFiltr;
