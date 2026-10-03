import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";

export const metadata = {
  title: "Media Center — Coming soon | Oguz Forum",
};

export default function MediaComingSoon() {
  return (
    <>
      <PageHero
        title="Media center"
        subtitle="Latest updates, insights, and highlights from our activities."
        image="/header-bg.jpg"
      />

      <section className="flex items-center justify-center bg-white px-4 lg:px-20 py-8 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card flex flex-col gap-3">
            <div className="relative h-[252px]">
              <Image
                alt="logo"
                src="/oguzBlue.png"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col justify-center items-start gap-3">
              <p className="font-capitana-medium text-xl">Logos</p>
              <span className="text-base font-proxima text-[#424A4E]">
                OGUZ Forum & Expo and other brand logos are available for
                download.
              </span>
              <Link
                href="/media/logo-arhive"
                className="mt-4 flex items-center self-end gap-2 text-sm font-capitana-medium text-[#1268B3] transition-colors hover:text-[#0f5694]"
              >
                MORE DETAILS
                <Image
                  src="/assets/link.svg"
                  width={12}
                  height={12}
                  alt=""
                  className="[filter:brightness(0)_saturate(100%)_invert(28%)_sepia(89%)_saturate(1900%)_hue-rotate(192deg)_brightness(92%)_contrast(90%)]"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
