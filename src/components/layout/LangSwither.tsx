"use client";
import { FaChevronDown } from "react-icons/fa6";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LangSwitcher({
  isOpen,
  className,
}: {
  isOpen?: boolean;
  className?: string;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Footer");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const switchLocale = (next: string) => {
    setOpen(false);
    router.replace(pathname, { locale: next });
  };

  const shortLabel =
    locale === "en" ? t("en") : locale === "ru" ? t("ru") : t("tk");

  return (
    <div
      className={`relative w-fit shrink-0 font-bold group ${className}`}
      ref={ref}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 px-3 py-2 mt-2 text-base rounded-sm bg-white text-black hover:bg-white ${isOpen ? "bg-transparent border-white group-hover:text-brand-dark group-hover:bg-white/50 " : "bg-white text-black hover:bg-white"}`}
        aria-expanded={open}
      >
        {shortLabel}
        <FaChevronDown
          className={`size-3 transition ${isOpen ? "text-black group-hover:text-brand-dark " : "text-black"} ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <div className="absolute bottom-full left-0 right-0 z-50 mb-2 rounded-sm border border-neutral-800/20 bg-white/40 py-2 shadow-lg backdrop-blur-sm">
          {routing.locales
            .filter((loc) => loc !== locale)
            .map((loc) => (
              <button
                key={loc}
                type="button"
                className={`block w-full px-4 py-1 lg:py-2 text-center rounded-sm text-sm ${isOpen ? " text-black hover:text-black hover:bg-white" : " text-black hover:bg-white/80"}`}
                onClick={() => switchLocale(loc)}
              >
                {loc === "en" ? t("en") : loc === "ru" ? t("ru") : t("tk")}
              </button>
            ))}
        </div>
      ) : null}
    </div>
  );
}
