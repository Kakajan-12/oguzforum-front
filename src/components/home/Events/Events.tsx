"use client";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiUser } from "react-icons/fi";

import { useGetProjectsQuery } from "@/lib/api";
import { resolveMediaUrl } from "@/constant";
import { stripHtml, formatDateRange } from "@/lib/utils/cardHelpers";
import locationIcon from "../../../../public/map-pin.svg";
import "./Events.css";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/layout/SectionHeader";

// Bento placement for up to 4 tiles: tall left, two on top-right, wide bottom.
const POSITIONS = [
  "md:col-start-1 md:row-start-1 md:row-span-2 min-h-[260px] md:min-h-[520px]",
  "md:col-start-2 md:row-start-1 min-h-[250px]",
  "md:col-start-3 md:row-start-1 min-h-[250px]",
  "md:col-start-2 md:col-span-2 md:row-start-2 min-h-[350px]",
];

const MainEvents = () => {
  const { data } = useGetProjectsQuery();
  const t = useTranslations("Event");
  const now = Date.now();
  const all = data ?? [];
  const upcoming = all
    .filter((e) => new Date(e.end_date).getTime() > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = all
    .filter((e) => new Date(e.end_date).getTime() <= now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const events = [...upcoming, ...past].slice(0, 4);

  if (events.length === 0) return null;

  return (
    <section className="ev-section">
      <div className="container mx-auto px-4 py-6 md:py-14 lg:py-20">
        <SectionHeader
          title={t("title")}
          link={{ href: "/events", label: t("all") }}
          theme="dark"
        />

        <div className="grid w-full flex-1 grid-cols-1 grid-rows-4 gap-4 md:grid-cols-[1.4fr_1fr_1fr] md:grid-rows-2">
          {events.map((e, i) => {
            const title = stripHtml(e.en);
            return (
              <Link
                key={e.id}
                href={`/events/${e.id}`}
                className={`ev-tile group ${POSITIONS[i]}`}
              >
                <Image
                  src={resolveMediaUrl(e.image)}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="ev-overlay" />
                <div className="ev-content">
                  <h3 className="ev-title">{title}</h3>
                  <div className="ev-meta">
                    {formatDateRange(e.date, e.end_date) && (
                      <span className="ev-meta-row">
                        <FiCalendar size={16} className="text-white" />
                        {formatDateRange(e.date, e.end_date)}
                      </span>
                    )}
                    {e.location_en && (
                      <span className="ev-meta-row">
                        <Image
                          src={locationIcon}
                          alt="Location"
                          width={16}
                          height={16}
                        />
                        {/* <FiUser size={15} /> */}
                        {e.location_en}
                      </span>
                    )}
                  </div>
                </div>
                <span className="ev-arrow">
                  <Image src="/assets/link.svg" width={16} height={16} alt="" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MainEvents;
