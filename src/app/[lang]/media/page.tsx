import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Media Center — Coming soon | Oguz Forum",
};

export default function MediaComingSoon() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-white px-4 pt-24 pb-16">
      <div className="max-w-xl text-center">
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#1268B3]">
          Media Center
        </p>

        <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
          Coming soon
        </h1>

        <p className="mt-4 text-base leading-relaxed text-gray-500">
          We&apos;re putting together our Media Center — photos, videos, and
          press materials from OGUZ Forum events. Check back soon.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded bg-[#1268B3] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0f5694]"
        >
          Back to Home
          <Image src="/assets/link.svg" width={12} height={12} alt="" />
        </Link>
      </div>
    </section>
  );
}
