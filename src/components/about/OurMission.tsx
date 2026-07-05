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
      <div className="container mx-auto px-4 py-6 md:py-14 lg:py-20">
        <h2 className="mb-8 text-3xl sm:text-4xl lg:text-5xl text-gray-900">
          Our Mission
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-center">
          {/* left: image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded">
            <Image
              src="/about/about-3.webp"
              alt="Our mission"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* right: text + pillars */}
          <div>
            <p className="text-base leading-relaxed">
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
                    src="/logoOguzBlue.svg"
                    width={36}
                    height={36}
                    alt=""
                    aria-hidden
                    className="mt-1 h-9 w-9 shrink-0"
                  />
                  <div>
                    <h3 className="text-base">{p.title}</h3>
                    <p className="text-sm leading-relaxed">{p.text}</p>
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
