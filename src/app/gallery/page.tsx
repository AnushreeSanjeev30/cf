import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { galleryImages, galleryVideos } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and videos of Canara Flex machines and our Bengaluru factory.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader eyebrow="Gallery" title="Machines on the shop floor." intro="Photos and videos from our factory and customer installations." />

      {galleryVideos.length > 0 && (
        <section className="container-page" aria-labelledby="videos-heading">
          <h2 id="videos-heading" className="h-item mb-5">Videos</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {galleryVideos.map((v) => (
              <figure key={v.src}>
                <video src={v.src} controls preload="metadata" playsInline className="aspect-video w-full bg-graphite object-contain" />
                <figcaption className="mt-2 text-sm text-slate">{v.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="container-page mt-16" aria-labelledby="photos-heading">
        <h2 id="photos-heading" className="h-item mb-5">Photos</h2>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {galleryImages.map((img, i) => (
            <li key={img.src} className={`relative overflow-hidden bg-steel ${i === 0 ? "col-span-2 aspect-[16/10] lg:row-span-2 lg:aspect-auto" : "aspect-[4/3]"}`}>
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
