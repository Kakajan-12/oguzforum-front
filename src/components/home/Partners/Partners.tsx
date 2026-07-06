"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGetPartnersQuery } from "@/lib/api";
import { resolveMediaUrl } from "@/constant";

import "./Partners.css";

export default function OurPartnersMain() {
  const { data } = useGetPartnersQuery();
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [copyCount, setCopyCount] = useState(2);

  useLayoutEffect(() => {
    if (!data?.length) return;
    const container = containerRef.current;
    const group = groupRef.current;
    if (!container || !group) return;

    const update = () => {
      const cw = container.clientWidth;
      const gw = group.getBoundingClientRect().width;
      if (cw <= 0 || gw <= 0) return;
      const n = Math.max(2, Math.ceil(cw / gw) + 1);
      setCopyCount((prev) => (prev === n ? prev : n));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(container);
    ro.observe(group);
    return () => ro.disconnect();
  }, [data]);

  if (!data || data.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="px-4 lg:px-10 py-6 md:py-14 lg:py-20">
        <h2 className="mb-10 font-capitana-medium text-3xl sm:text-4xl xl:text-5xl text-gray-900">
          Our partners
        </h2>

        <div ref={containerRef} className="w-full overflow-hidden">
          <div
            className="marquee-track"
            style={{ "--marquee-copies": copyCount } as React.CSSProperties}
          >
            {Array.from({ length: copyCount }, (_, copyIndex) => (
              <div
                key={copyIndex}
                ref={copyIndex === 0 ? groupRef : undefined}
                className="marquee-group"
                aria-hidden={copyIndex > 0 || undefined}
              >
                {data.map((partner) => (
                  //   <div
                  //   key={i}
                  //   className="relative mx-8 flex h-36 w-44 shrink-0 items-center justify-center  transition duration-300 hover:grayscale-0"
                  // >
                  //   <Image
                  //     src={partner.logo}
                  //     alt={partner.name}
                  //     fill
                  //     sizes="176px"
                  //     className="object-contain"
                  //   />
                  // </div>
                  <div
                    key={`${copyIndex}-${partner.id}`}
                    className="relative mx-5 flex h-28 md:h-36 w-20 md:w-44 shrink-0 items-center justify-center  transition duration-300"
                  >
                    <Image
                      src={resolveMediaUrl(partner.logo)}
                      alt={copyIndex === 0 ? `Partner ${partner.id}` : ""}
                      fill
                      sizes="100px md:176px"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
