"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ControlBar } from "./ColourStrip";
import { company, telHref } from "@/content/company";

const nav = [
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
    <header className="sticky top-0 z-40 border-b border-steel-dark/70 bg-paper/98 backdrop-blur">
      <ControlBar />
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
              className={`text-[0.95rem] font-medium transition-colors hover:text-signal ${
                isActive(item.href) ? "text-signal" : "text-graphite"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={telHref(company.phones[0])} className="text-sm font-medium text-slate hover:text-graphite">
            {company.phones[0]}
          </a>
          <Link href="/contact" className="btn-primary py-2.5 text-sm">
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
