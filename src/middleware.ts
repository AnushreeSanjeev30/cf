import { NextResponse, type NextRequest } from "next/server";
import { legacyRedirects } from "@/content/redirects";

// Sends visitors and search engines from old WordPress URLs to the new pages.
// Old product URLs end in a stray invisible character (%EF%BF%BC), so paths are
// decoded and stripped of non-ASCII characters and trailing slashes before lookup.
export function middleware(req: NextRequest) {
  let path = req.nextUrl.pathname;
  try { path = decodeURIComponent(path); } catch {}
  const clean = path.replace(/[^\x20-\x7E]/g, "").replace(/\/+$/, "").toLowerCase();
  const target = legacyRedirects[clean];
  if (target) return NextResponse.redirect(new URL(target, req.url), 308);
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next|api|.*\\..*).*)"] };
