"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = { src: string; alt: string; title: string };

export function ProductCarousel({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  const slide = slides[active];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label="Canara Flex product gallery"
    >
      <div className="relative aspect-[16/8] overflow-hidden bg-steel">
        {slides.map((item, index) => (
          <Image
            key={item.src}
            src={item.src}
            alt={item.alt}
            fill
            sizes="(min-width: 1024px) 85vw, 100vw"
            className={`object-cover transition-opacity duration-700 ${index === active ? "opacity-100" : "opacity-0"}`}
            priority={index === 0}
            aria-hidden={index !== active}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/65 to-transparent px-5 pb-5 pt-16 text-white sm:px-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">Product gallery</p>
            <p className="mt-1 text-lg font-semibold">{slide.title}</p>
          </div>
          <div className="flex gap-1.5" role="tablist" aria-label="Choose product image">
            {slides.map((item, index) => (
              <button
                key={item.src}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={`Show ${item.title}`}
                onClick={() => setActive(index)}
                className={`h-2 w-2 rounded-full transition-all ${index === active ? "w-6 bg-white" : "bg-white/55 hover:bg-white"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
