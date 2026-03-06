# MGS Communications Website

**Live site:** https://mgscommunications.com

Albuquerque's trusted provider of two-way radios (Kenwood & Motorola) and security systems since 1996.

## Tech Stack

- Plain HTML / CSS / JS (no framework, no build step)
- Hosted on **Netlify** (auto-deploys from `main` branch)
- DNS managed at Squarespace
- Forms via Netlify Forms
- Payments via NMI Collect.js + Netlify Functions

## Project Structure

```
mgs-site/
├── css/shared.css              # Shared styles (design system, header, footer, nav, forms)
├── js/main.js                  # Shared scripts (nav, popups, form submission)
├── images/                     # Optimized site images
├── index.html                  # Homepage
├── two-way-radios/             # Service pages (each has index.html)
├── security-systems/
├── service-repair/
├── service-areas/
├── about-us/
├── why-us/
├── resources/                  # Resource hub + 6 article subfolders
├── contact/
├── pay/                        # Payment page (NMI integration)
├── privacy/
├── thank-you/                  # Form submission confirmation
├── netlify/functions/          # Serverless payment processing
├── docs/                       # Project documentation
├── netlify.toml                # Netlify config (headers, redirects, caching)
├── sitemap.xml                 # SEO sitemap
└── robots.txt
```

## Deploy

Push to `main` — Netlify auto-deploys in ~60 seconds. No build command needed.

## Documentation

See [`docs/technical-setup.md`](docs/technical-setup.md) for full architecture details, form configuration, design system tokens, and how-to guides.
