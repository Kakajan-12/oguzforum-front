"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { resolveMediaUrl } from "@/constant";

type GalleryImage = { id: number; image: string };

export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

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

  if (!images || images.length === 0) return null;

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  // Mosaic: 1 large tile (left) + up to 4 thumbs; last thumb shows "+N image".
  const preview = images.slice(0, 5);
  const extra = images.length - preview.length;

  return (
    <>
      <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-2 gap-3 sm:grid-cols-4 sm:grid-rows-2 sm:gap-4">
        {preview.map((img, i) => {
          const isLarge = i === 0;
          const showMore = i === preview.length - 1 && extra > 0;
          return (
            <button
              key={img.id}
              type="button"
              onClick={() => openAt(i)}
              className={`group relative w-full overflow-hidden rounded ${
                isLarge
                  ? "col-span-2 row-span-2 aspect-square sm:aspect-auto"
                  : "aspect-[4/3]"
              }`}
            >
              <Image
                src={resolveMediaUrl(img.image)}
                alt=""
                fill
                sizes={
                  isLarge
                    ? "(max-width: 640px) 100vw, 50vw"
                    : "(max-width: 640px) 50vw, 25vw"
                }
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {showMore && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-lg font-medium text-white">
                  +{extra} image
                </span>
              )}
            </button>
          );
        })}
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
