'use client'
import NavigationBackKnob from "@/app/Components/ForBackKnob/NavigationBackKnob";
import { useEffect, useState } from "react";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useTranslations} from "next-intl";

interface Props {
  onFilterChange: (filters: { title: string; date: string }) => void;
}

const ProjectsFiltr: React.FC<Props> = ({ onFilterChange }) => {
  const t = useTranslations("Header")
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    const debounce = setTimeout(() => {
      const formattedDate = date ? date.toLocaleDateString("sv-SE") : "";
      onFilterChange({ title, date: formattedDate });
    }, 400);
    return () => clearTimeout(debounce);
  }, [title, date]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
  };

  return (
      <div className="container mx-auto">
        <div className="pt-12 pb-7 md:pb-10 md:pt-32 px-2">
          <h2 className="md:text-5xl md:px-5 text-xl font-bold text-mainBlue flex items-center">
            <NavigationBackKnob /> {t("projects")}
          </h2>

          <div className="flex flex-col md:flex-row justify-end gap-y-5 gap-x-5 mt-5 md:mt-10 md:px-0 w-full">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border outline-none focus:border-mainBlue col-span-full md:col-span-1 border-slate-400 rounded-lg w-full py-2 px-4 md:w-2/3 lg:w-1/3"
                type="text"
                placeholder="Search"
            />
            <div className="col-span-full md:col-span-1">
              <DatePicker
                  selected={date}
                  onChange={(date: Date | null) => setDate(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                  className="border outline-none focus:border-mainBlue w-full border-slate-400 rounded-lg py-2 px-4"
                  isClearable
                  onKeyDown={handleKeyDown} // Блокирует ввод с клавиатуры
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProjectsFiltr;
