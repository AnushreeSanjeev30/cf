import { NextResponse } from "next/server";
import { getMachine } from "@/content/machines";

const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Short, readable reference the customer can quote back, e.g. CF-261012-4K7Q.
function makeReference(now: Date) {
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000).toISOString();
  const date = ist.slice(2, 10).replace(/-/g, "");
  const rand = Array.from(crypto.getRandomValues(new Uint8Array(4)), (b) => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[b % 32]).join("");
  return `CF-${date}-${rand}`;
}

const formatIST = (d: Date) =>
  new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }).format(d);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "The enquiry couldn't be read. Refresh the page and try again." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend it worked.
  if (str(body.website)) return NextResponse.json({ ok: true });

  const e = {
    topic: str(body.topic, 20) === "service" ? "Service / spares" : "Quote",
    machine: getMachine(str(body.machine, 100))?.name ?? "Not specified",
    name: str(body.name, 120),
    company: str(body.company, 160),
    phone: str(body.phone, 40),
    email: str(body.email, 160),
    city: str(body.city, 80),
    message: str(body.message, 4000),
  };

  const errors: Record<string, string> = {};
  if (!e.name) errors.name = "Enter your name.";
  if (!e.phone && !e.email) errors.phone = "Enter a phone number or an email so we can reply.";
  if (e.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email)) errors.email = "Enter an email like name@company.com.";
  if (e.phone && e.phone.replace(/\D/g, "").length < 8) errors.phone = "Enter a phone number with at least 8 digits.";
  if (e.message.length < 10) errors.message = "Add a few details about what you need.";
  if (Object.keys(errors).length) {
    return NextResponse.json({ message: "The enquiry wasn't sent. Fix the highlighted fields.", errors }, { status: 422 });
  }

  const now = new Date();
  const reference = makeReference(now);

  const rows: [string, string][] = [
    ["Received", formatIST(now)], ["Reference", reference],
    ["Type", e.topic], ["Machine", e.machine], ["Name", e.name], ["Company", e.company],
    ["Phone", e.phone], ["Email", e.email], ["City", e.city], ["Details", e.message],
  ];

  const channels: { name: string; send: () => Promise<void> }[] = [];

  const sheetUrl = process.env.SHEET_WEBHOOK_URL;
  if (sheetUrl) {
    channels.push({
      name: "sheet",
      send: async () => {
        const res = await fetch(sheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: process.env.SHEET_WEBHOOK_SECRET,
            receivedAt: now.toISOString(),
            reference,
            type: e.topic,
            machine: e.machine,
            name: e.name,
            company: e.company,
            phone: e.phone,
            email: e.email,
            city: e.city,
            details: e.message,
          }),
        });
        const out = await res.json().catch(() => null);
        if (!res.ok || !out?.ok) throw new Error(`sheet ${res.status} ${out?.error ?? ""}`);
      },
    });
  }

  const key = process.env.RESEND_API_KEY;
  if (key) {
    const text = rows.map(([k, v]) => `${k}: ${v || "-"}`).join("\n");
    const html = `<table cellpadding="6">${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escape(v || "-").replace(/\n/g, "<br>")}</td></tr>`).join("")}</table>`;
    channels.push({
      name: "email",
      send: async () => {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: process.env.ENQUIRY_FROM ?? "Canara Flex Website <onboarding@resend.dev>",
            to: (process.env.ENQUIRY_TO ?? "sanjeevflex@gmail.com").split(",").map((s) => s.trim()),
            reply_to: e.email || undefined,
            subject: `${e.topic} enquiry ${reference}: ${e.machine} (${e.name}${e.company ? ", " + e.company : ""})`,
            text,
            html,
          }),
        });
        if (!res.ok) throw new Error(`email ${res.status} ${await res.text()}`);
      },
    });
  }

  if (!channels.length) {
    console.info("[enquiry] no sheet or email configured, logging instead:\n" + rows.map(([k, v]) => `${k}: ${v || "-"}`).join("\n"));
    return NextResponse.json({ ok: true, reference });
  }

  // The enquiry counts as received if it reached at least one place.
  const results = await Promise.allSettled(channels.map((c) => c.send()));
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[enquiry] ${channels[i].name} failed`, reference, r.reason);
  });
  if (results.every((r) => r.status === "rejected")) {
    return NextResponse.json(
      { message: "The enquiry wasn't sent because of a problem on our side. Call us instead, or try again in a few minutes." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, reference });
}
