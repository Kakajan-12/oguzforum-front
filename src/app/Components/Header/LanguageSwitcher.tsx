'use client';
import React, {useEffect, useState} from 'react';
import { routing } from "@/i18n/routing";
import { BiSolidDownArrow } from "react-icons/bi";

type Props = {
    locale: string;
    isOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    onSelect: (newLocale: string) => void;
    variant?: 'desktop' | 'mobile';
};

export default function LanguageSwitcher({
                                             locale,
                                             isOpen = false,
                                             onOpen = () => {},
                                             onClose = () => {},
                                             onSelect,
                                             variant = 'desktop',
                                         }: Props) {
    const filtered = routing.locales.filter(l => l !== locale);

    // 🔹 MOBILE VARIANT: no dropdown, just buttons
    if (variant === 'mobile') {
        return (
            <div className="flex gap-3 mt-6">
                {[locale, ...filtered].map(l => (
                    <button
                        key={l}
                        onClick={() => onSelect(l)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                            l === locale
                                ? 'bg-white/20 text-white'
                                : 'text-white/70 hover:text-white'
                        }`}
                    >
                        {l.toUpperCase()}
                    </button>
                ))}
            </div>
        );
    }
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    // 🔹 DESKTOP VARIANT: dropdown with hover
    return (
        <div onMouseEnter={onOpen} onMouseLeave={onClose} className="relative">
            <div className="flex items-center cursor-pointer select-none space-x-2">
                <div className="text-white">{locale.toUpperCase()}</div>
                <BiSolidDownArrow
                    size={16}
                    className={`transition-transform text-white duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                />
            </div>

            <div
                className={`absolute mt-2 left-0 rounded-md divide-y-2 divide-white divide-opacity-40 
        backdrop-blur-[67.5px] shadow-[0_0_16px_1px_rgba(0,0,0,0.25)] bg-white/10 
        px-3 py-2 transition-all duration-150 origin-top 
        ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        ${
                    isScrolled
                        ? 'main-background-color shadow-lg'
                        : 'backdrop-blur-[67.5px] shadow-[0_0_16px_1px_rgba(0,0,0,0.25)] bg-white/10'
                }`}
            >
                {filtered.map(l => (
                    <button
                        key={l}
                        onClick={() => onSelect(l)}
                        className="block w-full text-left text-white py-1"
                    >
                        {l.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
}
