'use client';
import NavigationBackKnob from "@/app/Components/ForBackKnob/NavigationBackKnob";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslations } from "next-intl";

interface Props {
  onFilterChange: (filters: { title: string; sort: string }) => void;
}

const ProjectsFiltr: React.FC<Props> = ({ onFilterChange }) => {
  const t = useTranslations("Header");
  const s = useTranslations("searchPanel");
  const f = useTranslations("Filter");
  const [title, setTitle] = useState("");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    const debounce = setTimeout(() => {
      onFilterChange({ title, sort });
    }, 400);
    return () => clearTimeout(debounce);
  }, [title, sort]);

  return (
      <div className="container mx-auto px-4">
        <div className="py-8">
          <h2 className="md:text-4xl text-xl font-bold text-mainBlue flex items-center">
            <NavigationBackKnob/> {t("projects")}
          </h2>

          <div
              className="flex flex-col-reverse md:flex-row justify-between gap-y-5 gap-x-5 mt-5 md:mt-10 w-full">
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-slate-400 rounded-lg py-2 px-4 w-full md:w-1/4 focus:border-mainBlue outline-none"
            >
              <option value="default">{f("default")}</option>
              <option value="date_desc">{f("date-desc")}</option>
              <option value="date_asc">{f("date-asc")}</option>
              <option value="title_asc">{f("title-asc")}</option>
              <option value="title_desc">{f("title-desc")}</option>
            </select>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border outline-none focus:border-mainBlue border-slate-400 rounded-lg py-2 px-4 w-full md:w-2/3"
                type="text"
                placeholder={`${s("search")}`}
            />
          </div>
        </div>
      </div>
  );
};

export default ProjectsFiltr;
