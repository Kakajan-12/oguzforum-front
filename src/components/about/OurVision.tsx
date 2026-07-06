import Image from "next/image";
import { useTranslations } from "next-intl";

const STATS = [
  { value: "23", label: "stats.1" },
  { value: "30+", label: "stats.2" },
  { value: "13k+", label: "stats.3" },
  { value: "7k+", label: "stats.4" },
];

// Bento columns: left = [tall, short], right = [short, tall] (staggered).
// On mobile the aspect ratio sets the height; on lg+ the flex weight
// divides the capped column height so the grid never exceeds the viewport.
const LEFT_COL = [
  { src: "/about/about-1.webp", ratio: "aspect-[3/4]", grow: "lg:flex-[4]" },
  { src: "/about/about-3.webp", ratio: "aspect-[4/3]", grow: "lg:flex-[3]" },
];
const RIGHT_COL = [
  { src: "/about/about-4.webp", ratio: "aspect-[4/3]", grow: "lg:flex-[3]" },
  { src: "/about/about-2.webp", ratio: "aspect-[3/4]", grow: "lg:flex-[4]" },
];

export default function OurVision() {
  const t = useTranslations("About");
  return (
    <section className="bg-white min-h-screen">
      <div className="px-4 lg:px-10 py-6 md:py-14 lg:py-20">
        <h2 className="mb-8 text-3xl sm:text-4xl lg:text-5xl text-gray-900">
          {t("vision.title")}
        </h2>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* left: text + stats */}
          <div className="flex flex-col">
            <div className="space-y-5 text-base leading-relaxed">
              <p>{t("vision.description1")}</p>
              <p>{t("vision.description2")}</p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-capitana-medium text-gray-900">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs leading-snug">{t(s.label)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* right: staggered bento image grid, capped to the viewport on lg+ */}
          <div className="grid grid-cols-2 gap-3 lg:h-[calc(100vh-11rem)]">
            <div className="flex flex-col gap-3">
              {LEFT_COL.map((img, i) => (
                <div
                  key={i}
                  className={`relative ${img.ratio} ${img.grow} lg:aspect-auto lg:min-h-0 overflow-hidden rounded`}
                >
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {RIGHT_COL.map((img, i) => (
                <div
                  key={i}
                  className={`relative ${img.ratio} ${img.grow} lg:aspect-auto lg:min-h-0 overflow-hidden rounded`}
                >
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
