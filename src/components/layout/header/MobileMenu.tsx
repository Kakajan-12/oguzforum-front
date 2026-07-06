"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconType } from "react-icons";
import { FiX, FiChevronLeft } from "react-icons/fi";
import {
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import { SlSocialLinkedin } from "react-icons/sl";
import {
  useGetContactsMailQuery,
  useGetContactsNumberQuery,
  useGetLinksQuery,
} from "@/lib/api";
import { MEGA_GROUPS, type Edition, type MegaGroup } from "./navItems";

type Props = {
  open: boolean;
  onClose: () => void;
  editions: Edition[];
  pathname: string;
};

const SOCIAL_ICONS: Record<string, IconType> = {
  instagram: FaInstagram,
  telegram: PiTelegramLogo,
  linkedin: SlSocialLinkedin,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  facebook: FaFacebookF,
};

export default function MobileMenu({
  open,
  onClose,
  editions,
  pathname,
}: Props) {
  const groups = MEGA_GROUPS;
  const [activeGroup, setActiveGroup] = useState<MegaGroup | null>(null);

  const { data: mailData } = useGetContactsMailQuery();
  const { data: numberData } = useGetContactsNumberQuery();
  const { data: links } = useGetLinksQuery();

  const phones = numberData?.map((n) => n.number) ?? [];
  const emails = mailData?.map((m) => m.mail) ?? [];
  const socials = (links ?? [])
    .map((l) => ({
      ...l,
      Icon: SOCIAL_ICONS[l.icon?.toLowerCase() ?? ""] as IconType | undefined,
    }))
    .filter(
      (l): l is typeof l & { Icon: IconType } =>
        Boolean(l.Icon) && Boolean(l.url),
    );

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // Lock body scroll while open; reset drill-down level when closed.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) setActiveGroup(null);
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#06306A] lg:hidden flex flex-col transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full pointer-events-none"
      }`}
    >
      {/* Top bar: logo (or back arrow when drilled in) + close */}
      <div className="flex items-center justify-between px-5 h-20 shrink-0">
        {activeGroup ? (
          <button
            onClick={() => setActiveGroup(null)}
            aria-label="Back"
            className="text-white -ml-1"
          >
            <FiChevronLeft size={26} />
          </button>
        ) : (
          <Link
            href={`/`}
            onClick={onClose}
            aria-label="Home"
            className="flex items-center"
          >
            <Image
              src="/oguzWhite.svg"
              width={267}
              height={100}
              alt="Oguz Forum & Expo"
              className="h-10 w-auto"
              priority
            />
          </Link>
        )}
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="text-white"
        >
          <FiX size={26} />
        </button>
      </div>

      <div className="flex-1 overflow-auto px-5 pb-10">
        {activeGroup ? (
          /* ---- Level 2: drilled-in group ---- */
          <div>
            <p className="text-lg font-capitana-medium capitalize text-white">
              {activeGroup.title}
            </p>
            <ul className="mt-6 flex flex-col gap-5 ">
              {activeGroup.links.map((link) => (
                <li key={link.label + link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    prefetch={false}
                    className="block text-base capitalize text-white hover:text-white/80"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          /* ---- Level 1: top-level ---- */
          <div>
            {/* Editions */}
            <ul className="pt-2">
              {editions.map((e) => (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    onClick={onClose}
                    prefetch={false}
                    className={`block py-3 text-base capitalize ${
                      isActive(e.href)
                        ? "text-white font-medium"
                        : "text-white/90"
                    }`}
                  >
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Groups (drill-down) */}
            <ul className="mt-3 border-t-[0.5px] border-white/60 pt-3">
              {groups.map((group) => (
                <li key={group.title}>
                  <button
                    onClick={() => setActiveGroup(group)}
                    className="flex w-full items-center justify-between py-3.5 text-left font-capitana-medium  text-base capitalize text-white"
                  >
                    {group.title}
                    <Image
                      src="/assets/link.svg"
                      width={14}
                      height={14}
                      alt=""
                      aria-hidden
                      className="h-3.5 w-3.5"
                    />
                  </button>
                </li>
              ))}
            </ul>

            {/* Contacts */}
            {(phones.length > 0 || emails.length > 0) && (
              <div className="mt-4 border-t-[0.5px] border-white/60 pt-6">
                <p className="text-base font-capitana-medium capitalize text-white">
                  Contacts
                </p>
                {phones.map((p, i) => (
                  <a
                    key={`phone-${i}`}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className={`block text-base text-white hover:text-white/80 ${i === 0 ? "mt-4" : "mt-2"}`}
                  >
                    {p}
                  </a>
                ))}
                {emails.map((m, i) => (
                  <a
                    key={`mail-${i}`}
                    href={`mailto:${m}`}
                    className="mt-2 block text-base text-white hover:text-white/80"
                  >
                    {m}
                  </a>
                ))}
              </div>
            )}

            {/* Social media */}
            {socials.length > 0 && (
              <div className="mt-7">
                <p className="text-base font-capitana-medium text-white">
                  Social media
                </p>
                <div className="mt-4 flex items-center gap-3">
                  {socials.map(({ id, url, Icon }) => (
                    <a
                      key={id}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#002A5F] hover:bg-white/90 transition"
                    >
                      <Icon size={23} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
