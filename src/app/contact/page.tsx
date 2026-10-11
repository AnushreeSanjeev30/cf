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
    <div className="container-page grid gap-14 pb-8 pt-14 sm:pt-20 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
      <section aria-labelledby="form-heading">
        <h1 id="form-heading" className="h-display max-w-[14ch]">
          {topic === "service" ? "Request service." : "Request a quote."}
        </h1>
        <p className="lede mt-5">
          {topic === "service"
            ? "Tell us the machine model and what's happening. The nearest service team will get back to you."
            : "Tell us about the job. The more detail you share about your film and output, the more accurate our quote will be."}
        </p>
        <div className="mt-10">
          <EnquiryForm
            machines={machines.map((m) => ({ slug: m.slug, name: m.model ? `${m.name} (${m.model})` : m.name }))}
            defaultMachine={preselected}
            defaultTopic={topic}
          />
        </div>
      </section>

      <aside className="space-y-10 lg:pt-4" aria-label="Contact details">
        <div className="border-t-2 border-graphite pt-6">
          <h2 className="h-item">Call us</h2>
          {company.phones.map((p) => (
            <a key={p} href={telHref(p)} className="type-wide mt-2 block text-2xl font-bold tabular-nums hover:text-signal">
              {p}
            </a>
          ))}
        </div>
        <div className="border-t-2 border-graphite pt-6">
          <h2 className="h-item">Email</h2>
          <a href={`mailto:${company.email}`} className="link mt-2 inline-block">{company.email}</a>
        </div>
        <div className="border-t-2 border-graphite pt-6">
          <h2 className="h-item">Factory</h2>
          <address className="mt-2 not-italic text-slate">
            {company.address.line1 && <>{company.address.line1}<br /></>}
            {company.address.city}, {company.address.region}, {company.address.country}
          </address>
          <div className="mt-4 aspect-[4/3] overflow-hidden bg-steel">
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
