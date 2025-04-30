import useAppLocale from "@/app/Hooks/GetLocale";
import RichText from "@/app/Hooks/Richtext";
import { Projects } from "@/app/Intarfaces/intarfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props {
  event: Projects[];
}
const ProjectsCardProps: React.FC<Props> = ({ event }) => {
  const locale = useAppLocale();
  return (
    <div className="container mx-auto px-2">
      <div className="pb-10 md:pb-10">
        <div className="grid grid-cols-1 gap-7 min-[500px]:grid-cols-2 lg:grid-cols-3 md:gap-x-14 md:gap-y-10 ">
          {event.map((items) => {
            const tittle = items[locale];

            return (
              <Link href={`/projects/${items.id}`}>
                <div className="relative shadow-2xl h-80 rounded-xl">
                  <Image
                    src={`/${items.image}`}
                    alt={`${items.image}`}
                    width={100}
                    height={100}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    className="rounded-xl"
                  />
                  <div className="absolute bottom-0 right-0 left-0 bg-white rounded-xl px-6 py-4 h-32">
                    {/* <div className="text-sm font-thin">{items.date}</div> */}
                    <div className="md:text-2xl text-lg">
                      <RichText htmlContent={tittle} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectsCardProps;
