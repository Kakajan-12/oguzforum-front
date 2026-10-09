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
        primaryButton={{ text: "Contact the department", href: "#footer" }}
        secondaryButton={{ text: "Explore Events Calendar", href: "#" }}
      />

      <section className="bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-y-7">
          {miceItems.map((item) => (
            <div
              key={item.title}
              className="border-l border-black px-3 lg:px-4 py-2"
            >
              <span className="block font-capitana-medium text-7xl lg:text-[88px] text-[#164194] leading-none mt-5 lg:mt-16">
                {item.letter}
              </span>
              <h3 className="mt-10 lg:mt-14 font-capitana-semibold text-base lg:text-xl">
                {item.title}
              </h3>
              <p className="mt-4 lg:mt-5 font-proxima text-sm lg:text-base leading-normal text-[#424A4E]">
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
