"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {IconType} from "react-icons";
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
} from "@/lib/api";
import {MEGA_GROUPS} from "./navItems";

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

export default function MegaMenu({isOpen, onOpen, onClose, onNavigate}: Props) {
    const groups = MEGA_GROUPS;

    const {data: mailData} = useGetContactsMailQuery();
    const {data: numberData} = useGetContactsNumberQuery();
    const {data: links} = useGetLinksQuery();

    const phones = numberData?.map((n) => n.number) ?? [];
    const emails = mailData?.map((m) => m.mail) ?? [];

    const socials = (links ?? [])
        .map((l) => ({...l, Icon: SOCIAL_ICONS[l.icon?.toLowerCase() ?? ""] as IconType | undefined}))
        .filter((l): l is typeof l & { Icon: IconType } => Boolean(l.Icon) && Boolean(l.url));

    return (
        <div
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            className={`absolute left-0 right-0 top-full main-background-color border-t border-white/10 shadow-[0_16px_32px_rgba(0,0,0,0.35)]
        origin-top transition-all duration-200
        ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
        >
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Brand + contact block */}
                    <div>
                        <div className="text-white">
                            <p className="text-xl font-medium">Oguz Forum | Expo</p>
                            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
                                We understand that every project is unique, which is why we provide a tailored approach
                                to each client.
                            </p>
                            <div className="flex items-start gap-8 mt-8">
                                {(phones.length > 0 || emails.length > 0) && (
                                    <div>
                                        <p className="font-medium">Contacts</p>
                                        {phones.map((p, i) => (
                                            <a
                                                key={`phone-${i}`}
                                                href={`tel:${p.replace(/\s/g, "")}`}
                                                className={`block text-sm text-white/80 hover:text-white ${i === 0 ? "mt-3" : "mt-2"}`}
                                            >
                                                {p}
                                            </a>
                                        ))}
                                        {emails.map((m, i) => (
                                            <a
                                                key={`mail-${i}`}
                                                href={`mailto:${m}`}
                                                className="block mt-2 text-sm text-white/80 hover:text-white"
                                            >
                                                {m}
                                            </a>
                                        ))}
                                    </div>
                                )}
                                {socials.length > 0 && (
                                    <div>
                                        <p className="font-medium">Social media</p>
                                        <div className="mt-3 flex items-center gap-3">
                                            {socials.map(({id, url, Icon}) => (
                                                <a
                                                    key={id}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#002A5F] hover:bg-white/90 transition"
                                                >
                                                    <Icon size={16}/>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
        </div>
    );
}
