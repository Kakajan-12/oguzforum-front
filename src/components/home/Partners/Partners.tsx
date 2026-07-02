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
      <div className="container mx-auto px-4 py-14 lg:py-20">
        <h2 className="mb-10 font-semibold text-3xl sm:text-4xl lg:text-5xl text-gray-900">
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
                  <div
                    key={`${copyIndex}-${partner.id}`}
                    className="flex h-16 shrink-0 items-center justify-center px-10"
                  >
                    <Image
                      src={resolveMediaUrl(partner.logo)}
                      alt={copyIndex === 0 ? `Partner ${partner.id}` : ""}
                      width={1800}
                      height={1800}
                      sizes="(max-width: 768px) 120px, 170px"
                      className="h-full w-auto max-h-16 object-contain"
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
