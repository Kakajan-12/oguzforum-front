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
    <div className={`${bgClassName} h-screen -mx-4 lg:-mx-10 px-4 lg:px-10`}>
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
                className="inline-flex items-center gap-3 rounded border border-white bg-white px-7 py-3.5 text-base font-proxima text-[#06306A] transition-colors hover:bg-white/90"
              >
                {primaryButton.text}
                <Image src="/arrowBlue.svg" width={14} height={14} alt="" />
              </Link>
            )}
            {secondaryButton && (
              <Link
                href={secondaryButton.href}
                className="inline-flex items-center gap-3 rounded border border-white/80 bg-transparent px-7 py-3.5 text-base font-proxima text-white transition-colors hover:bg-white/10"
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}
