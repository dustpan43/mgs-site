# MGS Communications Website - Project Log

**Site**: https://mgscommunications.com
**Repo**: https://github.com/dustpan43/mgs-site
**Team Email**: team@mgscommunications.com
**Phone**: (505) 888-2034

---

## Update History

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
- All forms functional and sending to team@mgscommunications.com
- SSL active with auto-renewal
- 10 public pages + 1 thank-you confirmation page

---

## Upcoming / Needs

### High Priority
- [ ] **Mobile optimization audit** — Review all pages on mobile devices, fix layout issues
- [ ] **Image optimization** — Compress large images (mgs-30th-birthday.jpg is 2.7MB)
- [ ] **Install Node.js** — Enables local dev server for testing changes before pushing live

### Medium Priority
- [ ] **Shared CSS file** — Currently all styles are inline in each page; a shared stylesheet would make site-wide style changes easier
- [ ] **Google Analytics / tracking** — No analytics currently installed
- [ ] **Google Business profile link** — Verify "Review us on Google" links are working

### Future / Nice-to-Have
- [ ] **Payment integration** — Accept payments online (scope TBD)
- [ ] **Blog / news section** — For SEO and customer engagement
- [ ] **CMS integration** — Would allow non-technical team members to update content
- [ ] **Contact form CAPTCHA** — Currently using honeypot only; reCAPTCHA would add extra spam protection

---

## Pages Overview

| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/` | Main landing page with services, testimonials, CTA |
| Two-Way Radios | `/two-way-radios/` | Kenwood & Motorola products, sales/rental/repair |
| Security Systems | `/security-systems/` | CCTV, access control, alarm installations |
| Service & Repair | `/service-repair/` | Same-day repair, free estimates, loaner radios |
| Service Areas | `/service-areas/` | Albuquerque, Rio Rancho, Santa Fe, all NM |
| About Us | `/about-us/` | Family-owned since 1996, company story |
| Why Us | `/why-us/` | Differentiators, 30 years of experience |
| Resources | `/resources/` | Guides: radio types, FCC licensing, camera tips |
| Contact | `/contact/` | Full contact form, phone, address, map |
| Privacy Policy | `/privacy/` | Privacy policy |
| Thank You | `/thank-you` | Post-form confirmation |

---

## Team Notes
- **Deployments are automatic**: Push to `main` branch on GitHub and Netlify deploys within ~1 minute
- **Form submissions**: Check Netlify dashboard > Forms, or watch for email notifications
- **Brand rule**: Always list Kenwood before Motorola in all content
- **Google rating**: Currently 4.6 stars (update trust bar if this changes)
- For full technical documentation, see [TECHNICAL-SETUP.md](./TECHNICAL-SETUP.md)
