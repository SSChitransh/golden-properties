# Golden Properties & Developers — Website Preview

A responsive, static-first real-estate website for a Lucknow property consultancy. This project follows the detailed property-business brief supplied with the task; the attachment's opening line mentions a fitness gym, but the remainder of the brief clearly specifies Golden Properties & Developers.

## Included

- Responsive home page plus Buy, Rent, Sell/Lease, Property Management, Areas, About, Contact, Privacy, Terms and reusable Listing Detail pages.
- Responsive navigation, mobile action bar, call link, and a WhatsApp action that remains disabled until the business verifies the number.
- Property search/filter connected to `data/listings.json`. It displays an honest empty state until actual listings are supplied.
- General enquiry and owner/list-your-property forms with browser validation, consent controls, a client-side honeypot and clear form-delivery status.
- SEO titles/descriptions, social metadata, favicon, readable page structure and reduced-motion support.
- An owner-confirmation launch checklist.

## Run locally

1. Extract this folder.
2. Open a terminal in this folder.
3. Start a local static server, for example:

   ```bash
   python -m http.server 8000
   ```

4. Open `http://localhost:8000/`.

A local server is recommended because the listing data is loaded from `data/listings.json`; browser security may block that request when opening `index.html` directly as a `file://` URL.

## Before launch — required

1. Confirm the business's legal/public name, address, phone, WhatsApp status, email, hours, contact person's name/title, founding date, service list and geographic coverage.
2. The old domain listed in the brief was reported to show a “Hacked By…” message. **Do not connect this build to that domain or reuse its assets/scripts until the owner/hosting provider confirms the domain and hosting are secured and malware-free.** Prefer staging on a new, clean hostname while remediation is completed.
3. Replace all illustrative architectural photos with owner-approved photographs or properly licensed stock imagery. They are not listing photos. The actual page-level stock images currently load from Unsplash URLs and require licensing/provenance review before production.
4. Add only owner-confirmed, currently available listings to `data/listings.json`. Do not invent prices, locations, dimensions, amenities, photos, approvals or availability.
5. Configure a real HTTPS server endpoint for each form in `site-config.js`. Do not put SMTP passwords, API secrets or private CRM credentials in browser-side JavaScript.
6. The endpoint should validate and sanitize every field server-side, reject the `website` honeypot when populated, rate-limit/IP-throttle requests, add suitable spam protection, restrict CORS to the production origin, and securely send/store the enquiry. Test actual delivery to the approved business email/CRM. This static preview intentionally does **not** send or persist forms while endpoints are blank.
7. Set `whatsappEnabled: true` only after the owner confirms the phone number is WhatsApp-enabled. Confirm the phone works before publication.
8. Confirm the office map pin/landmark before embedding a map. The address is used as a starting point from third-party directory information and is not owner-verified in this build.
9. Review the draft Privacy Policy and Terms with the owner and an appropriate legal reviewer; insert final contact details and any legally required disclosures.
10. Set the production domain in canonical tags, sitemap and Open Graph metadata after choosing a safe, confirmed domain. This preview intentionally does not set a canonical host because the existing domain was reported as compromised.
11. Add verified structured data only after confirming address, phone, hours and any other fields. Do not add ratings/reviews to structured data unless the displayed values are current, attributed and verified.
12. Test on actual mobile devices, review contrast/keyboard navigation, verify all form delivery, measure Core Web Vitals, configure HTTPS, and remove the preview banner and all pre-launch warnings only once their issues are resolved.

## Adding verified listings

Edit `data/listings.json`. It must remain a JSON array. The following object is a **schema example only**; do not copy it into the live dataset without replacing every illustrative value with confirmed data:

```json
[
  {
    "id": "OWNER-APPROVED-REFERENCE",
    "status": "available",
    "transaction": "buy",
    "type": "flat",
    "title": "Owner-approved listing title",
    "locality": "Confirmed locality",
    "description": "Owner-approved description",
    "lastVerified": "YYYY-MM-DD"
  }
]
```

`status` must be `available` for a listing to appear. The search currently supports `transaction` values such as `buy`, `rent` and `lease`, and types such as `plot`, `flat`, `house`, `villa` and `commercial`. Use numeric `price` values in rupees if you want the simple budget filter to work (sale prices are total asking prices; rental prices are monthly rent); consider extending the schema with a separate price unit for rent, monthly/yearly cadence, area dimensions, floor, bedrooms, bathrooms, parking, furnishing, amenities, map URL, owner-approved photos and optional verifiable approval references. Update `app.js` filters if the schema changes.

## Configure forms

In `site-config.js`, set `inquiryEndpoint` and optionally `propertyEndpoint` to **your own HTTPS endpoint** once implemented. The endpoint receives JSON containing the form fields plus `formType`, `pageUrl` and `submittedAt`. It must return a 2xx status only when delivery has been accepted. The website does not assume that a visit is booked just because a form was submitted.

`site-config.js` is public client-side configuration. It must contain only non-secret, public values. Private keys and provider credentials belong on the server side.

## Deployment

The pages can be hosted on static hosting such as GitHub Pages, Netlify or Cloudflare Pages. For GitHub Pages, publish the contents of this folder from the selected Pages source. Static hosting alone does not supply secure form delivery or an inventory admin/CMS; a serverless function or managed backend is still needed for form processing. Replace the placeholder domain in `sitemap.xml`, add a canonical link once the final domain is known, and configure correct `robots.txt`/sitemap URLs before indexing.

## Technical notes

- No current listings are included because verified inventory was not provided.
- No email is published because the source brief lists conflicting email addresses.
- Business hours and the nearby-bank landmark are intentionally omitted until confirmed.
- Public phone/address and area suggestions remain clearly marked as requiring owner confirmation.
- Public review sites link out directly; this website does not synthesize ratings or fabricate review excerpts.
- The old domain is not used as a source or as an asset host.
