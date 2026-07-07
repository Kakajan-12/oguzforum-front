import { SkeletonImage } from "@/components/ui/Skeleton";

export default function WeAre() {
  return (
    <section className="bg-white">
      <div className="px-4 lg:px-10 py-12 lg:py-20 min-h-screen flex flex-col">
        <h2 className="mb-4 lg:mb-8 text-3xl sm:text-4xl lg:text-5xl text-gray-900 capitalize">
          We are
        </h2>

        <div className="grid grid-cols-1 gap-6 text-base md:grid-cols-2 md:gap-10">
          <p>
            OGUZ Forum &amp; Expo brings together leaders, innovators, and
            decision-makers from across industries and borders. We create the
            spaces where ideas are exchanged, partnerships are formed, and
            shared goals turn into action. Our events are designed to foster
            meaningful dialogue, encourage strategic networking, and build
            relationships that continue to create value long after the event has
            concluded.
          </p>
          <p>
            From international forums to large-scale exhibitions, our work is
            built on trust, professionalism, and a deep understanding of what it
            takes to connect people and organizations across the region and
            beyond. Every event is carefully planned to support knowledge
            exchange, inspire collaboration, and deliver measurable results for
            our partners, participants, and stakeholders across diverse
            industries and international markets.
          </p>
        </div>

        {/* bento: team image (left) + philosophy/services cards (right) */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:grid-rows-1 flex-1">
          {/* Our Team — text over image */}
          <div className="relative min-h-[60vh] overflow-hidden rounded md:h-full md:max-h-[85vh] ">
            <SkeletonImage
              src="/about/about-3.webp"
              alt="Our team"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 lg:p-7 text-white">
              <h3 className="text-xl">Our team</h3>
              <p className="mt-3 text-sm leading-relaxed text-white">
                Our team is dedicated to fostering dialogue, collaboration, and
                meaningful connections. We are a team of professionals who are
                passionate about creating events that inspire collaboration and
                produce tangible outcomes.
              </p>
            </div>
          </div>

          {/* right column: two cards */}
          <div className="flex flex-col gap-5 h-full">
            <div className="rounded bg-[#338CC4] p-4 text-white md:flex-1 flex flex-col justify-end items-start">
              <h3 className="text-xl">Our philosophy</h3>
              <p className="mt-3 text-sm leading-relaxed text-white">
                We believe meaningful progress starts with meaningful
                connection. Every forum and exhibition we organize is designed
                to spark dialogue, encourage collaboration, and create lasting
                value for participants. Guided by professionalism, innovation,
                and excellence, we create environments where ideas are shared
                openly, partnerships are built, and opportunities for long-term
                cooperation and sustainable growth emerge.
              </p>
            </div>
            <div className="rounded bg-[#174195] p-4 text-white md:flex-1 flex flex-col justify-end items-start">
              <h3 className="text-xl">Our services</h3>
              <p className="mt-3 text-sm leading-relaxed text-white">
                We provide comprehensive end-to-end event management solutions,
                delivering international forums, conferences, exhibitions,
                business expos, B2B and B2G meetings, official delegations,
                networking events, and tailor-made programs of any scale. From
                strategic planning and logistics to participant management,
                branding, and on-site execution, we ensure every event is
                professionally organized, seamlessly delivered, and designed to
                achieve measurable results for our clients and partners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
