import Image from "next/image";

const STATS = [
  { value: "23", label: "successfully delivered event projects" },
  { value: "30+", label: "trusted partners across industries" },
  { value: "13k+", label: "exhibitors across multiple industries" },
  { value: "7k+", label: "delegates attending our events" },
];

// Bento columns: left = [tall, short], right = [short, tall] (staggered)
const LEFT_COL = [
  { src: "/about/about-1.jpg", ratio: "aspect-[3/4]" },
  { src: "/about/about-3.webp", ratio: "aspect-[4/3]" },
];
const RIGHT_COL = [
  { src: "/about/about-4.jpg", ratio: "aspect-[4/3]" },
  { src: "/about/about-2.jpg", ratio: "aspect-[3/4]" },
];

export default function OurVision() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-6 md:py-14 lg:py-20">
        <h2 className="mb-8 text-3xl sm:text-4xl lg:text-5xl text-gray-900">
          Our Vision
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* left: text + stats */}
          <div className="flex flex-col">
            <div className="space-y-5 text-base leading-relaxed text-gray-600">
              <p>
                We envision a connected region where business, government, and
                society collaborate openly to solve shared challenges. Through
                world-class events, we aim to be the bridge that turns
                conversations into partnerships and partnerships into measurable
                outcomes.
              </p>
              <p>
                Our long-term ambition is to set the standard for international
                forums and exhibitions — bringing together the right people, in
                the right place, with the right purpose.
              </p>
              <p>Year after year, we grow the network and the impact.</p>
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

          {/* right: staggered bento image grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              {LEFT_COL.map((img, i) => (
                <div
                  key={i}
                  className={`relative ${img.ratio} overflow-hidden rounded`}
                >
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {RIGHT_COL.map((img, i) => (
                <div
                  key={i}
                  className={`relative ${img.ratio} overflow-hidden rounded`}
                >
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
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
