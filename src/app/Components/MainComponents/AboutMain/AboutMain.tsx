import {useTranslations} from "next-intl";

const AboutMain = () => {
    const t = useTranslations("WhyWe")

    return (
        <div className="container mx-auto px-2">
            <div className="pt-12 pb-6">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                        <div className="max-w-fit">
                            <div className="uppercase text-md font-bold">{t('whyabout')}</div>
                            <div className="border-b border-[#002A5F] w-full px-2"></div>
                        </div>
                        <div className="font-bold text-center md:text-left text-3xl sm:text-4xl lg:text-5xl xl:text-6xl pt-8 max-w-1/3">
                            {t('whymain')}
                        </div>
                    </div>
                    <div className="w-full pt-5 md:pt-0 md:w-1/2">
                        <p className="text-color text-sm md:text-md lg:text-lg">{t('whyright')}</p>
                    </div>
                </div>
                <div className="pt-10">
                    <p className="text-color text-sm md:text-md lg:text-lg">{t("whybottom")}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 space-y-2 lg:space-y-0 lg:space-x-2">
                <div className="grid grid-cols-1 md:grid-cols-2 space-y-2 md:space-y-0 md:space-x-2">
                    <div
                        className="main-background-color rounded-md flex md:flex-col md:space-y-2 justify-between items-center px-2 py-3">
                        <div className="w-full">
                            <p className="w-fit text-white border-b font-semibold text-md md:text-lg lg:text-xl xl:text-2xl md:text-left">{t('projects')}</p>
                        </div>
                        <div className="w-full">
                            <p className="text-white font-bold text-lg md:text-xl lg:text-3xl xl:text-5xl text-right">23</p></div>
                    </div>
                    <div className="main-background-color rounded-md flex md:flex-col md:space-y-2 justify-between items-center px-2 py-3">
                        <div className="w-full">
                            <p className="w-fit text-white border-b font-semibold text-md md:text-lg lg:text-xl xl:text-2xl md:text-left">{t('partners')}</p>
                        </div>
                        <div className="w-full">
                            <p className="text-white font-bold text-lg md:text-xl lg:text-3xl xl:text-5xl text-right">30+</p></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 space-y-2 md:space-y-0 md:space-x-2">
                    <div className="main-background-color rounded-md flex md:flex-col md:space-y-2 justify-between items-center px-2 py-3">
                        <div className="w-full">
                            <p className="w-fit text-white border-b font-semibold text-md md:text-lg lg:text-xl xl:text-2xl md:text-left">{t('exhibitors')}</p></div>
                        <div className="w-full">
                            <p className="text-white font-bold text-lg md:text-xl lg:text-3xl xl:text-5xl text-right">13 500+</p></div>
                    </div>
                    <div className="main-background-color rounded-md flex md:flex-col md:space-y-2 justify-between items-center px-2 py-3">
                        <div className="w-full">
                            <p className="w-fit text-white border-b font-semibold text-md md:text-lg lg:text-xl xl:text-2xl md:text-left">{t('delegates')}</p></div>
                        <div className="w-full">
                            <p className="text-white font-bold text-lg md:text-xl lg:text-3xl xl:text-5xl text-right">7 000+</p></div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AboutMain;