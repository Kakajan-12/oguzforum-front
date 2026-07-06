"use client";
import Image from "next/image";
import Link from "next/link";

import { useGetNewsQuery } from "@/lib/api";
import { resolveMediaUrl } from "@/constant";
import {
  stripHtml,
  formatDateRange,
  readingTime,
} from "@/lib/utils/cardHelpers";
import type { News } from "@/types";
import SectionHeader from "@/components/layout/SectionHeader";
import { useLocale, useTranslations } from "next-intl";

function Category({ cat }: { cat?: string }) {
  const c = stripHtml(cat);
  if (!c) return null;
  return <span className="text-[#1E55C8] text-sm font-medium">#{c}</span>;
}

function MetaLine({ n }: { n: News }) {
  const locale = useLocale();
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <span>{formatDateRange(n.date, undefined, locale)}</span>
      <span className="text-gray-400">•</span>
      <span>{readingTime(n.text_en)}</span>
    </div>
  );
}

const NewsMain = () => {
  const { data } = useGetNewsQuery();
  const t = useTranslations("News");
  const sorted = data
    ? [...data]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)
    : [];

  if (sorted.length === 0) return null;

  const featured = sorted[0];
  const list = sorted.slice(1);

  const featTitle = stripHtml(featured.en) || "News";
  const featDesc = stripHtml(featured.text_en);

  return (
    <section className="bg-white">
      <div className="px-4 lg:px-10 py-6 md:py-14 lg:py-20">
        <SectionHeader
          title={t("title")}
          link={{ href: "/news", label: t("all") }}
          theme="light"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-4">
          {/* Featured */}
          <Link href={`/news/${featured.id}`} className="group block">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded">
              <Image
                src={resolveMediaUrl(featured.image)}
                alt={featTitle}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="pt-2 md:pt-4">
              <Category cat={featured.cat_en} />
              <h3 className="mt-1 md:mt-2 text-base sm:text-2xl font-capitana-medium leading-snug text-gray-900 line-clamp-2">
                {featTitle}
              </h3>
              {featDesc && (
                <p className="mt-3 text-base leading-relaxed text-gray-500 line-clamp-3">
                  {featDesc}
                </p>
              )}
              <div className="mt-4">
                <MetaLine n={featured} />
              </div>
            </div>
          </Link>

          {/* List */}
          <div className="flex flex-col justify-between gap-4">
            {list.map((n) => {
              const title = stripHtml(n.en) || "News";
              return (
                <Link
                  key={n.id}
                  href={`/news/${n.id}`}
                  className="group flex flex-col gap-4 md:flex-row"
                >
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded md:aspect-[4/3] md:w-[12rem]">
                    <Image
                      src={resolveMediaUrl(n.image)}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, 15rem"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Category cat={n.cat_en} />
                    <h3 className="mt-1 text-base sm:text-lg font-capitana-medium leading-snug text-gray-900 line-clamp-2">
                      {title}
                    </h3>
                    <div className="mt-2">
                      <MetaLine n={n} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsMain;
