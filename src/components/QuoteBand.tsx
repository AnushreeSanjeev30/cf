import Link from "next/link";
import { company, telHref } from "@/content/company";

export function QuoteBand({ className = "" }: { className?: string }) {
  return (
    <section className={`quote-band bg-steel ${className}`}>
      <div className="container-page grid gap-8 py-16 md:grid-cols-[1.5fr_1fr] md:items-end">
        <div>
          <h2 className="h-section">Tell us what you need to print, laminate or slit.</h2>
          <p className="lede mt-4">
            Send your film structure, web width and the output you&rsquo;re aiming for. We&rsquo;ll recommend a
            machine configuration and send a quote.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-stretch lg:flex-row lg:justify-end">
          <Link href="/contact" className="btn-primary">Request a quote</Link>
          <a href={telHref(company.phones[0])} className="btn-secondary">Call {company.phones[0]}</a>
        </div>
      </div>
    </section>
  );
}
