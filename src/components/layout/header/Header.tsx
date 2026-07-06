"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { Edition } from "./navItems";
import { useGetProjectsQuery } from "@/lib/api";
import { stripHtml } from "@/lib/utils/cardHelpers";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname() ?? "/";

  // Editions = upcoming events only (end_date in the future), soonest first.
  const { data: projects } = useGetProjectsQuery();
  const editions: Edition[] = (() => {
    const now = Date.now();
    return (projects ?? [])
      .filter((e) => new Date(e.end_date).getTime() > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3)
      .map((e) => ({
        label: stripHtml(e.en) || "Event",
        href: `/events/${e.id}`,
      }));
  })();

  const [isMobileOpen, setMobileOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const companyTimeout = useRef<NodeJS.Timeout | null>(null);

  const openCompany = () => {
    if (companyTimeout.current) clearTimeout(companyTimeout.current);
    setCompanyOpen(true);
  };
  const closeCompany = (delay = 150) => {
    if (companyTimeout.current) clearTimeout(companyTimeout.current);
    companyTimeout.current = setTimeout(() => setCompanyOpen(false), delay);
  };

  // Restore scroll position / mobile menu after a navigation
  useEffect(() => {
    const saved = sessionStorage.getItem("_scrollY");
    if (saved !== null) {
      sessionStorage.removeItem("_scrollY");
      window.scrollTo({ top: parseInt(saved), behavior: "auto" });
    }
    const menuWasOpen = sessionStorage.getItem("_mobileMenuOpen");
    if (menuWasOpen) {
      sessionStorage.removeItem("_mobileMenuOpen");
      setMobileOpen(true);
    }
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className="fixed inset-x-0 top-0 bg-[#06306A]"
      style={{ zIndex: 500 }}
    >
      <div className="px-4 lg:px-10">
        <div className="relative flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/`} aria-label="Home" className="flex items-center">
            <Image
              src="/oguzWhite.svg"
              width={267}
              height={100}
              alt="Oguz Forum & Expo"
              className="h-11 w-auto"
              priority
            />
          </Link>

          {/* Centre editions (desktop) */}
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {editions.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                prefetch={false}
                className={`text-white text-base whitespace-nowrap pb-1 transition-colors hover:text-white ${
                  isActive(e.href) ? "border-b-2 border-white" : "text-white/90"
                }`}
              >
                {e.label}
              </Link>
            ))}
          </nav>

          {/* Right: Company profile trigger (desktop) */}
          <div
            className="hidden lg:block"
            onMouseEnter={openCompany}
            onMouseLeave={() => closeCompany()}
          >
            <button
              className="flex items-center gap-2 text-white text-base"
              onClick={() => setCompanyOpen((v) => !v)}
              aria-expanded={companyOpen}
            >
              Company profile
              <Image
                src="/assets/link.svg"
                width={12}
                height={12}
                alt=""
                aria-hidden
                className={`h-3 w-3 transition-transform duration-200 ${companyOpen ? "rotate-90" : ""}`}
              />
            </button>
          </div>

          {/* Right: hamburger (mobile) */}
          <button
            aria-label="Open menu"
            className="lg:hidden text-white"
            onClick={() => setMobileOpen(true)}
          >
            <FiMenu size={26} />
          </button>
        </div>
      </div>

      {/* Desktop mega-menu */}
      <MegaMenu
        isOpen={companyOpen}
        onOpen={openCompany}
        onClose={() => closeCompany()}
        onNavigate={() => setCompanyOpen(false)}
      />

      {/* Mobile drawer */}
      <MobileMenu
        open={isMobileOpen}
        onClose={() => setMobileOpen(false)}
        editions={editions}
        pathname={pathname}
      />
    </header>
  );
}
