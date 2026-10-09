export type MiceEventFigure = {
  value: string;
  label: string;
};

type MiceEventFiguresProps = {
  title: string;
  subtitle?: string;
  figures: MiceEventFigure[];
};

export default function MiceEventFigures({
  title,
  subtitle,
  figures,
}: MiceEventFiguresProps) {
  return (
    <section className="relative -mx-4 lg:-mx-10 overflow-hidden bg-[#022B66] px-4 lg:px-10 py-16 lg:py-32">
      <div
        aria-hidden
        className="absolute inset-0 bg-[#003A84] [clip-path:polygon(63%_0,100%_0,100%_100%,49%_100%)]"
      />

      <div className="relative">
        <h2 className="font-capitana-medium text-3xl sm:text-4xl xl:text-5xl text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 font-proxima text-base lg:text-lg text-white/70">
            {subtitle}
          </p>
        )}

        <div className="mt-12 lg:mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-0">
          {figures.map((figure) => (
            <div
              key={figure.label}
              className="border-l border-white/40 pl-4 lg:pl-8 lg:pr-8 py-1"
            >
              <p className="font-capitana-light text-4xl lg:text-5xl 2xl:text-6xl text-white whitespace-nowrap">
                {figure.value}
              </p>
              <p className="mt-6 font-proxima text-base lg:text-lg leading-relaxed text-white/80">
                {figure.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
