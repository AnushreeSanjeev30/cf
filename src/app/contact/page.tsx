import type { Metadata } from "next";
import { EnquiryForm } from "./EnquiryForm";
import { company, telHref } from "@/content/company";
import { getMachine, machines } from "@/content/machines";

export const metadata: Metadata = {
  title: "Contact and enquiries",
  description: "Request a quote or a service visit from Canara Flex, Bengaluru.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: { machine?: string; topic?: string } };

export default function ContactPage({ searchParams }: Props) {
  const preselected = searchParams.machine && getMachine(searchParams.machine) ? searchParams.machine : "";
  const topic = searchParams.topic === "service" ? "service" : "quote";

  return (
    <div className="container-page grid gap-12 pb-8 pt-12 sm:pt-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      <section aria-labelledby="form-heading">
        <p className="eyebrow text-signal">Contact and enquiries</p>
        <h1 id="form-heading" className="h-section mt-3">
          {topic === "service" ? "Request service" : "Request a quotation"}
        </h1>
        <p className="mt-3 max-w-prose text-[0.95rem] text-slate">
          {topic === "service"
            ? "Share the machine model and a description of the issue. Our nearest service team will contact you."
            : "Share your requirements and our sales team will prepare a quotation. Details such as substrate, web width and target speed help us quote accurately."}
        </p>
        <div className="mt-8 border border-steel-dark bg-paper p-5 shadow-sm shadow-black/[0.03] sm:p-7">
          <EnquiryForm
            machines={machines.map((m) => ({ slug: m.slug, name: m.model ? `${m.name} (${m.model})` : m.name }))}
            defaultMachine={preselected}
            defaultTopic={topic}
          />
        </div>
      </section>

      <aside className="space-y-8 lg:pt-[7.5rem]" aria-label="Contact details">
        <div className="border-t-2 border-graphite pt-5">
          <h2 className="eyebrow text-slate">Call us</h2>
          {company.phones.map((p) => (
            <a key={p} href={telHref(p)} className="type-wide mt-1.5 block text-lg font-bold tabular-nums hover:text-signal">
              {p}
            </a>
          ))}
        </div>
        <div className="border-t-2 border-graphite pt-5">
          <h2 className="eyebrow text-slate">Email</h2>
          <a href={`mailto:${company.email}`} className="link mt-2 inline-block">{company.email}</a>
        </div>
        <div className="border-t-2 border-graphite pt-5">
          <h2 className="eyebrow text-slate">Factory</h2>
          <address className="mt-2 not-italic text-slate">
            {company.address.line1 && <>{company.address.line1}<br /></>}
            {company.address.city}, {company.address.region}, {company.address.country}
          </address>
          <div className="mt-4 aspect-[4/3] overflow-hidden border border-steel-dark bg-steel">
            <iframe
              src={company.map.embedUrl}
              title="Map showing the Canara Flex factory"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
