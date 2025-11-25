import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import {News} from "@/app/Intarfaces/intarfaces";
import Image from "next/image";
import React, {useState} from "react";
import {BASE_API_URL} from "@/constant";
import Pagination from "@mui/material/Pagination";
import {useTranslations} from "next-intl";
import Link from "next/link";

interface Props {
    news: News[];
    itemsPerPage?: number;
    type: "news" | "press";
}

const NewsCardProps: React.FC<Props> = ({news, itemsPerPage = 10, type}) => {
    const t = useTranslations("upcoming")
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(news.length / itemsPerPage);

    const handleChange = (_: any, value: number) => {
        setPage(value);
    };

    const truncateText = (text: string, limit: number) => {
        return text.length > limit ? text.slice(0, limit) + "..." : text;
    };

    const fixImageUrl = (url: string): string => {
        if (!url) return "/default-image.png";
        const normalizedUrl = url.replace(/\\/g, '/');
        if (normalizedUrl.startsWith('http') || normalizedUrl.startsWith('/')) {
            return normalizedUrl;
        }
        return `${BASE_API_URL.slice(0, -3)}${normalizedUrl}`;
    };


    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {news.map((items) => {
                    const locale = useAppLocale();
                    const title = items[locale];
                    const text = items[`text_${locale}`];
                    const cat = items[`cat_${locale}`];
                    return (
                        <div key={items.id}
                             className="shadow-sm w-full border flex flex-col p-2 rounded-md shadow-slate-400">
                            <div className="w-full">
                                <Image
                                    width={800}
                                    height={800}
                                    className="w-full h-full rounded-md object-cover"
                                    alt={`${items.image}`}
                                    src={fixImageUrl(items.image)}
                                />
                            </div>

                            <div className="w-full h-full flex flex-col">
                                <div className="flex justify-between pt-4">
                                    <div className="text-xs md:text-sm font-semibold text-mainBlue opacity-40">
                                        {cat}
                                    </div>
                                    <div className="text-xs md:text-sm font-semibold text-mainBlue opacity-40">
                                        {new Date(items.date).toLocaleDateString("tm-TM")}
                                    </div>
                                </div>

                                <h3 className="text-mainBlue font-bold text-sm md:text-md lg:text-lg xl:text-xl">
                                    <RichText htmlContent={title}/>
                                </h3>

                                <div className="mt-2 font-medium text-mainBlue text-xs md:text-sm lg:text-md">
                                    <RichText htmlContent={truncateText(text, 300)}/>
                                </div>

                                <div className="pt-5 mt-auto flex justify-end">
                                    <Link
                                        href={`/${locale}/${type}/${items.id}`}
                                        className="bg-mainBlue py-2 px-4 lg:py-3 lg:px-6 text-white text-xs lg:text-sm font-semibold rounded-md"
                                    >
                                        {t("read")}
                                    </Link>
                                </div>

                            </div>

                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center py-8">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChange}
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
    );
};

export default NewsCardProps;
