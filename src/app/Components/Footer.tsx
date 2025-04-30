import React from "react";
import icon1 from "../../../public/iconsfooter/Social Icons (3).png";
import icon2 from "../../../public/iconsfooter/Social Icons (4).png";
import icon3 from "../../../public/iconsfooter/Social Icons (5).png";
import icon4 from "../../../public/iconsfooter/Social Icons (6).png";
import icon5 from "../../../public/iconsfooter/Social Icons (7).png";
import right1 from "../../../public/iconsfooter/Pin_fill.png";
import right2 from "../../../public/iconsfooter/Phone_fill (1).png";
import right3 from "../../../public/iconsfooter/Message (1).png";
import Image from "next/image";
import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";

const icons = [
    {
        id: 1,
        img: icon4
    },
    {
        id: 2,
        img: icon5
    },
    {
        id: 3,
        img: icon2
    },
    {
        id: 4,
        img: icon1
    },
    {
        id: 5,
        img: icon3
    },
];
const contactUs = [
    {
        id: 1,
        name: "Turkmenistan, Ashgabat, 15 district, Shypaly ", img: right1
    },
    {
        id: 2,
        name: "+993 xx xxx xxx ", img: right2
    },
    {
        id: 3,
        name: "info.oguzforum@gmail.com ", img: right3
    },
];

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

const Footer = () => {
    const t = useTranslations("Footer");
    const footerweAre = t.raw("footerweare");
    return (
        <div className="bg-mainBlue w-full ">
            <div className="container pt-20 pb-5 px-5 mx-auto w-full flex flex-col gap-20">
                <div className="flex justify-between flex-col lg:flex-row   gap-y-10">
                    <div className="flex lg:w-2/5 flex-col gap-8">
                        <p className="lg:text-4xl text-2xl md:pr-10 text-white  font-normal">
                            {t("footerfresh")}
                        </p>
                        <label
                            htmlFor="email"
                            className="relative border-b-2 flex   py-3 px-1  border-white"
                        >
                            <input
                                id="email"
                                type="text"
                                placeholder={t("footeremail")}
                                className="  bg-transparent w-full outline-none   text-white"
                            />
                            <button
                                className={`text-white ml-5 whitespace-nowrap  bg-transparent `}
                            >
                                {t("footersubscribe")}
                            </button>
                        </label>
                        <div className="w-full hidden lg:flex  gap-3 items-center ">
                            {icons.map((items) => {
                                return (
                                    <div className="p-2 rounded-full" key={items.id}>
                                        <Image className="w-5" alt="img" src={items.img}/>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex lg:w-2/5  flex-col items-center lg:items-start gap-4">
                        <p className="lg:text-4xl text-3xl mb-5 lg:pr-40 text-center lg:text-start text-white  font-normal">
                            {t("footercontact")}
                        </p>
                        {contactUs.map((items, i) => {
                            return (
                                <div className="flex  justify-center md:justify-start items-center gap-0" key={items.id}>
                                    <div className=" rounded-full p-1 md:p2">
                                        <Image alt="img" className=" w-5 md:w-6" src={items.img}/>
                                    </div>
                                    <p className="text-white text-xs ml-1   md:text-sm text-center">
                                        {" "}
                                        {i === 0 ? t("footerlocation") : items.name}{" "}
                                    </p>
                                </div>
                            );
                        })}
                        <div className="w-full mt-5 flex lg:hidden gap-5 justify-center  items-center ">
                            {icons.map((items) => {
                                return (
                                    <div className="p-2 rounded-full" key={items.id}>
                                        <Image className="w-6" alt="img" src={items.img}/>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex lg:justify-between items-center gap-5   flex-col lg:flex-row">
                    <div
                        className="text-center  flex flex-wrap lg:w-1/2   items-center   justify-center w-full lg:justify-start">
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
                    <p className="text-slate-400 text-[10px]   md:text-sm whitespace-nowrap ">
                        @ 2024, All rights Reserved - Connect to HebTech
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
