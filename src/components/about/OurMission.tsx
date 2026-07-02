import Image from "next/image";

const PILLARS = [
  {
    title: "Connect",
    text: "Building bridges between people, institutions, and nations.",
  },
  {
    title: "Inspire",
    text: "Encouraging innovative thinking and meaningful dialogue.",
  },
  {
    title: "Impact",
    text: "Turning discussions into measurable outcomes.",
  },
];

export default function OurMission() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-14 lg:py-20">
        <h2 className="mb-8 font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900">
          Our Mission
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* left: image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded">
            <Image
              src="/about/about-3.jpg"
              alt="Our mission"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* right: text + pillars */}
          <div>
            <p className="text-[0.95rem] leading-relaxed text-gray-600">
              Our mission is to foster dialogue, collaboration, and meaningful
              connections that drive real progress. We design and deliver events
              that bring people and institutions together around shared
              opportunities — and make sure those connections lead to lasting
              results.
            </p>

            <div className="mt-8 space-y-6">
              {PILLARS.map((p) => (
                <div key={p.title} className="flex items-start gap-4">
                  <Image
                    src="/logo.svg"
                    width={28}
                    height={28}
                    alt=""
                    aria-hidden
                    className="mt-1 h-6 w-6 shrink-0 [filter:brightness(0)]"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">
                      {p.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
