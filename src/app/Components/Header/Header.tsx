'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import { makeNavItems } from './navItems';
import { RxHamburgerMenu } from "react-icons/rx";


export default function Header() {
    const pathname = usePathname() ?? '/';
    const locale = useLocale() ?? 'en';
    const router = useRouter();
    const t = useTranslations('Header');

    const navItems = makeNavItems(locale, t);

    const [isDesktopView, setIsDesktopView] = useState<boolean | null>(null);
    useEffect(() => {
        const checkScreen = () => setIsDesktopView(window.innerWidth >= 1280);
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 0);
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const [isMobileOpen, setMobileOpen] = useState(false);

    const [dropdownState, setDropdownState] = useState({
        company: false,
        newsroom: false,
        lang: false,
    });

    const timeouts = useRef<{ [k: string]: NodeJS.Timeout | null }>({
        company: null,
        newsroom: null,
        lang: null,
    });

    const openDropdown = (key: keyof typeof dropdownState) => {
        if (timeouts.current[key]) {
            clearTimeout(timeouts.current[key]!);
            timeouts.current[key] = null;
        }
        setDropdownState(prev => ({ ...prev, [key]: true }));
    };
    const closeDropdown = (key: keyof typeof dropdownState, delay = 150) => {
        if (timeouts.current[key]) clearTimeout(timeouts.current[key]!);
        timeouts.current[key] = setTimeout(() => {
            setDropdownState(prev => ({ ...prev, [key]: false }));
            timeouts.current[key] = null;
        }, delay);
    };

    const switchLanguage = (newLocale: string) => {
        const currentLocale = pathname.split('/')[1] || locale;
        const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
        router.push(newPath);
    };

    return (
        <header className={`fixed w-full z-20 transition-all duration-300 ${isScrolled ? 'main-background-color' : 'bg-gradient'}`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <a href={`/${locale}`} aria-label="Home" className="flex items-center w-fit">
                        <Image src="/icon.svg" width={220} height={240} alt="Logo" className="w-full"/>
                    </a>

                    {isDesktopView === null ? null : isDesktopView ? (
                        <DesktopMenu
                            navItems={navItems}
                            pathname={pathname}
                            dropdownState={dropdownState}
                            openDropdown={openDropdown}
                            closeDropdown={closeDropdown}
                            t={t}
                            switchLanguage={switchLanguage}
                            locale={locale}
                        />
                    ) : (
                        <>
                            <button aria-label="Open menu" className="xl:hidden text-white" onClick={() => setMobileOpen(true)}>
                                <RxHamburgerMenu size={24} />
                            </button>
                            <MobileMenu
                                open={isMobileOpen}
                                onClose={() => setMobileOpen(false)}
                                navItems={navItems}
                                pathname={pathname}
                                t={t}
                                locale={locale}
                                switchLanguage={switchLanguage}
                            />
                        </>
                    )}

                </div>
            </div>
        </header>
    );
}
