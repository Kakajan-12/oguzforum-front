import Image from "next/image";

interface Props {
  title: string;
  subtitle?: string;
  image?: string;
}

export default function PageHero({
  title,
  subtitle,
  image = "/header-bg.jpg",
}: Props) {
  return (
    <section className="relative w-full">
      <div className="relative h-[340px] w-full overflow-hidden sm:h-[400px] lg:h-[460px]">
        <Image src={image} alt={title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center pt-16">
          <div className="container mx-auto px-4">
            <div className="border-l-[3px] border-[#34C3F0] pl-5">
              <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
