'use client';
import NavigationBackKnob from "@/app/Components/ForBackKnob/NavigationBackKnob";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslations } from "next-intl";

interface Props {
  onFilterChange: (f: { title: string; date: string }) => void;
}

const ProjectsFiltr: React.FC<Props> = ({ onFilterChange }) => {
  const t = useTranslations("Header");
  const [title, setTitle] = useState("");
  const [date,  setDate]  = useState<Date | null>(null);

  /* debounce 400 мс */
  useEffect(() => {
    const id = setTimeout(() => {
      const formatted = date ? date.toLocaleDateString("sv-SE") : "";
      onFilterChange({ title, date: formatted });
    }, 400);
    return () => clearTimeout(id);
  }, [title, date]);

  return (
      <div className="container mx-auto">
        <div className="pt-12 pb-7 md:pb-10 md:pt-32 px-2">
          <h2 className="md:text-5xl md:px-5 text-xl font-bold text-mainBlue flex items-center">
            <NavigationBackKnob /> {t("projects")}
          </h2>

          <div className="flex flex-col md:flex-row justify-end gap-5 mt-5 md:mt-10">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border focus:border-mainBlue border-slate-400 rounded-lg w-full py-2 px-4 md:w-2/3 lg:w-1/3"
                type="text"
                placeholder="Search"
            />

            <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
                className="border focus:border-mainBlue w-full border-slate-400 rounded-lg py-2 px-4"
                isClearable
                onKeyDown={(e) => e.preventDefault()} /* блокируем ввод вручную */
            />
          </div>
        </div>
      </div>
  );
};

export default ProjectsFiltr;
