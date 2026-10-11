import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { company, telHref } from "@/content/company";

export const metadata: Metadata = {
  title: "Sales and service",
  description: "Canara Flex sales and service teams in Bengaluru, Chennai, Coimbatore, Mumbai and Delhi.",
  alternates: { canonical: "/service" },
};

// The support journey is a real sequence, so it is numbered.
// TODO: confirm with the client (warranty length, response times, spares policy).
const journey = [
  { name: "Configuration", text: "We agree film types, widths, colours and speeds with you and confirm the machine specification in writing." },
  { name: "Factory trial", text: "Your machine is run in our Bengaluru plant before dispatch. You're welcome to attend." },
  { name: "Installation", text: "Our engineers install and commission the machine at your site and run it with your material." },
  { name: "Operator training", text: "Your operators are trained on setup, changeovers, cleaning and routine maintenance." },
  { name: "Ongoing support", text: "Spares, breakdown visits and upgrades are handled by the service team nearest to you." },
];

export default function ServicePage() {
  return (
    <>
      <PageHeader
        eyebrow="Sales and service"
        title="Sales and service across India."
        intro="Our teams in five cities handle everything after you place the order: installation, training, spares and breakdown support."
      />

      <section className="container-page" aria-labelledby="cities-heading">
        <h2 id="cities-heading" className="sr-only">Service locations</h2>
        <ul className="grid border-t-2 border-graphite sm:grid-cols-2 lg:grid-cols-5">
          {company.serviceCities.map((city) => (
            <li key={city} className="border-b border-steel-dark py-6 sm:pr-6">
              <p className="type-wide text-2xl font-bold">{city}</p>
              <p className="mt-1 text-sm text-slate">
                {city === "Bengaluru" ? "Factory, sales and service" : "Sales and service"}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-slate">
          To reach any team, call{" "}
          <a href={telHref(company.phones[0])} className="link">{company.phones[0]}</a> or{" "}
          <a href={telHref(company.phones[1])} className="link">{company.phones[1]}</a> and we&rsquo;ll connect you.
        </p>
      </section>

      <section className="container-page mt-24" aria-labelledby="journey-heading">
        <h2 id="journey-heading" className="h-section">From order to production</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-5 md:gap-6">
          {journey.map((step, i) => (
            <li key={step.name} className="border-t-2 border-graphite pt-4">
              <span className="text-sm font-bold tabular-nums text-signal">{i + 1}</span>
              <h3 className="mt-1 font-semibold">{step.name}</h3>
              <p className="mt-2 text-[0.95rem] text-slate">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page mt-24">
        <div className="bg-steel p-8 sm:p-10">
          <h2 className="h-item">Already running a Canara Flex machine?</h2>
          <p className="mt-2 max-w-prose text-slate">
            For spares or a service visit, send us the machine model and a description of the problem.
          </p>
          <Link href="/contact?topic=service" className="btn-primary mt-6">Request service</Link>
        </div>
      </section>
    </>
  );
}
