"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IconType } from "react-icons";
import {
  FaInstagram,
  FaTelegramPlane,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";
import {
  useGetContactsMailQuery,
  useGetContactsNumberQuery,
  useGetLinksQuery,
} from "@/app/Apis/api";
import { CONTACT_EMAIL, CONTACT_PHONE, MEGA_GROUPS } from "./navItems";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: () => void;
};

// Map the backend `icon` string (e.g. "instagram") to a react-icon component.
const SOCIAL_ICONS: Record<string, IconType> = {
  instagram: FaInstagram,
  telegram: FaTelegramPlane,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  facebook: FaFacebookF,
};

export default function MegaMenu({ isOpen, onOpen, onClose, onNavigate }: Props) {
  const groups = MEGA_GROUPS;

  const { data: mailData } = useGetContactsMailQuery();
  const { data: numberData } = useGetContactsNumberQuery();
  const { data: links } = useGetLinksQuery();

  const phone = numberData?.[0]?.number ?? CONTACT_PHONE;
  const email = mailData?.[0]?.mail ?? CONTACT_EMAIL;

  const socials = (links ?? [])
    .map((l) => ({ ...l, Icon: SOCIAL_ICONS[l.icon?.toLowerCase()] }))
    .filter((l) => l.Icon && l.url);

  return (
    <div
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      className={`absolute left-0 right-0 top-full main-background-color border-t border-white/10 shadow-[0_16px_32px_rgba(0,0,0,0.35)]
        origin-top transition-all duration-200
        ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
    >
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand + contact block */}
          <div className="text-white">
            <p className="text-xl font-medium">Oguz Forum &amp; Expo</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Organizer of exhibitions, forums and business events.
            </p>
            <div className="mt-8">
              <p className="font-medium">Contacts</p>
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="block mt-3 text-sm text-white/80 hover:text-white">
                {phone}
              </a>
              <a href={`mailto:${email}`} className="block mt-2 text-sm text-white/80 hover:text-white">
                {email}
              </a>
            </div>
            {socials.length > 0 && (
              <div className="mt-6">
                <p className="font-medium">Social media</p>
                <div className="mt-3 flex items-center gap-3">
                  {socials.map(({ id, url, Icon }) => (
                    <a
                      key={id}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#002A5F] hover:bg-white/90 transition"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Link groups */}
          {groups.map((group) => (
            <div key={group.title} className="text-white">
              <p className="font-semibold text-lg">{group.title}</p>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label + link.href}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      onClick={onNavigate}
                      className="group flex items-center gap-2.5 text-sm text-white/85 hover:text-white"
                    >
                      <Image
                        src="/assets/link.svg"
                        width={12}
                        height={12}
                        alt=""
                        aria-hidden
                        className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
