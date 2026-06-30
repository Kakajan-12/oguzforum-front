"use client";
import CareerCardProps from "@/app/Components/CareerComponents/CareerCardProps";
import { useApplyJobMutation, useGetCareerQuery } from "@/app/Apis/api";
import React, { useState, useRef } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import NavigationBackKnob from "@/app/Components/ForBackKnob/NavigationBackKnob";
import BackgroundUi from "@/app/BackgroundUI/BackgroundStatic";

import { BASE_API_URL } from "@/constant";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "@/app/Components/UI/Spinner";
import ErrorMessage from "@/app/Components/UI/ErrorMessage";
import "react-toastify/dist/ReactToastify.css";
import { TbPaperclip, TbTrash } from "react-icons/tb";

export default function CareerRedirectPage() {


  const { data, error, isLoading } = useGetCareerQuery();
  const [createProfile] = useApplyJobMutation();
  const [active, setActive] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<"vacancies" | "apply">(
    "vacancies"
  );
  const [selectedVacancyId, setSelectedVacancyId] = useState<number | null>(
    null
  );
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const portfolioInput = useRef<HTMLInputElement>(null);
  const cvInput = useRef<HTMLInputElement>(null);

  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handlePortfolioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPortfolioFile(file);
    }
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setCvFile(file);
    }
  };

  const removePortfolio = () => {
    setPortfolioFile(null);
    if (portfolioInput.current) portfolioInput.current.value = "";
  };

  const removeCv = () => {
    setCvFile(null);
    if (cvInput.current) cvInput.current.value = "";
  };

  const forToggleOpen = (section: string) => {
    setActive((prev) => (prev === section ? null : section));
  };

  const handleVacancySelect = (vacancyId: number) => {
    setSelectedVacancyId(vacancyId);
    setSelectedTab("apply");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("number", number);

    if (portfolioFile) formData.append("portfolio", portfolioFile);
    if (cvFile) formData.append("cv", cvFile);

    if (selectedVacancyId !== null) {
      formData.append("career_id", selectedVacancyId.toString());
    }

    try {
      const res = await fetch(`${BASE_API_URL}/apply-job`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Ошибка при отправке");
      }

      toast.success("Application sent successfully!");
      resetForm();
    } catch (error) {
      console.error("Ошибка отправки:", error);
      toast.error("There was an error sending...");
    }
  };

  const resetForm = () => {
    setName("");
    setSurname("");
    setEmail("");
    setNumber("");

    setPortfolioFile(null);
    setCvFile(null);

    if (portfolioInput.current) portfolioInput.current.value = "";
    if (cvInput.current) cvInput.current.value = "";

    setSelectedVacancyId(null);
  };

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;
  if (!data)
    return (
      <p className="flex justify-center items-center h-screen">not found...</p>
    );

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <BackgroundUi src="Career.webp" name="career" />
      <div className="container mx-auto px-4">
        <div className="py-3 md:py-4 flex items-center justify-between w-full">
          <div className="flex items-center">
            <NavigationBackKnob />
            <div className="uppercase text-xl md:text-4xl font-extrabold text-mainBlue">
              {"careers"}
            </div>
          </div>
          <div className="flex min-[340px]:flex-row border-[1px] border-slate-400 rounded-lg">
            <button
              onClick={() => setSelectedTab("vacancies")}
              className={`py-2 px-4 text-[10px] md:text-sm lg:text-md w-full font-semibold rounded-lg text-nowrap ${
                selectedTab === "vacancies"
                  ? "bg-mainBlue text-white"
                  : "text-mainBlue text-opacity-30"
              }`}
            >
              {"Vacancies"}
            </button>
            <button
              onClick={() => {
                setSelectedVacancyId(null);
                setSelectedTab("apply");
              }}
              className={`py-2 px-4 text-[10px] md:text-sm lg:text-md w-full font-semibold rounded-lg text-nowrap ${
                selectedTab === "apply"
                  ? "bg-mainBlue text-white"
                  : "text-mainBlue text-opacity-30"
              }`}
            >
              {"Apply for job"}
            </button>
          </div>
        </div>
      </div>

      {selectedTab === "vacancies" && (
        <CareerCardProps event={data} onSelect={handleVacancySelect} />
      )}

      {selectedTab === "apply" && (
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col space-y-4">
              <div className="w-full">
                <h3 className="text-lg md:text-3xl lg:text-4xl font-bold text-center">
                  {"Personal information"}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                <div>
                  <label className="text-sm md:text-md lg:text-lg">
                    {"First name"}
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs sm:text-sm md:text-md lg:text-lg border-slate-400 border-b py-2 px-3 bg-gray-200"
                    type="text"
                  />
                </div>

                <div>
                  <label className="text-sm md:text-md lg:text-lg">
                    {"Last name"}
                  </label>
                  <input
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className="w-full text-xs sm:text-sm md:text-md lg:text-lg border-slate-400 border-b py-2 px-3 bg-gray-200"
                    type="text"
                  />
                </div>

                <div>
                  <label className="text-sm md:text-md lg:text-lg">
                    {"Email"}
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs sm:text-sm md:text-md lg:text-lg border-slate-400 border-b py-2 px-3 bg-gray-200"
                    type="email"
                  />
                </div>

                <div>
                  <label className="text-sm md:text-md lg:text-lg">
                    {"Phone"}
                  </label>
                  <PhoneInput
                    defaultCountry="tm"
                    value={number}
                    onChange={(phone) => setNumber(phone)}
                  />
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-lg md:text-3xl lg:text-4xl font-bold text-center">
                  {"Portfolio"}
                </h3>
                <div className="pt-2 space-y-3">
                  <div className="text-xs sm:text-sm md:text-md lg:text-lg">
                    {"Add or drop your files here"}
                  </div>
                  {!portfolioFile ? (
                    <label className="w-full flex items-center justify-between border border-slate-300 p-2 rounded-md bg-gray-100 cursor-pointer">
                      {"Upload portfolio (pdf)"}

                      <TbPaperclip size={22} className="text-gray-600" />

                      <input
                        ref={portfolioInput}
                        type="file"
                        accept="application/pdf"
                        hidden
                        onChange={handlePortfolioChange}
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between border border-slate-300 p-2 rounded-md bg-gray-100">
                      <span>{portfolioFile.name}</span>

                      <button
                        onClick={removePortfolio}
                        className="bg-mainBlue text-white p-2 rounded-full"
                      >
                        <TbTrash size={18} />
                      </button>
                    </div>
                  )}
                  {!cvFile ? (
                    <label className="w-full flex items-center justify-between border border-slate-300 p-2 rounded-md bg-gray-100 cursor-pointer">
                      {"Upload CV (pdf)"}

                      <TbPaperclip size={22} className="text-gray-600" />

                      <input
                        ref={cvInput}
                        type="file"
                        accept="application/pdf"
                        hidden
                        onChange={handleCvChange}
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between border border-slate-300 p-2 rounded-md bg-gray-100">
                      <span>{cvFile.name}</span>

                      <button
                        onClick={removeCv}
                        className="bg-mainBlue text-white p-2 rounded-full"
                      >
                        <TbTrash size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-mainBlue md:w-44 w-32 rounded-md text-sm sm:text-sm md:text-md lg:text-lg font-bold py-2 md:py-3 self-center text-white my-2 md:my-4"
            >
              {"Send"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
