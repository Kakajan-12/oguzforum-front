import Image from "next/image";
import { useTranslations } from "next-intl";

export default function WeAre() {
  const t = useTranslations("About");
  return (
    <section className="bg-white">
      <div className="px-4 lg:px-10 py-6 md:py-14 lg:py-20 min-h-screen flex flex-col">
        <h2 className="mb-4 lg:mb-6 text-3xl sm:text-4xl lg:text-5xl text-gray-900 capitalize">
          {t("weAre.title")}
        </h2>

        <div className="grid grid-cols-1 gap-6 text-base md:grid-cols-2 md:gap-10">
          <p>{t("weAre.description1")}</p>
          <p>{t("weAre.description2")}</p>
        </div>

        {/* bento: team image (left) + philosophy/services cards (right) */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:grid-rows-1 flex-1">
          {/* Our Team — text over image */}
          <div className="relative min-h-[60vh] overflow-hidden rounded md:h-full md:max-h-[85vh] ">
            <Image
              src="/about/about-3.webp"
              alt="Our team"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 lg:p-7 text-white">
              <h3 className="text-xl">{t("team.title")}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white">
                {t("team.description")}
              </p>
            </div>
          </div>

          {/* right column: two cards */}
          <div className="flex flex-col gap-5 h-full">
            <div className="rounded bg-[#338CC4] p-4 text-white md:flex-1 flex flex-col justify-end items-start">
              <h3 className="text-xl">{t("philosophy.title")}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white">
                {t("philosophy.description")}
              </p>
            </div>
            <div className="rounded bg-[#174195] p-4 text-white md:flex-1 flex flex-col justify-end items-start">
              <h3 className="text-xl">{t("services.title")}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white">
                {t("services.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
