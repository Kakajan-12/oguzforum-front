"use client";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiUser } from "react-icons/fi";
import { resolveMediaUrl } from "@/constant";
import { stripHtml, formatDateRange } from "@/lib/utils/cardHelpers";
import { useLocale } from "next-intl";
import mapIcon from "../../../public/map-pinGray.svg";
import type { Projects } from "@/types";

export default function EventGridCard({ event }: { event: Projects }) {
  const locale = useLocale();
  const title = stripHtml(event.en) || "Event";
  const href = `/events/${event.id}`;
  const dateLabel = formatDateRange(event.date, event.end_date, locale);

  return (
    <div className="group flex flex-col">
      <Link
        href={href}
        className="relative block aspect-[16/10] w-full overflow-hidden rounded"
      >
        <Image
          src={resolveMediaUrl(event.image)}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="pt-4">
        <Link href={href} className="block">
          <h3 className="text-lg font-semibold leading-snug text-gray-900 line-clamp-2 transition-colors group-hover:text-[#1268B3]">
            {title}
          </h3>
        </Link>

        <div className="mt-3 space-y-2 text-sm text-[#424A4E]">
          {dateLabel && (
            <span className="flex items-center gap-2">
              <FiCalendar size={15} className="shrink-0" />
              {dateLabel}
            </span>
          )}
          {event.location_en && (
            <span className="flex items-center gap-2">
              <Image src={mapIcon} width={15} height={15} alt="Location" />
              {stripHtml(event.location_en)}
            </span>
          )}
        </div>

        <Link
          href={href}
          className="mt-4 flex items-center justify-end gap-2 text-sm font-capitana-medium text-[#1268B3] transition-colors hover:text-[#0f5694]"
        >
          MORE DETAILS
          <Image
            src="/assets/link.svg"
            width={12}
            height={12}
            alt=""
            className="[filter:brightness(0)_saturate(100%)_invert(28%)_sepia(89%)_saturate(1900%)_hue-rotate(192deg)_brightness(92%)_contrast(90%)]"
          />
        </Link>
      </div>
    </div>
  );
}
