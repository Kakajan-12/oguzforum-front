'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import type { NavItem } from './navItems';
import LanguageSwitcher from './LanguageSwitcher';
import {BiSolidDownArrow} from "react-icons/bi";

type Props = {
    open: boolean;
    onClose: () => void;
    navItems: NavItem[];
    pathname: string;
    t: (k: string) => string;
    locale: string;
    switchLanguage: (l: string) => void;
};

export default function MobileMenu({ open, onClose, navItems, pathname, t, locale, switchLanguage }: Props) {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const isActive = (href: string) => {
        if (href === `/${locale}`) return pathname === `/${locale}`;
        return pathname === href || pathname.startsWith(href + '/');
    };

    const isDropdownActive = (items: { href: string }[]) =>
        items.some(i => pathname === i.href || pathname.startsWith(i.href + '/'));

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <aside
                className={`relative ml-auto h-full w-2/3 transform transition-transform duration-300 ease-in-out 
                    ${open ? 'translate-x-0' : 'translate-x-full'} 
                    backdrop-blur-[67.5px] shadow-[0_0_16px_1px_rgba(0,0,0,0.25)] bg-white/10 
                    p-6 overflow-auto`}
            >
                <div className="flex justify-end">
                    <button onClick={onClose} aria-label="Close menu" className="mb-6 text-white flex items-center gap-2">
                        <AiOutlineClose size={22} />
                    </button>
                </div>

                <ul className="space-y-4">
                    {navItems.map(item => {
                        if (item.type === 'link') {
                            return (
                                <li
                                    key={item.href}
                                    className={`px-2 text-white ${isActive(item.href) ? 'bg-white/10 rounded-md' : ''}`}
                                >
                                    <Link href={item.href} onClick={onClose} prefetch={false} className="block py-3">
                                        {t(item.labelKey)}
                                    </Link>
                                </li>
                            );
                        } else {
                            const key = item.labelKey;
                            const isOpen = openDropdown === key;
                            return (
                                <li key={key} className="text-white">
                                    <button
                                        onClick={() => setOpenDropdown(isOpen ? null : key)}
                                        className={`w-full text-left py-3 px-2 flex justify-between items-center ${
                                            isDropdownActive(item.items) ? 'bg-white/10 rounded-md' : ''
                                        }`}
                                    >
                                        {t(item.labelKey)}
                                        <BiSolidDownArrow
                                            size={15}
                                            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className="pl-4">
                                            {item.items.map(i => (
                                                <Link
                                                    key={i.href}
                                                    href={i.href}
                                                    onClick={() => {
                                                        onClose();
                                                        setOpenDropdown(null);
                                                    }}
                                                    className="block py-2"
                                                >
                                                    {t(i.labelKey)}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            );
                        }
                    })}
                </ul>

                <div className="mt-8">
                    <LanguageSwitcher
                        locale={locale}
                        variant="mobile"
                        onSelect={l => {
                            switchLanguage(l);
                            onClose();
                        }}
                    />
                </div>
            </aside>
        </div>
    );
}

