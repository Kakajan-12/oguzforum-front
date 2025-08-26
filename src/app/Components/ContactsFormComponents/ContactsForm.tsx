"use client";
import { useLocale, useTranslations } from "next-intl";
import React, {useEffect, useMemo, useState} from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useGetContactsAddressQuery } from "@/app/Apis/api";
import RichText from "@/app/Hooks/Richtext";
import useAppLocale from "@/app/Hooks/GetLocale";
import { BASE_API_URL } from "@/constant";

const ContactsForm = () => {
    const t = useTranslations("ContactPage");
    const tittle = t.raw("contactmains");
    const input = t.raw("messageinputs");
    const knobs = t.raw("Officeknobs");

    const locale = useLocale();
    const locales: "ru" | "en" | "tk" = useAppLocale();
    const { data: offices } = useGetContactsAddressQuery();

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        captchaText: "",
    });

    const [phoneNumber, setPhoneNumber] = useState("");
    const [captchaImage, setCaptchaImage] = useState("");
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const loadCaptcha = async () => {
        const res = await fetch(`${BASE_API_URL}/captcha`, {
            method: 'GET',
            credentials: 'include',
        });
        const svg = await res.text();
        setCaptchaImage(svg);
    };

    useEffect(() => {
        loadCaptcha();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch(`${BASE_API_URL}/send`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, phone: phoneNumber }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to send");
                loadCaptcha();
            } else {
                setSuccess("Message sent successfully!");
                setFormData({
                    name: "",
                    surname: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                    captchaText: "",
                });
                setPhoneNumber("");
                loadCaptcha();
            }
        } catch (err) {
            setError("Server error");
        } finally {
            setSending(false);
        }
    };

    const currentOffice = offices?.[activeIndex];
    const iframeElement = useMemo(() => {
        if (!currentOffice?.iframe_code) return null;
        return (
            <div
                className="w-full h-fit rounded-lg overflow-hidden shadow-lg"
                dangerouslySetInnerHTML={{ __html: currentOffice.iframe_code }}
            />
        );
    }, [currentOffice?.iframe_code]);

    return (
        <div className="container mx-auto py-12 px-2 lg:px-10 md:py-32">
            <div className="w-full flex gap-y-10 lg:flex-row flex-col-reverse justify-between items-center lg:gap-10">
                {/* LEFT */}
                <div className="flex flex-col md:gap-2 w-full">
                    <h2 className="lg:text-4xl md:text-3xl text-xl text-center md:text-start text-mainBlue font-extrabold">
                        {tittle[0]}
                    </h2>

                    <div className="flex flex-col justify-between gap-7 h-full mt-5">
                        {/* Address */}
                        {currentOffice && (
                            <div className="space-y-2">
                                <div className="lg:text-xl md:text-[16px] text-sm text-mainBlue flex">
                                    <span className="font-bold mr-5">
                                        {currentOffice.tk || "Office"}:
                                    </span>
                                    <RichText htmlContent={currentOffice[`location_${locales}`]}/>
                                </div>
                            </div>
                        )}

                        {/* Map */}
                        {iframeElement}

                        {/* Office Buttons */}
                        <div
                            className="border justify-self-end flex w-full justify-between border-slate-300 rounded-md divide-x-2">
                            {offices?.map((office: any, index: number) => {
                                const title =
                                    office[`${locales}`] || knobs?.[index] || `Office ${index + 1}`;

                                return (
                                    <button
                                        key={index}
                                        className={`md:py-3 p-2 w-full text-[11px] lg:text-sm rounded-lg font-semibold ${
                                            activeIndex === index
                                                ? "bg-mainBlue text-white"
                                                : "text-mainBlue text-opacity-30"
                                        }`}
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        {title}
                                    </button>
                                );
                            })}
                        </div>

                    </div>
                </div>

                {/* RIGHT */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-between space-y-2 w-full lg:max-w-lg"
                >
                    <h2 className="lg:text-4xl md:text-3xl text-center md:text-start whitespace-nowrap text-xl text-mainBlue font-extrabold">
                        {tittle[1]}
                    </h2>

                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border md:text-sm text-xs border-[#002A5F] py-2 px-3 rounded-md"
                        type="text"
                        placeholder={`${input[0]} *`}
                        required
                    />
                    <input
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        className="border md:text-sm text-xs border-[#002A5F] py-2 px-3 rounded-md"
                        type="text"
                        placeholder={`${input[1]} *`}
                        required
                    />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border md:text-sm text-xs border-[#002A5F] py-2 px-3 rounded-md"
                        type="email"
                        placeholder={`${input[2]} *`}
                        required
                    />
                    <PhoneInput
                        defaultCountry="tm"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        inputClassName="border !border-[#002A5F66] text-xs md:text-lg lg:py-3 md:py-2.5 py-2 px-4 w-full"
                    />
                    <input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="border md:text-sm text-xs py-2 px-3 border-[#002A5F] rounded-md"
                        type="text"
                        placeholder={`${input[3]} *`}
                        required
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="border resize-none max-h-32 min-h-[123px] md:text-sm text-xs py-2 px-3 border-[#002A5F] rounded-md"
                        placeholder={`${input[4]} *`}
                        required
                    ></textarea>

                    {/* CAPTCHA */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <div dangerouslySetInnerHTML={{ __html: captchaImage }} />
                            <button
                                type="button"
                                onClick={loadCaptcha}
                                className="text-sm text-blue-600 underline"
                            >
                                Refresh
                            </button>
                        </div>
                        <input
                            name="captchaText"
                            value={formData.captchaText}
                            onChange={handleChange}
                            placeholder={`${input[5]} *`}
                            className="border md:text-sm text-xs py-2 px-3 border-[#002A5F] rounded-md"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={sending}
                        className="bg-mainBlue text-white font-semibold px-6 py-2 mt-4 rounded-md"
                    >
                        {sending ? "Sending..." : input[6]}
                    </button>

                    {success && <p className="text-green-600 mt-2">{success}</p>}
                    {error && <p className="text-red-600 mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default ContactsForm;
