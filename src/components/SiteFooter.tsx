import Link from "next/link";
import { Logo } from "./Logo";
import { company, telHref } from "@/content/company";
import { machines } from "@/content/machines";

const companyLinks = [
  { href: "/about", label: "About us" },
  { href: "/service", label: "Sales and service" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact and enquiries" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-steel">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1.2fr_0.9fr_1fr]">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-[38ch] text-[0.95rem] leading-relaxed text-steel/75">
            Manufacturers of rotogravure printing, lamination, slitting and inspection machines for flexible
            packaging. {company.address.city}, since {company.founded}.
          </p>
          <Link href="/contact" className="btn-primary mt-6 px-5 py-2.5 text-sm">Request a quote</Link>
        </div>

        <div>
          <h2 className="eyebrow text-white">Machines</h2>
          <ul className="mt-5 space-y-2.5 text-[0.95rem]">
            {machines.map((m) => (
              <li key={m.slug}>
                <Link href={`/machines/${m.slug}`} className="text-steel/75 hover:text-white">{m.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-white">Company</h2>
          <ul className="mt-5 space-y-2.5 text-[0.95rem]">
            {companyLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="text-steel/75 hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
          {company.social.length > 0 && (
            <ul className="mt-6 flex gap-4 text-[0.95rem]">
              {company.social.map((s) => (
                <li key={s.href}><a href={s.href} className="text-steel/75 hover:text-white">{s.label}</a></li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="eyebrow text-white">Get in touch</h2>
          <address className="mt-5 space-y-2.5 text-[0.95rem] not-italic">
            {company.phones.map((p) => (
              <a key={p} href={telHref(p)} className="block tabular-nums text-white hover:text-signal">{p}</a>
            ))}
            <a href={`mailto:${company.email}`} className="block text-white hover:text-signal">{company.email}</a>
            <span className="block pt-2 text-steel/75">
              {company.address.line1 && <>{company.address.line1}<br /></>}
              {company.address.city}, {company.address.region}, {company.address.country}
            </span>
          </address>
          <h2 className="eyebrow mt-8 text-white">Service teams</h2>
          <p className="mt-3 text-[0.95rem] text-steel/75">{company.serviceCities.join(" · ")}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-steel/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p>Made in India</p>
        </div>
      </div>
    </footer>
  );
}
