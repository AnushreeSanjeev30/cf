import Link from "next/link";
import { company, telHref } from "@/content/company";

export function QuoteBand({ className = "" }: { className?: string }) {
  return (
    <section className={`quote-band bg-graphite text-white ${className}`}>
      <div className="container-page grid gap-8 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow text-signal">Enquiries</p>
          <h2 className="h-section mt-3 text-white">Tell us what you require.</h2>
          <p className="lede mt-4 text-steel/80">
            Share your substrate, web width, number of colours and target output. Our engineers will recommend the
            right machine configuration and prepare a detailed quotation.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Link href="/contact" className="btn-primary">Request a quote</Link>
          <a href={telHref(company.phones[0])} className="btn-outline-light">Call {company.phones[0]}</a>
        </div>
      </div>
    </section>
  );
}
