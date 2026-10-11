import type { MetadataRoute } from "next";
import { company } from "@/content/company";
import { machines } from "@/content/machines";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/machines", "/about", "/service", "/gallery", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${company.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...machines.map((m) => ({ url: `${company.url}/machines/${m.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
  ];
}
