import {useGetNewsQuery} from "@/app/Apis/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import {useTranslations} from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {BASE_API_URL} from "@/constant";
import {MdArrowForwardIos} from "react-icons/md";

const NewsMain = () => {
    const t = useTranslations("News");
    const e = useTranslations("upcoming");
    const {data, error, isLoading} = useGetNewsQuery();
    const locale = useAppLocale();

    function fixImageUrl(url: string): string {
        if (!url) return "/default-image.png";
        const normalizedUrl = url.replace(/\\/g, '/');

        if (normalizedUrl.startsWith('http')) {
            return normalizedUrl;
        }

        if (normalizedUrl.startsWith('/')) {
            return normalizedUrl;
        }

        return `${BASE_API_URL.slice(0, -3)}${normalizedUrl}`;
    }

    const sortedNews = data ? [...data]
        .sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        .slice(0, 8) : [];

    return (
        <div className="container mx-auto px-2">
            <div className="py-10">
                <div className="flex justify-between">
                    <div className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-1/3">
                        {t("newsmain")}
                    </div>
                    <Link
                        href={`/${locale}/news`}
                        className="invisible md:visible bg-mainBlue text-white px-8 py-2 rounded-md shadow-2xl text-xl inline-block text-center"
                    >
                        {t('moreNews')}
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:pt-10">
                    {sortedNews.map((items) => {
                        const title = items[locale];
                        const cat = items[`cat_${locale}`];

                        return (
                            <div
                                key={items.id}
                                className="border-2 p-2 shadow-xl rounded-xl h-full flex flex-col"
                            >
                                <Image
                                    src={fixImageUrl(items.image.replace(/\\/g, "/"))}
                                    alt={title}
                                    width={800}
                                    height={600}
                                    className="rounded-xl object-center object-fill h-56"
                                />

                                <div className="flex flex-col justify-between flex-grow mt-2">
                                    <div className="pt-2">
                                        <div className="flex justify-between">
                                            <p className="text-color text-md">{cat}</p>
                                            <div className="text-md blue-text">
                                                {new Date(items.date).toLocaleDateString("tm-TM")}
                                            </div>
                                        </div>

                                        <div className="text-md md:text-lg blue-text font-semibold">
                                            <RichText
                                                htmlContent={
                                                    title.length > 100 ? title.slice(0, 120) + "..." : title
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-4">
                                        <Link href={`/news/${items.id}`}>
                                            <div className="flex items-center space-x-2">
                                                <div className="main-background-color p-2 rounded-full text-white">
                                                    <MdArrowForwardIos />
                                                </div>
                                                <div className="text-sm">{e("more")}</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <Link
                    href={`/${locale}/news`}
                    className="bg-mainBlue text-white px-8 py-2 rounded-md shadow-2xl text-lg inline-block md:hidden text-center w-full mt-10"
                >
                    {t('moreNews')}
                </Link>
            </div>
        </div>
    );
};

export default NewsMain;