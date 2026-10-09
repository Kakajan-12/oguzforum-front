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

export default function MiceHowWeWork() {
  return (
    <section className="relative -mx-4 lg:-mx-10 overflow-hidden bg-[#06306A] px-4 lg:px-10 text-white">
      <h2 className="absolute top-16 left-4 z-10 lg:top-28 lg:left-10 font-capitana-medium text-3xl sm:text-4xl xl:text-5xl">
        How We Work
      </h2>

      <div className="-mx-4 -mt-10 snap-x snap-mandatory overflow-x-auto scroll-pl-4 px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:overflow-visible lg:px-0">
        <div className="relative flex w-max overflow-hidden [--rise:230] [--run:230] lg:grid lg:w-auto lg:grid-cols-5 lg:overflow-visible lg:[--rise:290] lg:[--run:346]">
          {steps.map((step, index) => {
            const highlighted = index % 2 === 1;
            return (
              <div
                key={step.title}
                className="relative w-[42vw] max-w-[173px] shrink-0 snap-start px-3 pt-[300px] pb-12 first:pl-0 lg:w-auto lg:max-w-[312px] lg:px-4 lg:pt-[336px] lg:pb-20"
              >
                {highlighted && (
                  <div
                    aria-hidden
                    className="mice-band absolute inset-y-0 left-0 w-[calc(100%+var(--run)*1px)] bg-[#164194]"
                  />
                )}
                <div className="relative z-10">
                  <span className="block font-capitana-light font-light text-6xl lg:text-7xl leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-10 lg:mt-14 font-capitana-medium text-xl lg:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 font-proxima text-sm lg:text-base leading-relaxed text-white/80">
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
