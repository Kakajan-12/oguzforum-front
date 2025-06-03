'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import Image from "next/image";

export default function Header() {
    const location = usePathname();
    const locale = useLocale();
    const router = useRouter();
    const currentlocale = location.split('/')[1];

    const [isDesktopView, setIsDesktopView] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsDesktopView(window.innerWidth >= 1024);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const switchLanguage = (newLocale: string) => {
        const newPath = location.replace(`/${currentlocale}`, `/${newLocale}`);
        router.push(newPath);
    };

    const filteredlanguages = routing.locales.filter(
        (lang) => lang !== locale
    );

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [isLangOpen, setLangOpen] = useState(false);

    const aboutDropdownRef = useRef<HTMLLIElement | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        const handleClickOutside = (event: any) => {
            if (
                aboutDropdownRef.current &&
                !aboutDropdownRef.current.contains(event.target)
            ) {
                setAboutDropdownOpen(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const openAboutMenu = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setAboutDropdownOpen(true);
    };

    const closeAboutMenu = () => {
        timeoutRef.current = setTimeout(() => {
            setAboutDropdownOpen(false);
        }, 200); // задержка 200мс, чтобы успеть навести на подменю
    };

    const toggleAboutMenu = () => {
        if (!isDesktopView) {
            setAboutDropdownOpen(!isAboutDropdownOpen);
        }
    };

    const openLang = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setLangOpen(true);
    };

    const closeLang = () => {
        timeoutRef.current = setTimeout(() => {
            setLangOpen(false);
        }, 200);
    };

    const toggleLang = () => {
        if (!isDesktopView) {
            setLangOpen(!isDesktopView);
        }
    };

    const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
    const t = useTranslations('Header');

    return (
        <header
            className={`fixed w-full z-20 ${
                isScrolled ? "bg-custom-gradient" : "bg-gradient"
            } transition-all duration-300`}
        >
            <div className="container mx-auto px-2">
                <div className="flex items-center justify-between h-20 sm:h-28">
                    <Link href="/" className="text-white font-extrabold">
                        <Image
                            width={100}
                            height={10}
                            className="lg:w-36 xl:w-44 w-32 h-full"
                            alt="Logo"
                            src="/logoOguzForm.png"
                        />
                    </Link>
                    <div className="hidden lg:flex">
                        <nav className="text-white text-lg font-normal lg:text-xl">
                            <ul className="flex items-center space-x-5">
                                <li>
                                    <Link href="/">{t("home")}</Link>
                                </li>

                                {/* Главный li для About с ref и обработчиками */}
                                <li
                                    className="relative"
                                    ref={aboutDropdownRef}
                                    onMouseEnter={() => isDesktopView && openAboutMenu()}
                                    onMouseLeave={() => isDesktopView && closeAboutMenu()}
                                >
                                    {/* Кнопка для десктопа и мобильного */}
                                    <button
                                        onClick={toggleAboutMenu}
                                        className="cursor-pointer relative text-white"
                                        type="button"
                                    >
                                        {t("aboutus")}
                                    </button>

                                    {/* Подменю */}
                                    {isAboutDropdownOpen && (
                                        <div
                                            className="-left-14 absolute mt-2 bg-slate-800 z-50 rounded-xl shadow-lg px-4 py-2 flex flex-col space-y-2 w-max divide-y-2 divide-white divide-opacity-40"
                                            onMouseEnter={() => isDesktopView && openAboutMenu()}
                                            onMouseLeave={() => isDesktopView && closeAboutMenu()}
                                        >
                                            <Link
                                                href="/weare"
                                                onClick={() => setAboutDropdownOpen(false)}
                                                className="text-white text-center"
                                            >
                                                {t("weare")}
                                            </Link>
                                            <Link
                                                href="/upcoming"
                                                onClick={() => setAboutDropdownOpen(false)}
                                                className="text-white text-center"
                                            >
                                                {t("upcoming")}
                                            </Link>
                                            <Link
                                                href="/career"
                                                onClick={() => setAboutDropdownOpen(false)}
                                                className="text-white text-center"
                                            >
                                                {t("career")}
                                            </Link>
                                        </div>
                                    )}
                                </li>

                                <li>
                                    <Link href="/services">{t("services")}</Link>
                                </li>
                                <li>
                                    <Link href="/projects">{t("projects")}</Link>
                                </li>
                                <li>
                                    <Link href="/news">{t("news")}</Link>
                                </li>
                                <li>
                                    <Link href="/contacts">{t("contacts")}</Link>
                                </li>
                                <li
                                    className="flex items-center relative cursor-pointer"
                                    onMouseEnter={() => isDesktopView && openLang()}
                                    onMouseLeave={() => isDesktopView && closeLang()}
                                >
                                    <div>{locale.toUpperCase()}</div>
                                    <svg
                                        className="-mt-1 ml-1 lang-drop"
                                        width="12"
                                        height="9"
                                        viewBox="0 0 12 9"
                                        fill="none"
                                    >
                                        <path
                                            d="M5.17 8.4L1.12 2.61C0.47 1.69 1.13 0.41 2.27 0.41h7.45c1.13 0 1.79 1.27 1.14 2.2L6.81 8.4a0.74 0.74 0 0 1-1.64 0z"
                                            fill="white"
                                        />
                                    </svg>
                                    {isLangOpen && (
                                        <div className="animation-lang rounded-xl bg-gradient-to-b from-slate-700 to-slate-800 shadow-lg px-4 py-2 -ml-2 mt-32 absolute">
                                            {filteredlanguages.map((l, i) => (
                                                <div onClick={() => switchLanguage(l)} key={l}>
                                                    {l.toUpperCase()}
                                                    <div
                                                        className={`bg-white h-[1px] my-[5px] ${
                                                            i === 1 ? "hidden" : "block"
                                                        }`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Кнопка мобильного меню */}
                    <button className="lg:hidden text-white" onClick={toggleMobileMenu}>
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>

                {/* Мобильное меню */}
                {isMobileMenuOpen && (
                    <nav
                        className="lg:hidden text-white backdrop-blur-lg absolute z-10 top-0 right-0 w-2/3 h-screen rounded-tl-3xl rounded-bl-3xl flex justify-end"
                    >
                        <button
                            className="absolute top-6 right-2 sm:top-7 sm:right-7 text-white"
                            onClick={toggleMobileMenu}
                        >
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <ul className="flex flex-col space-y-2 p-4 mt-20 w-2/3">
                            <li>
                                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                                    {t("home")}
                                </Link>
                            </li>
                            <li>
                                <div onClick={toggleAboutMenu}>{t("aboutus")}</div>
                                {isAboutDropdownOpen && (
                                    <div className="py-2 mt-2">
                                        <div className="text-lg font-light py-1">
                                            <Link
                                                href="/weare"
                                                onClick={() => {
                                                    setAboutDropdownOpen(false);
                                                    setMobileMenuOpen(false);
                                                }}
                                            >
                                                {t("weare")}
                                            </Link>
                                        </div>
                                        <div className="bg-white h-[1px] my-[5px]" />
                                        <div className="text-lg font-light py-1">
                                            <Link
                                                href="/upcoming"
                                                onClick={() => {
                                                    setAboutDropdownOpen(false);
                                                    setMobileMenuOpen(false);
                                                }}
                                            >
                                                {t("upcoming")}
                                            </Link>
                                        </div>
                                        <div className="bg-white h-[1px] my-[5px]" />
                                        <div className="text-lg font-light py-1 z-90">
                                            <Link
                                                href="/career"
                                                onClick={() => {
                                                    setAboutDropdownOpen(false);
                                                    setMobileMenuOpen(false);
                                                }}
                                            >
                                                {t("career")}
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </li>
                            <li>
                                <Link href="/services" onClick={() => setMobileMenuOpen(false)}>
                                    {t("services")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/projects" onClick={() => setMobileMenuOpen(false)}>
                                    {t("projects")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/news" onClick={() => setMobileMenuOpen(false)}>
                                    {t("news")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacts" onClick={() => setMobileMenuOpen(false)}>
                                    {t("contacts")}
                                </Link>
                            </li>
                            <li className="absolute left-10">
                                <div className="flex items-center" onClick={toggleLang}>
                                    <div>{locale.toUpperCase()}</div>
                                    <svg
                                        className="-mt-1 ml-1"
                                        width="12"
                                        height="9"
                                        viewBox="0 0 12 9"
                                        fill="none"
                                    >
                                        <path
                                            d="M5.17 8.4L1.12 2.61C0.47 1.69 1.13 0.41 2.27 0.41h7.45c1.13 0 1.79 1.27 1.14 2.2L6.81 8.4a0.74 0.74 0 0 1-1.64 0z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                                {isLangOpen && (
                                    <div className="animation-lang rounded-xl bg-gradient-to-b from-slate-700 to-slate-800 shadow-lg px-4 py-2 -ml-2">
                                        {filteredlanguages.map((l, i) => (
                                            <div onClick={() => switchLanguage(l)} key={l}>
                                                {l.toUpperCase()}
                                                <div
                                                    className={`bg-white h-[1px] my-[5px] ${
                                                        i === 1 ? "hidden" : "block"
                                                    }`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </li>
                        </ul>
                    </nav>
                )}
                {isMobileMenuOpen && (
                    <div className="fixed bg-black opacity-50 w-full h-screen top-0 left-0 z-0"></div>
                )}
            </div>
        </header>
    );
}
