import { useTranslations } from "next-intl";
import Image from "next/image"

const ServicesMain = () => {
    const t= useTranslations("OurServices")
    const events = t.raw('ourdigital')
    return (
        <div className="container mx-auto px-2">
            <div className="py-12 md:py-56">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                        <div className="max-w-fit">
                            <div className="uppercase text-md font-bold">{t("ourmain")}</div>
                            <div className="border-b border-[#002A5F] w-full px-2"></div>
                        </div>
                        <div className=" font-bold text-2xl md:text-5xl pt-8 max-w-1/3">
                            {t("ouroffering")}
                        </div>
                    </div>
                    <div className="w-full pt-5 md:pt-0 md:w-1/2">
                        <p className="text-color text-xl">{t("ourtext")}</p>
                    </div>
                </div>
                <div
                    className="grid grid-cols-1 lg:grid-cols-2 divide-x-0 lg:divide-x-2 my-20 divide-black">
                    <div className="grid grid-cols-2 gap-4 divide-x-2 divide-black">
                        <div className="flex flex-col items-center">
                            <div className="px-4">
                                <div>
                                    <Image
                                        width={112}
                                        height={112}
                                        src="/services/service1.png"
                                        alt="Service"
                                    />
                                </div>
                                <div className="service-count text-md">01</div>
                                <div className="text-lg lg:text-2xl font-bold">{events[0]}</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="px-4">
                                <div>
                                    <Image
                                        width={112}
                                        height={112}
                                        src="/services/service2.png"
                                        alt="Service"
                                    />
                                </div>
                                <div className="service-count text-md">02</div>
                                <div className="text-lg lg:text-2xl font-bold">{events[1]}</div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 divide-x-2 divide-black pt-20 lg:pt-0">
                        <div className="flex flex-col items-center">
                            <div className="px-4">
                                <div>
                                    <Image
                                        width={112}
                                        height={112}
                                        src="/services/service3.png"
                                        alt="Service"
                                    />
                                </div>
                                <div className="service-count text-md">03</div>
                                <div className="text-lg lg:text-2xl font-bold">{events[2]}</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="px-4">
                                <div>
                                    <Image
                                        width={112}
                                        height={112}
                                        src="/services/service4.png"
                                        alt="Service"
                                    />
                                </div>
                                <div className="service-count text-md">04</div>
                                <div className="text-lg lg:text-2xl font-bold">{events[3]}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ServicesMain;