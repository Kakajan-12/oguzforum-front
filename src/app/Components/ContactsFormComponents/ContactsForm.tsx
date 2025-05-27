"use client";
import {useLocale, useTranslations} from "next-intl";
import React, {useState} from "react";
import {PhoneInput} from 'react-international-phone';
import 'react-international-phone/style.css';
import {useGetContactsQuery} from "@/app/Apis/api";
import RichText from "@/app/Hooks/Richtext";
import useAppLocale from "@/app/Hooks/GetLocale";

const ContactsForm = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const ForToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const t = useTranslations('ContactPage')
    const tittle = t.raw('contactmains')
    const input = t.raw('messageinputs')
    const knobs = t.raw('Officeknobs')
    const locale = useLocale()
    const locales: 'ru' | 'en' | 'tk' = useAppLocale();
    const {data} = useGetContactsQuery();
    const address = data?.[0]?.[locales] ?? "";

    const [phoneNumber, setPhoneNumber] = useState("");

    return (
        <div className="container mx-auto py-12 px-2  lg:px-10 md:py-32">
            <div
                className="w-full flex gap-y-10 sm:flex-row flex-col-reverse justify-between md:justify-between lg:justify-center lg:space-x-24">
                {/* LEFT */}
                <div className="flex flex-col md:gap-2 w-full">
                    <h2 className="lg:text-4xl md:text-3xl  text-xl text-center md:text-start text-mainBlue font-extrabold">{tittle[0]}</h2>
                    <div className="flex flex-col justify-between gap-7 h-full">
                        <div className="mt-5 space-y-2">
                            <div className="lg:text-xl md:text-[16px] text-sm text-mainBlue flex">
                                <span className="font-bold mr-5">Ashgabat:</span><RichText
                                htmlContent={address}/>
                            </div>
                        </div>

                        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.2423926177944!2d58.33467548260529!3d37.901208476027946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f700248d6328d29%3A0x864c9131f49fa568!2sW82M%2B8WC%2C%20Ashgabat%2C%20Turkmenistan!5e1!3m2!1sen!2sru!4v1748298132108!5m2!1sen!2sru"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Map"></iframe>
                        </div>
                        <div
                            className="border  justify-self-end flex  w-full justify-between   border-slate-300 rounded-2xl ">
                            {knobs.map((items: any, index: any) => {
                                return (
                                    <button key={items.id}
                                            className={`  md:py-3 p-2 w-full text-[11px] lg:text-sm rounded-lg 
                             font-semibold ${
                                                activeIndex === index
                                                    ? "bg-mainBlue  text-white"
                                                    : "text-mainBlue text-opacity-30"
                                            }`}
                                            onClick={() => setActiveIndex(index)}
                                    >
                                        {items}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col justify-between space-y-2">
                    <h2 className="lg:text-4xl md:text-3xl text-center md:text-start  whitespace-nowrap text-xl text-mainBlue font-extrabold ">
                        {tittle[1]}
                    </h2>

                    <input
                        className="border sm:mt-3 w md:text-sm text-xs border-[#002A5F] py-2 px-3 rounded-md"
                        type="text"
                        placeholder={`${input[0]} *`}
                    />
                    <input
                        className="border md:text-sm text-xs border-[#002A5F] py-2 px-3 rounded-md"
                        type="text"
                        placeholder={`${input[1]} *`}
                    />
                    <input
                        className="border md:text-sm text-xs border-[#002A5F] py-2 px-3 rounded-md"
                        type="email"
                        placeholder={`${input[2]} *`}
                    />
                    <PhoneInput
                        defaultCountry="tm"
                        value={phoneNumber}
                        onChange={(phone) => setPhoneNumber(phone)}
                        inputClassName="border !border-[#002A5F66] text-xs md:text-lg lg:py-3 md:py-2.5 py-2 px-4 w-full"
                    />
                    <input
                        className="border md:text-sm text-xs py-2 px-3 border-[#002A5F] rounded-md"
                        type="text"
                        placeholder={`${input[3]} *`}
                    />
                    <textarea
                        className="border resize-none max-h-32 min-h-[123px] md:text-sm text-xs py-2 px-3 border-[#002A5F] rounded-md"
                        name=""
                        placeholder={`${input[4]} *`}
                        id=""
                    ></textarea>

                    <div className="flex  flex-col gap-1.5 flex-wrap">
                        <span className="font-serif  md:text-xl text-sm">Anti spam</span>
                        <label htmlFor="" className="flex justify-between">
                            <input
                                placeholder={`${input[5]} *`}
                                className="border w-full min-w-[140px] md:text-sm text-xs  py-2 px-3 border-[#002A5F] rounded-md"
                                type="text"
                            />
                            <button
                                className={`bg-mainBlue text-white w-full min-w-[50px] max-w-[129px] font-semibold md:text-sm text-xs md:px-12 ml-3 py-1 text-center rounded-md ${locale !== 'en' ? 'md:px-5' : 'md:px-12'}`}>
                                {input[6]}
                            </button>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactsForm;
