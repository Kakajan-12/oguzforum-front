import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import {News} from "@/app/Intarfaces/intarfaces";
import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import {BASE_API_URL} from "@/constant";
import Pagination from "@mui/material/Pagination";
import {useTranslations} from "next-intl";

interface Props {
    event: News[];
    itemsPerPage?: number;
}

const NewsCardProps: React.FC<Props> = ({event, itemsPerPage = 6}) => {
    const t = useTranslations("explore")
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(event.length / itemsPerPage);

    const handleChange = (_: any, value: number) => {
        setPage(value);
    };

    const currentData = event.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

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
        <div className="container mx-auto md:px-7  flex flex-col md:gap-10 gap-5  pb-7 md:pb-10 px-2">
            {event.map((items) => {
                const locale = useAppLocale();
                const tittle = items[locale];
                const text = items[`text_${locale}`];
                const cat = items[`cat_${locale}`];
                return (
                    <Link href={`/news/${items.id}`} key={items.id}>
                        <div
                            className="shadow-sm w-full border flex flex-col md:flex-row p-3 justify-between rounded-md shadow-slate-400">
                            <div className="md:w-1/3">
                                <Image
                                    width={800}
                                    height={800}
                                    className="w-full h-full rounded-md object-cover"
                                    alt={`${items.image}`}
                                    src={fixImageUrl(items.image)}
                                />
                            </div>

                            <div className="w-full pt-5 md:pt-0 md:pl-3 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-mainBlue font-bold text-sm md:text-lg lg:text-xl">
                                        <RichText htmlContent={tittle}/>
                                    </h3>
                                    <div className="flex flex-col-reverse">
                                        <div
                                            className="hidden sm:block mt-4 font-medium text-mainBlue text-xs md:text-sm lg:text-md">
                                            <RichText htmlContent={truncateText(text, 300)}/>
                                        </div>
                                        <div
                                            className="flex justify-between pt-5 md:justify-start md:space-x-2 md:divide-x-2 divide-mainBlue divide-opacity-40">
                                            <div
                                                className="text-xs font-semibold text-mainBlue opacity-40">
                                                {items.date}
                                            </div>
                                            <div
                                                className="text-xs font-semibold text-mainBlue opacity-40 pl-2">{cat}</div>
                                        </div>
                                    </div>

                                </div>

                                <div className="pt-5 flex justify-end">
                                    <button
                                        className="bg-mainBlue hidden md:block py-2 px-4 lg:py-3 lg:px-6 text-white text-xs lg:text-sm font-semibold rounded-md">
                                        {t("name")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
            <div className="flex justify-center pt-4">
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
