import {useTranslations} from "next-intl";
import Image from "next/image"

const ServicesMain = () => {
    const t = useTranslations("OurServices")
    const services = [
        {id: "01", title: t("service-1"), img: "/services/service1.png"},
        {id: "02", title: t("service-2"), img: "/services/service2.png"},
        {id: "03", title: t("service-3"), img: "/services/service3.png"},
        {id: "04", title: t("service-4"), img: "/services/service4.png"},
    ];
    return (
        <div className="container mx-auto px-2">
            <div className="py-2">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                        <div className="max-w-fit">
                            <div className="uppercase text-md font-bold">{t("ourmain")}</div>
                            <div className="border-b border-[#002A5F] w-full px-2"></div>
                        </div>
                        <div
                            className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl pt-4 max-w-1/3">
                            {t("ouroffering")}
                        </div>
                    </div>
                    <div className="w-full pt-2 md:pt-0 md:w-1/2">
                        <p className="text-color text-sm md:text-md lg:text-lg">{t("ourtext")}</p>
                    </div>
                </div>

                <div
                    className="flex flex-row flex-wrap justify-between items-center my-10">
                    {services.map((s, i) => (
                        <div key={s.id} className="relative flex flex-col justify-center w-[50%] md:w-1/4 mb-4">
                            <div className="px-4">
                                <div className="w-24 mb-2">
                                    <Image
                                        width={112}
                                        height={112}
                                        src={s.img}
                                        alt={s.title}
                                        className="w-full"
                                    />
                                </div>
                                <div className="blue-text text-md">{s.id}</div>
                                <div className="text-md md:text-lg lg:text-xl xl:text-2xl font-bold">{s.title}</div>
                            </div>
                            {i !== services.length - 1 && (
                                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-[70%] w-[1px] bg-gray-400"></div>
                            )}

                            {(i === 0 || i === 2) && (
                                <div className="block md:hidden absolute right-0 top-1/2 -translate-y-1/2 h-[70%] w-[1px] bg-gray-400"></div>
                            )}



                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ServicesMain;