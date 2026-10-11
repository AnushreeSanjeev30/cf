# Canara Flex website

Next.js 14 (App Router) + TypeScript + Tailwind CSS. A rebuild of canaraflex.com.

## Run it

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

Deploy to Vercel: import the repo, add the variables from `.env.example`, deploy.

## Where to edit content

All copy and data the client will change lives in `src/content/`:

| File | What's in it |
| --- | --- |
| `company.ts` | Phones, email, address, service cities, map, social links |
| `machines.ts` | The 7 machines: names, models, specs, descriptions, photos, old URLs |
| `gallery.ts` | Gallery photos and videos, hero and factory photos |
| `redirects.ts` | Old WordPress URLs mapped to new pages |

Product pages, the home page, the enquiry dropdown, the sitemap and redirects are all
generated from `machines.ts`. Adding a machine is one new object in that array.

Search the project for `TODO` to find everything waiting on the client.

## Waiting on the client

- **Photos**: put them in `public/images/` and point `image.src` at `/images/your-file.jpg`.
  Machines without a photo show a labelled placeholder. Once every photo is local,
  remove `remotePatterns` from `next.config.mjs`.
- **Specs**: for each machine, add rows to `specs` (web width, max reel diameter,
  drive, dryer, power, footprint) and set `specsComplete: true`.
- **Full postal address** in `company.ts`.
- **Brochures** (optional): add a `brochure` field to `Machine` and a download link in `SpecTable.tsx`.
- **Videos**: replace the raw WhatsApp clips in `gallery.ts`.
- **Social links**: add to `company.social`, or leave empty to hide them.
- **Copy review**: machine descriptions and the About page were rewritten from
  the old site; the client should confirm the technical details.

## Enquiry form

`/contact` posts to `src/app/api/enquiry/route.ts`. With `RESEND_API_KEY` set, each enquiry
is emailed to `ENQUIRY_TO` (reply-to is the customer's email). Without it, enquiries are
only logged to the server console. A hidden honeypot field filters basic spam bots.

Links like `/contact?machine=dry-lamination` pre-select the machine;
`/contact?topic=service` switches the form to a service request.

## Old URLs

`src/middleware.ts` 308-redirects the old WordPress paths (including the broken
`%EF%BF%BC` product URLs) to the new pages, so existing Google rankings and links carry over.

## Design notes

- Typeface: Archivo (Google Fonts, variable width). Headings use the wide cut (`.type-wide`), body text the normal width.
- Colours (in `tailwind.config.ts`): signal red `#ED2028` (the existing brand red) for actions only,
  graphite `#2A3036` text, steel `#E8EBEC` panels.
- Motifs from print production: the colour control bar at the top of every page, crop marks
  around product photos, and the 8-patch colour strip that shows a press's station count.
