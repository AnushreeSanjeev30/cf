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
        eyebrow="About us"
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

      <section id="founder" className="mt-24 scroll-mt-28 border-y border-steel-dark bg-mist py-20" aria-labelledby="founder-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
          <div>
            <Media
              image={{ src: "/images/founder-sanjeev-sawant.png", alt: "Sanjeev Sawant, founder of Canara Flex" }}
              label="Sanjeev Sawant"
              ratio="1/1"
              sizes="260px"
              className="w-full max-w-[260px] p-2 sm:p-3"
            />
            <p className="mt-4 text-lg font-semibold">Sanjeev Sawant</p>
            <p className="text-sm text-slate">Founder, Canara Flex</p>
          </div>
          <div className="max-w-prose">
            <p className="eyebrow text-signal">Our founder</p>
            <h2 id="founder-heading" className="h-section mt-3">Designed by someone who knows the machine inside out.</h2>
            <div className="mt-6 space-y-4">
              <p>
                Sanjeev Sawant founded Canara Flex in {company.founded}, after nine years designing rotogravure machines
                in the mechanical engineering industry.
              </p>
              <p>
                At the drawing board he learned how much a machine&rsquo;s design decides its life on the shop floor:
                how quickly it sets up, how often it stops, and what it costs to run. He also saw converters paying a
                premium for that quality, or settling for less to stay within budget. Canara Flex was his answer:
                machines designed by someone who knows them inside out, priced fairly, and backed by service.
              </p>
              <p>
                That design background still shapes how the company works. Our designers work alongside the shop
                floor and the test bay, so problems are solved before a machine ships rather than after.
              </p>
            </div>
            <blockquote className="mt-8 border-l-2 border-signal pl-5 text-lg leading-relaxed text-graphite">
              <p>
                &ldquo;When I started Canara Flex, the promise was simple: the right price, and no compromise on
                quality. Every machine that leaves our factory has to keep that promise.&rdquo;
              </p>
            </blockquote>
          </div>
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
