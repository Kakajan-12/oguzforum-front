import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";

export const metadata = {
  title: "Logo Archive | Oguz Forum",
};

const logos = [
  {
    title: "OGUZ Forum & Expo Logo — Blue",
    name: "oguzBlue",
    bg: "bg-white",
  },
  {
    title: "OGUZ Forum & Expo Logo — White",
    name: "oguzWhite",
    bg: "bg-[#06306A]",
  },
  {
    title: "OGUZ Forum & Expo Icon — Blue",
    name: "iconOguzBlue",
    bg: "bg-white",
  },
  {
    title: "OGUZ Forum & Expo Icon — White",
    name: "iconOguzWhite",
    bg: "bg-[#06306A]",
  },
];

const arrowIcon = (
  <Image
    src="/assets/link.svg"
    width={10}
    height={10}
    alt=""
    className="brightness-0 invert"
  />
);

export default function LogoArchive() {
  return (
    <section className="bg-white px-4 lg:px-10 pt-24 pb-12 lg:py-24 ">
      <div className="">
        <Link
          href="/media"
          className="flex w-fit items-center gap-2 font-capitana-medium text-sm lg:textlg text-[#424A4E] transition-colors hover:text-[#164194]"
        >
          <Image
            src="/assets/link.svg"
            width={10}
            height={10}
            alt=""
            className="-scale-x-100 brightness-0"
          />
          Back to Media center
        </Link>

        <h2 className="mt-6 text-2xl font-capitana-medium text-gray-900 sm:text-3xl">
          OGUZ Forum & Expo Logos
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex flex-col shadow-faq p-4 rounded"
            >
              <div className={`relative aspect-[16/9] rounded ${logo.bg}`}>
                <Image
                  src={`/${logo.name}.svg`}
                  alt={logo.title}
                  fill
                  className="object-contain p-6"
                />
              </div>
              <p className="mt-4 font-capitana-medium text-xl text-gray-900">
                {logo.title}
              </p>
              <span className="mt-3 text-base font-proxima text-[#424A4E]">
                Downloadable
              </span>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <a
                  href={`/${logo.name}.svg`}
                  download
                  className="flex items-center justify-center font-proxima gap-2 rounded bg-[#1268B3] px-3 py-3 text-sm text-white transition-colors hover:bg-[#0f5694]"
                >
                  Download SVG
                  {arrowIcon}
                </a>
                <a
                  href={`/${logo.name}.png`}
                  download
                  className="flex items-center justify-center gap-2 rounded bg-[#1268B3] px-3 py-3 text-sm text-white transition-colors hover:bg-[#0f5694]"
                >
                  Download PNG
                  {arrowIcon}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
