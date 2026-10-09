const steps = [
  {
    title: "Selection",
    text: "The event is assessed for sector relevance, international standing and pavilion format.",
  },
  {
    title: "Coordination",
    text: "Contact with the organiser and the institutions involved in the event.",
  },
  {
    title: "Preparation",
    text: "Documentation, registration, exhibitor recruitment and the participation schedule.",
  },
  {
    title: "Delivery",
    text: "Pavilion construction, staffing, business programme and on-site operation.",
  },
  {
    title: "Follow-up",
    text: "Reporting, contacts obtained and preparation for the next participation cycle.",
  },
];

// Highlighted columns rise vertically, then run diagonally up to the top-right edge
const bandClipPath =
  "polygon(0 220px, 260px 0, 100% 0, calc(100% - 260px) 220px, calc(100% - 260px) 100%, 0 100%)";

export default function MiceHowWeWork() {
  return (
    <section className="relative -mx-4 lg:-mx-10 overflow-hidden bg-[#0A2A5C] px-4 lg:px-10 text-white">
      <h2 className="relative z-10 pt-16 lg:pt-20 font-capitana-medium text-3xl sm:text-4xl xl:text-5xl">
        How We Work
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 lg:-mt-[124px]">
        {steps.map((step, index) => {
          const highlighted = index % 2 === 1;
          return (
            <div
              key={step.title}
              className={`relative px-4 py-10 lg:px-4 lg:pt-[260px] lg:pb-20 first:lg:pl-0 ${
                highlighted ? "max-lg:-mx-4 max-lg:px-8 max-lg:bg-[#173A8F]" : ""
              }`}
            >
              {highlighted && (
                <div
                  aria-hidden
                  className="absolute inset-y-0 left-0 hidden w-[calc(100%+260px)] bg-[#173A8F] lg:block"
                  style={{ clipPath: bandClipPath }}
                />
              )}
              <div className="relative z-10">
                <span className="block font-capitana text-6xl lg:text-7xl leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-10 lg:mt-14 font-capitana-medium text-xl">
                  {step.title}
                </h3>
                <p className="mt-4 font-proxima text-sm leading-relaxed text-white/70">
                  {step.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
