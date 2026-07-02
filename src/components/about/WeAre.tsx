import Image from "next/image";

export default function WeAre() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-14 lg:py-20">
        <h2 className="mb-8 font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900">
          We Are
        </h2>

        <div className="grid grid-cols-1 gap-6 text-[0.95rem] leading-relaxed text-gray-600 md:grid-cols-2 md:gap-10">
          <p>
            OGUZ Forum &amp; Expo brings together leaders, innovators, and
            decision-makers from across industries and borders. We create the
            spaces where ideas are exchanged, partnerships are formed, and
            shared goals turn into action.
          </p>
          <p>
            From international forums to large-scale exhibitions, our work is
            built on trust, professionalism, and a deep understanding of what it
            takes to connect people and organizations across the region and
            beyond.
          </p>
        </div>

        {/* bento: team image (left) + philosophy/services cards (right) */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Our Team — text over image */}
          <div className="relative min-h-[320px] overflow-hidden rounded md:min-h-0">
            <Image
              src="/about/about-3.jpg"
              alt="Our team"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <h3 className="text-xl font-semibold">Our Team</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">
                A dedicated team of organizers, strategists, and specialists who
                plan and deliver every event end to end — combining experience
                in event management with modern digital solutions.
              </p>
            </div>
          </div>

          {/* right column: two cards */}
          <div className="flex flex-col gap-5">
            <div className="rounded bg-[#338CC4] p-6 text-white md:flex-1">
              <h3 className="text-xl font-semibold">Our Philosophy</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                We believe meaningful progress starts with meaningful
                connection. Every forum and exhibition we host is designed to
                spark dialogue and create lasting value for participants.
              </p>
            </div>
            <div className="rounded bg-[#174195] p-6 text-white md:flex-1">
              <h3 className="text-xl font-semibold">Our Services</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                End-to-end event management: international forums, business
                expos, B2B and B2G meetings, delegations, and tailored programs
                at any scale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
