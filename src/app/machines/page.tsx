import type { Metadata } from "next";
import Link from "next/link";
import { Media } from "@/components/Media";
import { PageHeader } from "@/components/PageHeader";
import { QuoteBand } from "@/components/QuoteBand";
import { machinesByStage, stages } from "@/content/machines";

export const metadata: Metadata = {
  title: "Machines",
  description: "Rotogravure printing presses, dry and solventless laminators, slitting machines, inspection rewinders and doctoring machines.",
  alternates: { canonical: "/machines" },
};

export default function MachinesPage() {
  return (
    <>
      <PageHeader
        title="Machines for every stage of flexible packaging."
        intro="Every machine is built to order. Pick the stage you're equipping, then ask us for a configuration that fits your film, widths and speeds."
      />
      <div className="container-page space-y-20">
        {stages.map((stage, i) => (
          <section key={stage.id} aria-labelledby={`stage-${stage.id}`}>
            <div className="flex items-baseline gap-4 border-t-2 border-graphite pt-6">
              <span className="text-sm font-bold tabular-nums text-slate">Stage {i + 1}</span>
              <h2 id={`stage-${stage.id}`} className="h-section scroll-mt-28">{stage.name}</h2>
            </div>
            <p className="mt-3 max-w-prose text-slate">{stage.what}</p>
            <div className="mt-8 grid gap-10 md:grid-cols-2">
              {machinesByStage(stage.id).map((m) => (
                <article key={m.slug}>
                  <Link href={`/machines/${m.slug}`} className="group block">
                    <Media image={m.image} label={m.name} ratio="16/10" sizes="(min-width: 768px) 50vw, 100vw" />
                    <div className="px-3 sm:px-4">
                      <h3 className="h-item mt-3 group-hover:text-signal">{m.name}</h3>
                      <p className="mt-1 text-sm text-slate">
                        {[m.model, m.keySpec].filter(Boolean).join(", ") || "Built to order"}
                      </p>
                      <p className="mt-3 text-[0.95rem]">{m.summary}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <QuoteBand className="mt-24" />
    </>
  );
}
