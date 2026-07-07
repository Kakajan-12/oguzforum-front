"use client";
import Image from "next/image";
import { SkeletonImage } from "@/components/ui/Skeleton";
import Link from "next/link";
import { FiCalendar, FiUser } from "react-icons/fi";

import { useGetProjectsQuery } from "@/lib/api";
import { resolveMediaUrl } from "@/constant";
import { stripHtml, formatDateRange } from "@/lib/utils/cardHelpers";
import type { Projects } from "@/types";
import locationIcon from "../../../../public/map-pinBlue.svg";
import locationIconWhite from "../../../../public/map-pin.svg";

const getCalendarIcon = (color: "white" | "blue") => {
  return color === "blue" ? (
    <FiCalendar size={15} className="text-white md:text-[#164194] " />
  ) : (
    <FiCalendar size={15} />
  );
};
import "./Projects.css";
import SectionHeader from "@/components/layout/SectionHeader";

function Meta({ p, color }: { p: Projects; color: "white" | "blue" }) {
  const date = formatDateRange(p.date, p.end_date);
  return (
    <div className="pr-meta mt-3 md:mt-3.5">
      {date && (
        <span className="pr-meta-row">
          {getCalendarIcon(color)}
          {date}
        </span>
      )}
      {p.location_en && (
        <span className="pr-meta-row">
          {color === "blue" ? (
            <>
              <Image
                src={locationIconWhite}
                alt="Location"
                width={13}
                height={13}
                className="md:hidden"
              />
              <Image
                src={locationIcon}
                alt="Location"
                width={13}
                height={13}
                className="hidden md:block"
              />
            </>
          ) : (
            <Image
              src={locationIconWhite}
              alt="Location"
              width={13}
              height={13}
            />
          )}
          {p.location_en}
        </span>
      )}
    </div>
  );
}

export default function OurProjects() {
  const { data } = useGetProjectsQuery();

  const now = Date.now();
  const all = data ?? [];
  // Projects = events that already happened (most recent first),
  // padded with upcoming ones so the section never looks empty.
  const past = all
    .filter((e) => new Date(e.end_date).getTime() <= now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const upcoming = all
    .filter((e) => new Date(e.end_date).getTime() > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const projects = [...past, ...upcoming].slice(0, 6);

  if (projects.length === 0) return null;

  // Grid positions 0 and 3 (left column) render as large "featured" cards.
  // Those two should show the two MOST RECENT projects; the 4 compact cards
  // show the older ones — so we re-order the array into grid slots accordingly.
  const featuredPool = projects.slice(0, 2);
  const compactPool = projects.slice(2);
  const FEATURED_POS = new Set([0, 3]);
  let fi = 0;
  let ci = 0;
  const slots = projects.map((_, pos) => {
    if (FEATURED_POS.has(pos) && fi < featuredPool.length) {
      return { p: featuredPool[fi++], featured: true };
    }
    return { p: compactPool[ci++], featured: false };
  });

  return (
    <section className="bg-white">
      <div className="px-4 lg:px-10 py-6 md:py-14 lg:py-20">
        <SectionHeader
          title="Projects"
          link={{ href: "/projects", label: "All projects" }}
          theme="light"
        />

        <div className="grid grid-cols-1 grid-rows-4 gap-5 md:grid-cols-4 md:grid-rows-2">
          {slots.map(({ p, featured }) => {
            const title = stripHtml(p.en);
            const desc = stripHtml(p.text_en);

            if (featured) {
              return (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="pr-card pr-media group relative min-h-[290px] md:h-full md:col-span-2"
                >
                  <SkeletonImage
                    src={resolveMediaUrl(p.image)}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="pr-img object-cover"
                  />
                  <div className="pr-overlay" />
                  <div className="pr-overlay-content">
                    <h3 className="pr-title text-lg line-clamp-1 md:line-clamp-2 font-capitana-medium">
                      {title}
                    </h3>
                    {desc && (
                      <p className="pr-desc line-clamp-2 lg:line-clamp-3">
                        {desc}
                      </p>
                    )}
                    <Meta p={p} color="white" />
                  </div>
                </Link>
              );
            }

            return (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="pr-card group block"
              >
                <div className="pr-media relative min-h-[260px] md:min-h-0 md:aspect-[16/10]">
                  <SkeletonImage
                    src={resolveMediaUrl(p.image)}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="pr-img object-cover"
                  />
                  {/* overlay only on mobile */}
                  <div className="pr-overlay md:hidden" />
                  <div className="pr-overlay-content md:hidden">
                    <h3 className="pr-title text-lg line-clamp-1 md:line-clamp-2 font-capitana-medium">
                      {title}
                    </h3>
                    {desc && (
                      <p className="pr-desc line-clamp-2 lg:line-clamp-3">
                        {desc}
                      </p>
                    )}
                    <Meta p={p} color="blue" />
                  </div>
                </div>
                {/* text below image on desktop */}
                <div className="pr-below hidden md:block">
                  <h3 className="pr-title line-clamp-1 md:line-clamp-2 font-capitana-medium">
                    {title}
                  </h3>
                  {desc && (
                    <p className="pr-desc line-clamp-2 lg:line-clamp-3">
                      {desc}
                    </p>
                  )}
                  <Meta p={p} color="blue" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
