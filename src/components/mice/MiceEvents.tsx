import Image from "next/image";
import Link from "next/link";
import { FiCalendar } from "react-icons/fi";

import locationIcon from "../../../public/map-pin.svg";
import "../home/Events/Events.css";
import SectionHeader from "@/components/layout/SectionHeader";
import { MICE_EVENTS } from "@/components/mice/miceEventsData";

const EVENT = MICE_EVENTS[0];

const MiceEvents = () => {
  return (
    <section className="ev-section">
      <div className="px-4 lg:px-10 py-6 md:py-14 lg:py-20">
        <SectionHeader
          title="Upcoming Events"
          // link={{ href: "/events", label: "All upcoming events" }}
          theme="light"
        />

        <Link
          href={`/mice/${EVENT.slug}`}
          className="ev-tile group block w-full min-h-[360px] md:min-h-[560px] lg:min-h-[680px]"
        >
          <Image
            src={EVENT.image}
            alt={EVENT.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="ev-overlay" />

          <span className="absolute left-4 top-4 z-20 rounded border border-white/80 px-3 py-1.5 text-xs uppercase tracking-wider text-white md:left-8 md:top-8 md:px-4 md:py-2 md:text-base">
            {EVENT.badge}
          </span>

          <div className="ev-content md:!p-8">
            <h3 className="ev-title md:!text-4xl">{EVENT.title}</h3>
            <div className="ev-meta md:!text-lg">
              <span className="ev-meta-row">
                <FiCalendar size={20} className="text-white" />
                {EVENT.date}
              </span>
              <span className="ev-meta-row">
                <Image
                  src={locationIcon}
                  alt="Location"
                  width={20}
                  height={20}
                />
                {EVENT.location}
              </span>
            </div>
          </div>

          <span className="ev-arrow !z-20 md:!bottom-10 md:!right-10">
            <Image src="/assets/link.svg" width={20} height={20} alt="" />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default MiceEvents;
