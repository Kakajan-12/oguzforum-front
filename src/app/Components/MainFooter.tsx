'use client';
import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useTranslations } from "next-intl";
import {
    useGetContactsQuery,
    useGetContactsAddressQuery,
    useGetLinksQuery
} from "@/app/Apis/api";
import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import { BASE_API_URL } from "@/constant";

const whoWeAre = [
    { id: 1, name: "Who We Are ", href: "/weare" },
    { id: 2, name: "Career", href: "/career" },
    { id: 3, name: "Press", href: "/news" },
    { id: 4, name: "Privacy Policy", href: "/privacypolicy" },
    { id: 5, name: "Cookie Terms", href: "/cookieterms" },
    { id: 6, name: "FAQ", href: "/faq" },
];

const MainFooter = () => {
    const t = useTranslations("Footer");
    const s = useTranslations("toast");
    const { data, error, isLoading } = useGetContactsQuery();
    const { data: addressData } = useGetContactsAddressQuery();
    const { data: messengers } = useGetLinksQuery();
    const locale = useAppLocale();
    const footerweAre = t.raw("footerweare");
    const address = (data?.[0] as any)?.[locale] ?? "";
    const phoneNumber = data?.[0]?.number ?? "";
    const email = data?.[0]?.mail ?? "";
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
                body: JSON.stringify({ mails: subscriberEmail }),
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

    const renderMessengerIcons = () => (
        messengers?.map((item) => {
            const iconType = item.icon.toLowerCase();
            let Icon = null;

            switch (iconType) {
                case "telegram": Icon = TelegramIcon; break;
                case "linkedin": Icon = LinkedInIcon; break;
                case "instagram": Icon = InstagramIcon; break;
                case "whatsapp": Icon = WhatsAppIcon; break;
                default: return null;
            }

            return (
                <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer">
                    <Icon
                        className="blue-text"
                        style={{ width: "35px", height: "35px" }}
                    />
                </a>
            );
        })
    );

    return (
        <>
            <div className="w-full bg-white">
                <div className="container pt-20 pb-5 px-5 mx-auto">
                    <div className="flex justify-between flex-col lg:flex-row mb-20">
                        {/* Left: Subscribe and Icons */}
                        <div className="flex lg:w-2/5 flex-col gap-8">
                            <p className="lg:text-4xl text-2xl blue-text font-bolder">{t("footerfresh")}</p>

                            <div style={{ borderBottom: "2px solid #002A5F" }}>
                                <label htmlFor="email" className="flex px-1">
                                    <input
                                        id="email"
                                        type="text"
                                        placeholder={t("footeremail")}
                                        className="bg-transparent w-full outline-none blue-text"
                                        value={subscriberEmail}
                                        onChange={(e) => setSubscriberEmail(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="blue-text font-bold text-xl text-nowrap"
                                        onClick={onSubscribe}
                                        disabled={loading}
                                    >
                                        {loading ? "Loading..." : t("footersubscribe")}
                                    </button>
                                </label>
                            </div>

                            <div className="w-full hidden lg:flex gap-3 items-center">
                                {renderMessengerIcons()}
                            </div>
                        </div>

                        {/* Right: Contact Info */}
                        <div className="flex lg:w-2/5 flex-col items-center lg:items-start pt-10 lg:pt-0">
                            <p className="lg:text-4xl text-3xl mb-10 text-center lg:text-start blue-text font-bold">
                                {t("footercontact")}
                            </p>

                            <div className="w-full flex flex-col items-start">
                                {addressData?.map((item) => (
                                    <div key={item.id} className="flex items-center mb-5">
                                        <LocationPinIcon className="blue-text mr-2" style={{ width: "30px", height: "30px" }} />
                                        <div className="blue-text text-md lg:text-xl font-bolder flex space-x-2">
                                            <RichText htmlContent={item[`${locale}`]} />
                                            <RichText htmlContent={item[`location_${locale}`]} />
                                        </div>
                                    </div>
                                ))}

                                <div className="flex items-center mb-5">
                                    <PhoneEnabledIcon className="blue-text mr-2" style={{ width: "30px", height: "30px" }} />
                                    <div className="blue-text text-md lg:text-xl font-bolder">{phoneNumber}</div>
                                </div>

                                <div className="flex items-center mb-5">
                                    <MailOutlineIcon className="blue-text mr-2" style={{ width: "30px", height: "30px" }} />
                                    <div className="blue-text text-md lg:text-xl font-bolder">{email}</div>
                                </div>
                            </div>

                            <div className="w-full flex lg:hidden gap-3 justify-center mt-4">
                                {renderMessengerIcons()}
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="flex lg:justify-between items-center gap-5 flex-col lg:flex-row">
                        <div className="text-center flex flex-wrap lg:w-1/2 items-center justify-center w-full lg:justify-start">
                            {whoWeAre.map((item, i) => (
                                <div key={item.id}>
                                    <Link
                                        className="text-slate-400 mb-4 lg:mb-0 text-[10px] md:text-sm mr-3"
                                        href={item.href}
                                    >
                                        {footerweAre[i]}
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <p className="text-slate-400 text-[10px] md:text-sm whitespace-nowrap">
                            © {new Date().getFullYear()}, All rights Reserved - Connect to HebentTech
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default MainFooter;
