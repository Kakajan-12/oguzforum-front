"use client";
import Image from "next/image";
import { SkeletonImage } from "@/components/ui/Skeleton";
import Link from "next/link";
import { resolveMediaUrl } from "@/constant";
import {
  stripHtml,
  formatDateRange,
  readingTime,
} from "@/lib/utils/cardHelpers";
import type { News } from "@/types";

export default function NewsGridCard({ n }: { n: News }) {
  const title = stripHtml(n.en) || "News";
  const cat = stripHtml(n.cat_en);
  const href = `/news/${n.id}`;

  return (
    <div className="group flex flex-col">
      <Link
        href={href}
        className="relative block aspect-[16/10] w-full overflow-hidden rounded"
      >
        <SkeletonImage
          src={resolveMediaUrl(n.image)}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="pt-4">
        {cat && (
          <span className="text-sm font-medium text-[#1E55C8]">#{cat}</span>
        )}

        <Link href={href} className="mt-2 block">
          <h3 className="min-h-[2lh] text-lg font-semibold leading-snug text-gray-900 line-clamp-2 transition-colors group-hover:text-[#1268B3]">
            {title}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2 text-sm text-[#424A4E]">
          <span>{formatDateRange(n.date, undefined)}</span>
          <span>•</span>
          <span>{readingTime(n.text_en)}</span>
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
