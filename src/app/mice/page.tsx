import MiceFirstPage from "@/components/mice/MiceFirstPage";
import MiceServices from "@/components/mice/MiceServices";
import MiceHowWeWork from "@/components/mice/MiceHowWeWork";
import MiceEvents from "@/components/mice/MiceEvents";

const miceItems = [
  {
    letter: "M",
    title: "Meetings",
    text: "Business and institutional meetings — B2B and B2G programmes tailored to the event.",
  },
  {
    letter: "I",
    title: "Incentives",
    text: "Delegation and corporate group programmes: itineraries, protocol and accompanying events.",
  },
  {
    letter: "C",
    title: "Conferences",
    text: "International forums and conferences where Turkmenistan takes part in the programme.",
  },
  {
    letter: "E",
    title: "Exhibitions",
    text: "International exhibitions and fairs, with the National Pavilion as the principal format.",
  },
];

export default function MicePage() {
  return (
    <div className="px-4 lg:px-10 ">
      <MiceFirstPage
        label="International Events Department"
        title="MICE"
        description="The direction of Oguz Forum & Expo responsible for Turkmenistan's presence at international exhibitions, forums and business events abroad — from selecting the event to delivering a complete National Pavilion."
        primaryButton={{ text: "Contact the department", href: "#" }}
        secondaryButton={{ text: "Explore Events Calendar", href: "#" }}
      />

      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {miceItems.map((item) => (
            <div
              key={item.title}
              className="border-l border-gray-700 pl-4 lg:pl-3 lg:pr-4 py-2"
            >
              <span className="block font-capitana-semibold text-7xl lg:text-8xl text-[#164194] leading-none mt-6 lg:mt-12">
                {item.letter}
              </span>
              <h3 className="mt-10 lg:mt-12 font-capitana-medium text-lg text-gray-900">
                {item.title}
              </h3>
              <p className="mt-4 font-proxima text-sm leading-relaxed text-gray-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <MiceServices />
      <MiceHowWeWork />
      <MiceEvents />
    </div>
  );
}
