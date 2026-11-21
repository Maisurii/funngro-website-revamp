# Funngro Website SEO Audit Report

**Website audited:** https://www.funngro.com/
**Audit dates:** 20–21 November 2026
**Prepared as part of:** Funngro Website Revamp evaluation project

---

## How this audit was done (read first)

This audit only reports what was checked on the live site. Every finding is labelled:

| Label | Meaning |
|---|---|
| **Verified** | Observed directly on the live site. |
| **Not verified – testing required** | Could not be measured with the tools available. The section explains how to test it. |

**Two views of every page were checked:**

1. **Raw HTML:** the response the server sends before any JavaScript runs. This is what non-JavaScript crawlers, link-preview bots and many AI search tools see. Checked by requesting each URL and reading the status code and HTML.
2. **Rendered page:** the page after JavaScript runs, opened in a real Chrome browser. This is close to what users and Google's renderer see.

**Pages checked:** `/`, `/for-brands`, `/earn`, `/about`, `/faq`, `/trust`, `/contact`, `/arcade`, `/shelancer`, `/stories`, `/careers`, `/press`, `/blog`, `/blog/shark-tank-inside-story`, `/privacy-policy`, `/terms-and-conditions`, plus `/teen`, `/company` and a made-up URL (`/this-should-404`), as well as `robots.txt` and `sitemap.xml`.

**Not available:** Lighthouse/PageSpeed Insights, Google Search Console, a full-site crawler and screen-reader testing. **No scores, speed figures or crawl-error counts appear in this report, because none were measured.**

---

## 1. Executive summary

When the page is rendered in a browser, Funngro's on-page SEO is in good shape. The homepage has one clear H1, nine H2s, a meta description, a canonical tag, structured data, and alt text on every image. The sitemap is valid, `robots.txt` is sensible, and the blog targets useful topics.

The problems are in how that SEO reaches crawlers:

- **Almost everything is added by JavaScript.** The raw HTML has a title, Open Graph tags and some JSON-LD, but no meta description, no canonical, no headings, no body text and no links. The `/for-brands` HTML body is only 47 characters long.
- **The canonical points to the wrong host.** After rendering, the homepage canonical is `https://funngro.com/` (no `www`), but the site is served on `https://www.funngro.com` and the sitemap lists `www` URLs.
- **Unknown URLs return HTTP 200 with the homepage's metadata** ("soft 404s").
- **The title changes after JavaScript runs.**
- **Structured data is duplicated.** There are three `Organization` blocks and two `WebSite` blocks on the homepage.

**Top three priorities**

1. Serve the full HTML to crawlers (server-side rendering or pre-rendering), so the meta description, canonical, headings and links are in the first response. — **High**
2. Make the canonical match the served host (`https://www.funngro.com/...`) on every page. — **High**
3. Return real `404` status codes for unknown URLs. — **Medium**

---

## 2. Website overview

| Item | Finding | Status |
|---|---|---|
| Positioning | "Get paid by India's biggest brands with flexible remote opportunities" — young Indians earn through brand tasks, and brands run campaigns with them | Verified |
| Audiences | Earners (`/earn`, `/stories`, `/arcade`, `/shelancer`) and brands (`/for-brands`, `/contact`) | Verified |
| Trust signals shown | Shark Tank India Season 2, investment from Amit Jain, backed by SucSEED Indovation, "70 lakh+ young Indians" | Verified |
| Languages | EN / Hi-En / Hindi switcher in the header; `<html lang="en-IN">` | Verified |
| Sitemap | `https://www.funngro.com/sitemap.xml`, valid XML, 39 URLs | Verified |
| robots.txt | Allows crawling, blocks admin/auth/feedback/preview/API paths, references the sitemap | Verified |
| Rendering | Client-side (JavaScript) rendering; raw HTML body is effectively empty | Verified |

---

## 3. On-page SEO analysis

| Element | Raw HTML (before JavaScript) | Rendered page (after JavaScript) | Status |
|---|---|---|---|
| `<title>` (home) | "Funngro — Earn online with India's biggest brands" | "Earn Money Online with India's Biggest Brands \| Funngro" | Verified |
| `<meta name="description">` | Absent (`/`, `/for-brands`, `/teen`, `/company`, `/terms-and-conditions`) | Present on `/` and `/for-brands` | Verified |
| `<link rel="canonical">` | Absent | `https://funngro.com/` on home, `https://funngro.com/for-brands` on For Brands | Verified |
| H1 | None | One H1 on `/` and on `/for-brands` | Verified |
| Body copy and links | None (body is ~47 characters) | Home: 51 links, 30 internal | Verified |
| JSON-LD | `Organization`, `WebSite` | 6 blocks: `Organization` ×3, `WebSite` ×2, `MobileApplication` | Verified |
| Images | None | 19 images on home, all with `alt` | Verified |

---

## 4. Title tags and meta descriptions

### What works
- Each key page has a unique, intent-focused title, e.g. "Brand Promotion & Influencer Campaigns in India | Funngro" and "How to Earn Online as a Teen in India | Funngro".
- The rendered meta descriptions are specific and persuasive, e.g. on `/for-brands`: "Run brand promotion, product sampling, UGC, micro-influencer & survey campaigns with 70 Lakh+ verified young Indians…"

### Issue 4.1 — Meta description exists only after JavaScript
- **Evidence:** The raw HTML of `/`, `/for-brands`, `/teen`, `/company` and `/terms-and-conditions` has no `<meta name="description">`. It appears only in the rendered page.
- **SEO impact:** Search engines that don't render JavaScript, and link-preview tools, never see the description. Google may also index a page before rendering it.
- **Recommendation:** Output the meta description in the server HTML (part of the fix in Issue 10.1).
- **Priority:** High
- **Status:** Verified

### Issue 4.2 — Title changes after JavaScript runs
- **Evidence:** The raw homepage title is "Funngro — Earn online with India's biggest brands"; after rendering it becomes "Earn Money Online with India's Biggest Brands | Funngro".
- **SEO impact:** Different crawlers may index different titles, which makes search snippets inconsistent and splits keyword targeting.
- **Recommendation:** Choose one title per page and output it in the server HTML.
- **Priority:** Medium
- **Status:** Verified

### Issue 4.3 — Homepage meta description may be truncated
- **Evidence:** The rendered homepage description is about 166 characters ("Join 70 Lakh+ young Indians earning online with brand campaigns, part time jobs & remote work from home. Get paid via UPI. Free, no investment. Shark Tank India backed.").
- **SEO impact:** Google often truncates descriptions at around 150–160 characters, which could cut off "Shark Tank India backed".
- **Recommendation:** Trim to about 150–155 characters and put the strongest trust signal earlier.
- **Priority:** Low
- **Status:** Verified (length); truncation depends on the device

---

## 5. Heading structure

- **Rendered homepage:** one H1 ("Get Paid by India's biggest brands with flexible remote opportunities") and nine H2s that follow a clear story ("Real brands. Real rupees. Every day.", "Featured on Shark Tank India · Season 2.", "Get started in 3 simple steps.", and so on). **Verified – good.**
- **Rendered `/for-brands`:** one H1 ("Work with 70 lakh young Indians on the things brands actually need.") and five H2s. **Verified – good.**
- **Raw HTML:** no headings on any page. **Verified** — covered by Issue 10.1.
- **Other pages:** not checked in rendered form. To check, open each page → DevTools → Elements and search for `h1`, or use the HeadingsMap extension.

---

## 6. Content quality and keyword opportunities

### What works
- The blog covers real questions from both audiences, e.g. `/blog/brand-promotion-101`, `/blog/cpa-cpi-cpm`, `/blog/verified-brands-online-earning` and `/blog/state-of-genz-2026`.
- Earner stories (`/stories`) and press coverage (Times of India, Entrackr, Business News Week and others are linked from the homepage) add strong experience and authority signals.

### Issue 6.1 — Different user counts on official channels
- **Evidence:** The website says "70 lakh+ young Indians"; the App Store listing says "over 60 lakh+ young people (14–25)".
- **SEO impact:** Inconsistent facts weaken trust for users and for search engines building an entity profile, and they can confuse brand buyers comparing sources.
- **Recommendation:** Use one current figure everywhere (website, App Store, Google Play, press kit), ideally with an "as of" date.
- **Priority:** Medium
- **Status:** Verified

### Keyword opportunities (suggestions, not measured search volumes)
| Audience | Topic cluster | Target page |
|---|---|---|
| Earners | earn money online for students in India, part-time work for college students, online jobs for teenagers, earn without investment | `/earn` + blog |
| Earners | work from home for young women | `/shelancer` |
| Brands | micro-influencer marketing India, product sampling, UGC creators India, college ambassador program, Gen Z research | `/for-brands` + one page per format |
| Both | "is Funngro safe / real" | `/trust`, `/faq` |

*Validate volumes in Google Keyword Planner, Ahrefs or Semrush before prioritising.*

---

## 7. Image SEO

- **Rendered homepage:** all 19 `<img>` elements have descriptive alt text (e.g. "Funngro app — home screen with today's tasks and brand campaigns", "Funngro founders on Shark Tank India Season 2 — Full Pitch"). **Verified – good.**
- Images are served from hashed `/assets/` paths, and the app screenshot is WebP. **Verified.**
- **Open Graph image:** `https://www.funngro.com/og-image.jpg` returns `200 image/jpeg`. **Verified.**
- **Not verified – testing required:** whether images are correctly sized and lazy-loaded. Run PageSpeed Insights ("Properly size images", "Defer offscreen images").

---

## 8. Internal linking

- **Rendered homepage:** 51 links, 30 of them internal, covering Earn, Stories, For Brands, Arcade, SheLancer, About, Blog, Contact sales, Careers, Press, Trust & safety, FAQ and the legal pages. **Verified – good structure.**
- **Raw HTML:** no links at all. **Verified.** Crawlers that don't run JavaScript can only discover pages through the sitemap.
- **Recommendation:** Fix through server rendering (Issue 10.1). Also link each blog post to the matching money page (`/earn` or `/for-brands`).

---

## 9. Mobile usability

- **Verified:** Responsive viewport meta tag and `theme-color` are set.
- **Not verified – testing required:** tap targets, font sizes and layout on narrow screens. Check with Chrome DevTools device mode (360 px and 390 px), a Lighthouse mobile run, and Search Console → *Experience*.

---

## 10. Technical SEO

### Issue 10.1 — Page content, meta description, canonical and links only exist after JavaScript
- **Evidence:** Raw HTML responses contain only head metadata (title, Open Graph and Twitter tags, keywords, and two JSON-LD blocks). The `/for-brands` body is about 47 characters long. Headings, copy, links, the meta description and the canonical all appear only after rendering.
- **SEO impact:** Google renders JavaScript in a later, deferred pass, so indexing of new or changed content can be slower. Bing, social preview bots and most AI answer engines see little or nothing.
- **Recommendation:** Use server-side rendering or static pre-rendering for all public pages (marketing pages, blog posts, stories). Confirm with Search Console → *URL Inspection* → *View crawled page*.
- **Priority:** High
- **Status:** Verified

### Issue 10.2 — Canonical points to the non-`www` host
- **Evidence:** The site is served at `https://www.funngro.com/`, and the sitemap and `robots.txt` use `www`. But the rendered canonical is `https://funngro.com/` on the homepage and `https://funngro.com/for-brands` on For Brands. `og:url` also uses non-`www`.
- **SEO impact:** Conflicting signals about which URL is preferred. Google may ignore the canonical or consolidate onto the host the sitemap doesn't list.
- **Recommendation:** Pick one host (`https://www.funngro.com` matches the sitemap and the live URLs) and use it in canonicals, `og:url` and structured data. 301-redirect the other host to it.
- **Priority:** High
- **Status:** Verified (redirect behaviour of the bare domain not tested)

### Issue 10.3 — Unknown URLs return 200 with homepage metadata (soft 404s)
- **Evidence:** `/teen`, `/company` and a made-up URL `/this-should-404` all return **HTTP 200** with the homepage title.
- **SEO impact:** Search engines can index duplicate copies of the homepage and waste crawl budget. Broken inbound links never surface as errors.
- **Recommendation:** Return HTTP `404` with a helpful not-found page for unknown routes. 301-redirect legacy URLs (for example `/teen` → `/earn`, `/company` → `/for-brands`) if they were used before.
- **Priority:** Medium
- **Status:** Verified

### What works
- `robots.txt` and the sitemap are correct and consistent with each other. *(Verified)*
- All core pages return 200 with unique titles in the raw HTML. *(Verified)*
- `og:image` resolves, and `summary_large_image` Twitter cards are set. *(Verified)*

---

## 11. Page speed and Core Web Vitals

**Not verified – testing required.** No speed data was collected, so no figures are reported.

**How to test:**
1. Run https://pagespeed.web.dev/ for `/`, `/earn` and `/for-brands` (mobile and desktop). Record LCP, INP and CLS from field data if available, otherwise lab data.
2. Review Search Console → *Core Web Vitals*.
3. Because the site is client-rendered, watch LCP and JavaScript bundle size. Pre-rendering (Issue 10.1) usually improves LCP too.

---

## 12. Schema markup

- **Raw HTML:** `Organization` and `WebSite`. **Verified.**
- **Rendered homepage:** six JSON-LD blocks — `Organization` ×3, `WebSite` ×2 and `MobileApplication`. **Verified.**

### Issue 12.1 — Duplicate structured-data entities
- **Evidence:** The same entity types appear several times after rendering (three `Organization`, two `WebSite`), apparently because both the server template and the JavaScript app inject them.
- **SEO impact:** Duplicate or conflicting entity data can confuse parsers and makes it unclear which version is authoritative.
- **Recommendation:** Output one `@graph` with a single `Organization` and a single `WebSite` linked by `@id`, plus page-specific types (`FAQPage` on `/faq`, `Article` on blog posts, `BreadcrumbList` site-wide). Validate with https://search.google.com/test/rich-results and https://validator.schema.org/.
- **Priority:** Medium
- **Status:** Verified (validation errors not tested)

---

## 13. Accessibility

- **Verified – good:** `lang="en-IN"`, alt text on all homepage images, a single H1 and logical H2s on the homepage, and a labelled logo link ("Funngro home").
- **Not verified – testing required:** colour contrast on the dark green theme, keyboard focus order and visibility, and screen-reader behaviour. Run Lighthouse Accessibility and axe DevTools, tab through each page, and test with NVDA or VoiceOver.

---

## 14. Key issues and recommendations

| # | Issue | Evidence | SEO impact | Recommended solution | Priority |
|---|---|---|---|---|---|
| 10.1 | Content, description, canonical and links only after JavaScript | Raw HTML body is ~47 characters | Slow or missing indexing outside Google; weak previews | SSR or pre-rendering | **High** |
| 4.1 | Meta description not in raw HTML | Absent in raw, present when rendered | Snippets and previews miss it | Output in server HTML | **High** |
| 10.2 | Canonical on non-`www` host | `https://funngro.com/` vs `www` sitemap and live URLs | Conflicting URL signals | Canonical = `https://www.funngro.com/...` | **High** |
| 10.3 | Soft 404s | `/this-should-404` → 200 with home title | Duplicate indexing, wasted crawl | Real 404s; 301 legacy URLs | Medium |
| 4.2 | Title differs raw vs rendered | Two different home titles | Inconsistent snippets | One title in server HTML | Medium |
| 12.1 | Duplicate JSON-LD | 3× Organization, 2× WebSite | Ambiguous entity data | Single `@graph` with `@id`s | Medium |
| 6.1 | Inconsistent user counts | 70 lakh (site) vs 60 lakh+ (App Store) | Trust and entity consistency | One dated figure everywhere | Medium |
| 4.3 | Long home description | ~166 characters | Possible truncation | Trim to ~155 characters | Low |
| 9, 11, 13 | Mobile, speed, accessibility details | Not measured | — | Test as described | Test first |

---

## 15. Priority action plan

**Week 1 — Quick wins**
1. Change canonicals and `og:url` to `https://www.funngro.com/...`; confirm the bare domain 301-redirects to `www`.
2. Return 404 for unknown routes; 301 `/teen` → `/earn` and `/company` → `/for-brands`.
3. Use one title per page (same before and after JavaScript); trim the homepage description.
4. Remove duplicate `Organization`/`WebSite` JSON-LD.

**Weeks 2–4 — Foundational**
5. Pre-render or server-render all public pages so the description, canonical, headings, copy and links are in the first HTML response.
6. Add `FAQPage`, `Article` and `BreadcrumbList` schema where content supports it.
7. Align the user count across the website, App Store and Google Play.

**Ongoing**
8. Monthly PageSpeed/Lighthouse checks on key templates.
9. Link blog posts to `/earn` or `/for-brands`.
10. Create one landing page per brand campaign format to target commercial searches.

---

## 16. SEO improvements implemented in my redesign

| Area | What the redesign does |
|---|---|
| Rendering | Every heading, paragraph, link and FAQ answer is in the static HTML. Pages are readable with JavaScript turned off. |
| Titles | One unique title per page, the same with or without JavaScript: "Funngro for Companies \| Brand Campaigns with Young India" (56 characters) and "Funngro for Teens \| Earn Online with Real Brand Tasks" (53 characters). |
| Meta descriptions | Standard `<meta name="description">` in the HTML (159 and 154 characters). |
| Canonical | Self-referencing canonical and `og:url` on each page, pointing to the live GitHub Pages URLs. |
| Headings | Exactly one H1 per page, H2 per section, H3 for cards, steps and FAQ questions. |
| Structured data | A single JSON-LD `@graph` per page: one `Organization` (legal name, email, `sameAs` to Funngro's verified Instagram, LinkedIn, YouTube, Facebook, X and app-store profiles), `WebPage`, and a `FAQPage` that matches the visible FAQ. No duplicates. |
| Social sharing | Open Graph and Twitter/X tags using Funngro's live OG image and the correct handle (`@funngroofficial`). |
| Brand | Funngro's official logo (taken from funngro.com) and its green brand colours. |
| Links | Every link was checked: all funngro.com paths return 200 with their own page title; social and app-store links open Funngro's official profiles. |
| Accessibility | Skip link, visible focus, keyboard menu (Esc closes), ARIA accordion and tabs, reduced-motion support, AA-contrast colour pairs. |
| Content accuracy | Only facts Funngro publishes. No invented testimonials, logos or earnings promises; mockups are labelled as illustrations. |

---

## 17. Conclusion

Funngro's content and on-page work are strong once the page renders: clear headings, good alt text, useful descriptions and a healthy blog. Its biggest SEO risks are technical. Most SEO signals exist only after JavaScript runs, the canonical points to a different host from the one the site is served on, and unknown URLs return 200. Fixing rendering, canonicals and status codes would let search engines (and AI search tools) see the site the way users do. Measured performance and accessibility testing should come next.
