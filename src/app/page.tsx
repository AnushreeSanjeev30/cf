import Link from "next/link";
import { ColourStrip } from "@/components/ColourStrip";
import { Media } from "@/components/Media";
import { ProductCarousel } from "@/components/ProductCarousel";
import { QuoteBand } from "@/components/QuoteBand";
import { company } from "@/content/company";
import { factoryPhoto, galleryImages, heroPhoto } from "@/content/gallery";
import { getMachine, machines, machinesByStage, stages } from "@/content/machines";

const recentActivities = [
  {
    date: "Recent update",
    title: "New projects and installations",
    text: "Add a short description of a recently completed machine installation, commissioning milestone or customer project here.",
  },
  {
    date: "Company news",
    title: "Improvements from the factory",
    text: "Use this space to share developments in manufacturing, testing, engineering or the way Canara Flex supports customers.",
  },
  {
    date: "What is next",
    title: "Updates from Canara Flex",
    text: "This section is ready for your latest company activity, event participation, product update or industry announcement.",
  },
];

const productAreas = [
  {
    name: "Printing",
    text: "Shaftless rotogravure presses, including the 8-colour RG 3000 at up to 250 m/min, and presses with online lamination.",
  },
  {
    name: "Lamination",
    text: "Dry lamination machines such as the LM 2000 at up to 200 m/min, and the Canaraflex 3000 solventless laminator.",
  },
  {
    name: "Slitting",
    text: "Machines that cut jumbo rolls into finished reels at the widths your customers order.",
  },
  {
    name: "Inspection and finishing",
    text: "Inspection rewinders and doctoring machines that catch and remove defects before dispatch.",
  },
];

const productSlides = galleryImages.slice(0, 8).map((image, index) => ({
  ...image,
  title: ["Rotogravure printing press", "RG 250 printing press", "Factory-built machinery", "Canara Flex team", "Assembly and engineering", "Assembly and engineering", "Assembly and engineering", "Shop floor equipment"][index],
}));

export default function HomePage() {
  const flagship = getMachine("shaftless-rotogravure")!;

  return (
    <>
      {/* Hero */}
      <section className="container-page grid gap-10 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
        <div>
          <h1 className="h-display">Printing, lamination and slitting machines, built in Bengaluru.</h1>
          <p className="lede mt-6">
            Since {company.founded}, Canara Flex has built the machines flexible packaging converters run every day:
            from rotogravure presses to the rewinders that check the finished reel.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">Request a quote</Link>
            <Link href="/machines" className="btn-secondary">See the machines</Link>
          </div>
        </div>

        <div>
          <Media image={heroPhoto} label="Rotogravure press" ratio="4/3" priority />
          <Link
            href={`/machines/${flagship.slug}`}
            className="group mx-3 mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-steel-dark pt-4 sm:mx-4"
          >
            <span className="font-semibold group-hover:text-signal">{flagship.model} shaftless rotogravure</span>
            <ColourStrip count={flagship.colours} size="sm" />
            <span className="tabular-nums text-slate">8 colours, 250 m/min</span>
          </Link>
        </div>
      </section>

      {/* Product gallery */}
      <section className="container-page pb-20 sm:pb-24" aria-labelledby="product-gallery-heading">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal">Inside the factory</p>
            <h2 id="product-gallery-heading" className="h-section mt-3">Machines built for production</h2>
          </div>
          <Link href="/gallery" className="link">View the gallery</Link>
        </div>
        <ProductCarousel slides={productSlides} />
      </section>

      {/* Company and founder */}
      <section className="container-page py-20 sm:py-24" aria-labelledby="company-heading">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal">About Canara Flex</p>
          <h2 id="company-heading" className="h-section mt-3 max-w-[28ch]">
            Building packaging machinery in Bengaluru since 2000
          </h2>
          <p className="lede mt-5">
            Canara Flex designs and manufactures rotogravure printing, lamination, slitting and inspection machines
            for flexible packaging converters across India.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 border-y border-steel-dark sm:grid-cols-4">
          {[
            ["26", "years building machines"],
            ["100+", "machines installed"],
            ["150+", "people in our team"],
            ["5", "cities with sales and service"],
          ].map(([value, label]) => (
            <div key={label} className="border-b border-steel-dark px-4 py-5 first:pl-0 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
              <p className="type-wide text-2xl font-bold text-graphite">{value}</p>
              <p className="mt-1 text-sm text-slate">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-16">
          <div>
            <h2 className="h-section">Meet our founder</h2>
          </div>
          <div className="max-w-3xl">
            <div className="w-full max-w-[220px]">
              <Media
                image={{ src: "/images/founder-sanjeev-sawant.png", alt: "Sanjeev Sawant, founder of Canara Flex" }}
                label="Sanjeev Sawant"
                ratio="1/1"
                sizes="220px"
                className="p-2 sm:p-3"
              />
            </div>
            <p className="mt-5 text-lg font-semibold">Sanjeev Sawant</p>
            <p className="text-sm text-slate">Founder, Canara Flex</p>
            <div className="mt-6 max-w-prose space-y-4">
              <p>
                Sanjeev Sawant founded Canara Flex in 2000, after nine years designing rotogravure machines in the
                mechanical engineering industry.
              </p>
              <p>
                At the drawing board he learned how much a machine&rsquo;s design decides its life on the shop floor:
                how quickly it sets up, how often it stops, and what it costs to run. He also saw converters paying a
                premium for that quality, or settling for less to stay within budget. Canara Flex was his answer:
                machines designed by someone who knows them inside out, priced fairly, and backed by service.
              </p>
              <p>
                That design background still shapes how the company works. Every machine is built to the customer&rsquo;s
                specification, and our designers work alongside the shop floor and the test bay, so problems are
                solved before a machine ships rather than after.
              </p>
            </div>
            <blockquote className="mt-8 border-t-2 border-graphite pt-6 text-lg leading-relaxed text-graphite">
              <p>
                “I spent nine years designing rotogravure machines. When I started Canara Flex, the promise was
                simple: the right price, and no compromise on quality. Every machine that leaves our factory has to
                keep that promise.”
              </p>
              <footer className="mt-5 text-sm font-semibold not-italic text-slate">— Sanjeev Sawant</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-y border-steel-dark bg-steel/35 py-20 sm:py-24" aria-labelledby="capabilities-heading">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal">Capabilities</p>
            <h2 id="capabilities-heading" className="h-section mt-3">What we make</h2>
            <p className="lede mt-4">
              We build a machine for every stage of the converting line, so one team designs, installs and services
              the whole line.
            </p>
          </div>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {productAreas.map((area, index) => (
              <article key={area.name} className="border-t-2 border-graphite pt-4">
                <p className="text-sm font-bold tabular-nums text-signal">0{index + 1}</p>
                <h3 className="h-item mt-2">{area.name}</h3>
                <p className="mt-2 max-w-prose text-slate">{area.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing approach */}
      <section className="container-page py-20 sm:py-24" aria-labelledby="build-heading">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal">Our process</p>
            <h2 id="build-heading" className="h-section mt-3">How we build</h2>
          </div>
          <div className="max-w-prose">
            <p>
              Every machine is built to the customer&rsquo;s specification. Film types, web widths, colours and
              speeds are agreed before work starts.
            </p>
            <p className="mt-4">
              Four departments under one roof take it from drawing to dispatch: manufacturing, quality testing,
              research and development, and sales and service. Each machine is run in our test bay before it ships,
              so performance, durability, corrosion resistance and ease of maintenance are checked before it reaches
              your plant.
            </p>
          </div>
        </div>
      </section>

      {/* The converting line */}
      <section className="border-y border-steel-dark bg-steel/40 py-20" aria-labelledby="line-heading">
        <div className="container-page">
          <h2 id="line-heading" className="h-section max-w-[22ch]">One maker for the whole converting line.</h2>
          <p className="lede mt-4">
            A roll of film goes through four stages before it becomes packaging. We build a machine for each of them,
            so your line is designed, installed and serviced by one team.
          </p>

          <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            {/* The web running through the line */}
            <span aria-hidden className="absolute left-[11px] top-3 h-[calc(100%-1.5rem)] w-0.5 bg-graphite md:left-0 md:top-[11px] md:h-0.5 md:w-full" />
            {stages.map((stage, i) => (
              <li key={stage.id} className="relative pl-10 md:pl-0 md:pt-12">
                <span aria-hidden className="absolute left-0 top-0 grid h-6 w-6 place-items-center rounded-full border-2 border-graphite bg-paper text-xs font-bold">
                  {i + 1}
                </span>
                <h3 className="type-wide text-xl font-bold">{stage.name}</h3>
                <p className="mt-2 text-[0.95rem] text-slate">{stage.what}</p>
                <ul className="mt-4 space-y-1.5">
                  {machinesByStage(stage.id).map((m) => (
                    <li key={m.slug}>
                      <Link href={`/machines/${m.slug}`} className="text-[0.95rem] font-semibold text-graphite underline decoration-steel-dark underline-offset-4 hover:decoration-signal">
                        {m.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Machine range */}
      <section className="container-page py-20" aria-labelledby="range-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="range-heading" className="h-section">The machines</h2>
          <Link href="/machines" className="link">All machines and specs</Link>
        </div>
        <ul className="mt-8 border-t-2 border-graphite">
          {machines.map((m) => (
            <li key={m.slug} className="border-b border-steel-dark">
              <Link
                href={`/machines/${m.slug}`}
                className="group grid gap-1 py-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] sm:items-baseline sm:gap-6"
              >
                <span className="text-lg font-semibold group-hover:text-signal">{m.name}</span>
                <span className="text-slate">{m.model ?? "Built to order"}</span>
                <span className="tabular-nums text-slate sm:text-right">{m.keySpec ?? "Configured per job"}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Customers and support */}
      <section className="container-page py-20 sm:py-24" aria-labelledby="customers-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal">Built for the long run</p>
            <h2 id="customers-heading" className="h-section mt-3">Trusted by converters across India</h2>
          </div>
          <div className="max-w-prose">
            <p>
              Our machines print, laminate and slit packaging for food, pharmaceutical and consumer goods brands in
              cities all over India. Our service teams in Bengaluru, Chennai, Coimbatore, Mumbai and Delhi keep them
              running.
            </p>
            <p className="mt-4 text-slate">
              From installation and operator training to spares and breakdown support, customers can reach the same
              team that helped configure and build their machine.
            </p>
          </div>
        </div>
      </section>

      {/* Recent activities */}
      <section className="border-y border-steel-dark bg-[#f7f8f8] py-20" aria-labelledby="activities-heading">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal">Company updates</p>
            <h2 id="activities-heading" className="h-section mt-3">Recent activities</h2>
            <p className="lede mt-4">
              Follow the latest work from Canara Flex, including machine installations, factory developments,
              engineering improvements and events. Replace these introductory entries with your own updates as they
              become available.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {recentActivities.map((activity) => (
              <article key={activity.title} className="border-t-2 border-graphite bg-paper p-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate">{activity.date}</p>
                <h3 className="h-item mt-4">{activity.title}</h3>
                <p className="mt-3 text-[0.95rem] text-slate">{activity.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Factory */}
      <section className="container-page grid gap-10 pb-20 lg:grid-cols-2 lg:items-center lg:gap-16" aria-labelledby="factory-heading">
        <Media image={factoryPhoto} label="Factory" ratio="3/2" />
        <div>
          <h2 id="factory-heading" className="h-section">Designed, built and tested under one roof.</h2>
          <p className="lede mt-4">
            Manufacturing, quality testing and R&amp;D work side by side in our Bengaluru plant. Every machine is run
            and checked in-house for performance, durability, corrosion resistance and ease of maintenance before it
            ships.
          </p>
          <Link href="/about" className="link mt-6 inline-block">About Canara Flex</Link>
        </div>
      </section>

      {/* Service network */}
      <section className="container-page pb-20" aria-labelledby="service-heading">
        <div className="grid gap-6 border-t-2 border-graphite pt-10 md:grid-cols-[1fr_1.4fr]">
          <h2 id="service-heading" className="h-section">Sales and service near you.</h2>
          <div>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {company.serviceCities.map((c) => (
                <li key={c} className="type-wide text-2xl font-bold">{c}</li>
              ))}
            </ul>
            <p className="mt-5 text-slate">
              Our sales and service teams in these five cities handle installation, operator training and breakdown
              support. <Link href="/service" className="link">How service works</Link>
            </p>
          </div>
        </div>
      </section>

      <QuoteBand />
    </>
  );
}
