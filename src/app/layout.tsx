import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { company } from "@/content/company";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: { default: `${company.name} | ${company.tagline}`, template: `%s | ${company.name}` },
  description:
    "Canara Flex builds shaftless rotogravure printing presses, dry and solventless laminators, slitters and inspection rewinders in Bengaluru, with sales and service across India.",
  openGraph: { type: "website", siteName: company.name, locale: "en_IN" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#ED2028", width: "device-width", initialScale: 1 };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: company.url,
  foundingDate: String(company.founded),
  email: company.email,
  telephone: company.phones,
  address: {
    "@type": "PostalAddress",
    addressLocality: company.address.city,
    addressRegion: company.address.region,
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={archivo.variable}>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:p-3">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="pb-24 has-[>.flush-bottom:last-child]:pb-0">{children}</main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
