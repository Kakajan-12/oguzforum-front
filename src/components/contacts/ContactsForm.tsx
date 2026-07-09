"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { IconType } from "react-icons";
import {
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";
import {
  useGetContactsAddressQuery,
  useGetContactsNumberQuery,
  useGetContactsMailQuery,
  useGetLinksQuery,
} from "@/lib/api";
import { BASE_API_URL } from "@/constant";
import { PiTelegramLogo } from "react-icons/pi";
import { SlSocialLinkedin } from "react-icons/sl";
// Map the backend `icon` string (e.g. "instagram") to a react-icon component.
const SOCIAL_ICONS: Record<string, IconType> = {
  instagram: FaInstagram,
  telegram: PiTelegramLogo,
  linkedin: SlSocialLinkedin,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  facebook: FaFacebookF,
};

// Leaflet touches `window` on import, so load the map only in the browser.
const ContactsMap = dynamic(() => import("./ContactsMap"), { ssr: false });

const stripHtml = (s?: string) => (s ?? "").replace(/<[^>]*>?/gm, "").trim();

// Exact office location (provided by the client).
const OFFICE_COORDS = { lat: 37.900874322905376, lng: 58.334683920928336 };

const ContactsForm = () => {
  const { data: addresses } = useGetContactsAddressQuery();
  const { data: numbers } = useGetContactsNumberQuery();
  const { data: mails } = useGetContactsMailQuery();
  const { data: links } = useGetLinksQuery();

  // There can be several of each — render them all.
  const phones = (numbers ?? []).map((n) => n.number).filter(Boolean);
  const emails = (mails ?? []).map((m) => m.mail).filter(Boolean);
  const addressList = (addresses ?? [])
    .map((a) => stripHtml(a.address_en))
    .filter(Boolean);

  const socials = (links ?? [])
    .map((l) => ({
      id: l.id,
      url: l.url,
      Icon: SOCIAL_ICONS[l.icon?.toLowerCase() ?? ""],
    }))
    .filter((s) => s.Icon);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    captchaText: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [captchaImage, setCaptchaImage] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadCaptcha = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/captcha`, {
        method: "GET",
        credentials: "include",
      });
      setCaptchaImage(await res.text());
    } catch {
      /* captcha service unavailable — leave empty */
    }
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
      const res = await fetch(`${BASE_API_URL}/send-mail`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, surname: "", phone: phoneNumber }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to send message.");
      } else {
        setSuccess("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          captchaText: "",
        });
        setPhoneNumber("");
      }
    } catch {
      setError("Server error. Please try again later.");
    } finally {
      setSending(false);
      loadCaptcha();
    }
  };

  const inputClass =
    "w-full rounded bg-gray-100 px-4 py-2.5 text-sm outline-none ring-1 ring-transparent transition focus:ring-[#1268B3]";

  // Map points at the exact office location (OFFICE_COORDS).

  return (
    <section className="bg-white">
      <div className="px-4 lg:px-10 py-6 md:py-14 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-28 xl:gap-44">
          {/* ── Left: info ─────────────────────────────── */}
          <div>
            <h2 className="font-medium text-3xl sm:text-4xl lg:text-5xl">
              We are always ready to <br></br>help you
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed ">
              Our team is ready to answer your questions and help you find the
              best solution for your needs.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-24 gap-y-9 sm:grid-cols-[200px_1fr]">
              {phones.length > 0 && (
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg">Call Center</h3>
                  </div>
                  <div className="mt-2 space-y-1">
                    {phones.map((p, i) => (
                      <a
                        key={`phone-${i}`}
                        href={`tel:${p.replace(/\s/g, "")}`}
                        className="block text-base  transition-colors hover:text-[#1268B3]"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {addressList.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 ">
                    <h3 className="text-lg">Our Location</h3>
                  </div>
                  <div className="mt-2 space-y-2">
                    {addressList.map((a, i) => (
                      <p
                        key={`addr-${i}`}
                        className="text-base leading-relaxed"
                      >
                        {a}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {emails.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 ">
                    <h3 className="text-lg">Email</h3>
                  </div>
                  <div className="mt-2 space-y-1">
                    {emails.map((m, i) => (
                      <a
                        key={`mail-${i}`}
                        href={`mailto:${m}`}
                        className="block break-all text-base  transition-colors hover:text-[#1268B3]"
                      >
                        {m}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {socials.length > 0 && (
                <div>
                  <h3 className="text-lg">Social Network</h3>
                  <div className="mt-3 flex items-center gap-3">
                    {socials.map(({ id, url, Icon }) => (
                      <a
                        key={id}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAEAEA] text-[#797979] transition-colors hover:bg-blue-line hover:text-mainBlue"
                      >
                        <Icon size={23} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: form ────────────────────────────── */}
          <div>
            <h2 className="font-medium text-3xl  sm:text-4xl lg:text-5xl">
              Get in touch
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-1.5 block text-base font-capitana-medium ">
                  Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your name"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-base font-capitana-medium ">
                  Email
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Example@gmail.com"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-base font-capitana-medium ">
                  Phone Number
                </label>
                <PhoneInput
                  defaultCountry="tm"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  className="contacts-phone h-10"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-base font-capitana-medium">
                  Subject
                </label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  type="text"
                  placeholder="Contact request"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-base font-capitana-medium ">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type here"
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* CAPTCHA (server-side SVG) */}
              <div>
                <div className="flex items-center gap-3">
                  <div
                    className="overflow-hidden rounded bg-gray-100"
                    dangerouslySetInnerHTML={{ __html: captchaImage }}
                  />
                  <button
                    type="button"
                    onClick={loadCaptcha}
                    className="text-sm text-[#1268B3] underline"
                  >
                    Refresh
                  </button>
                </div>
                <input
                  name="captchaText"
                  value={formData.captchaText}
                  onChange={handleChange}
                  type="text"
                  placeholder="Code from the picture"
                  required
                  className={`${inputClass} mt-3`}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="rounded bg-[#1268B3] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0f5694] disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>

              {success && <p className="text-sm text-green-600">{success}</p>}
              {error && <p className="text-sm text-red-600">{error}</p>}
            </form>
          </div>
        </div>
      </div>

      {/* ── Map ──────────────────────────────────────── */}
      <div className="h-[320px] w-full sm:h-[420px] px-4 lg:px-10 relative z-0 mb-10 lg:mb-20">
        <ContactsMap lat={OFFICE_COORDS.lat} lng={OFFICE_COORDS.lng} />
      </div>
    </section>
  );
};

export default ContactsForm;
