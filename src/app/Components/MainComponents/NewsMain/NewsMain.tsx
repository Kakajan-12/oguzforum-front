import {useGetNewsQuery} from "@/app/Apis/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import {useTranslations} from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {BASE_API_URL} from "@/constant";

const NewsMain = () => {
    const t = useTranslations("News");
    const {data, error, isLoading} = useGetNewsQuery();
    const locale = useAppLocale();

    function fixImageUrl(url: string): string {
        if (!url) return "/default-image.png"; // если нет картинки, отдать заглушку
        const normalizedUrl = url.replace(/\\/g, '/');

        if (normalizedUrl.startsWith('http')) {
            return normalizedUrl; // уже нормальный внешний URL
        }

        if (normalizedUrl.startsWith('/')) {
            return normalizedUrl; // локальный путь
        }

        return `${BASE_API_URL.slice(0, -3)}${normalizedUrl}`; // если просто uploads/....
    }

    return (
        <div className="container mx-auto px-2">
            <div className="py-12 md:py-56">
                <div className="flex justify-between">
                    <div className="font-bold text-2xl md:text-5xl max-w-1/3">
                        {t("newsmain")}
                    </div>
                    <Link
                        href={`/${locale}/news`}
                        className="invisible md:visible bg-mainBlue text-white px-8 py-2 rounded-md shadow-2xl text-xl inline-block text-center"
                    >
                        {t('moreNews')}
                    </Link>

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 md:pt-20">
                    {data?.map((items) => {
                        const title = items[locale];

                        return (
                            <Link href={`/news/${items.id}`} key={items.id}>
                                <div className="relative shadow-2xl h-80 rounded-xl">
                                    <Image
                                        src={fixImageUrl(items.image.replace(/\\/g, '/'))}
                                        alt={items.image.replace(/\\/g, '/')}
                                        width={800}
                                        height={600}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        className="rounded-xl object-center object-cover"
                                    />
                                    <div
                                        className="absolute bottom-0 right-0 left-0 bg-white rounded-xl px-6 py-4 h-32">
                                        <div className="text-sm font-thin">{items.date}</div>
                                        <div className="md:text-lg text-md text-mainBlue font-semibold">
                                            <RichText
                                                htmlContent={title.length > 100 ? title.slice(0, 80) + '...' : title}/>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <Link
                    href={`/${locale}/news`}
                    className="bg-mainBlue text-white px-8 py-2 rounded-md shadow-2xl text-lg inline-block md:invisible text-center w-full mt-10"
                >
                    {t('moreNews')}
                </Link>
            </div>
        </div>
    );
};

export default NewsMain;
