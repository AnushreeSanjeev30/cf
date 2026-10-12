"use client";

import { useState } from "react";
import { company, telHref } from "@/content/company";

type Props = {
  machines: { slug: string; name: string }[];
  defaultMachine: string;
  defaultTopic: "quote" | "service";
};

type Status = { state: "idle" | "sending" } | { state: "sent"; reference?: string } | { state: "error"; message: string };

const field = "mt-1 block h-10 w-full rounded-[3px] border border-steel-dark bg-paper px-3 text-[0.9rem] text-graphite shadow-sm shadow-black/[0.02] placeholder:text-slate/55 transition-colors hover:border-slate/50 focus:border-graphite focus:outline-none focus:ring-2 focus:ring-graphite/15 aria-[invalid=true]:border-signal";
const label = "block text-[0.8rem] font-semibold text-graphite";
const optional = <span className="font-normal text-slate"> (optional)</span>;

export function EnquiryForm({ machines, defaultMachine, defaultTopic }: Props) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      <div role="status" className="border-l-4 border-signal bg-mist p-6">
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
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <fieldset>
        <legend className={label}>Enquiry type</legend>
        <div className="mt-1.5 inline-flex rounded-[3px] border border-steel-dark p-0.5">
          {[
            { value: "quote", text: "New machine quote" },
            { value: "service", text: "Service or spares" },
          ].map((o) => (
            <label key={o.value} className="cursor-pointer rounded-[2px] px-4 py-1.5 text-[0.85rem] font-medium text-slate transition-colors hover:text-graphite has-[:checked]:bg-graphite has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-graphite/30">
              <input type="radio" name="topic" value={o.value} defaultChecked={o.value === defaultTopic} className="sr-only" />
              {o.text}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
        <div>
          <label htmlFor="machine" className={label}>Machine</label>
          <select id="machine" name="machine" defaultValue={defaultMachine} className={field}>
            <option value="">Not sure yet</option>
            {machines.map((m) => <option key={m.slug} value={m.slug}>{m.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="city" className={label}>City{optional}</label>
          <input id="city" name="city" autoComplete="address-level2" className={field} />
        </div>
        <div>
          <label htmlFor="name" className={label}>Full name</label>
          <input id="name" name="name" autoComplete="name" required className={field} {...aria("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="company" className={label}>Company{optional}</label>
          <input id="company" name="company" autoComplete="organization" className={field} />
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" className={field} {...aria("phone")} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} {...aria("email")} />
          {err("email")}
        </div>
      </div>
      <p className="-mt-3 text-xs text-slate">Provide a phone number, an email, or both.</p>

      <div>
        <label htmlFor="message" className={label}>Requirement details</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={`${field} h-auto py-2 leading-relaxed`}
          placeholder="Film types, web width, number of colours, target speed, or the problem you're seeing"
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
        <p role="alert" className="border-l-4 border-signal bg-mist px-4 py-3 text-sm">{status.message}</p>
      )}

      <div className="flex flex-col gap-3 border-t border-steel-dark pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate">We will get back to you by phone or email.</p>
        <button type="submit" className="btn-primary px-6 py-2.5 text-sm" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Submitting…" : "Submit enquiry"}
        </button>
      </div>
    </form>
  );
}
