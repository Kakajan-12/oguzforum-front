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
      <h2 className="mb-8 lg:mb-12 font-capitana-medium text-3xl sm:text-4xl xl:text-5xl text-gray-900">
        Our Services
      </h2>
      <div className="grid grid-cols-1 gap-x-32 gap-y-6 lg:gap-y-12 lg:grid-cols-2 lg:px-14">
        {services.map((service) => (
          <div
            key={service.title}
            className="flex items-center lg:items-start gap-4"
          >
            <Image
              src="/iconOguzBlue.svg"
              width={72}
              height={72}
              alt=""
              className="shrink-0 size-[52px] lg:size-[72px]"
            />
            <div>
              <h3 className="font-capitana-semibold text-base lg:text-xl">
                {service.title}
              </h3>
              <p className="mt-2 lg:mt-3 font-proxima text-sm lg:text-base leading-normal text-justify">
                {service.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
