import { NextResponse } from "next/server";
import { getMachine } from "@/content/machines";

const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

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

  const rows: [string, string][] = [
    ["Type", e.topic], ["Machine", e.machine], ["Name", e.name], ["Company", e.company],
    ["Phone", e.phone], ["Email", e.email], ["City", e.city], ["Details", e.message],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v || "-"}`).join("\n");
  const html = `<table cellpadding="6">${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escape(v || "-").replace(/\n/g, "<br>")}</td></tr>`).join("")}</table>`;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info("[enquiry] RESEND_API_KEY not set, logging instead:\n" + text);
    return NextResponse.json({ ok: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM ?? "Canara Flex Website <onboarding@resend.dev>",
      to: (process.env.ENQUIRY_TO ?? "sanjeevflex@gmail.com").split(",").map((s) => s.trim()),
      reply_to: e.email || undefined,
      subject: `${e.topic} enquiry: ${e.machine} (${e.name}${e.company ? ", " + e.company : ""})`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[enquiry] email failed", res.status, await res.text());
    return NextResponse.json(
      { message: "The enquiry wasn't sent because our mail service failed. Call us instead, or try again in a few minutes." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
