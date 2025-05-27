'use client';
import CareerCardProps from "../../Components/CareerComponents/CareerCardProps";
import {useApplyJobMutation, useGetCareerQuery} from "@/app/Apis/api";
import React, {useState, useRef} from "react";
import {RiDeleteBin5Line} from "react-icons/ri"
import {PhoneInput} from 'react-international-phone';
import 'react-international-phone/style.css';
import {MdOutlineFileUpload} from "react-icons/md";
import {FaChevronDown} from "react-icons/fa";
import {AnimatePresence, motion} from "motion/react";
import NavigationBackKnob from "@/app/Components/ForBackKnob/NavigationBackKnob";
import BackgroundUi from "@/app/BackgroundUI/BackgroundStatic";
import {useTranslations} from "next-intl";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CareerRedirectPage() {
    const t = useTranslations("careers");
    const s = useTranslations("toast");
    const {data, error, isLoading} = useGetCareerQuery();
    const [createProfile] = useApplyJobMutation();

    const [active, setActive] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<"vacancies" | "apply">("vacancies");
    const [selectedVacancyId, setSelectedVacancyId] = useState<number | null>(null);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [address, setAddress] = useState("");
    const [education, setEducation] = useState("");
    const [comment, setComment] = useState("");
    const [experience, setExperience] = useState<File | null>(null);
    const [cvPreview, setCvPreview] = useState<string | null>(null);

    const photoInputRef = useRef<HTMLInputElement | null>(null);
    const cvInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleFileChangeCv = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setExperience(file);
            setCvPreview(URL.createObjectURL(file));
        }
    };

    const forToggleOpen = (section: string) => {
        setActive(prev => (prev === section ? null : section));
    };

    const handleVacancySelect = (vacancyId: number) => {
        setSelectedVacancyId(vacancyId);
        setSelectedTab("apply");
    };

    const clearPersonal = () => {
        setName("");
        setSurname("");
        setEmail("");
        setAddress("")
        setNumber("");
        setPhoto(null);
        setPhotoPreview(null);
        if (photoInputRef.current) {
            photoInputRef.current.value = "";
        }
    };

    const clearProfile = () => {
        setEducation("");
        setComment("");
        setExperience(null);
        setCvPreview(null);
        if (cvInputRef.current) {
            cvInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!photo) {
            toast.error("Пожалуйста, загрузите фотографию.");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('email', email);
        formData.append('number', number);
        formData.append('address', address);

        if (education) formData.append('education', education);
        if (comment) formData.append('comment', comment);
        formData.append('photo', photo);

        if (selectedVacancyId !== null) {
            formData.append('career_id', selectedVacancyId.toString());
        }

        if (experience) {
            formData.append('experience', experience);
        } else {
            const emptyFile = new Blob([""], {type: "text/plain"});
            formData.append('experience', emptyFile, "empty.txt");
        }

        try {
            const res = await fetch('https://api.oguzforum.com/api/apply-job', {
                method: 'POST',
                body: formData,
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || 'Ошибка при отправке');
            }

            toast.success(s('successful'));
            clearPersonal();
            clearProfile();
        } catch (error) {
            console.error('Ошибка отправки:', error);
            toast.error(s('error'));
        }
    };

    if (isLoading) return <p>loading...</p>;
    if (error) return <p>error...</p>;
    if (!data) return <p>not found...</p>;

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000}/>
            <BackgroundUi src="Career.png" name="career"/>
            <div className="container mx-auto">
                <div
                    className="pt-12 pb-7 md:pb-10 md:pt-32 flex items-center justify-between md:gap-20 px-2 gap-2 md:px-7 w-full">
                    <div className="flex items-center">
                        <NavigationBackKnob/>
                        <div className="uppercase md:text-4xl text-xl font-extrabold text-mainBlue">
                            {t('title')}
                        </div>
                    </div>
                    <div
                        className="flex flex-col min-[340px]:flex-row border-[1px] border-slate-400 relative rounded-lg">
                        <button
                            onClick={() => setSelectedTab("vacancies")}
                            className={`md:px-7 md:py-2.5 p-3 text-[10px] w-full md:text-lg font-semibold rounded-lg text-nowrap ${
                                selectedTab === "vacancies" ? "bg-mainBlue text-white" : "text-mainBlue text-opacity-30"
                            }`}
                        >
                            {t('vacancies')}
                        </button>
                        <button
                            onClick={() => {
                                setSelectedVacancyId(null);
                                setSelectedTab("apply");
                            }}
                            className={`md:px-7 md:py-2.5 p-3 text-[10px] w-full md:text-lg font-semibold rounded-lg text-nowrap ${
                                selectedTab === "apply" ? "bg-mainBlue text-white" : "text-mainBlue text-opacity-30"
                            }`}
                        >
                            {t('apply')}
                        </button>
                    </div>
                </div>
            </div>

            {selectedTab === "vacancies" && (
                <CareerCardProps event={data} onSelect={handleVacancySelect}/>
            )}

            {selectedTab === "apply" && (
                <div className="container mx-auto px-5 md:px-20 xl:px-44 2xl:px-52 py-10 md:py-20">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-10 md:gap-20">
                        {/* --- Личная информация --- */}
                        <div className="flex flex-col">
                            <div className="flex justify-between gap-3 items-end md:items-center">
                                <h3 className="md:text-3xl lg:text-4xl text-2xl text-mainBlue font-semibold">{t('personal')}</h3>
                                <div className="flex items-end cursor-pointer">
                                    <RiDeleteBin5Line
                                        className="w-4 h-4 md:w-5 md:h-5 lg:h-7 lg:w-7 mb-[1px] mr-2 text-mainBlue"/>
                                    <div
                                        className="text-mainBlue font-semibold text-xs md:text-sm lg:text-lg xl:text-xl"
                                        onClick={clearPersonal}>{t('clear')}</div>
                                </div>
                            </div>
                            <div className="bg-mainBlue mt-2 w-full h-[2px]"></div>

                            <div className="grid gap-y-5 px-5 md:px-10 mt-7 md:mt-10 gap-x-10 grid-cols-1">
                                <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-10">
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="border w-full md:text-lg text-xs border-[#002A5F] lg:py-3 md:py-2.5 py-2 px-4 rounded-[10px]"
                                        placeholder={t('fname')}
                                        type="text"
                                    />
                                    <input
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                        className="w-full border md:text-lg text-xs border-[#002A5F] lg:py-3 md:py-2.5 py-2 px-4 rounded-[10px]"
                                        placeholder={t('lname')}
                                        type="text"
                                    />
                                </div>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="col-span-full w-full border md:text-lg text-xs border-[#002A5F] lg:py-3 md:py-2.5 py-2 px-4 rounded-[10px]"
                                    placeholder={t('email')}
                                    type="email"
                                />
                                <PhoneInput
                                    defaultCountry="tm"
                                    value={number}
                                    onChange={(phone) => setNumber(phone)}
                                />

                                <input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="col-span-full w-full border md:text-lg text-xs border-[#002A5F] lg:py-3 md:py-2.5 py-2 px-4 rounded-[10px]"
                                    placeholder={t('address')}
                                    type="text"
                                />

                                <label
                                    className="border flex flex-col justify-center items-center gap-y-4 py-10 md:py-15 md:text-sm text-xs border-[#2A5F66] px-3 rounded-xl col-span-full">
                                    <strong className="md:text-2xl text-lg text-mainBlue">{t('uploadPhoto')}</strong>
                                    <MdOutlineFileUpload className="w-10 text-mainBlue h-10 md:w-32 md:h-32"/>
                                    <p className="text-mainBlue text-xs text-center">{t('uploadText')}</p>
                                    <input ref={photoInputRef} type="file" onChange={handleFileChange} hidden/>
                                    {photo && (
                                        <div className="flex flex-col items-center text-mainBlue mt-4 text-sm">
                                            {/* Отображение превью, если это изображение */}
                                            {photo.type.startsWith("image/") && photoPreview ? (
                                                <img
                                                    src={photoPreview}
                                                    alt="Preview"
                                                    className="w-24 h-24 object-cover rounded-md border border-mainBlue"
                                                />
                                            ) : null}

                                            {/* Имя файла */}
                                            <p className="mt-2">{photo.name}</p>
                                        </div>
                                    )}

                                </label>
                            </div>
                        </div>

                        {/* --- Профиль --- */}
                        <div className="flex flex-col mt-5">
                            <div className="flex justify-between items-end">
                                <h3 className="md:text-3xl lg:text-4xl text-2xl text-mainBlue font-semibold">{t('profile')}</h3>
                                <div className="flex items-center cursor-pointer">
                                    <RiDeleteBin5Line
                                        className="w-4 h-4 md:w-5 md:h-5 lg:h-7 lg:w-7 mb-[1px] mr-2 text-mainBlue"/>
                                    <div
                                        className="text-mainBlue font-semibold text-xs md:text-sm lg:text-lg xl:text-xl"
                                        onClick={clearProfile}>{t('clear')}</div>
                                </div>
                            </div>
                            <div className="bg-mainBlue md:mt-5 w-[97%] self-center h-[2px] mt-2"></div>

                            <div className="flex flex-col px-5 md:px-10 mt-7 md:mt-16 gap-5 md:gap-10">
                                <div>
                                    <div onClick={() => forToggleOpen('first')}
                                         className="cursor-pointer flex justify-between text-2xl">
                                        <h3 className="text-mainBlue text-sm md:text-lg lg:text-xl font-semibold">{t('education')}</h3>
                                        <FaChevronDown className="md:w-5 md:h-5 lg:w-6 lg:h-6 w-3 h-3 text-mainBlue"/>
                                    </div>
                                    <div className="bg-mainBlue mt-3 w-full h-[2px]"></div>
                                    <AnimatePresence initial={false}>
                                        {active === 'first' && (
                                            <motion.div initial={{height: 0}} animate={{height: 'auto'}}
                                                        exit={{height: 0}}>
                                                <div className="py-10">
                                                    <textarea
                                                        value={education}
                                                        className="w-full border-[#2A5F66] px-4 py-3 rounded-xl h-52 resize-none border"
                                                        onChange={(e) => setEducation(e.target.value)}/>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div>
                                    <div onClick={() => forToggleOpen('second')}
                                         className="cursor-pointer flex justify-between text-2xl">
                                        <h3 className="text-mainBlue text-sm md:text-lg lg:text-xl font-semibold">{t('experience')}</h3>
                                        <FaChevronDown className="md:w-6 text-mainBlue md:h-6 w-3 h-3"/>
                                    </div>
                                    <div className="bg-mainBlue mt-3 w-full h-[2px]"></div>
                                    <AnimatePresence initial={false}>
                                        {active === 'second' && (
                                            <motion.div initial={{height: 0}} animate={{height: 'auto'}}
                                                        exit={{height: 0}}>
                                                <div className="py-10 flex flex-col gap-10">
                                                    <label
                                                        className="border flex flex-col justify-center items-center gap-y-5 py-10 md:py-12 md:text-sm text-xs border-[#2A5F66] px-3 rounded-md col-span-full">
                                                        <strong
                                                            className="md:text-2xl text-lg text-mainBlue">{t('uploadCV')}</strong>
                                                        <MdOutlineFileUpload
                                                            className="w-10 h-10 text-mainBlue xl:w-32 xl:h-32"/>
                                                        <p className="text-mainBlue text-xs text-center">{t('uploadText')}</p>
                                                        <input ref={cvInputRef} type="file"
                                                               onChange={handleFileChangeCv} hidden/>
                                                        {experience && (
                                                            <div
                                                                className="flex flex-col items-center text-mainBlue mt-4 text-sm">
                                                                {/* Отображение превью, если это изображение */}
                                                                {experience.type.startsWith("image/") && cvPreview ? (
                                                                    <img
                                                                        src={cvPreview}
                                                                        alt="Preview"
                                                                        className="w-24 h-24 object-cover rounded-md border border-mainBlue"
                                                                    />
                                                                ) : null}

                                                                {/* Имя файла */}
                                                                <p className="mt-2">{experience.name}</p>
                                                            </div>
                                                        )}
                                                    </label>
                                                    <textarea
                                                        value={comment}
                                                        className="w-full border-[#002A5F66] px-4 py-3 rounded-[10px] h-52 resize-none border"
                                                        onChange={(e) => setComment(e.target.value)}/>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-mainBlue md:w-48 w-32 rounded-xl text-sm md:text-xl font-bold py-3 md:py-4 self-center text-white"
                        >
                            {t('send')}
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
