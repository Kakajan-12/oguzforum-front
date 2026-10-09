import Image from "next/image";

const services = [
  {
    title: "Event selection",
    text: "Research and assessment of international exhibitions and forums relevant to Turkmenistan's priority sectors.",
  },
  {
    title: "Exhibitor programme",
    text: "Selection and preparation of participating companies, documentation, registration and exhibit logistics.",
  },
  {
    title: "Institutional coordination",
    text: "Work with organisers, ministries, embassies, chambers of commerce and international organisations.",
  },
  {
    title: "Delegation support",
    text: "Visas, accreditation, accommodation, transfers, interpreting and protocol for official delegations.",
  },
  {
    title: "National Pavilion",
    text: "Concept, design, construction supervision and full on-site operation of the pavilion.",
  },
  {
    title: "Business programme",
    text: "B2B and B2G meetings, presentations and side events organised around the main exhibition.",
  },
];

export default function MiceServices() {
  return (
    <section className="bg-white pb-12 lg:pb-24">
      <h2 className="mb-10 font-capitana-medium text-3xl sm:text-4xl xl:text-5xl text-gray-900">
        Our Services
      </h2>
      <div className="grid grid-cols-1 gap-x-24 gap-y-10 lg:grid-cols-2 lg:px-10">
        {services.map((service) => (
          <div key={service.title} className="flex items-start gap-4">
            <Image
              src="/iconOguzBlue.svg"
              width={48}
              height={48}
              alt=""
              className="shrink-0"
            />
            <div>
              <h3 className="font-capitana-medium text-lg text-gray-900">
                {service.title}
              </h3>
              <p className="mt-2 font-proxima text-sm leading-relaxed text-gray-600 text-justify">
                {service.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
