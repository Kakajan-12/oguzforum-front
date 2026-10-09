import type { MiceEventFact } from "./MiceEventAbout";

type MiceEventPavilionProps = {
  title: string;
  description?: string;
  details: MiceEventFact[];
};

export default function MiceEventPavilion({
  title,
  description,
  details,
}: MiceEventPavilionProps) {
  return (
    <section className="bg-white py-12 lg:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <div className="max-w-[760px]">
          <h2 className="font-capitana-medium text-3xl sm:text-4xl xl:text-5xl leading-tight text-gray-900">
            {title}
          </h2>
          {description && (
            <p className="mt-6 lg:mt-10 font-proxima text-base lg:text-lg leading-relaxed text-gray-600">
              {description}
            </p>
          )}
        </div>

        <dl className="border-t border-[#C9D3E3]">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="grid grid-cols-1 gap-2 border-b border-[#C9D3E3] py-5 lg:py-7 sm:grid-cols-[1fr_2fr] sm:gap-8"
            >
              <dt className="font-capitana-medium text-lg text-gray-900">
                {detail.title}
              </dt>
              <dd className="font-proxima text-base lg:text-lg leading-relaxed text-gray-600">
                {detail.text}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
