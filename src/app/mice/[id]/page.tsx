import { notFound } from "next/navigation";
import MiceFirstPage from "@/components/mice/MiceFirstPage";
import MiceEventAbout from "@/components/mice/MiceEventAbout";
import MiceEventFigures from "@/components/mice/MiceEventFigures";
import MiceEventPavilion from "@/components/mice/MiceEventPavilion";
import MiceEventSectors from "@/components/mice/MiceEventSectors";
import { MICE_EVENTS, getMiceEvent } from "@/components/mice/miceEventsData";

export function generateStaticParams() {
  return MICE_EVENTS.map((event) => ({ id: event.slug }));
}

export default async function MiceEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getMiceEvent(id);

  if (!event) notFound();

  return (
    <div className="px-4 lg:px-10">
      <MiceFirstPage
        label={`${event.status} · ${event.badge}`}
        title={event.title}
        description={event.description}
        date={event.date}
        location={event.fullLocation}
        primaryButton={{ text: "Contact the department", href: "#footer" }}
        secondaryButton={{ text: "Back to all events", href: "/mice" }}
      />
      <MiceEventAbout
        paragraphs={event.about.paragraphs}
        image={event.about.image}
        imageAlt={event.title}
        facts={event.about.facts}
      />
      {event.figures && (
        <MiceEventFigures
          title={event.figures.title}
          subtitle={event.figures.subtitle}
          figures={event.figures.items}
        />
      )}
      {event.pavilion && (
        <>
          <MiceEventPavilion
            title={event.pavilion.title}
            description={event.pavilion.description}
            details={event.pavilion.details}
          />
          <MiceEventSectors
            title={event.pavilion.sectorsTitle}
            sectors={event.pavilion.sectors}
            cta={{
              title: "Interested in exhibiting with the Pavilion?",
              text: "Contact the department",
              href: "#footer",
            }}
          />
        </>
      )}
    </div>
  );
}
