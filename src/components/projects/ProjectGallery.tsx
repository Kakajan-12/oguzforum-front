"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { resolveMediaUrl } from "@/constant";

type GalleryImage = { id: number; image: string };

export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [previewCount, setPreviewCount] = useState(6);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, prev, next]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setPreviewCount(mq.matches ? 5 : 6);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!images || images.length === 0) return null;

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };
  const preview = images.slice(0, previewCount);
  const extra = images.length - previewCount;
  const isMobile = previewCount === 5;

  const Tile = ({
    img,
    i,
    className,
    showMore = false,
    objectTop = false,
  }: {
    img?: GalleryImage;
    i: number;
    className?: string;
    showMore?: boolean;
    objectTop?: boolean;
  }) => {
    if (!img) return <div className={`bg-gray-300 ${className ?? ""}`} />;
    return (
      <button
        type="button"
        onClick={() => openAt(i)}
        className={`group relative min-w-0 overflow-hidden ${className ?? ""}`}
      >
        <Image
          src={resolveMediaUrl(img.image)}
          alt=""
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
            objectTop ? "object-top" : ""
          }`}
        />
        {showMore && extra > 0 && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-lg font-medium text-white">
            +{extra}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_2fr] md:grid-rows-2 lg:gap-4 md:h-[90vh]">
        <Tile
          img={preview[0]}
          i={0}
          className="larger col-span-1 row-span-2 aspect-[4/3] md:aspect-auto md:h-full"
        />
        <div className="rightColumn col-span-1 row-span-1 grid grid-cols-2 gap-2 lg:gap-4">
          <Tile img={preview[1]} i={1} className="col-span-1 aspect-square md:aspect-auto" />
          <Tile img={preview[2]} i={2} className="col-span-1 aspect-square md:aspect-auto" />
        </div>
        <div className="rightColumn2 col-span-1 row-span-1 grid grid-cols-2 gap-2 lg:gap-4 md:grid-cols-[0.85fr_1.7fr_0.9fr]">
          <Tile img={preview[3]} i={3} className="col-span-1 aspect-square md:aspect-auto" />
          <Tile
            img={preview[4]}
            i={4}
            className="col-span-1 aspect-square md:aspect-auto"
            showMore={isMobile}
          />
          {!isMobile && (
            <Tile img={preview[5]} i={5} className="col-span-1 aspect-square md:aspect-auto" showMore />
          )}
        </div>
      </div>
      {open && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-5 top-5 text-white/80 transition-colors hover:text-white"
          >
            <FiX size={28} />
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white sm:left-6"
            >
              <FiChevronLeft size={30} />
            </button>
          )}

          <div
            className="relative h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={resolveMediaUrl(images[index].image)}
              alt=""
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white sm:right-6"
            >
              <FiChevronRight size={30} />
            </button>
          )}

          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/70">
            {index + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
