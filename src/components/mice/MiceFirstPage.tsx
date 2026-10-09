"use client";
import Link from "next/link";
import Image from "next/image";
import { FiCalendar } from "react-icons/fi";

type HeroButton = {
  text: string;
  href: string;
};

type MiceFirstPageProps = {
  label?: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  primaryButton?: HeroButton;
  secondaryButton?: HeroButton;
  bgClassName?: string;
};

export default function MiceFirstPage({
  label,
  title,
  description,
  date,
  location,
  primaryButton,
  secondaryButton,
  bgClassName = "mice-gradient",
}: MiceFirstPageProps) {
  return (
    <div
      className={`${bgClassName} h-screen -mx-4 lg:-mx-10 px-4 lg:px-10 relative overflow-hidden`}
    >
      <div className="flex flex-col items-start justify-end h-full max-w-[620px] pb-[100px]">
        {label && (
          <span className="font-proxima font-semibold text-sm uppercase tracking-wide text-white/60">
            {label}
          </span>
        )}
        <h1 className="text-white text-5xl lg:text-7xl font-capitana-semibold mt-4">
          {title}
        </h1>
        {description && (
          <p className="text-white text-base lg:text-lg leading-relaxed font-proxima font-normal mt-6">
            {description}
          </p>
        )}

        {(date || location) && (
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-proxima text-base text-white">
            {date && (
              <span className="inline-flex items-center gap-2">
                <FiCalendar size={20} />
                {date}
              </span>
            )}
            {location && (
              <span className="inline-flex items-center gap-2">
                <Image src="/map-pin.svg" width={20} height={20} alt="" />
                {location}
              </span>
            )}
          </div>
        )}

        {(primaryButton || secondaryButton) && (
          <div className="mt-10 flex flex-wrap gap-4">
            {primaryButton && (
              <Link
                href={primaryButton.href}
                onClick={(e) => {
                  if (!primaryButton.href.startsWith("#")) return;
                  e.preventDefault();
                  document
                    .querySelector(primaryButton.href)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-3 h-fit rounded border border-white bg-white px-6 py-2.5 text-base font-proxima text-[#06306A] transition-colors hover:bg-white/90"
              >
                {primaryButton.text}
                <Image src="/arrowBlue.svg" width={14} height={14} alt="" />
              </Link>
            )}
            {/* {secondaryButton && (
              <Link
                href={secondaryButton.href}
                className="inline-flex items-center gap-3 h-fit rounded border border-white/80 bg-transparent px-6 py-2.5 text-base font-proxima text-white transition-colors hover:bg-white/10"
              >
                {secondaryButton.text}
                <Image
                  src="/assets/link.svg"
                  width={14}
                  height={14}
                  alt=""
                  className="[filter:brightness(0)_invert(1)]"
                />
              </Link>
            )} */}
          </div>
        )}
      </div>
      <Image
        src="/logo.svg"
        alt=""
        aria-hidden
        width={620}
        height={620}
        priority={false}
        className="pointer-events-none absolute right-36 top-1/3 hidden h-[80%] w-auto -translate-y-1/4 translate-x-[37%] select-none opacity-[0.07] md:block"
      />
    </div>
  );
}
