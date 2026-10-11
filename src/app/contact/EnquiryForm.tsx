"use client";

import { useState } from "react";
import { company, telHref } from "@/content/company";

type Props = {
  machines: { slug: string; name: string }[];
  defaultMachine: string;
  defaultTopic: "quote" | "service";
};

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

const field = "mt-1.5 w-full rounded-[2px] border border-steel-dark bg-paper px-3.5 py-3 text-graphite placeholder:text-slate/60 focus:border-graphite focus:outline-none focus:ring-2 focus:ring-graphite/20";
const label = "block text-[0.95rem] font-semibold";

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
        setStatus({ state: "sent" });
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
      <div role="status" className="border-l-4 border-signal bg-steel p-6">
        <p className="h-item">Enquiry sent.</p>
        <p className="mt-2 text-slate">
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
    errors[name] ? <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-signal-dark">{errors[name]}</p> : null;
  const aria = (name: string) => (errors[name] ? { "aria-invalid": true, "aria-describedby": `${name}-error` } : {});

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <fieldset>
        <legend className={label}>What do you need?</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {[
            { value: "quote", text: "A quote for a new machine" },
            { value: "service", text: "Service or spares" },
          ].map((o) => (
            <label key={o.value} className="flex cursor-pointer items-center gap-2 rounded-[2px] border border-steel-dark px-4 py-2.5 has-[:checked]:border-graphite has-[:checked]:bg-steel">
              <input type="radio" name="topic" value={o.value} defaultChecked={o.value === defaultTopic} className="accent-signal" />
              {o.text}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="machine" className={label}>Machine</label>
        <select id="machine" name="machine" defaultValue={defaultMachine} className={field}>
          <option value="">Not sure yet</option>
          {machines.map((m) => <option key={m.slug} value={m.slug}>{m.name}</option>)}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Your name</label>
          <input id="name" name="name" autoComplete="name" required className={field} {...aria("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="company" className={label}>Company</label>
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
      <p className="-mt-3 text-sm text-slate">Give us a phone number, an email, or both.</p>

      <div>
        <label htmlFor="city" className={label}>City</label>
        <input id="city" name="city" autoComplete="address-level2" className={field} />
      </div>

      <div>
        <label htmlFor="message" className={label}>Details</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={field}
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
        <p role="alert" className="border-l-4 border-signal bg-steel px-4 py-3 text-[0.95rem]">{status.message}</p>
      )}

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status.state === "sending"}>
        {status.state === "sending" ? "Sending enquiry…" : "Send enquiry"}
      </button>
    </form>
  );
}
