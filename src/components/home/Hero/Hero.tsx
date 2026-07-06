"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useGetSlidersQuery } from "@/lib/api";

import { resolveMediaUrl } from "@/constant";
import "./Hero.css";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

type HeroStat = { value: string; label: string };

const isVideo = (path?: string) => !!path && /\.(mp4|webm)$/i.test(path);

const Main = () => {
  const { data, error, isLoading } = useGetSlidersQuery();
  const t = useTranslations("Hero");

  const title = t("title");
  const stats: HeroStat[] = [
    { value: "5+", label: t("stats.years") },
    { value: "15+", label: t("stats.events") },
    { value: "30+", label: t("stats.represented") },
    { value: "500+", label: t("stats.engaged") },
    { value: "25.000+", label: t("stats.delegates") },
  ];

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;

  // The hero now shows a single looping background video (managed via the
  // admin slider). Prefer the first video entry; fall back to the first row.
  const slide = data?.find((d) => isVideo(d.image)) ?? data?.[0];
  const mediaUrl = slide ? resolveMediaUrl(slide.image) : "";

  return (
    <section className="relative h-screen overflow-hidden md:px-4 lg:px-10 pt-4 lg:pt-6 pb-4 lg:pb-10">
      <div className="relative h-full w-full overflow-hidden">
        {/* Background video */}
        {mediaUrl &&
          (isVideo(slide?.image) ? (
            <video
              src={mediaUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Image
              src={mediaUrl}
              alt=""
              fill
              priority
              className="object-cover"
            />
          ))}

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-hero-gradient" />

        {/* Foreground content */}
        <div className="pointer-events-none absolute inset-0 flex items-center pl-4 lg:pl-20">
          <div className="w-full">
            <div className="max-w-2xl">
              <h1 className="text-white font-capitana-semibold font-semibold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
                {title}
              </h1>

              {stats.length > 0 && (
                <ul className="mt-8 space-y-3 sm:space-y-4">
                  {stats.map((s, i) => (
                    <li key={i} className="flex items-center gap-3 text-white">
                      <Image
                        src="/logo1.svg"
                        width={40}
                        height={40}
                        alt=""
                        aria-hidden
                        className="h-10 w-10 shrink-0"
                      />
                      <div>
                        <div className="text-xl sm:text-2xl font-capitana-medium font-semibold leading-none tracking-tight">
                          {s.value}
                        </div>
                        <div className="mt-0.5 text-xs sm:text-sm text-white/80">
                          {s.label}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
