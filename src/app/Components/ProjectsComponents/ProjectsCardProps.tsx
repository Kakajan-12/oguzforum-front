'use client'

import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import {Projects} from "@/app/Intarfaces/intarfaces";
import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import {BASE_API_URL} from "@/constant";
import Pagination from "@mui/material/Pagination";
import LocationPinIcon from "@mui/icons-material/LocationPin"; // Импортируем Pagination

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
    const [page, setPage] = useState(1); // Состояние для текущей страницы
    const totalPages = Math.ceil(event.length / itemsPerPage); // Рассчитываем общее количество страниц

    // Обработчик изменения страницы
    const handleChange = (_: any, value: number) => {
        setPage(value);
    };

    // Получаем проекты только для текущей страницы
    const currentData = event.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    return (
        <div className="container mx-auto px-2">
            <div className="pb-10 md:pb-10">
                <div className="grid grid-cols-1 gap-7 min-[500px]:grid-cols-2 lg:grid-cols-3 md:gap-x-14 md:gap-y-10">
                    {currentData.map((items) => {
                        const tittle = items[locale];
                        return (
                            <Link href={`/projects/${items.id}`} key={items.id}>
                                <div className="relative shadow-2xl h-80 rounded-xl">
                                    <Image
                                        src={fixImageUrl(items.image)}
                                        alt={`${items.image}`}
                                        width={800} // Задайте подходящее разрешение
                                        height={600} // Задайте подходящее разрешение
                                        layout="responsive" // Делаем изображение адаптивным
                                        quality={90} // Устанавливаем качество изображения
                                        className="rounded-xl"
                                    />
                                    <div
                                        className="absolute bottom-0 right-0 left-0 bg-white rounded-xl px-6 py-4 h-32 space-y-2">
                                        <div className="flex items-center divide-x-2 space-x-2">
                                            <div className="card-details">
                                                {items.date ? new Date(items.date).toISOString().split("T")[0] : ""}
                                            </div>
                                            <div className="pl-2 card-details"><LocationPinIcon
                                                className="text-gray-500 mr-2 mb-1 card-details"
                                                style={{width: "15px", height: "15px"}}/>{items[`location_${locale}`]}
                                            </div>
                                        </div>
                                        <div className="md:text-2xl text-lg">
                                            <RichText htmlContent={tittle}/>
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
