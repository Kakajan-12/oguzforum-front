import { notFound } from "next/navigation";
import MiceFirstPage from "@/components/mice/MiceFirstPage";
import MiceEventAbout from "@/components/mice/MiceEventAbout";
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
        primaryButton={{ text: "Contact the department", href: "/contacts" }}
        secondaryButton={{ text: "Back to all events", href: "/mice" }}
      />
      <MiceEventAbout
        paragraphs={event.about.paragraphs}
        image={event.about.image}
        imageAlt={event.title}
        facts={event.about.facts}
      />
    </div>
  );
}
