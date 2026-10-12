import Link from "next/link";
import { ColourStrip } from "@/components/ColourStrip";
import { Media } from "@/components/Media";
import { ProductCarousel } from "@/components/ProductCarousel";
import { QuoteBand } from "@/components/QuoteBand";
import { SectionHeading } from "@/components/SectionHeading";
import { company } from "@/content/company";
import { factoryPhoto, galleryImages, heroPhoto } from "@/content/gallery";
import { getMachine, machines, machinesByStage, stages } from "@/content/machines";

const yearsInBusiness = new Date().getFullYear() - company.founded;

// TODO: client to confirm the installation and team figures.
const stats = [
  { value: `${yearsInBusiness}+`, label: "Years building machines" },
  { value: "100+", label: "Machines installed" },
  { value: "150+", label: "People in our team" },
  { value: String(company.serviceCities.length), label: "Sales and service cities" },
];

const strengths = [
  {
    title: "Built to your specification",
    text: "Film types, web widths, colours and speeds are agreed in writing before work starts.",
  },
  {
    title: "Tested before dispatch",
    text: "Every machine runs in our test bay for performance, durability and ease of maintenance before it ships.",
  },
  {
    title: "One maker for the whole line",
    text: "Printing, lamination, slitting and inspection from one team that designs, installs and services it all.",
  },
  {
    title: "Service close to your plant",
    text: `Installation, operator training, spares and breakdown support from teams in ${company.serviceCities.length} cities.`,
  },
];

// Hero slider. Swap in the client's best machine photos as they arrive.
const heroSlides = [
  { ...heroPhoto, title: "Rotogravure printing press" },
  { ...galleryImages[0], title: "RG 3000 shaftless rotogravure" },
  { ...galleryImages[4], title: "Assembly and engineering" },
  { ...galleryImages[5], title: "Assembly and engineering" },
  { ...galleryImages[6], title: "Machine build in progress" },
  { ...galleryImages[7], title: "Shop floor" },
];

export default function HomePage() {
  const flagship = getMachine("shaftless-rotogravure")!;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-graphite text-white">
        <div className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:py-24">
          <div>
            <p className="eyebrow text-signal">Flexible packaging machinery &middot; Since {company.founded}</p>
            <h1 className="h-display mt-5 text-white">Printing, lamination and slitting machines, built in Bengaluru.</h1>
            <p className="lede mt-6 text-steel/85">
              Canara Flex designs and builds the machines flexible packaging converters run every day, from shaftless
              rotogravure presses to the rewinders that check the finished reel.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">Request a quote</Link>
              <Link href="/machines" className="btn-outline-light">Explore the machines</Link>
            </div>
            <Link href="/gallery" className="mt-6 inline-block text-sm font-semibold text-steel/80 underline decoration-signal decoration-2 underline-offset-4 hover:text-white">
              View the photo gallery
            </Link>
          </div>

          <div>
            <ProductCarousel
              slides={heroSlides}
              label="Built in Bengaluru"
              ratio="4/3"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="shadow-2xl shadow-black/40"
            />
            <Link
              href={`/machines/${flagship.slug}`}
              className="group mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/15 pt-4 text-sm"
            >
              <span className="font-semibold text-white group-hover:text-signal">Flagship: {flagship.model} shaftless rotogravure</span>
              <ColourStrip count={flagship.colours} size="sm" />
              <span className="tabular-nums text-steel/70">{flagship.keySpec}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Key figures */}
      <section aria-label="Canara Flex in numbers" className="border-b border-steel-dark">
        <dl className="container-page grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col-reverse border-steel-dark py-8 pr-4 pl-6 odd:border-r odd:pl-0 lg:border-r lg:px-8 lg:odd:pl-8 lg:first:!pl-0 lg:last:border-r-0"
            >
              <dt className="mt-1 text-sm text-slate">{s.label}</dt>
              <dd className="type-wide text-3xl font-bold text-graphite sm:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* The converting line */}
      <section className="container-page py-20 sm:py-24" aria-labelledby="line-heading">
        <SectionHeading
          id="line-heading"
          eyebrow="What we make"
          title="A machine for every stage of the converting line."
          intro="A roll of film goes through four stages before it becomes packaging. We build for each of them, so your line is designed, installed and serviced by one team."
        />

        <ol className="mt-12 grid gap-px overflow-hidden border border-steel-dark bg-steel-dark md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, i) => (
            <li key={stage.id} className="flex flex-col bg-paper p-6 sm:p-7">
              <span className="text-sm font-bold tabular-nums text-signal">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="type-wide mt-3 text-xl font-bold">{stage.name}</h3>
              <p className="mt-2 text-[0.95rem] text-slate">{stage.what}</p>
              <ul className="mt-auto space-y-2 border-t border-steel-dark pt-5">
                {machinesByStage(stage.id).map((m) => (
                  <li key={m.slug}>
                    <Link href={`/machines/${m.slug}`} className="group flex items-start justify-between gap-3 text-[0.95rem] font-semibold text-graphite hover:text-signal">
                      <span>{m.name}</span>
                      <span aria-hidden className="text-slate transition-transform group-hover:translate-x-0.5 group-hover:text-signal">&rarr;</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Machine range */}
      <section className="border-y border-steel-dark bg-mist py-20 sm:py-24" aria-labelledby="range-heading">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="range-heading" eyebrow="The range" title="Machines and key specifications" />
            <Link href="/machines" className="link">All machines</Link>
          </div>
          <div className="mt-10 overflow-hidden border border-steel-dark bg-paper">
            <div className="hidden grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] gap-6 border-b border-steel-dark bg-steel/50 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate sm:grid">
              <span>Machine</span>
              <span>Model</span>
              <span className="text-right">Key specification</span>
            </div>
            <ul>
              {machines.map((m) => (
                <li key={m.slug} className="border-b border-steel-dark last:border-b-0">
                  <Link
                    href={`/machines/${m.slug}`}
                    className="group grid gap-1 px-6 py-5 transition-colors hover:bg-mist sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] sm:items-baseline sm:gap-6"
                  >
                    <span className="font-semibold group-hover:text-signal">{m.name}</span>
                    <span className="text-slate">{m.model ?? "Built to order"}</span>
                    <span className="tabular-nums text-slate sm:text-right">{m.keySpec ?? "Configured per order"}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why Canara Flex */}
      <section className="container-page py-20 sm:py-24" aria-labelledby="why-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Media image={factoryPhoto} label="Factory" ratio="3/2" />
          <div>
            <SectionHeading
              id="why-heading"
              eyebrow="Why Canara Flex"
              title="Designed, built and tested under one roof."
              intro="Manufacturing, quality testing, R&D and service work side by side from our Bengaluru plant."
            />
            <dl className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {strengths.map((s) => (
                <div key={s.title} className="border-l-2 border-signal pl-4">
                  <dt className="font-semibold text-graphite">{s.title}</dt>
                  <dd className="mt-1.5 text-[0.95rem] text-slate">{s.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="border-y border-steel-dark bg-mist py-20 sm:py-24" aria-labelledby="founder-heading">
        <div className="container-page grid gap-10 md:grid-cols-[220px_1fr] md:items-center md:gap-14">
          <Media
            image={{ src: "/images/founder-sanjeev-sawant.png", alt: "Sanjeev Sawant, founder of Canara Flex" }}
            label="Sanjeev Sawant"
            ratio="1/1"
            sizes="220px"
            className="w-full max-w-[220px] p-2 sm:p-3"
          />
          <div className="max-w-3xl">
            <p id="founder-heading" className="eyebrow text-signal">A word from our founder</p>
            <blockquote className="mt-5">
              <p className="type-wide text-xl font-semibold leading-snug text-graphite sm:text-2xl">
                &ldquo;I spent nine years designing rotogravure machines. When I started Canara Flex, the promise was
                simple: the right price, and no compromise on quality. Every machine that leaves our factory has to
                keep that promise.&rdquo;
              </p>
              <footer className="mt-6 text-[0.95rem]">
                <span className="font-semibold text-graphite">Sanjeev Sawant</span>
                <span className="text-slate"> &middot; Founder, Canara Flex</span>
              </footer>
            </blockquote>
            <Link href="/about#founder" className="link mt-6 inline-block">Read our story</Link>
          </div>
        </div>
      </section>

      {/* Service network */}
      <section className="container-page py-20 sm:py-24" aria-labelledby="service-heading">
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-end">
          <SectionHeading
            id="service-heading"
            eyebrow="Sales and service"
            title="Support near your plant."
            intro="Our teams handle installation, operator training, spares and breakdown support, so you deal with the people who built your machine."
          />
          <div>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 border-t-2 border-graphite pt-6">
              {company.serviceCities.map((c) => (
                <li key={c} className="type-wide text-2xl font-bold">{c}</li>
              ))}
            </ul>
            <Link href="/service" className="link mt-6 inline-block">How service works</Link>
          </div>
        </div>
      </section>

      <QuoteBand />
    </>
  );
}
