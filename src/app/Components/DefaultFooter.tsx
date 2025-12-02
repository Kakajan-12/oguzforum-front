'use client';
import React, {useState} from "react";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {useTranslations} from "next-intl";
import {
    useGetContactsMailQuery,
    useGetContactsNumberQuery,
    useGetContactsAddressQuery,
    useGetLinksQuery
} from "@/app/Apis/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import {BASE_API_URL} from "@/constant";
import Image from "next/image";

const whoWeAre = [
    {id: 1, name: "Who We Are", href: "/weare"},
    {id: 2, name: "Career", href: "/career"},
    {id: 3, name: "Press", href: "/news"},
    {id: 4, name: "Privacy Policy", href: "/privacypolicy"},
    {id: 5, name: "Cookie Terms", href: "/cookieterms"},
    {id: 6, name: "FAQ", href: "/faq"},
];

const DefaultFooter = () => {
    const t = useTranslations("Footer");
    const s = useTranslations("toast");
    const { data: mailData } = useGetContactsMailQuery();
    const { data: numberData } = useGetContactsNumberQuery();
    const { data: addressData } = useGetContactsAddressQuery();
    const {data: messengers} = useGetLinksQuery();
    const locale = useAppLocale();
    const footerweAre = t.raw("footerweare");
    const email = mailData?.[0]?.mail ?? "";
    const phoneNumber = numberData?.[0]?.number ?? "";
    const address = addressData?.[0]?.[`location_${locale}`] ?? "";
    const [subscriberEmail, setSubscriberEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubscribe = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(subscriberEmail)) {
            toast.error("Please enter a valid email.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${BASE_API_URL}/subscribes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({mails: subscriberEmail}),
            });

            if (!response.ok) throw new Error("Failed to subscribe");

            toast.success(s("successfulSubscribe"));
            setSubscriberEmail("");
        } catch (err) {
            toast.error(s("errorSubscribe"));
        } finally {
            setLoading(false);
        }
    };

    const renderMessengers = () => (
        messengers?.map((item) => {
            let Icon = null;
            switch (item.icon.toLowerCase()) {
                case "telegram":
                    Icon = TelegramIcon;
                    break;
                case "linkedin":
                    Icon = LinkedInIcon;
                    break;
                case "instagram":
                    Icon = InstagramIcon;
                    break;
                case "whatsapp":
                    Icon = WhatsAppIcon;
                    break;
                default:
                    return null;
            }

            return (
                <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer">
                    <Icon className="text-white" style={{width: "35px", height: "35px"}}/>
                </a>
            );
        })
    );

    return (
        <>
            <div className="w-full bg-mainBlue my-container py-6">
                <div className="container px-4 mx-auto">
                    <div className="flex justify-between flex-col lg:flex-row py-5">
                        <div className="flex lg:w-2/5 flex-col gap-4">
                            <p className="text-base md:text-lg lg:text-3xl text-white font-bolder">
                                {t("footerfresh")}
                            </p>
                            <div style={{borderBottom: "2px solid white"}}>
                                <label htmlFor="email" className="flex px-1">
                                    <input
                                        id="email"
                                        type="text"
                                        placeholder={t("footeremail")}
                                        className="bg-transparent w-full outline-none text-white text-sm md:text-base lg:text-lg"
                                        value={subscriberEmail}
                                        onChange={(e) => setSubscriberEmail(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="text-white font-semibold text-base md:text-lg lg:text-xl text-nowrap"
                                        onClick={onSubscribe}
                                        disabled={loading}
                                    >
                                        {loading ? "Loading..." : t("footersubscribe")}
                                    </button>
                                </label>
                            </div>

                            <div className="w-full hidden lg:flex gap-3 items-center">
                                {renderMessengers()}
                            </div>
                        </div>

                        <div className="flex lg:w-2/5 flex-col items-center lg:items-start pt-10 lg:pt-0">
                            <p className="text-lg md:text-2xl lg:text-3xl mb-10 text-center lg:text-start text-white font-semibold">
                                {t("footercontact")}
                            </p>
                            <div className="w-full flex flex-col items-start space-y-4">
                                {addressData?.[0] && (
                                    <div className="flex items-center">
                                        <LocationPinIcon className="text-white mr-2" style={{width: "30px", height: "30px"}}/>
                                        <div className="text-white text-md lg:text-xl font-bolder flex space-x-2">
                                            <RichText htmlContent={addressData[0][`address_${locale}`]} />
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center mb-5">
                                    <PhoneEnabledIcon className="text-white mr-2"
                                                      style={{width: "30px", height: "30px"}}/>
                                    <div className="text-white text-md lg:text-xl font-bolder">{phoneNumber}</div>
                                </div>
                                <div className="flex items-center mb-5">
                                    <MailOutlineIcon className="text-white mr-2"
                                                     style={{width: "30px", height: "30px"}}/>
                                    <div className="text-white text-md lg:text-xl font-bolder">{email}</div>
                                </div>
                            </div>
                            <div className="w-full flex lg:hidden gap-3 justify-center">
                                {renderMessengers()}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:justify-between items-center gap-4 lg:flex-row">
                        <div
                            className="text-center flex flex-wrap lg:w-1/2 items-center justify-center w-full lg:justify-start">
                            {whoWeAre.map((item, i) => (
                                <div key={item.id}>
                                    <Link className="text-slate-400 mb-4 lg:mb-0 text-[10px] md:text-sm mr-3"
                                          href={item.href}>
                                        {footerweAre[i]}
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-2 items-center">
                            <div className="text-sm md:text-base text-white">
                                © {new Date().getFullYear()}, All rights Reserved
                            </div>
                            <div className="flex items-center">
                                <Image src="/logo.svg" alt="Hebent tech"
                                       width={30}
                                       height={30}
                                       className="w-5"/>
                                <Link
                                    href="https://hebent.tech"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm md:text-base text-white"
                                >
                                    Hebent Tech
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
};

export default DefaultFooter;
