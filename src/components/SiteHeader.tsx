"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ControlBar } from "./ColourStrip";
import { company, telHref } from "@/content/company";

const nav = [
  { href: "/", label: "Home" },
  { href: "/machines", label: "Machines" },
  { href: "/about", label: "About" },
  { href: "/service", label: "Service" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 border-b border-steel-dark/70 bg-paper/95 backdrop-blur">
      <ControlBar />
      <div className="hidden bg-graphite text-[0.8rem] text-steel/80 lg:block">
        <div className="container-page flex h-9 items-center justify-between gap-6">
          <p>Packaging machinery manufacturer &middot; {company.address.city}, India &middot; Since {company.founded}</p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a>
            {company.phones.map((p) => (
              <a key={p} href={telHref(p)} className="tabular-nums hover:text-white">{p}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="type-wide text-[1.35rem] font-extrabold tracking-tight text-graphite">
          Canara<span className="text-signal">Flex</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative py-6 text-[0.95rem] font-medium transition-colors hover:text-signal after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 ${
                isActive(item.href) ? "text-graphite after:bg-signal" : "text-graphite after:bg-transparent"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link href="/contact" className="btn-primary px-5 py-2.5 text-sm">
            Request a quote
          </Link>
        </div>

        <button
          type="button"
          className="-mr-2 p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-steel-dark/70 bg-paper md:hidden">
          <ul className="container-page py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block py-3 text-lg font-medium ${isActive(item.href) ? "text-signal" : "text-graphite"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="flex flex-col gap-3 pb-3 pt-4">
              <Link href="/contact" className="btn-primary">Request a quote</Link>
              <a href={telHref(company.phones[0])} className="btn-secondary">Call {company.phones[0]}</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
