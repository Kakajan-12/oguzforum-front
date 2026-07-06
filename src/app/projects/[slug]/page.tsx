"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiCalendar, FiMapPin } from "react-icons/fi";

import { useGetProjectsByIdQuery } from "@/lib/api";
import { resolveMediaUrl } from "@/constant";
import { stripHtml, formatDateRange } from "@/lib/utils/cardHelpers";
import RichText from "@/components/ui/RichText";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ParticipantCompanies from "@/components/projects/ParticipantCompanies";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import DataMessage from "@/components/ui/DataMessage";
import mapIconBlue from "../../../../public/map-pinBlue.svg";

const STAT_LABELS: {
  key: "speakers" | "delegates" | "countries" | "companies" | "media";
  label: string;
}[] = [
  { key: "speakers", label: "Speakers" },
  { key: "delegates", label: "Delegates" },
  { key: "countries", label: "Countries" },
  { key: "companies", label: "Companies" },
  { key: "media", label: "Media" },
];

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, error, isLoading } = useGetProjectsByIdQuery({
    endpoint: "projects",
    id: slug,
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;
  if (!data) return <DataMessage />;

  const title = stripHtml(data.en) || "Project";
  const dateLabel = formatDateRange(data.date, data.end_date);
  const location = stripHtml(data.location_en);

  const stats = STAT_LABELS.map((s) => ({
    label: s.label,
    value: data[s.key],
  })).filter((s) => s.value && Number(s.value) > 0);

  const organizers = (data.organizers ?? []).filter(
    (o) => o.organizer_en || o.organizer_logo,
  );
  const participants = (data.participants ?? []).filter(
    (p) => p.participant_logo,
  );
  const gallery = data.images ?? [];

  return (
    <section className="bg-white">
      <div className="px-4 lg:px-10 pt-28 pb-14 lg:pt-32 lg:pb-20">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-[#1268B3]"
        >
          <Image
            src="/assets/link.svg"
            width={14}
            height={14}
            alt=""
            className="-scale-x-100 [filter:brightness(0)]"
          />
          Back to Projects
        </Link>

        {/* Media + intro */}
        <div className="mt-8 grid grid-cols-1 lg:mt-10 lg:grid-cols-[380px_1fr] xl:grid-cols-[520px_1fr] gap-5">
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
            <div className="flex items-start gap-3">
              {data.logo && (
                <div className="relative hidden h-28 w-28 shrink-0 overflow-hidden rounded sm:block">
                  <Image
                    src={resolveMediaUrl(data.logo)}
                    alt=""
                    fill
                    sizes="112px"
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
                  <FiCalendar size={17} className="shrink-0 text-[#164194]" />
                  {dateLabel}
                </span>
              )}
              {location && (
                <span className="flex items-center gap-2">
                  <Image
                    src={mapIconBlue}
                    width={15}
                    height={15}
                    alt="Location"
                  />
                  {location}
                </span>
              )}
            </div>

            <RichText
              htmlContent={data.text_en}
              className="mt-5 text-base leading-relaxed text-gray-600"
            />

            {/* Stats — directly below the description (per design) */}
            {stats.length > 0 && (
              <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-5">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-3xl font-capitana-medium text-gray-900 sm:text-4xl">
                      {s.value}
                    </p>
                    <p className="mt-1 text-sm text-[#424A4E]">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Organizers & Official Supporters */}
        {organizers.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Organizers &amp; Official Supporters
            </h2>
            <div className="mt-8 flex flex-wrap items-start gap-x-14 gap-y-10">
              {organizers.map((org, i) => {
                const logo =
                  typeof org.organizer_logo === "string" && org.organizer_logo
                    ? resolveMediaUrl(org.organizer_logo)
                    : null;
                return (
                  <div
                    key={org.id ?? i}
                    className="flex w-40 flex-col items-center text-center"
                  >
                    {logo && (
                      <div className="relative h-32 w-full">
                        <Image
                          src={logo}
                          alt={org.organizer_en || ""}
                          fill
                          sizes="256px"
                          className="object-contain"
                        />
                      </div>
                    )}
                    {org.organizer_en && (
                      <p className="mt-4 text-sm text-gray-600">
                        {org.organizer_en}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Participant companies */}
        {participants.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-8 text-xl font-semibold text-gray-900 sm:text-2xl">
              Participant companies
            </h2>
            <ParticipantCompanies participants={participants} />
          </div>
        )}

        {/* Gallery */}
        {gallery.length > 0 && (
          <div className="mt-14">
            <ProjectGallery images={gallery} />
          </div>
        )}
      </div>
    </section>
  );
}
