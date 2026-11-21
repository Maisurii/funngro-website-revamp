# Funngro Website Revamp

**Live site:** https://maisurii.github.io/funngro-website-revamp/  
**Teen page:** https://maisurii.github.io/funngro-website-revamp/teen.html  
**SEO audit:** [seo-audit.md](seo-audit.md)

A redesign concept of Funngro's **Company** and **Teen** landing pages, built with semantic HTML5, modern CSS and vanilla JavaScript. It also includes an SEO audit of the live site at https://www.funngro.com/.

> This is a redesign concept prepared for an evaluation. It is not the official Funngro website. All Funngro facts come from Funngro's own published pages and app-store listings (see *Content sources* below).

---

## Project structure

```
funngro-website-revamp/
├── index.html        # Company page (brands, startups, businesses)
├── teen.html         # Teen page (young earners)
├── css/
│   └── style.css     # Shared design system + both page layouts
├── js/
│   └── script.js     # Shared interactions
├── assets/
│   ├── funngro-logo-light.svg   # official logo, light wordmark (dark backgrounds)
│   ├── funngro-logo-dark.svg    # official logo, dark wordmark (light backgrounds)
│   └── favicon.svg              # official logo mark
├── seo-audit.md      # SEO audit report for funngro.com
└── README.md
```

No build step, no frameworks, no dependencies. The only external resources are Google Fonts (Plus Jakarta Sans) and Funngro's existing Open Graph image URL. If fonts can't load, the pages fall back to the system font.

---

## Run locally

**Option 1 — open the file:** double-click `index.html`. Everything works over `file://`.

**Option 2 — local server (recommended for testing):**

```bash
cd funngro-website-revamp
python3 -m http.server 8080
# open http://localhost:8080
```

or `npx serve .`

---

## Deploy (static hosting)

The folder can be deployed as-is.

| Host | Steps |
|---|---|
| **Netlify** | Drag the `funngro-website-revamp` folder onto app.netlify.com/drop. |
| **Vercel** | `npx vercel` in the folder → framework: *Other* → output directory: `.` |
| **GitHub Pages** | Push to a repo → Settings → Pages → Deploy from branch → `main` / root. |
| **Cloudflare Pages** | Create a project → upload the folder (no build command). |

### Canonical URLs

Both pages already point their canonical and `og:url` tags at the live GitHub Pages URLs. If you move the site to another domain, update those two tags in `index.html` and `teen.html`.

---

## Design system

| Token | Value | Use |
|---|---|---|
| Ink | `#0B1A12` | Headings, dark surfaces (Funngro's green-black) |
| Green | `#07AB5F` | Funngro primary, taken from funngro.com |
| Green 700 | `#067A44` | Text links and buttons (AA contrast on white) |
| Leaf | `#E1FEBE` | Funngro leaf, taken from funngro.com |
| Saffron | `#FF7A1A` | Teen accent: energy, highlights |
| Sun | `#FFD84D` | Stickers, CTA on dark |

The logo and the Green/Leaf colours come from the live funngro.com site (its logo SVG and CSS variables `--primary` and `--leaf`).

- **Type:** Plus Jakarta Sans (400–800), with a fluid `clamp()` type scale.
- **Shared system, different personalities:** The **Company page** uses a dark gradient hero with a campaign-dashboard mockup, a bento grid, a timeline, a campaign catalogue and a dark "young talent" section. The **Teen page** uses a warm light hero with a phone mockup, a scrolling category ticker, offset "sticker" cards, a zig-zag step path, an interactive category explorer and a skills board.
- **Radius scale by hierarchy:** 32 px for large surfaces, 22 px for cards, 14 px for controls; shadows are tinted with ink rather than grey.

---

## Features

- Fully responsive layouts (desktop → tablet → 360 px mobile) using CSS Grid, Flexbox and custom properties
- Sticky header with blur and a **For companies / For teens** switch that links the two pages
- Accessible hamburger menu: `aria-expanded`, closes with Esc, on outside click and on link click
- FAQ accordion: buttons with `aria-controls`, animated height; answers stay readable without JavaScript
- Category explorer (Teen): WAI-ARIA tabs with arrow, Home and End key support
- Subtle scroll-reveal using IntersectionObserver; turned off under `prefers-reduced-motion`
- Active-section highlighting in the nav, smooth scrolling with a header offset
- Skip link, visible focus states, AA-contrast colour pairs
- Real destinations for all actions that need a backend (Funngro contact page, `/for-brands`, `/earn`, App Store, Google Play). No fake forms.

---

## SEO implementation

- Unique `<title>` and `<meta name="description">` per page
- One `<h1>` per page with a logical H2/H3 hierarchy
- Open Graph + Twitter/X card metadata
- JSON-LD: `Organization`, `WebPage` (with audience), `FAQPage` matching the visible FAQs
- Semantic landmarks, descriptive link text, decorative SVGs hidden from screen readers, illustrations given `role="img"` with labels
- Internal links between both pages and to relevant Funngro pages

The full audit of the live site is in **`seo-audit.md`**. To convert it to PDF: `pandoc seo-audit.md -o seo-audit.pdf`, or open it in VS Code / Typora and export.

---

## Content sources

Only facts that Funngro publishes are used:

- funngro.com (checked in a real browser): 70 lakh+ young Indians; payouts in UPI or bank transfer; free, no investment; Shark Tank India Season 2, investment from Amit Jain, backed by SucSEED Indovation; brand formats (promotion, sampling, content, surveys, influencer briefs, app testing, ideation, sales support); low-CPA positioning; Trust & Safety, SheLancer, Funngro Arcade; contact email teenlancer@funngro.com; official social profiles
- Funngro's App Store listing: built for young people aged 14–25

Not included on purpose: testimonials, partner logos, campaign results and earnings amounts. Dashboard and phone visuals are labelled as illustrations.

---

## Final testing checklist

Automated checks run during build (Chrome, headless):

- [x] No JavaScript errors on either page
- [x] No horizontal overflow at 1440 px and 390 px (`scrollWidth` = viewport width)
- [x] All in-page anchor links resolve to an existing `id`; no duplicate IDs
- [x] Exactly one `<h1>` per page; every `<img>` has `alt`
- [x] JSON-LD parses as valid JSON on both pages
- [x] `node --check js/script.js` passes
- [x] Every funngro.com link returns HTTP 200 with its own page title (/contact, /for-brands, /earn, /trust, /faq, /stories, /arcade, /shelancer, /about, /careers, /press, /blog, /blog/shark-tank-inside-story, /privacy-policy, /terms-and-conditions)
- [x] Google Play, App Store, Instagram, LinkedIn, YouTube, Facebook and X links open Funngro's official pages (taken from funngro.com's own footer)
- [x] Open Graph image URL returns 200 image/jpeg; Google Fonts stylesheet loads
- [x] Mobile menu opens, closes on Esc, and returns focus
- [x] FAQ opens and closes; tabs switch panels; arrow keys move between tabs

Manual checks to run before submitting:

- [ ] Open both pages on a real phone (iOS Safari + Android Chrome)
- [ ] Tab through each page with the keyboard only
- [ ] Lighthouse (mobile): Performance, Accessibility, Best Practices, SEO
- [ ] Rich Results Test on the deployed URLs (FAQPage, Organization)
- [ ] Share the deployed URL in WhatsApp/LinkedIn to check the preview card
- [ ] Uncomment the canonical tags with the final domain
- [ ] Test at 768 px (tablet) and 1024 px widths
