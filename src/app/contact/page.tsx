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
    <>
      <section className="bg-cream" aria-labelledby="form-heading">
        <div className="container-page grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <h1 id="form-heading" className="type-wide text-[1.35rem] font-bold leading-snug text-graphite sm:text-[1.6rem]">
              {topic === "service"
                ? "Need service or spares for your machine? Send us the details and our team will contact you."
                : "If you would like to know more about our machines, feel free to contact us."}
            </h1>
            <div className="mt-7">
              <EnquiryForm
                machines={machines.map((m) => ({ slug: m.slug, name: m.model ? `${m.name} (${m.model})` : m.name }))}
                defaultMachine={preselected}
                defaultTopic={topic}
              />
            </div>
          </div>

          <aside aria-labelledby="details-heading" className="lg:pt-2">
            <h2 id="details-heading" className="type-wide text-lg font-bold text-graphite">Contact us:</h2>
            <dl className="mt-7 space-y-7">
              <div>
                <dt className="text-slate">Phone:</dt>
                {company.phones.map((p) => (
                  <dd key={p}>
                    <a href={telHref(p)} className="type-wide mt-1 inline-block text-lg font-bold tabular-nums text-graphite hover:text-signal">{p}</a>
                  </dd>
                ))}
              </div>
              <div>
                <dt className="text-slate">Address:</dt>
                <dd className="type-wide mt-1 text-lg font-bold leading-snug text-graphite">
                  <address className="not-italic">
                    {company.address.line1 && <>{company.address.line1}, </>}
                    {company.address.city}, {company.address.region}, {company.address.country}.
                  </address>
                </dd>
              </div>
              <div>
                <dt className="text-slate">Email address:</dt>
                <dd>
                  <a href={`mailto:${company.email}`} className="type-wide mt-1 inline-block text-lg font-bold text-graphite hover:text-signal">
                    {company.email}
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section aria-label="Factory location" className="flush-bottom">
        <iframe
          src={company.map.embedUrl}
          title="Map showing the Canara Flex factory"
          className="block h-[340px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
