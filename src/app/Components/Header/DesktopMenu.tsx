'use client';
import Link from 'next/link';
import React from 'react';
import DropdownMenu from './DropdownMenu';
import LanguageSwitcher from './LanguageSwitcher';
import type { NavItem } from './navItems';

type Props = {
    navItems: NavItem[];
    pathname: string;
    dropdownState: { company: boolean; newsroom: boolean; lang: boolean };
    openDropdown: (k: 'company' | 'newsroom' | 'lang') => void;
    closeDropdown: (k: 'company' | 'newsroom' | 'lang') => void;
    t: (k: string) => string;
    switchLanguage: (newLocale: string) => void;
    locale: string;
};

export default function DesktopMenu({ navItems, pathname, dropdownState, openDropdown, closeDropdown, t, switchLanguage, locale }: Props) {
    const isActive = (href: string) => {
        if (href === `/${locale}`) {
            return pathname === `/${locale}`;
        }

        return pathname === href || pathname.startsWith(href + '/');
    };


    return (
        <nav className="hidden lg:flex items-center text-white text-lg lg:text-xl">
            <ul className="flex items-center space-x-8">
                {navItems.map((item) => {
                    if (item.type === "link") {
                        return (
                            <li key={item.href} className="list-none">
                                <Link
                                    href={item.href}
                                    className={`no-underline pb-1 ${
                                        isActive(item.href) ? "border-b-2 border-white" : ""
                                    }`}
                                    prefetch={false}
                                >
                                    {t(item.labelKey)}
                                </Link>
                            </li>
                        );
                    }

                    const key = item.labelKey === "company" ? "company" : "newsroom";

                    return (
                        <li key={key} className="list-none relative">
                            <DropdownMenu
                                title={t(item.labelKey)}
                                items={item.items}
                                isOpen={dropdownState[key]}
                                onOpen={() => openDropdown(key)}
                                onClose={() => closeDropdown(key)}
                                pathname={pathname}
                                t={t}
                            />
                        </li>
                    );
                })}

                <li className="relative list-none">
                    <LanguageSwitcher
                        locale={locale}
                        isOpen={dropdownState.lang}
                        onOpen={() => openDropdown("lang")}
                        onClose={() => closeDropdown("lang")}
                        onSelect={switchLanguage}
                        variant="desktop"
                    />
                </li>
            </ul>
        </nav>
    );
}
