import Image from "next/image";
import { SkeletonImage } from "@/components/ui/Skeleton";

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
      <div className="px-4 lg:px-10 py-12 lg:py-20">
        <h2 className="mb-4 lg:mb-8 text-3xl sm:text-4xl lg:text-5xl capitalize text-gray-900">
          Our mission
        </h2>

        <div className="grid grid-cols-1 gap-4 md:gap-10 xl:gap-20 md:grid-cols-2 items-start">
          {/* left: image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded">
            <SkeletonImage
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
              Our mission is to foster meaningful dialogue, strengthen
              international collaboration, and create lasting partnerships that
              drive sustainable growth and innovation. We create platforms where
              governments, businesses, international organizations, industry
              leaders, and experts come together to exchange knowledge, explore
              new opportunities, and build valuable connections. Through the
              organization of international forums, conferences, exhibitions,
              and business events, we deliver experiences that inspire
              collaboration and produce tangible outcomes. We are committed to
              creating events that not only facilitate productive discussions
              but also encourage long-term partnerships, support strategic
              initiatives, and contribute to the development of industries,
              economies, and global cooperation.
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
