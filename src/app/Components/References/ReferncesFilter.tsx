'use client'
import React, {useEffect, useState} from "react";
import NavigationBackKnob from "../ForBackKnob/NavigationBackKnob";
import "react-datepicker/dist/react-datepicker.css";


interface Props {
    onFilterChange: (filters: { name: string; sort: string }) => void;
}

const ReferencesFilter: React.FC<Props> = ({onFilterChange}) => {
    const [title, setTitle] = useState("");
    const [sort, setSort] = useState("default");
    useEffect(() => {
        const debounce = setTimeout(() => {
            onFilterChange({
                name: title,   // ← ДОЛЖНО БЫТЬ title
                sort: sort     // ← OK
            });
        }, 300);

        return () => clearTimeout(debounce);
    }, [title, sort]);

    return (
        <div className="container mx-auto px-4">
            <div className="pt-8 pb-7">
                <div className="flex items-center">
                    <NavigationBackKnob/>

                    <div className="flex flex-col-reverse md:flex-row justify-between gap-y-5 gap-x-5 w-full">
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="border border-slate-400 rounded-lg p-2 w-full md:w-1/4"
                        >
                            <option value="default">{"Default"}</option>
                            <option value="date_desc">{"By date (new → old)"}</option>
                            <option value="date_asc">{"By date (old → new)"}</option>
                            <option value="title_asc">{"By name (A → Z)"}</option>
                            <option value="title_desc">{"By name (Z → A)"}</option>
                        </select>

                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-slate-400 rounded-lg p-2 w-full md:w-2/3"
                            type="text"
                            placeholder={"Search"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferencesFilter;
