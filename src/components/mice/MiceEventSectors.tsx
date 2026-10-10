"use client";
import Link from "next/link";
import Image from "next/image";

type MiceEventSectorsProps = {
  title: string;
  sectors: string[];
  cta?: {
    title: string;
    text: string;
    href: string;
  };
};

export default function MiceEventSectors({
  title,
  sectors,
  cta,
}: MiceEventSectorsProps) {
  return (
    <section className="bg-white pb-12 lg:pb-24">
      <h2 className="mb-10 lg:mb-14 font-normal text-3xl sm:text-4xl xl:text-5xl text-gray-900">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4 xl:grid-cols-7">
        {sectors.map((sector, index) => (
          <div
            key={sector}
            className="flex aspect-square flex-col justify-between rounded bg-[#EEF1F8] p-4 lg:p-6"
          >
            <span className="font-capitana-light text-3xl lg:text-4xl text-[#003A84]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-capitana-medium text-sm lg:text-base leading-snug text-gray-900">
              {sector}
            </span>
          </div>
        ))}

        {cta && (
          <Link
            href={cta.href}
            onClick={(e) => {
              if (!cta.href.startsWith("#")) return;
              e.preventDefault();
              document
                .querySelector(cta.href)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex aspect-square flex-col justify-between rounded bg-[#003A84] p-4 lg:p-6 transition-colors hover:bg-[#06306A]"
          >
            <span className="font-capitana-medium text-base lg:text-xl leading-snug text-white">
              {cta.title}
            </span>
            <span className="flex items-end justify-between gap-3 font-proxima text-sm text-white/90">
              {cta.text}
              <Image
                src="/assets/link.svg"
                width={14}
                height={14}
                alt=""
                className="shrink-0 mb-1 [filter:brightness(0)_invert(1)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
