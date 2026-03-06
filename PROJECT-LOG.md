# MGS Communications Website - Project Log

**Site**: https://mgscommunications.com
**Repo**: https://github.com/dustpan43/mgs-site
**Team Email**: team@mgscommunications.com
**Phone**: (505) 888-2034

---

## Update History

### 2026-03-06 — Real Photos Added to Website (Phase 1)
**Commit**: `20e4e1d`
- Reviewed and renamed all 55 raw photos from `MGS Communications Photos/` folder
- Installed Node.js + sharp; batch-compressed 20 photos from 17-28MB to 50-320KB each (99%+ reduction)
- Organized into `/images/hero/`, `/images/radios/`, `/images/building/`, `/images/interior/`
- **Homepage**: Radio lineup hero background + Kenwood NX-1300 in-hand on service card
- **About Us**: Building + Sandia Mountains hero + showroom overlay on "30 Years" box
- **Contact**: Storefront sign hero
- **Two-Way Radios**: Radio lineup hero
- **Service Areas**: Building + Sandias angle hero
- Created `photo-catalog.md` with full inventory, naming, and placement guide
- Updated `.gitignore` to exclude raw photos and build artifacts
- **Still needed**: Security equipment photos, repair bench/tech photos, team photo

### 2026-03-06 — Hero Badge Reverted to Gold
**Commit**: `c24a5bf`
- Changed "Celebrating 30 Years of Service" badge back to gold (`--yellow-light: #fdd835`)
- Turquoise didn't stand out enough against the dark hero background

### 2026-03-05 — Turquoise Accents Site-Wide
**Commit**: `c4a7659`
- Applied turquoise (#00BCD4) accent color across all 17 pages per Missy's request
- Added CSS variables: `--turquoise: #00BCD4`, `--turquoise-light: #26C6DA`
- Changed: section labels, trust bar icons, Why Us card icons, mobile call button
- Kept green: `.btn-green` buttons, nav hovers, form focus states, footer badges

### 2026-03-05 — Turquoise Accents on Homepage + Hero Call Button
**Commits**: `17d8d5a`, `6cc0e3e`, `9340c71`
- Tested turquoise as accent color on homepage first (Missy approved)
- Applied to: section labels, trust bar icons, Why Us icons, testimonial nav hover
- Hero Call button changed to turquoise
- Hero "Celebrating 30 Years" badge temporarily turquoise (later reverted to gold)

### 2026-03-05 — Payment Page: Billing Address Fields
**Commits**: `17d8d5a`, `fd8a588`, `4d75a75`, `70b37de`
- Added billing address fields: Address, City, State dropdown (defaults to NM), ZIP
- Updated serverless function to pass address1, city, state, zip to NMI API for AVS verification
- Added company and phone fields to payment form and API
- Auto-format payment amount to two decimal places on blur
- Invoice placeholder changed from "INV-12345" to "MG-12345"

### 2026-03-05 — Payment CORS Fix + Error Reference
**Commits**: `631ed66`, `ec1cc6c`
- Fixed CORS to allow both `mgscommunications.com` and `www.mgscommunications.com`
- Added www-to-non-www 301 redirect in `netlify.toml`
- Created `payment-error-reference.md` with NMI error codes, meanings, and troubleshooting

### 2026-03-05 — NMI Payment Integration Live
- Serverless function (`netlify/functions/process-payment.js`) processing real payments
- $1.00 test charge approved (Transaction ID: 11786216245, auth code 00707B)
- Public tokenization key in HTML, private API key in Netlify env var
- Collect.js handles PCI-compliant card tokenization client-side

### 2026-03-04 — 6 Resource Articles Added
- Choosing the Right Two-Way Radio (`/resources/choosing-two-way-radios/`)
- FCC Licensing Guide (`/resources/fcc-licensing-guide/`)
- Radio Rental Guide (`/resources/radio-rental-guide/`)
- Security Camera Placement (`/resources/security-camera-placement/`)
- CCTV vs IP Cameras (`/resources/cctv-vs-ip-cameras/`)
- Radio Battery Life (`/resources/radio-battery-life/`)
- Total pages: 17 (11 main + 6 articles)

### 2026-03-04 — Mobile Optimization Audit (Critical & Important Fixes)
**Commit**: `bc892a7`
- Comprehensive mobile audit across all 11 pages — fixed all Critical and Important issues
- **Touch targets**: Menu toggle, popup close button, carousel nav, footer links all increased to 44px minimum (Apple HIG compliance)
- **Overflow fix**: Added `overflow-x: hidden` to prevent horizontal scroll on all pages
- **iOS zoom prevention**: Form input font-size increased to 1rem (16px) — prevents Safari auto-zoom on focus
- **Sticky call bar**: Added `body padding-bottom: 60px` so footer content isn't hidden behind mobile call bar
- **Mobile nav**: Increased tap target padding on nav links and dropdown menu items
- **Carousel swipe**: Added touch swipe support (touchstart/touchend) on homepage testimonial carousel
- **Dropdown fix**: Services dropdown `href="#"` no longer scrolls to top on mobile (preventDefault added)
- **Responsive polish**: Popup and form card padding adjusted for smaller screens

### 2026-03-04 — Testimonial Carousel Fix
**Commit**: `b673d4a`
- Fixed testimonial cards clipping on the right side
- Changed card width from fixed pixel to percentage-based `calc()` for exact container fit
- Updated responsive breakpoints (3 cards desktop, 2 tablet, 1 mobile)

### 2026-03-04 — Exit-Intent Popup Improvement
**Commit**: `fc5970f`
- Popup no longer fires on every page switch (was resetting per page load)
- Added localStorage-based 3-day cooldown across all pages
- Added 15-second delay before popup can trigger (prevents immediate fire)
- Removed popup entirely from Contact page (user is already converting)

### 2026-03-04 — Logo & Favicon Added
**Commit**: `19352ab`
- Added MGS Communications logo (transparent PNG) to the header across all 11 pages
- Added favicon (browser tab icon) to all pages
- Renamed image files to web-friendly names (no spaces or special characters)
- Files added: `images/mgs-logo.png`, `images/mgs-30th-birthday.jpg`, `images/favicon.png`

### 2026-03-03 — Google Reviews, Forms, Brand & Testimonial Updates
**Commit**: `72554b8`
- Replaced placeholder testimonials with 5 real Google Reviews
- Added "Business Name" field to all forms across the site
- Reordered brand mentions: Kenwood listed before Motorola everywhere
- Fixed trust bar: corrected Google rating from 4.9 to actual 4.6 stars
- Fixed testimonial carousel: narrowed cards, removed duplicate rating display, corrected JS card count
- Added Business Name field to homepage popup form

### 2026-03-03 — Initial Launch
**Commit**: `cfb30f3`
- Full 10-page website built and deployed to Netlify
- Custom domain (mgscommunications.com) configured via Squarespace DNS
- SSL certificate provisioned (auto-renew via Netlify/Let's Encrypt)
- Netlify Forms configured with email notifications
- SEO setup: sitemap.xml, robots.txt, meta descriptions, structured page titles
- Security headers configured in netlify.toml

---

## Current Status
- **Live and operational** at mgscommunications.com
- **17 pages** (11 main + 6 resource articles) + thank-you page + payment page
- All forms functional and sending to team@mgscommunications.com
- **Payment page live** — NMI/Collect.js processing real transactions
- **Turquoise accents** applied site-wide
- **Real photos** on 5 pages (Homepage, About Us, Contact, Two-Way Radios, Service Areas)
- SSL active with auto-renewal
- Node.js + Python installed on dev machine

---

## Upcoming / Needs

### High Priority
- [x] **Mobile optimization audit** — Completed 2026-03-04
- [x] **Install Node.js + Python** — Completed 2026-03-06
- [x] **Payment integration** — NMI/Collect.js live as of 2026-03-05
- [x] **Image optimization** — 20 photos compressed and deployed 2026-03-06
- [ ] **Photos Phase 2** — Add photos to Why Us hero, resource articles (existing photos available)
- [ ] **Missing photos** — Security equipment, repair bench, team photo (need photo shoot or AI generation)

### Medium Priority
- [ ] **Shared CSS file** — Currently all styles are inline in each page; a shared stylesheet would make site-wide style changes easier
- [ ] **Google Analytics / tracking** — No analytics currently installed
- [ ] **Google Business profile link** — Verify "Review us on Google" links are working
- [ ] **Auto-receipt emails** — Currently manual forwarding; could add SendGrid for automated receipts
- [ ] **Apple Pay** — NMI supports it; needs configuration

### Future / Nice-to-Have
- [ ] **Updated logo** — User chose "backdrop now, new logo later"
- [ ] **Blog / news section** — For SEO and customer engagement
- [ ] **CMS integration** — Would allow non-technical team members to update content
- [ ] **Contact form CAPTCHA** — Currently using honeypot only; reCAPTCHA would add extra spam protection
- [ ] **SEO meta tag audit** — Review all pages for optimal meta descriptions and titles
- [ ] **Performance audit** — Image lazy loading, preconnect hints, etc.

---

## Pages Overview

| Page | URL | Has Photo? | Description |
|------|-----|------------|-------------|
| Homepage | `/` | Yes | Radio lineup hero + Kenwood service card |
| Two-Way Radios | `/two-way-radios/` | Yes | Radio lineup hero |
| Security Systems | `/security-systems/` | No | Needs security equipment photos |
| Service & Repair | `/service-repair/` | No | Needs repair bench photos |
| Service Areas | `/service-areas/` | Yes | Building + Sandias hero |
| About Us | `/about-us/` | Yes | Building hero + showroom overlay |
| Why Us | `/why-us/` | No | Could use interior shots |
| Contact | `/contact/` | Yes | Storefront sign hero |
| Payment | `/pay/` | No | Not needed |
| Resources | `/resources/` | No | 6 articles — could use product shots |
| Privacy Policy | `/privacy/` | No | Not needed |
| Thank You | `/thank-you` | No | Not needed |

---

## Team Notes
- **Deployments are automatic**: Push to `main` branch on GitHub and Netlify deploys within ~1 minute
- **Form submissions**: Check Netlify dashboard > Forms, or watch for email notifications
- **Brand rule**: Always list Kenwood before Motorola in all content
- **Google rating**: Currently 4.6 stars (update trust bar if this changes)
- For full technical documentation, see [TECHNICAL-SETUP.md](./TECHNICAL-SETUP.md)
- For photo inventory and placement guide, see [photo-catalog.md](./photo-catalog.md)
- For payment error codes, see [payment-error-reference.md](./payment-error-reference.md)

---

*Last updated: March 6, 2026*
