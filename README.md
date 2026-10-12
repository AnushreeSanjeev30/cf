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

If `SHEET_WEBHOOK_URL` is set, every enquiry is also added as a row in a Google Sheet (see below).
An enquiry counts as received if it reaches the sheet or the email; each one gets a reference
number like `CF-261012-4K7Q` that is shown to the customer, included in the email subject and
recorded in the sheet.

Links like `/contact?machine=dry-lamination` pre-select the machine;
`/contact?topic=service` switches the form to a service request.

## Enquiry sheet

Each quote or service request is recorded in a Google Sheet with the date and time (IST), a
reference number, the customer's details, and three columns for the person following up:
**Status** (a dropdown: New, Contacted, Quote sent, In progress, Won, Lost, Closed), **Assigned to**
and **Follow-up notes**. The sheet can be shared with the team and downloaded as Excel at any time
(File → Download → Microsoft Excel).

One-time setup, about five minutes:

1. Create a new Google Sheet (for example "Canara Flex enquiries") with the company Google account.
2. Open **Extensions → Apps Script**, delete the sample code, paste in
   `integrations/enquiry-sheet.gs` and save.
3. In Apps Script, open **Project Settings → Script properties**, add a property named `SECRET`
   and give it a long random value (a password generator works).
4. Click **Deploy → New deployment**, choose type **Web app**, set *Execute as* to **Me** and
   *Who has access* to **Anyone**, then **Deploy** and approve the permissions prompt.
5. Copy the web app URL (ends in `/exec`). In Vercel, add the environment variables
   `SHEET_WEBHOOK_URL` (that URL) and `SHEET_WEBHOOK_SECRET` (the same value as `SECRET`), then redeploy.

The **Enquiries** tab and its headings are created automatically on the first submission. To get an
alert for each new row, use **Tools → Notification settings** in the sheet. If you later change the
script, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.

## Old URLs

`src/middleware.ts` 308-redirects the old WordPress paths (including the broken
`%EF%BF%BC` product URLs) to the new pages, so existing Google rankings and links carry over.

## Design notes

- Typeface: Inter (Google Fonts). Headings are regular weight with tight letter-spacing; hierarchy comes from size, not boldness.
- Colours (in `tailwind.config.ts`): signal red `#ED2028` (the existing brand red) for actions only,
  graphite `#2A3036` text, steel `#E8EBEC` panels.
- Logo: `src/components/Logo.tsx` redraws the CF gear mark from the old site as SVG. Replace it
  with the original artwork if the client has it.
- Motifs from print production: crop marks around product photos, and the 8-patch colour strip
  that shows a press's station count.
