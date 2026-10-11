import type { Metadata } from "next";
import { Media } from "@/components/Media";
import { PageHeader } from "@/components/PageHeader";
import { QuoteBand } from "@/components/QuoteBand";
import { company } from "@/content/company";
import { factoryPhoto, galleryImages } from "@/content/gallery";

export const metadata: Metadata = {
  title: "About us",
  description: "Canara Flex has manufactured printing, lamination and slitting machinery in Bengaluru since 2000.",
  alternates: { canonical: "/about" },
};

// TODO: replace with the client's own story, milestones and numbers (installations, export countries, team size).
const departments = [
  { name: "Manufacturing", text: "Machines are fabricated, assembled and wired in our own plant, so we control fit and finish from frame to final paint." },
  { name: "Quality testing", text: "Every machine is run in-house before dispatch and checked for performance, durability, corrosion resistance and ease of maintenance." },
  { name: "Research and development", text: "Our engineers track new drive, drying and control technology and build it into the range as customers' needs change." },
  { name: "Sales and service", text: "Teams in five cities handle configuration, installation, operator training and after-sales support." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={`Building packaging machinery in Bengaluru since ${company.founded}.`}
        intro="Canara Flex designs and manufactures rotogravure printing, lamination, slitting and inspection machines for flexible packaging converters in India and abroad."
      />

      <section className="container-page grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Media image={factoryPhoto} label="Factory" ratio="3/2" priority />
        <div className="max-w-prose space-y-4 self-center">
          <p>
            We started in {company.founded} with a simple aim: machines that run reliably on a busy shop floor, use
            less power, and are easy for operators to set up and maintain.
          </p>
          <p>
            Our customers print and laminate packaging for food, pharmaceuticals and consumer goods. Many of them run
            a full Canara Flex line, from press to rewinder, supported by one service team.
          </p>
          <p>
            Every machine is built to the customer&rsquo;s specification: film types, web widths, colours and speeds are
            agreed before we start, and the finished machine is run and tested in our plant before it ships.
          </p>
        </div>
      </section>

      <section id="facility" className="container-page mt-24 scroll-mt-28" aria-labelledby="facility-heading">
        <h2 id="facility-heading" className="h-section border-t-2 border-graphite pt-8">Our facility</h2>
        <p className="lede mt-4">
          Four departments work under one roof, so a design change reaches the shop floor, the test bay and the
          customer without passing between companies.
        </p>
        <dl className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {departments.map((d) => (
            <div key={d.name} className="border-l-2 border-signal pl-5">
              <dt className="h-item">{d.name}</dt>
              <dd className="mt-2 text-slate">{d.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-page mt-24" aria-labelledby="team-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <h2 id="team-heading" className="h-section">The team</h2>
            <p className="mt-4 max-w-prose">
              Our manufacturing staff, quality inspectors and R&amp;D engineers work closely together on every order, so
              each machine is built to the technical specification the customer signed off.
            </p>
          </div>
          <Media image={galleryImages.find((g) => g.src.includes("canara-1"))} label="The Canara Flex team" ratio="16/10" />
        </div>
      </section>

      <QuoteBand className="mt-24" />
    </>
  );
}
