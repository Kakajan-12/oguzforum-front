'use client'
import React from "react";
import Link from "next/link";
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {useTranslations} from "next-intl";
import {useGetContactsQuery} from "@/app/Apis/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";

const whoWeAre = [
    {
        id: 1,
        name: "Who We Are ", href: "/whoweare"
    },
    {
        id: 2,
        name: "Career", href: "/career"
    },
    {
        id: 3,
        name: "Press", href: "/press"
    },
    {
        id: 4,
        name: "Privacy Policy", href: "/privacypolicy"
    },
    {
        id: 5,
        name: "Cookie Terms", href: "/cookieterms"
    },
    {
        id: 6,
        name: "FAQ", href: "/faq"
    },
];

const DefaultFooter = () => {
    const t = useTranslations("Footer");
    const { data, error, isLoading } = useGetContactsQuery();
    const locale = useAppLocale();
    const footerweAre = t.raw("footerweare");
    const address = data?.[0]?.[locale] ?? "";
    const phoneNumber = data?.[0]?.number ?? "";
    const email = data?.[0]?.mail ?? "";

    return (
        <>
            <div className="w-full bg-mainBlue">
                <div className="container pt-20 pb-5 px-5 mx-auto">
                    <div className="flex justify-between flex-col lg:flex-row mb-20">
                        <div className="flex lg:w-2/5 flex-col gap-8">
                            <p className="lg:text-4xl text-2xl text-white font-bolder">
                                {t("footerfresh")}
                            </p>
                            <div style={{borderBottom: "2px solid white"}}>
                                <label
                                    htmlFor="email"
                                    className="flex px-1"
                                >
                                    <input
                                        id="email"
                                        type="text"
                                        placeholder={t("footeremail")}
                                        className="bg-transparent w-full outline-none text-white"
                                    />
                                    <button
                                        className="text-white font-bold text-xl"
                                    >
                                        {t("footersubscribe")}
                                    </button>
                                </label>
                            </div>

                            <div className="w-full hidden lg:flex  gap-3 items-center ">
                                <TelegramIcon className="blue-text bg-white p-1" style={{
                                    borderRadius: "50%",
                                    width: "30px",
                                    height: "30px",
                                }}/>
                                <LinkedInIcon className="text-white" style={{
                                    width: "35px",
                                    height: "35px",
                                }}/>
                                <InstagramIcon className="text-white" style={{
                                    width: "35px",
                                    height: "35px",
                                }}/>
                                <WhatsAppIcon className="text-white" style={{
                                    width: "35px",
                                    height: "35px",
                                }}/>
                            </div>
                        </div>
                        <div className="flex lg:w-2/5 flex-col items-center lg:items-start pt-10 lg:pt-0">
                            <p className="lg:text-4xl text-3xl mb-10 text-center lg:text-start text-white font-bold">
                                {t("footercontact")}
                            </p>

                            <div className="w-full flex flex-col items-start ">
                                <div className="flex items-center mb-5">
                                    <LocationPinIcon className="text-white mr-2"
                                                     style={{width: "30px", height: "30px"}}/>
                                    <div className="text-white text-2xl lg:text-3xl font-bolder"><RichText
                                        htmlContent={address}/>
                                    </div>
                                </div>
                                <div className="flex items-center mb-5">
                                    <PhoneEnabledIcon className="text-white mr-2"
                                                      style={{width: "30px", height: "30px"}}/>
                                    <div className="text-white text-2xl lg:text-3xl font-bolder">{phoneNumber}</div>
                                </div>
                                <div className="flex items-center mb-5">
                                    <MailOutlineIcon className="text-white mr-2"
                                                     style={{width: "30px", height: "30px"}}/>
                                    <div className="text-white text-2xl lg:text-3xl font-bolder">{email}</div>
                                </div>
                            </div>
                            <div className="w-full flex lg:hidden gap-3 justify-center ">
                                <TelegramIcon className="blue-text bg-white p-1" style={{
                                    borderRadius: "50%",
                                    width: "30px",
                                    height: "30px",
                                }}/>
                                <LinkedInIcon className="text-white" style={{
                                    width: "35px",
                                    height: "35px",
                                }}/>
                                <InstagramIcon className="text-white" style={{
                                    width: "35px",
                                    height: "35px",
                                }}/>
                                <WhatsAppIcon className="text-white" style={{
                                    width: "35px",
                                    height: "35px",
                                }}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex lg:justify-between items-center gap-5   flex-col lg:flex-row">
                        <div
                            className="text-center flex flex-wrap lg:w-1/2 items-center justify-center w-full lg:justify-start">
                            {whoWeAre.map((items, i) => {
                                return (
                                    <div key={items.id}>
                                        <Link
                                            className={`text-slate-400 mb-4 lg:mb-0 text-[10px] md:text-sm  mr-3`}
                                            href={items.href}
                                        >
                                            {footerweAre[i]}
                                        </Link>
                                    </div>

                                );
                            })}
                        </div>
                        <p className="text-slate-400 text-[10px] md:text-sm whitespace-nowrap ">
                            © {new Date().getFullYear()}, All rights Reserved - Connect to HebentTech
                        </p>
                    </div>
                </div>
            </div>
        </>

    );
};

export default DefaultFooter;
