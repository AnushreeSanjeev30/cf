import Link from "next/link";
import type { Machine } from "@/content/machines";

export function SpecTable({ machine }: { machine: Machine }) {
  return (
    <div>
      {machine.specs.length > 0 && (
        <dl className="border-t-2 border-graphite">
          {machine.specs.map((s) => (
            <div key={s.label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-4 border-b border-steel-dark py-3">
              <dt className="text-slate">{s.label}</dt>
              <dd className="font-semibold tabular-nums text-graphite">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {!machine.specsComplete && (
        <p className={`text-[0.95rem] text-slate ${machine.specs.length ? "mt-4" : "border-t-2 border-graphite pt-4"}`}>
          Web widths, drive and dryer options are configured per order.{" "}
          <Link href={`/contact?machine=${machine.slug}`} className="link">Ask for the full datasheet</Link>.
        </p>
      )}
    </div>
  );
}
