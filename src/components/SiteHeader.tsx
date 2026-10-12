"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { company, telHref } from "@/content/company";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/machines", label: "Machines" },
  { href: "/service", label: "Service" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact us" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 bg-paper shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="container-page flex items-center justify-between gap-6 py-3 lg:py-2.5">
        <Link href="/" aria-label={`${company.name} home`} className="shrink-0">
          <Logo />
        </Link>

        <div className="hidden flex-col items-end gap-2.5 lg:flex">
          <p className="text-[0.82rem] text-slate">
            Need help? Call:{" "}
            {company.phones.map((p, i) => (
              <span key={p}>
                {i > 0 && " | "}
                <a href={telHref(p)} className="tabular-nums text-graphite hover:text-signal">{p}</a>
              </span>
            ))}
            {" | "}Email:{" "}
            <a href={`mailto:${company.email}`} className="text-graphite hover:text-signal">{company.email}</a>
          </p>

          <nav aria-label="Main">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block rounded-[2px] px-3.5 py-2 text-[0.82rem] font-semibold uppercase tracking-[0.06em] transition-colors ${
                      isActive(item.href) ? "bg-signal text-white" : "text-signal hover:bg-signal/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <button
          type="button"
          className="-mr-2 p-2 lg:hidden"
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
        <nav id="mobile-nav" aria-label="Main" className="border-t border-steel-dark/70 bg-paper lg:hidden">
          <ul className="container-page py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block rounded-[2px] px-3 py-3 text-[0.95rem] font-semibold uppercase tracking-[0.06em] ${
                    isActive(item.href) ? "bg-signal text-white" : "text-signal"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="flex flex-col gap-1 border-t border-steel-dark/70 px-3 pb-2 pt-4 text-sm text-slate">
              {company.phones.map((p) => (
                <a key={p} href={telHref(p)} className="py-1 tabular-nums text-graphite">Call {p}</a>
              ))}
              <a href={`mailto:${company.email}`} className="py-1 text-graphite">{company.email}</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
