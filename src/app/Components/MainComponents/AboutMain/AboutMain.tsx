import { useTranslations } from "next-intl";

const AboutMain = () => {
    const t= useTranslations("WhyWe")
   
    return (
        <div className="container mx-auto px-2">
            <div className="py-12 md:py-56">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                        <div className="ml-10 max-w-fit">
                            <div className="uppercase text-md font-bold">{t('whyabout')}</div>
                            <div className="border-b border-[#002A5F] w-full px-2"></div>
                        </div>
                        <div className="ml-5 md:ml-10 font-bold text-3xl md:text-6xl pt-8 max-w-1/3">
                        {t('whymain')}
                        </div>
                    </div>
                    <div className="w-full pt-5 md:pt-0 md:w-1/2">
                        <p className="text-color">{t('whybottom')}</p>
                    </div>
                </div>
                <div  className="pt-10">
                    <p className="text-color">{t("whybottom")}.</p>
                </div>
            </div>
        </div>
    )
}

export default AboutMain;