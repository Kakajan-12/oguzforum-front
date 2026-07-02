"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  useGetProjectsByIdQuery,
  useGetProjectsQuery,
} from "@/lib/api";
import { resolveMediaUrl } from "@/constant";
import { stripHtml, formatDateRange } from "@/lib/utils/cardHelpers";
import RichText from "@/components/ui/RichText";
import EventGridCard from "@/components/events/EventGridCard";
import NewsGallery from "@/components/news/NewsGallery";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import DataMessage from "@/components/ui/DataMessage";
import { FiCalendar, FiMapPin } from "react-icons/fi";

// Short captions for the "Results" figures (DB stores only the numbers).
const STAT_META: { key: keyof StatSource; label: string; caption: string }[] = [
  {
    key: "speakers",
    label: "Speakers",
    caption: "Leading experts, policymakers, and industry leaders.",
  },
  {
    key: "delegates",
    label: "Delegates",
    caption: "Senior professionals and decision-makers from around the world.",
  },
  {
    key: "countries",
    label: "Countries",
    caption: "International representation fostering global dialogue.",
  },
  {
    key: "companies",
    label: "Companies",
    caption: "Global organizations engaged in the event.",
  },
  {
    key: "media",
    label: "Media",
    caption: "Press and media partners covering the event.",
  },
];

type StatSource = {
  speakers: string;
  delegates: string;
  countries: string;
  companies: string;
  media: string;
};

// Website links in the DB may lack a protocol (e.g. "example.com").
function toHref(url?: string): string | null {
  if (!url || !url.trim()) return null;
  const u = url.trim();
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}

export default function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, error, isLoading } = useGetProjectsByIdQuery({
    endpoint: "projects",
    id: slug,
  });
  const { data: allProjects } = useGetProjectsQuery();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;
  if (!data) return <DataMessage />;

  const title = stripHtml(data.en) || "Event";
  const dateLabel = formatDateRange(data.date, data.end_date);
  const location = stripHtml(data.location_en);
  const website = toHref(data.link);

  const organizers = (data.organizers ?? []).filter(
    (o) => o.organizer_logo || stripHtml(o.organizer_en)
  );

  const stats = STAT_META.map((m) => ({
    ...m,
    value: (data as unknown as StatSource)[m.key],
  })).filter((s) => s.value && String(s.value).trim());

  const images = data.images ?? [];

  const now = Date.now();
  const others = (allProjects ?? [])
    .filter((p) => String(p.id) !== String(slug))
    .sort((a, b) => {
      // Upcoming first (soonest), then most recent past.
      const au = new Date(a.end_date).getTime() > now;
      const bu = new Date(b.end_date).getTime() > now;
      if (au !== bu) return au ? -1 : 1;
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return au ? da - db : db - da;
    })
    .slice(0, 3);

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 pt-28 pb-12 lg:pt-32">
        {/* Back link */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-[#1268B3]"
        >
          <Image
            src="/assets/link.svg"
            width={14}
            height={14}
            alt=""
            className="-scale-x-100 [filter:brightness(0)]"
          />
          Back to Events
        </Link>

        {/* Media + info */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
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
            <div className="flex items-start gap-4">
              {data.logo && (
                <div className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-md border border-gray-100 sm:block">
                  <Image
                    src={resolveMediaUrl(data.logo)}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
              )}
              <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-[2.6rem]">
                {title}
              </h1>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
              {dateLabel && (
                <span className="flex items-center gap-2">
                  <FiCalendar size={15} className="shrink-0 text-[#1268B3]" />
                  {dateLabel}
                </span>
              )}
              {location && (
                <span className="flex items-center gap-2">
                  <FiMapPin size={15} className="shrink-0 text-[#1268B3]" />
                  {location}
                </span>
              )}
            </div>

            <RichText
              htmlContent={data.text_en}
              className="mt-6 text-[0.95rem] leading-relaxed text-gray-600"
            />

            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#1268B3] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0f5694]"
              >
                Visit official website
                <Image
                  src="/assets/link.svg"
                  width={14}
                  height={14}
                  alt=""
                  className="[filter:brightness(0)_invert(1)]"
                />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Organizers & Official Supporters */}
      {organizers.length > 0 && (
        <div className="container mx-auto px-4 pb-12">
          <h2 className="mb-8 text-2xl font-semibold text-gray-900 sm:text-3xl">
            Organizers &amp; Official Supporters
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {organizers.map((org) => {
              const name = stripHtml(org.organizer_en);
              return (
                <div
                  key={org.id}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div className="relative h-20 w-20">
                    <Image
                      src={resolveMediaUrl(org.organizer_logo)}
                      alt={name || "Organizer"}
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  </div>
                  {name && (
                    <p className="text-xs leading-snug text-gray-600">{name}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Results */}
      {stats.length > 0 && (
        <div className="container mx-auto px-4 pb-14">
          <div className="rounded-2xl bg-[#EAF3FB] px-6 py-10 sm:px-10 lg:px-14">
            <h2 className="mb-8 text-2xl font-semibold text-gray-900 sm:text-3xl">
              Results
            </h2>
            <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
              {stats.map((s, i) => (
                <div
                  key={s.key}
                  className={[
                    // Vertical dividers only on desktop (5-in-a-row); mobile has
                    // none per design. Drop the border on the first column.
                    "border-[#9DC1E6] lg:pl-6",
                    i % 5 === 0 ? "" : "lg:border-l",
                  ].join(" ")}
                >
                  <p className="text-4xl font-bold text-gray-900 lg:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-base font-semibold text-gray-800">
                    {s.label}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-gray-500">
                    {s.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gallery */}
      {images.length > 0 && (
        <div className="container mx-auto px-4 pb-14 lg:pb-16">
          <NewsGallery images={images} />
        </div>
      )}

      {/* Other events */}
      {others.length > 0 && (
        <div className="container mx-auto px-4 pb-16 lg:pb-24">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900 sm:text-4xl">
            Other events
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((e) => (
              <EventGridCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
