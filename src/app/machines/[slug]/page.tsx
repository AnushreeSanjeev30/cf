import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ColourStrip } from "@/components/ColourStrip";
import { Media } from "@/components/Media";
import { SpecTable } from "@/components/SpecTable";
import { company, telHref } from "@/content/company";
import { getMachine, machines, machinesByStage, stages } from "@/content/machines";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return machines.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const m = getMachine(params.slug);
  if (!m) return {};
  return {
    title: m.model ? `${m.name} (${m.model})` : m.name,
    description: m.summary,
    alternates: { canonical: `/machines/${m.slug}` },
    openGraph: m.image ? { images: [m.image.src] } : undefined,
  };
}

export default function MachinePage({ params }: Props) {
  const m = getMachine(params.slug);
  if (!m) notFound();

  const stageIndex = stages.findIndex((s) => s.id === m.stage);
  const stage = stages[stageIndex];
  const related = machinesByStage(m.stage).filter((r) => r.slug !== m.slug);
  const next = stages[stageIndex + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: m.name,
    model: m.model,
    description: m.summary,
    image: m.image?.src,
    brand: { "@type": "Brand", name: company.name },
    manufacturer: { "@type": "Organization", name: company.name },
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="container-page pt-8 text-sm text-slate">
        <ol className="flex flex-wrap gap-2">
          <li><Link href="/" className="hover:text-graphite">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/machines" className="hover:text-graphite">Machines</Link></li>
          <li aria-hidden>/</li>
          <li><Link href={`/machines#stage-${stage.id}`} className="hover:text-graphite">{stage.name}</Link></li>
        </ol>
      </nav>

      <article className="container-page grid gap-12 pt-6 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="lg:order-2">
          <Media image={m.image} label={m.name} ratio="4/3" priority />
        </div>

        <div className="lg:order-1">
          {m.model && <p className="text-lg font-semibold text-signal">{m.model}</p>}
          <h1 className="mt-1 text-[clamp(2rem,4.2vw,3.25rem)] font-medium leading-[1.02] tracking-tight">
            {m.name}
          </h1>
          <p className="lede mt-5">{m.summary}</p>

          {m.colours && (
            <p className="mt-6 flex items-center gap-3 text-[0.95rem] text-slate">
              <ColourStrip count={m.colours} /> {m.colours} print stations
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`/contact?machine=${m.slug}`} className="btn-primary">Request a quote for this machine</Link>
            <a href={telHref(company.phones[0])} className="btn-secondary">Call sales</a>
          </div>
        </div>
      </article>

      <div className="container-page mt-16 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <section aria-labelledby="specs-heading">
          <h2 id="specs-heading" className="h-item mb-4">Specifications</h2>
          <SpecTable machine={m} />
        </section>
        <section aria-labelledby="how-heading">
          <h2 id="how-heading" className="h-item mb-4">How it works</h2>
          <div className="max-w-prose space-y-4">
            {m.description.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </section>
      </div>

      <section className="container-page mt-20" aria-labelledby="line-heading">
        <div className="border-t-2 border-graphite pt-8">
          <h2 id="line-heading" className="h-item">Where it sits in your line</h2>
          <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-3 text-[0.95rem]">
            {stages.map((s, i) => (
              <li key={s.id} className="flex items-center gap-2">
                <span
                  className={`rounded-[2px] px-3 py-1.5 font-semibold ${
                    s.id === m.stage ? "bg-graphite text-white" : "bg-steel text-slate"
                  }`}
                  aria-current={s.id === m.stage ? "step" : undefined}
                >
                  {s.name}
                </span>
                {i < stages.length - 1 && <span aria-hidden className="h-0.5 w-6 bg-steel-dark" />}
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {related.map((r) => (
              <Link key={r.slug} href={`/machines/${r.slug}`} className="group border-l-2 border-steel-dark pl-4 hover:border-signal">
                <span className="text-sm text-slate">Also for {stage.name.toLowerCase()}</span>
                <span className="mt-1 block font-semibold group-hover:text-signal">{r.name}</span>
              </Link>
            ))}
            {next && (
              <Link href={`/machines#stage-${next.id}`} className="group border-l-2 border-steel-dark pl-4 hover:border-signal">
                <span className="text-sm text-slate">Next stage</span>
                <span className="mt-1 block font-semibold group-hover:text-signal">{next.name} machines</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
