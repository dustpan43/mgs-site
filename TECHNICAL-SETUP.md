# MGS Communications - Technical Setup & Handoff Guide

> Everything someone needs to know to maintain, update, or take over this website.

---

## Quick Reference

| Item | Value |
|------|-------|
| **Live URL** | https://mgscommunications.com |
| **GitHub Repo** | https://github.com/dustpan43/mgs-site |
| **Hosting** | Netlify (auto-deploys from GitHub) |
| **Domain Registrar / DNS** | Squarespace |
| **SSL** | Netlify-managed (Let's Encrypt, auto-renew) |
| **Forms** | Netlify Forms (email to team@mgscommunications.com) |
| **Framework** | None — plain HTML/CSS/JS |
| **Build Step** | None — static files served directly |

---

## How Deployment Works

```
Edit files locally
    ↓
git add + git commit
    ↓
git push (to main branch on GitHub)
    ↓
Netlify detects push automatically
    ↓
Site goes live in ~60 seconds
```

There is no build command. Netlify publishes the repository root (`.`) as-is.

---

## File Organization

```
mgs-site/
│
├── index.html                    # Homepage
├── thank-you.html                # Form success page
│
├── two-way-radios/index.html     # Two-Way Radios page
├── security-systems/index.html   # Security Systems page
├── service-repair/index.html     # Service & Repair page
├── service-areas/index.html      # Service Areas page
├── about-us/index.html           # About Us page
├── why-us/index.html             # Why Choose Us page
├── resources/index.html          # Resources & Guides page
├── contact/index.html            # Contact page
├── privacy/index.html            # Privacy Policy page
│
├── images/
│   ├── mgs-logo.png              # Header logo (transparent, 92KB)
│   ├── mgs-30th-birthday.jpg     # 30th anniversary logo (2.7MB)
│   └── favicon.png               # Browser tab icon
│
├── netlify.toml                  # Netlify config: headers, redirects, caching
├── robots.txt                    # Search engine rules
├── sitemap.xml                   # SEO sitemap (lists all pages)
├── .gitignore                    # Git ignore rules
│
├── PROJECT-LOG.md                # Update history & project status
└── TECHNICAL-SETUP.md            # This file
```

**Why subfolders?** Each page lives in its own folder (e.g., `/about-us/index.html`) so the URLs are clean (`/about-us/` instead of `/about-us.html`). The exception is `thank-you.html` which is in the root and uses a Netlify redirect.

---

## How Each Page is Built

Every page is a **standalone HTML file** with:
- All CSS in an inline `<style>` block in the `<head>`
- All JavaScript in an inline `<script>` block before `</body>`
- No external CSS or JS files
- No shared stylesheet (styles are duplicated per page)

This means: **if you change a shared style (like the header or footer), you need to update all 11 HTML files.**

### Common page structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title | MGS Communications</title>
  <meta name="description" content="...">
  <link rel="icon" type="image/png" href="/images/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@...&display=swap" rel="stylesheet">
  <style>
    /* All CSS for this page */
  </style>
</head>
<body>
  <header><!-- Shared header with logo and nav --></header>
  <main><!-- Page-specific content --></main>
  <footer><!-- Shared footer --></footer>
  <script>
    /* All JS for this page (nav, forms, scroll effects) */
  </script>
</body>
</html>
```

---

## Forms: How They Work

### Setup
All forms use **Netlify Forms** (no server-side code needed).

Required attributes on each `<form>`:
- `data-netlify="true"` — tells Netlify to process the form
- Hidden input: `<input type="hidden" name="form-name" value="unique-form-id">`
- Honeypot: `<input name="bot-field" style="display:none">` — spam prevention

### Submission Flow
Forms submit via **AJAX** (not traditional form submit):
```javascript
fetch('/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams(formData).toString()
})
```
On success, a "thank you" message appears inline. No page redirect for popup forms; the full contact form redirects to `/thank-you`.

### Where submissions go
- **Email**: team@mgscommunications.com (configured in Netlify dashboard)
- **Dashboard**: Netlify > Site > Forms > select form name

### Form names (as they appear in Netlify):
| Form Name | Location |
|-----------|----------|
| `hero-cta` | Homepage hero section |
| `popup-quote` | Popup modal (appears on most pages) |
| `contact-form` | Contact page main form |
| `radio-quote` | Two-Way Radios page |
| `security-quote` | Security Systems page |
| `service-request` | Service & Repair page |
| `service-area-quote` | Service Areas page |

### Standard fields on all forms:
- Name (required)
- Business Name
- Email (required)
- Phone
- Service type (dropdown)
- Message/details

---

## Styling / Design System

### Colors
| Token | Hex | Use |
|-------|-----|-----|
| `--navy` | #1b2e1b | Dark background, text |
| `--green` | #2e7d32 | Primary brand green |
| `--green-light` | #43a047 | Hover states |
| `--yellow` | #f9a825 | Accent, highlights |
| `--orange` | #e65100 | Urgent CTAs |
| `--white` | #ffffff | Backgrounds |
| `--gray-50` to `--gray-900` | Various | Text, borders, backgrounds |

### Typography
- **Body text**: Inter (Google Fonts)
- **Headings/Logo**: Plus Jakarta Sans (Google Fonts)
- Loaded via Google Fonts CDN

### Responsive Breakpoints
- `1024px` — Tablet landscape / small desktop
- `768px` — Tablet portrait
- `480px` — Mobile

---

## Netlify Configuration (netlify.toml)

### Security Headers (applied to all pages)
- `X-Frame-Options: DENY` — Prevents embedding in iframes
- `Strict-Transport-Security` — Forces HTTPS
- `X-Content-Type-Options: nosniff` — Prevents MIME sniffing
- `Content-Security-Policy: frame-ancestors 'none'`

### Caching
- **Static assets** (CSS, JS, images): Cached 1 year, immutable
- **HTML pages**: Must revalidate on every load (always fresh)

### Redirects
- `/thank-you` → `/thank-you.html` (status 200, transparent rewrite)

---

## DNS / Domain Setup

- **Domain**: mgscommunications.com
- **DNS managed at**: Squarespace
- **DNS records**: Point to Netlify's CDN/load balancer
- **SSL**: Provisioned by Netlify using Let's Encrypt (auto-renews)

To change DNS: Log into Squarespace > Domains > mgscommunications.com > DNS settings

---

## How To: Common Tasks

### Make a text/content change
1. Open the relevant `.html` file
2. Find and edit the text
3. Save, then: `git add <file>` → `git commit -m "description"` → `git push`
4. Live in ~1 minute

### Update the logo
1. Replace `images/mgs-logo.png` with a new PNG (keep the filename the same)
2. For favicon, replace `images/favicon.png`
3. Commit and push
4. All 11 pages reference these by the same path

### Add a new page
1. `mkdir new-page-name`
2. Copy an existing `index.html` as a starting template
3. Update: title, meta description, content, active nav link
4. Add `<link rel="icon" ...>` favicon tag
5. Add the page to `sitemap.xml`
6. Add a nav link on all other pages (11 files to update)
7. Commit and push

### Check/manage form submissions
1. Log into [Netlify](https://app.netlify.com)
2. Select the MGS Communications site
3. Go to **Forms** tab
4. Click a form name to see submissions
5. Email notifications also go to team@mgscommunications.com

### Update the Google review rating
If the rating changes from 4.6:
1. Open `index.html`
2. Search for "Google Stars" in the trust bar section (~line 549)
3. Update the number
4. Commit and push

---

## Known Limitations & Future Improvements

| Issue | Impact | Potential Fix |
|-------|--------|---------------|
| No shared CSS file | Style changes require editing all 11 files | Extract shared styles to a `styles.css` file |
| No local dev server | Can't preview changes before pushing live | Install Node.js, use `npx serve` |
| No analytics | Can't track visitors or conversions | Add Google Analytics or Plausible |
| No CMS | Content changes require HTML editing | Consider Netlify CMS or similar |
| Large anniversary image | 2.7MB may slow page load if used | Compress or resize before using on-page |
| Inline form honeypot only | Basic spam protection | Add reCAPTCHA for stronger defense |

---

## Access Needed for Full Handoff
- [ ] GitHub account access (or add collaborator to dustpan43/mgs-site)
- [ ] Netlify account access (site settings, form notifications, deploy logs)
- [ ] Squarespace account access (DNS management)
- [ ] Google Business Profile access (for reviews management)
