"use client";
import Image from "next/image";
import { useGetSlidersQuery } from "@/app/Apis/api";
import { useTranslations } from "next-intl";
import { resolveMediaUrl } from "@/constant";
import "./Main.css";
import Spinner from "../../UI/Spinner";
import ErrorMessage from "../../UI/ErrorMessage";

type HeroStat = { value: string; label: string };

const isVideo = (path?: string) => !!path && /\.(mp4|webm)$/i.test(path);

const Main = () => {
  const { data, error, isLoading } = useGetSlidersQuery();
  const t = useTranslations("MainHero");
  const title = t("title");
  const stats = (t.raw("stats") as HeroStat[]) ?? [];

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;

  // The hero now shows a single looping background video (managed via the
  // admin slider). Prefer the first video entry; fall back to the first row.
  const slide = data?.find((d) => isVideo(d.image)) ?? data?.[0];
  const mediaUrl = slide ? resolveMediaUrl(slide.image) : "";

  return (
    <section className="relative h-screen w-full overflow-hidden">
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

      {/* Navy gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#002A5F]/95 via-[#002A5F]/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#002A5F]/80 via-transparent to-[#002A5F]/30" />

      {/* Foreground content */}
      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-white font-bold leading-[1.05] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
              {title}
            </h1>

            {stats.length > 0 && (
              <ul className="mt-10 space-y-5 sm:space-y-6">
                {stats.map((s, i) => (
                  <li key={i} className="flex items-center gap-4 text-white">
                    <Image
                      src="/logo.svg"
                      width={40}
                      height={40}
                      alt=""
                      aria-hidden
                      className="h-9 w-9 shrink-0"
                    />
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold leading-none tracking-tight">
                        {s.value}
                      </div>
                      <div className="mt-1 text-sm sm:text-base text-white/80">
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
    </section>
  );
};

export default Main;
