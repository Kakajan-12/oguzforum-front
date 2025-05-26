'use client'

import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import {Projects} from "@/app/Intarfaces/intarfaces";
import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import {BASE_API_URL} from "@/constant";
import Pagination from "@mui/material/Pagination";
import LocationPinIcon from "@mui/icons-material/LocationPin";

interface Props {
    event: Projects[];
    itemsPerPage?: number;
}

const fixImageUrl = (url: string): string => {
    if (!url) return "/default-image.png";
    const normalizedUrl = url.replace(/\\/g, '/');
    if (normalizedUrl.startsWith('http') || normalizedUrl.startsWith('/')) {
        return normalizedUrl;
    }
    return `${BASE_API_URL.slice(0, -3)}${normalizedUrl}`;
};

const ProjectsCardProps: React.FC<Props> = ({event, itemsPerPage = 6}) => {
    const locale = useAppLocale();
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(event.length / itemsPerPage);

    const handleChange = (_: any, value: number) => {
        setPage(value);
    };

    const currentData = event.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    return (
        <div className="container mx-auto px-2">
            <div className="pb-10 md:pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {currentData.map((items) => {
                        const tittle = items[locale];
                        return (
                            <Link href={`/projects/${items.id}`} key={items.id}>
                                <div className="relative shadow-2xl h-80 md:h-96 rounded-xl">
                                    <Image
                                        src={fixImageUrl(items.image)}
                                        alt={`${items.image}`}
                                        width={800}
                                        height={600}
                                        quality={90}
                                        className="rounded-xl object-center object-cover h-full"
                                    />
                                    <div
                                        className="absolute bottom-0 right-0 left-0 bg-white rounded-xl p-4 h-40 space-y-2">
                                        <div className="flex items-center divide-x-2 space-x-2">
                                            <div className="card-details text-xs">
                                                {items.date ? new Date(items.date).toISOString().split("T")[0] : ""}
                                            </div>
                                            <div className="pl-2 card-details text-xs"><LocationPinIcon
                                                className="text-gray-500 mr-2 mb-1 card-details"
                                                style={{width: "15px", height: "15px"}}/>{items[`location_${locale}`]}
                                            </div>
                                        </div>
                                        <div className="md:text-lg text-md text-mainBlue font-semibold">
                                            <RichText
                                                htmlContent={tittle.length > 100 ? tittle.slice(0, 100) + '...' : tittle}/>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                {/* Пагинация */}
                <div className="flex justify-center pt-4">
                    <Pagination
                        count={totalPages} // Общее количество страниц
                        page={page} // Текущая страница
                        onChange={handleChange} // Обработчик изменения страницы
                        variant="outlined"
                        shape="rounded"
                        siblingCount={1}
                        size="medium"
                        sx={{
                            "& .MuiPaginationItem-root.Mui-selected": {
                                backgroundColor: "#002A5F",
                                color: "white",
                                scale: "1.1",
                            },
                            "& .MuiPaginationItem-root": {
                                color: "white",
                                backgroundColor: "#002A5F66",
                                padding: "8px",
                                margin: "2px",
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectsCardProps;
