import Image from "next/image";
import Link from "next/link";

type SectionHeaderProps = {
  title: string;
  link?: {
    href: string;
    label: string;
  };
  theme?: "light" | "dark";
  className?: string;
};

export default function SectionHeader({
  title,
  link,
  theme = "dark",
  className = "",
}: SectionHeaderProps) {
  const isLight = theme === "light";
  const arrowColor = isLight ? "/arrowGray.svg" : "/arrow.svg";
  const textColor = isLight ? "text-black" : "text-white";
  const underlineColor = isLight ? "text-[#849299]" : "text-white";
  const gridColumns = isLight ? "grid-cols-2" : "grid-cols-[1.4fr_1fr_1fr]";

  return (
    <div
      className={`mb-10 flex justify-between md:grid w-full ${gridColumns} items-end gap-4 ${className}`}
    >
      <h2
        className={`font-capitana text-3xl md:text-5xl font-medium ${textColor}`}
      >
        {title}
      </h2>

      {link && (
        <div className="col-start-2">
          <Link
            href={link.href}
            className={`group inline-flex items-center gap-2 text-sm font-medium transition-colors underline-animate ${underlineColor}`}
          >
            <span>{link.label}</span>
            <Image
              src={arrowColor}
              alt=""
              width={12}
              height={12}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      )}
    </div>
  );
}
