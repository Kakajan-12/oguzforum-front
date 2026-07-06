import Image from "next/image";

const STATS = [
  { value: "23", label: "successfully delivered event projects" },
  { value: "30+", label: "trusted partners across industries" },
  { value: "13k+", label: "exhibitors across multiple industries" },
  { value: "7k+", label: "delegates attending our events" },
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
  return (
    <section className="bg-white">
      <div className="px-4 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* left: text + stats */}
          <div className="flex flex-col">
            <h2 className="mb-4 lg:mb-8 text-3xl sm:text-4xl lg:text-5xl capitalize text-gray-900">
              Our vision
            </h2>
            <div className="space-y-5 text-base leading-relaxed">
              <p>
                We envision a future where international cooperation,
                innovation, and strategic partnerships drive sustainable
                economic growth and global development. Our goal is to create
                world-class platforms that connect governments, businesses,
                international organizations, and industry leaders, enabling them
                to address shared challenges, exchange knowledge, and unlock new
                opportunities for collaboration.
              </p>
              <p>
                We aspire to set the benchmark for international forums,
                conferences, and exhibitions by delivering exceptional events
                that inspire meaningful dialogue and generate lasting impact.
                Through continuous growth, innovation, and an expanding global
                network, we aim to strengthen international connections and
                transform ideas into partnerships that create measurable value
                for industries, communities, and economies worldwide.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-capitana-medium text-gray-900">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs leading-snug">{s.label}</div>
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
