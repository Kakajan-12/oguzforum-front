"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiPhone, FiMail } from "react-icons/fi";
import {
  useGetContactsMailQuery,
  useGetContactsNumberQuery,
  useGetLinksQuery,
} from "@/lib/api";
import LanguageSwitcher from "@/components/layout/LangSwither";
import { useTranslations } from "next-intl";

const SOCIAL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  telegram: "Telegram",
  linkedin: "LinkedIn",
  whatsapp: "WhatsApp",
  youtube: "YouTube",
  facebook: "Facebook",
};

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-capitana-medium text-white md:border-b border-white/40 pb-2">
        {children}
      </h3>
    </div>
  );
}

const DefaultFooter = () => {
  const t = useTranslations("Footer");
  const INFORMATION = [
    { name: t("events"), href: "/events" },
    { name: t("projects"), href: "/projects" },
    { name: t("newsroom"), href: "/news" },
    { name: t("company profile"), href: "/about" },
    { name: t("faq"), href: "/faq" },
  ];

  const BOTTOM_LINKS = [
    { name: t("terms"), href: "/termsofuse" },
    { name: t("privacy"), href: "/privacypolicy" },
    { name: t("cookie"), href: "/cookieterms" },
  ];
  const { data: mailData } = useGetContactsMailQuery();
  const { data: numberData } = useGetContactsNumberQuery();
  const { data: links } = useGetLinksQuery();

  const socials =
    links && links.length > 0
      ? links
          .map((l) => ({
            id: l.id,
            url: l.url,
            label: SOCIAL_LABELS[l.icon?.toLowerCase()] ?? l.icon,
          }))
          .filter((s) => s.label)
      : [{ id: 0, url: "https://instagram.com", label: "Instagram" }];

  const [openSection, setOpenSection] = useState<string | null>(null);
  const toggle = (key: string) =>
    setOpenSection((prev) => (prev === key ? null : key));

  const Section = ({
    id,
    title,
    children,
    className = "",
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
    className?: string;
  }) => {
    const open = openSection === id;
    return (
      <div className={`py-4 ${className}`}>
        <button
          type="button"
          onClick={() => toggle(id)}
          className="flex w-full items-center justify-between text-left md:pointer-events-none"
        >
          <Heading>{title}</Heading>
          <Image
            src="/assets/link.svg"
            width={16}
            height={16}
            alt=""
            className={`transition-transform duration-300 md:hidden ${
              open ? "rotate-90" : ""
            }`}
          />
        </button>
        <div
          className={`mt-4 flex-col gap-3 md:mt-5 md:flex ${
            open ? "flex" : "hidden"
          }`}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-[#0164A8] to-[#06306A] text-white">
      {/* watermark: faint OGUZ sun, bleeds off the right edge (desktop) */}
      <Image
        src="/logo.svg"
        alt=""
        aria-hidden
        width={620}
        height={620}
        priority={false}
        className="pointer-events-none absolute right-0 top-1/2 hidden h-[150%] w-auto -translate-y-1/4 translate-x-[37%] select-none opacity-[0.07] md:block"
      />
      <div className="container relative z-10 mx-auto px-4 pt-12 pb-3">
        <div className="grid grid-cols-1 gap-x-6 lg:gap-x-10 gap-y-4 md:grid-cols-[1.5fr_1fr_1fr_1.1fr] py-6">
          {/* Brand */}
          <div className="mb-6 md:mb-0 flex md:flex-col items-start justify-between">
            <div className="flex flex-col gap-5 md:gap-9">
              <div className="shrink-0">
                <Image
                  src="/oguzWhite.svg"
                  width={182}
                  height={68}
                  alt="Oguz Forum & Expo"
                  className=""
                />
              </div>
              <p className="text-lg md:text-xl text-white font-capitana-medium">
                {t("title")}
              </p>
            </div>
            <LanguageSwitcher />
          </div>

          {/* Information */}
          <Section id="information" title={t("info")}>
            {INFORMATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base text-white transition-colors hover:text-white/80"
              >
                {item.name}
              </Link>
            ))}
          </Section>

          {/* Social Media — on mobile it goes after Contact (per mobile design) */}
          <Section
            id="social"
            title={t("social")}
            className="order-last md:order-none"
          >
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-base text-white underline underline-offset-4 transition-colors hover:text-white/80"
              >
                {s.label}
              </a>
            ))}
          </Section>

          {/* Contact */}
          <Section id="contact" title={t("contact")}>
            {numberData &&
              numberData.length > 0 &&
              numberData.map((item) => (
                <a
                  key={item.id ?? item.number}
                  href={`tel:${item.number.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 text-base text-white transition-colors hover:text-white/85"
                >
                  <FiPhone className="shrink-0" size={17} />
                  {item.number}
                </a>
              ))}
            {mailData &&
              mailData.length > 0 &&
              mailData.map((item) => (
                <a
                  key={item.id ?? item.mail}
                  href={`mailto:${item.mail}`}
                  className="flex items-center gap-3 text-base text-white transition-colors hover:text-white/85"
                >
                  <FiMail className="shrink-0" size={17} />
                  {item.mail}
                </a>
              ))}
          </Section>
        </div>

        {/* Bottom bar */}
        <div className="mt-3 flex flex-col gap-4 border-t border-white/85 pt-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white">
            {BOTTOM_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 text-sm text-white/75">
            <span>
              © {new Date().getFullYear()}, {t("copyright")}
            </span>
            <a
              href="https://hebent.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-medium text-white/90 transition-opacity hover:opacity-80"
            >
              <Image
                src="/hebent.svg"
                alt=""
                width={200}
                height={200}
                className="w-full"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DefaultFooter;
