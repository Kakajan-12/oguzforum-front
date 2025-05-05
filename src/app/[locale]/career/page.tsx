'use client'
import CareerCardProps from "../../Components/CareerComponents/CareerCardProps";
import {useApplyJobMutation, useGetCareerQuery} from "@/app/Apis/api";
import React, {useState} from "react";
import {RiDeleteBin5Line} from "react-icons/ri";
import PhoneInput from "react-phone-input-2";
import {MdOutlineFileUpload} from "react-icons/md";
import {FaChevronDown} from "react-icons/fa";
import {AnimatePresence, motion} from "motion/react";
import NavigationBackKnob from "@/app/Components/ForBackKnob/NavigationBackKnob";
import BackgroundUi from "@/app/BackgroundUI/BackgroundStatic";

export default function CareerRedirectPage() {
    const { data, error, isLoading } = useGetCareerQuery();

    const [active, setActive] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<"vacancies" | "apply">("vacancies");

    const getResponsiveHeight = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return '34px';
            if (window.innerWidth < 768) return '34px';
            if (window.innerWidth < 1025) return '50px';
        }
        return '54px';
    };

    const forToggleOpen = (section: string) => {
        setActive(prev => (prev === section ? null : section));
    };

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);

    const [createProfile] = useApplyJobMutation();

    const handlePhoneChange = (value: any) => {
        setPhoneNumber(value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhoto(file);
        }
    };

    if (isLoading) return <p>loading...</p>;
    if (error) return <p>error...</p>;
    if (!data) return <p>not found...</p>;

    return (
        <>
            <BackgroundUi src="Career.png" name="career" />
            <div className="container mx-auto">
                <div className="pt-12 pb-7 md:pb-10 md:pt-32 flex items-center justify-between md:justify-start md:gap-20 px-2 gap-7 md:px-7">
                    <h2 className="md:text-4xl text-xl font-extrabold text-mainBlue flex items-center">
                        <NavigationBackKnob />
                        CAREERS
                    </h2>
                    <div className="flex flex-col min-[340px]:flex-row border-[1px] border-slate-400 relative rounded-lg">
                        <button
                            onClick={() => setSelectedTab("vacancies")}
                            className={`md:px-7 md:py-2.5 py-[10px] px-3 text-[10px] w-full md:text-lg font-semibold rounded-lg ${
                                selectedTab === "vacancies"
                                    ? "bg-mainBlue text-white"
                                    : "text-mainBlue text-opacity-30"
                            }`}
                        >
                            Vacancies
                        </button>
                        <button
                            onClick={() => setSelectedTab("apply")}
                            className={`md:px-7 md:py-2.5 py-[10px] px-3 text-[10px] w-full md:text-lg font-semibold rounded-lg text-nowrap ${
                                selectedTab === "apply"
                                    ? "bg-mainBlue text-white"
                                    : "text-mainBlue text-opacity-30"
                            }`}
                        >
                            Apply for job
                        </button>
                    </div>
                </div>
            </div>

            {selectedTab === "vacancies" && (
                <CareerCardProps event={data} />
            )}

            {selectedTab === "apply" && (
                <div className="container mx-auto px-5 md:px-20 xl:px-44 2xl:px-52 py-10 md:py-20">
                    <form method="submit" className="flex flex-col gap-10 md:gap-20">
                        <div className="flex flex-col">
                            <div className="col-span-full w-full flex flex-col">
                                <div className="flex justify-between gap-3 items-center md:items-end">
                                    <h3 className="md:text-3xl lg:text-4xl text-2xl text-mainBlue font-semibold">
                                        Personal information
                                    </h3>
                                    <div className="flex items-end">
                                        <RiDeleteBin5Line className="md:w-5 md:h-5 lg:h-7 lg:w-7 mb-[1px] w-4 h-4 mr-2 text-mainBlue" />
                                        <p className="text-mainBlue font-semibold text-xs md:text-sm lg:text-lg xl:text-xl">Clear</p>
                                    </div>
                                </div>
                                <div className="bg-mainBlue mt-2 w-full h-[2px]"></div>
                            </div>

                            <div className="grid gap-y-5 px-5 md:px-10 mt-7 md:mt-10 gap-x-10 grid-cols-1">
                                <div className="flex justify-between gap-5 md:gap-10">
                                    <input
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="border w-full md:text-lg text-xs border-[#002A5F66] lg:py-3 md:py-2.5 py-2 px-4 rounded-[10px]"
                                        placeholder="First name"
                                        type="text"
                                    />
                                    <input
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full border md:text-lg text-xs border-[#002A5F66] lg:py-3 md:py-2.5 py-2 px-4 rounded-[10px]"
                                        placeholder="Last name"
                                        type="text"
                                    />
                                </div>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="col-span-full w-full border md:text-lg text-xs border-[#002A5F66] lg:py-3 md:py-2.5 py-2 px-4 rounded-[10px]"
                                    placeholder="Email*"
                                    type="email"
                                />
                                <PhoneInput
                                    value={phoneNumber}
                                    inputStyle={{
                                        width: "100%",
                                        height: getResponsiveHeight(),
                                        borderColor: "#002A5F66",
                                        borderRadius: "10px",
                                    }}
                                    buttonStyle={{
                                        borderRadius: "10px 0px 0px 10px",
                                        backgroundColor: "transparent",
                                    }}
                                    country={"tm"}
                                    onlyCountries={["tm", "ru", "us", "de", "tr"]}
                                    enableSearch={true}
                                    onChange={handlePhoneChange}
                                />
                                <label className="border flex flex-col justify-center items-center gap-y-5 py-14 md:py-20 md:text-sm text-xs border-[#002A5F66] px-3 rounded-[10px] col-span-full">
                                    <strong className="md:text-4xl text-xl text-mainBlue">Photo</strong>
                                    <MdOutlineFileUpload className="w-14 text-mainBlue h-14 md:w-32 md:h-32" />
                                    <p className="text-mainBlue">
                                        <strong>Upload a file</strong> or drag and drop here
                                    </p>
                                    <input type="file" onChange={handleFileChange} hidden />
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col mt-5">
                            <div className="w-full flex flex-col">
                                <div className="flex justify-between items-end">
                                    <h3 className="md:text-3xl lg:text-4xl text-2xl text-mainBlue font-semibold">Profile</h3>
                                    <div className="flex items-center">
                                        <RiDeleteBin5Line className="md:w-5 md:h-5 lg:h-7 lg:w-7 mb-[1px] w-4 h-4 mr-2 text-mainBlue" />
                                        <p className="text-mainBlue font-semibold text-xs md:text-sm lg:text-lg xl:text-xl">Clear</p>
                                    </div>
                                </div>
                                <div className="bg-mainBlue md:mt-5 w-[97%] self-center h-[2px] mt-2"></div>
                            </div>

                            <div className="flex flex-col px-5 md:px-10 mt-7 md:mt-16 gap-5 md:gap-10">
                                <div>
                                    <div onClick={() => forToggleOpen('first')} className="cursor-pointer flex text-2xl justify-between">
                                        <h3 className="text-mainBlue text-sm md:text-lg lg:text-xl font-semibold">
                                            Education <span className="opacity-40">(optional)</span>
                                        </h3>
                                        <FaChevronDown className="md:w-5 md:h-5 lg:w-6 lg:h-6 w-3 h-3 text-mainBlue" />
                                    </div>
                                    <div className="bg-mainBlue mt-3 w-full h-[2px]"></div>
                                    <AnimatePresence initial={false}>
                                        {active === 'first' && (
                                            <motion.div initial={{ height: 0, overflow: 'hidden' }} animate={{ height: 'auto' }} exit={{ height: 0 }}>
                                                <div className="py-10">
                                                    <textarea className="w-full border-[#002A5F66] px-4 py-3 rounded-[10px] h-52 resize-none border" />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div>
                                    <div onClick={() => forToggleOpen('second')} className="cursor-pointer flex text-2xl justify-between">
                                        <h3 className="text-mainBlue text-sm md:text-lg lg:text-xl font-semibold">
                                            Experience <span className="opacity-40">(optional)</span>
                                        </h3>
                                        <FaChevronDown className="md:w-6 text-mainBlue md:h-6 w-3 h-3" />
                                    </div>
                                    <div className="bg-mainBlue mt-3 w-full h-[2px]"></div>
                                    <AnimatePresence initial={false}>
                                        {active === 'second' && (
                                            <motion.div initial={{ height: 0, overflow: 'hidden' }} animate={{ height: 'auto' }} exit={{ height: 0 }}>
                                                <div className="py-10 flex flex-col gap-10">
                                                    <label className="border flex flex-col justify-center items-center gap-y-5 py-14 md:py-20 md:text-sm text-xs border-[#002A5F66] px-3 rounded-[10px] col-span-full">
                                                        <strong className="md:text-4xl text-xl text-mainBlue">Upload CV</strong>
                                                        <MdOutlineFileUpload className="w-14 h-14 text-mainBlue xl:w-32 xl:h-32" />
                                                        <p className="text-mainBlue">
                                                            <strong>Upload a file</strong> or drag and drop here
                                                        </p>
                                                        <input type="file" hidden />
                                                    </label>
                                                    <textarea className="w-full border-[#002A5F66] px-4 py-3 rounded-[10px] h-52 resize-none border" />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="bg-mainBlue md:w-48 w-32 rounded-xl text-sm md:text-xl font-bold py-3 md:py-4 self-center text-white">
                            Send
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
