import { machines } from "./machines";

// Old WordPress paths → new routes. Keeps Google rankings and old links working.
export const legacyRedirects: Record<string, string> = {
  "/about-us-2": "/about",
  "/about-us": "/about",
  "/infrastructure": "/about#facility",
  "/enquiry-now": "/contact",
  "/contact-us": "/contact",
  ...Object.fromEntries(machines.flatMap((m) => m.legacyPaths.map((p) => [p, `/machines/${m.slug}`]))),
};
