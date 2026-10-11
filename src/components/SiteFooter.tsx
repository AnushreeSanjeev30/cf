import Link from "next/link";
import { company, telHref } from "@/content/company";
import { machines } from "@/content/machines";

export function SiteFooter() {
  return (
    <footer className="bg-graphite text-steel">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="type-wide text-2xl font-extrabold text-white">
            Canara<span className="text-signal">Flex</span>
          </p>
          <p className="mt-4 max-w-[38ch] text-[0.95rem] leading-relaxed text-steel/80">
            Manufacturers of rotogravure printing, lamination, slitting and inspection machines for flexible
            packaging. Bengaluru, since {company.founded}.
          </p>
          <div className="mt-6 space-y-1 text-[0.95rem]">
            {company.phones.map((p) => (
              <a key={p} href={telHref(p)} className="block text-white hover:text-signal">{p}</a>
            ))}
            <a href={`mailto:${company.email}`} className="block text-white hover:text-signal">{company.email}</a>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-white">Machines</h2>
          <ul className="mt-4 space-y-2 text-[0.95rem]">
            {machines.map((m) => (
              <li key={m.slug}>
                <Link href={`/machines/${m.slug}`} className="text-steel/80 hover:text-white">{m.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-white">Company</h2>
          <ul className="mt-4 space-y-2 text-[0.95rem]">
            <li><Link href="/about" className="text-steel/80 hover:text-white">About us</Link></li>
            <li><Link href="/service" className="text-steel/80 hover:text-white">Sales and service</Link></li>
            <li><Link href="/gallery" className="text-steel/80 hover:text-white">Gallery</Link></li>
            <li><Link href="/contact" className="text-steel/80 hover:text-white">Contact and enquiries</Link></li>
          </ul>
          <h2 className="mt-8 font-semibold text-white">Service teams in</h2>
          <p className="mt-2 text-[0.95rem] text-steel/80">{company.serviceCities.join(", ")}</p>
          {company.social.length > 0 && (
            <ul className="mt-6 flex gap-4 text-[0.95rem]">
              {company.social.map((s) => (
                <li key={s.href}><a href={s.href} className="text-steel/80 hover:text-white">{s.label}</a></li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-page py-6 text-sm text-steel/60">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
