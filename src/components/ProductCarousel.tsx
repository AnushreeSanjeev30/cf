"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = { src: string; alt: string; title: string };

const ratios = { "16/8": "aspect-[16/8]", "4/3": "aspect-[4/3]" };

type Props = {
  slides: Slide[];
  label?: string;
  ratio?: keyof typeof ratios;
  sizes?: string;
  interval?: number;
  className?: string;
};

export function ProductCarousel({
  slides,
  label = "Product gallery",
  ratio = "16/8",
  sizes = "(min-width: 1024px) 85vw, 100vw",
  interval = 4500,
  className = "",
}: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [paused, slides.length, interval]);

  const go = (step: number) => setActive((current) => (current + step + slides.length) % slides.length);
  const slide = slides[active];
  const arrow =
    "absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white opacity-0 backdrop-blur transition hover:bg-black/60 focus-visible:opacity-100 group-hover:opacity-100";

  return (
    <div
      className={`group relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className={`relative overflow-hidden bg-steel ${ratios[ratio]}`}>
        {slides.map((item, index) => (
          <Image
            key={item.src}
            src={item.src}
            alt={item.alt}
            fill
            sizes={sizes}
            className={`object-cover transition-opacity duration-700 ${index === active ? "opacity-100" : "opacity-0"}`}
            priority={index === 0}
            aria-hidden={index !== active}
          />
        ))}

        {slides.length > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} className={`${arrow} left-3`} aria-label="Previous image">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <button type="button" onClick={() => go(1)} className={`${arrow} right-3`} aria-label="Next image">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </>
        )}

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/65 to-transparent px-5 pb-5 pt-16 text-white sm:px-7">
          <div aria-live="polite">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">{label}</p>
            <p className="mt-1 text-lg font-semibold">{slide.title}</p>
          </div>
          <div className="flex shrink-0 gap-1.5" role="tablist" aria-label="Choose image">
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
