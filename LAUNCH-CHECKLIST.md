# Launch Checklist — Golden Properties & Developers

## Owner confirmation — must complete before public launch

- [ ] Confirm exact legal/public business name and whether “& Developers” should be used.
- [ ] Confirm the full office address, map pin and correct nearby landmark (public sources conflict between HDFC and Kotak Mahindra Bank).
- [ ] Call-test +91 97219 98088 and confirm it is the correct public business number.
- [ ] Confirm whether that number is WhatsApp-enabled; only then set `whatsappEnabled: true` in `site-config.js`.
- [ ] Choose the correct inquiry email (public material lists `ravishukla1985@gmail.com` and `goldenproperties@gmail.com`); configure form delivery to the owner's approved destination.
- [ ] Confirm public opening days and hours before adding them to the site.
- [ ] Confirm Ravi Shukla's role/name and permission to publish it before adding an owner/contact bio.
- [ ] Confirm founding year and any years-of-experience claims.
- [ ] Confirm active service categories and locations served.
- [ ] Supply current property inventory with verified references, status, prices/rents, dimensions, photos, locality, availability and last-verified date.
- [ ] Supply any RERA/approval/registration details only when verifiable and approved for publication.
- [ ] Approve testimonials and permitted use of attributed review excerpts; refresh review-platform data at launch.
- [ ] Confirm rights to use all logos, office/property photos and social profiles.
- [ ] Secure the old domain/hosting, reset credentials, inspect for malware, restore from a clean backup and confirm the domain is safe before reconnecting it.

## Technical release checklist

- [ ] Replace illustrative Unsplash images with owner-approved or properly licensed images and document the image source/license.
- [ ] Configure HTTPS form endpoint(s), server-side field validation/sanitization, rate limiting, spam controls, CORS restrictions and secure delivery to approved email/CRM.
- [ ] Test successful delivery and failure states; verify empty form does not claim submission success.
- [ ] Test listing dataset additions, property search filters, no-results state, listing detail pages and enquiry references.
- [ ] Test all navigation and internal links on phone, tablet and desktop sizes.
- [ ] Test keyboard navigation, visible focus, form labels, mobile sticky actions, colour contrast and reduced-motion preference.
- [ ] Set production domain, canonical URLs, sitemap, robots.txt, Open Graph image and any structured data after verifying all represented facts.
- [ ] Review final Privacy Policy and Terms for the actual setup and applicable requirements.
- [ ] Configure analytics only if needed, with applicable consent and privacy controls.
- [ ] Run performance tests on the deployed site; optimise images and verify Core Web Vitals.
- [ ] Remove the preview banner and owner-confirmation language only after the related details are genuinely verified.

## Build-time checks performed

- [x] Multi-page static source generated.
- [x] Navigation, footer and mobile action bar are shared via JavaScript.
- [x] Empty listing dataset is present; no invented listing cards are included.
- [x] Forms visibly disclose that no submission is sent while endpoints are blank.
- [x] Call action uses the public-directory phone candidate; WhatsApp action remains disabled pending verification.
- [x] Privacy and Terms drafts are included and explicitly marked for review.
- [ ] Live form delivery, owner-supplied listing tests, mobile-device testing, production hosting, domain security review and Core Web Vitals testing remain pending because the required configuration/data/environment was not provided.
