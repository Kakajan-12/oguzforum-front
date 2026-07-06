"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useGetNewsByIdQuery, useGetNewsQuery } from "@/lib/api";
import { resolveMediaUrl } from "@/constant";
import { useLocale } from "next-intl";
import { stripHtml, formatDateRange } from "@/lib/utils/cardHelpers";
import RichText from "@/components/ui/RichText";
import NewsGridCard from "@/components/news/NewsGridCard";
import NewsGallery from "@/components/news/NewsGallery";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import DataMessage from "@/components/ui/DataMessage";

export default function NewsDetailPage() {
  const locale = useLocale();
  const { slug } = useParams<{ slug: string }>();
  const { data, error, isLoading } = useGetNewsByIdQuery({
    endpoint: "news",
    id: slug,
  });
  const { data: allNews } = useGetNewsQuery();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;
  if (!data) return <DataMessage />;

  const title = stripHtml(data.en) || "News";
  const cat = stripHtml(data.cat_en);

  const others = (allNews ?? [])
    .filter((n) => String(n.id) !== String(slug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="bg-white">
      <div className="px-4 lg:px-10 pt-28 pb-12 lg:pt-32">
        {/* Back link */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-[#1268B3]"
        >
          <Image
            src="/assets/link.svg"
            width={14}
            height={14}
            alt=""
            className="-scale-x-100 [filter:brightness(0)]"
          />
          Back to News
        </Link>

        {/* Image + article */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded">
            <Image
              src={resolveMediaUrl(data.image)}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-[2.6rem]">
              {title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              {cat && (
                <span className="font-medium text-[#1E55C8]">#{cat}</span>
              )}
              <span className="text-gray-500">
                {formatDateRange(data.date, undefined, locale)}
              </span>
            </div>

            <RichText
              htmlContent={data.text_en}
              className="mt-6 text-base leading-relaxed text-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Gallery */}
      {data.images && data.images.length > 0 && (
        <div className="px-4 lg:px-10 pb-14 lg:pb-16">
          <NewsGallery images={data.images} />
        </div>
      )}

      {/* Other news */}
      {others.length > 0 && (
        <div className="px-4 lg:px-10 pb-16 lg:pb-24">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900 sm:text-4xl">
            Other news
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((n) => (
              <NewsGridCard key={n.id} n={n} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
