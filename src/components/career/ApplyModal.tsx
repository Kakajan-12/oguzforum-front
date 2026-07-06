"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { FiX, FiUploadCloud, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { Career } from "@/types";
import RichText from "@/components/ui/RichText";
import { BASE_API_URL } from "@/constant";

interface Props {
  vacancy: Career;
  onClose: () => void;
}

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export default function ApplyModal({ vacancy, onClose }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const pickFile = (file?: File | null) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error("File is too large (max 10 MB).");
      return;
    }
    setCvFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      toast.error("Please fill in your name and email.");
      return;
    }
    if (!agreed) {
      toast.error("Please agree to the processing of your personal data.");
      return;
    }

    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("surname", "");
    formData.append("email", email);
    formData.append("number", number);
    formData.append("career_id", String(vacancy.id));
    if (cvFile) formData.append("cv", cvFile);

    setSubmitting(true);
    try {
      const res = await fetch(`${BASE_API_URL}/apply-job`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to submit");
      toast.success("Application sent successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("There was an error sending your application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed top-20 inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 p-4 py-10"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded bg-white p-4 shadow-xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 sm:top-5 z-10 text-gray-500 transition-colors hover:text-gray-800"
        >
          <FiX size={22} />
        </button>

        <h2 className="text-lg font-bold text-gray-900">Applying for:</h2>
        <RichText
          htmlContent={vacancy.en}
          className="text-xl font-semibold text-gray-900"
        />
        <p className="mt-2 text-sm text-gray-500">
          Please complete the form below and upload your CV. Our team will
          review your application and contact shortlisted candidates.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-900">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full rounded bg-gray-100 px-4 py-2.5 text-sm outline-none ring-1 ring-transparent focus:ring-[#1268B3]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-900">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Example@gmail.com"
                className="w-full rounded bg-gray-100 px-4 py-2.5 text-sm outline-none ring-1 ring-transparent focus:ring-[#1268B3]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-900">
              Phone Number
            </label>
            <PhoneInput
              defaultCountry="tm"
              value={number}
              onChange={setNumber}
              className="apply-phone"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-900">
              Resume / CV
            </label>
            {!cvFile ? (
              <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  pickFile(e.dataTransfer.files?.[0]);
                }}
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center transition-colors hover:border-[#1268B3]"
              >
                <FiUploadCloud size={30} className="text-gray-400" />
                <span className="text-sm text-gray-700">
                  Drag &amp; drop your file here or browse
                </span>
                <span className="text-xs text-gray-400">
                  Supported formats: PDF (max. 10 MB)
                </span>
                <input
                  ref={fileInput}
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={(e) => pickFile(e.target.files?.[0])}
                />
              </label>
            ) : (
              <div className="flex items-center justify-between rounded border border-gray-300 bg-gray-50 px-4 py-3">
                <span className="truncate text-sm text-gray-700">
                  {cvFile.name}
                </span>
                <button
                  type="button"
                  onClick={() => setCvFile(null)}
                  className="ml-3 shrink-0 rounded-full bg-[#1268B3] p-2 text-white"
                  aria-label="Remove file"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            )}
          </div>

          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5"
            />
            <span>
              I agree to the processing of my personal data in accordance with
              the{" "}
              <a href="/privacypolicy" className="text-[#1268B3] underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 rounded bg-[#1268B3] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0f5694] disabled:opacity-60"
            >
              {submitting ? (
                "Sending..."
              ) : (
                <>
                  Submit application
                  <Image src="/assets/link.svg" width={14} height={14} alt="" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
