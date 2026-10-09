import Image from "next/image";

export type MiceEventFact = {
  title: string;
  text: string;
};

type MiceEventAboutProps = {
  title?: string;
  paragraphs: string[];
  image: string;
  imageAlt?: string;
  facts?: MiceEventFact[];
};

export default function MiceEventAbout({
  title = "About the Event",
  paragraphs,
  image,
  imageAlt = "",
  facts = [],
}: MiceEventAboutProps) {
  return (
    <section className="bg-white py-12 lg:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-capitana-medium text-3xl sm:text-4xl xl:text-5xl text-gray-900">
            {title}
          </h2>
          <div className="mt-6 lg:mt-10 space-y-5">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-proxima text-base lg:text-lg leading-relaxed text-gray-600"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="relative aspect-[3/2] w-full overflow-hidden rounded lg:ml-auto lg:max-w-[860px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {facts.length > 0 && (
        <div className="mt-12 lg:mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {facts.map((fact) => (
            <div
              key={fact.title}
              className="border-l border-gray-900 pl-4 lg:pl-8 lg:pr-8 py-2 lg:min-h-[180px]"
            >
              <h3 className="font-capitana-medium text-xl lg:text-2xl text-gray-900">
                {fact.title}
              </h3>
              <p className="mt-4 font-proxima text-sm lg:text-base leading-relaxed text-gray-600">
                {fact.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
