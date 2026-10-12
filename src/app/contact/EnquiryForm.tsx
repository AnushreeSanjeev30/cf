"use client";

import { useState } from "react";
import { company, telHref } from "@/content/company";

type Props = {
  machines: { slug: string; name: string }[];
  defaultMachine: string;
  defaultTopic: "quote" | "service";
};

type Status = { state: "idle" | "sending" } | { state: "sent"; reference?: string } | { state: "error"; message: string };

const field = "block h-11 w-full rounded-[3px] border border-steel-dark bg-paper px-3 text-[0.9rem] text-graphite shadow-sm shadow-black/[0.02] placeholder:text-slate/70 transition-colors hover:border-slate/50 focus:border-graphite focus:outline-none focus:ring-2 focus:ring-graphite/15 aria-[invalid=true]:border-signal";

export function EnquiryForm({ machines, defaultMachine, defaultTopic }: Props) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [machine, setMachine] = useState(defaultMachine);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ state: "sending" });
    setErrors({});
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus({ state: "sent", reference: body.reference });
        form.reset();
        setMachine("");
        return;
      }
      if (body.errors) setErrors(body.errors);
      setStatus({ state: "error", message: body.message ?? "The enquiry wasn't sent. Check the highlighted fields." });
    } catch {
      setStatus({ state: "error", message: `The enquiry wasn't sent because the connection failed. Try again, or call ${company.phones[0]}.` });
    }
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="border-l-4 border-signal bg-paper p-6">
        <p className="h-item">Thank you. Your enquiry has been received.</p>
        {status.reference && (
          <p className="mt-2 text-[0.95rem]">
            Reference number: <span className="font-semibold tabular-nums">{status.reference}</span>
          </p>
        )}
        <p className="mt-2 text-[0.95rem] text-slate">
          Our sales team will get back to you by phone or email. For anything urgent, call{" "}
          <a href={telHref(company.phones[0])} className="link">{company.phones[0]}</a>.
        </p>
        <button type="button" className="link mt-4" onClick={() => setStatus({ state: "idle" })}>
          Send another enquiry
        </button>
      </div>
    );
  }

  const err = (name: string) =>
    errors[name] ? <p id={`${name}-error`} className="mt-1 text-xs font-medium text-signal-dark">{errors[name]}</p> : null;
  const aria = (name: string) => (errors[name] ? { "aria-invalid": true, "aria-describedby": `${name}-error` } : {});

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-3">
      <fieldset className="pb-1">
        <legend className="sr-only">Enquiry type</legend>
        <div className="inline-flex rounded-[3px] border border-steel-dark bg-paper p-0.5">
          {[
            { value: "quote", text: "New machine quote" },
            { value: "service", text: "Service or spares" },
          ].map((o) => (
            <label key={o.value} className="cursor-pointer rounded-[2px] px-4 py-1.5 text-[0.85rem] font-medium text-slate transition-colors hover:text-graphite has-[:checked]:bg-signal has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal/30">
              <input type="radio" name="topic" value={o.value} defaultChecked={o.value === defaultTopic} className="sr-only" />
              {o.text}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="name" className="sr-only">Your name</label>
        <input id="name" name="name" autoComplete="name" required placeholder="Your Name" className={field} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="email" className="sr-only">Your email</label>
        <input id="email" name="email" type="email" autoComplete="email" placeholder="Your Email" className={field} {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="phone" className="sr-only">Your phone number</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Your Phone Number" className={field} {...aria("phone")} />
        {err("phone")}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="sr-only">Company (optional)</label>
          <input id="company" name="company" autoComplete="organization" placeholder="Company (optional)" className={field} />
        </div>
        <div>
          <label htmlFor="city" className="sr-only">City (optional)</label>
          <input id="city" name="city" autoComplete="address-level2" placeholder="City (optional)" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="machine" className="sr-only">Machine</label>
        <select
          id="machine"
          name="machine"
          value={machine}
          onChange={(ev) => setMachine(ev.target.value)}
          className={`${field} ${machine ? "" : "!text-slate/70"}`}
        >
          <option value="">Machine of interest (not sure yet)</option>
          {machines.map((m) => <option key={m.slug} value={m.slug}>{m.name}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="sr-only">Your message</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          required
          className={`${field} h-auto py-2.5 leading-relaxed`}
          placeholder="Your Message: film type, web width, colours, target speed, or the problem you're seeing"
          {...aria("message")}
        />
        {err("message")}
      </div>

      {/* Honeypot: hidden from people, filled in by bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status.state === "error" && (
        <p role="alert" className="border-l-4 border-signal bg-paper px-4 py-3 text-sm">{status.message}</p>
      )}

      <button type="submit" className="btn-primary w-full py-3 text-sm uppercase tracking-[0.08em]" disabled={status.state === "sending"}>
        {status.state === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
