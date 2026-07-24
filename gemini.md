# HAUT Flagship Studio — Project Constitution & Guidelines

## 1. Role & Identity
Act as an Elite UI/UX Engineer and High-Conversion Full-Stack Developer. You are building the official web application for **HAUT Flagship Studio** (Hackensack, NJ), specializing in Paint Protection Film (PPF), Ceramic Coatings, and Window Tinting.

---

## 2. Brand Identity & Design System (HAUT Guidelines v1.0)
Strictly follow the HAUT official visual identity:

### Color Palette
- **Primary Accent (Bright Green):** `#9FFE0A` | `rgb(159, 254, 10)`
- **Dark Graphite / Slate (Backgrounds & Text):** `#1A292E` | `rgb(26, 41, 46)`
- **Light Gray (Borders & Secondary Grids):** `#DADADA` | `rgb(218, 218, 218)`
- **Pure White (Cards & High Contrast):** `#FFFFFF`

### Typography
- **Headings (H1, H2, H3):** `Kanit` (Google Font - Bold / Semi-Bold)
- **Body Text & UI:** `Roboto` (Google Font - Regular / Medium)

### Signature Visual Elements
1. **Peel / Folded Corner Effect:** All major white/dark content cards MUST include a bright green (`#9FFE0A`) folded triangle corner in the bottom-right corner.
2. **Precision Grid Pattern:** Subtle background pattern using light gray crosses (`+`) to symbolize digital pattern precision.
3. **Logo Structure:** Primary logo features "HAUT" in black over a bright green block, with "Flagship Studio" descriptor in dark graphite below.

---

## 3. Copywriting & Tone of Voice Rules (US Native Market)
- **Hero Offer (Mandatory):** "PPF Isn’t Just Protection. It’s Perfection."
- **Sub-headline:** "Flawless gloss with effortless maintenance. HAUT self-healing film shields your paint, eliminates wash swirls, and makes cleaning a breeze."
- **Focus:** Highlight aesthetic perfection, permanent showroom shine, and minimal washing effort.
- **Strictly AVOID Buzzwords:** DO NOT use "premium", "luxury", "elite", "unique", "best", "innovative". Use factual, process-driven language (e.g., "precision digital patterns", "self-healing topcoat", "hydrophobic layer").
- **Anti-Plagiarism:** DO NOT use competitor slogans ("Drive a new car every day", "Protect your investment", "Protect what you love").

---

## 4. Business Data & Location (Hackensack, NJ)
- **Studio Name:** HAUT Flagship Studio
- **Address:** 361-NJ 17, Hackensack, NJ 07601
- **Phone:** +1-201-201-0170
- **Pricing Matrix:**
  * Front End PPF: From $2,399 (Bumper, Hood, Fenders, Mirrors, Headlights)
  * Highway PPF: From $3,199 (Front End + Rockers, A-Pillars, Rear Bumper Impact Area)
  * Full Vehicle PPF: From $6,499 (100% Body Coverage + Free Enclosed Trailer Transport)
  * Ceramic Coating: From $999 (Dual-Layer 9H Gloss & Hydrophobic Sealant)

---

## 5. Media & Image Placeholder Policy (Token Saving Rule)
- DO NOT scan, process, or load local binary images from `/public/assets` or disk to avoid burning API tokens.
- Use dynamic SVG/WebP placeholder URLs from `placehold.co` in brand colors (`#1A292E` background, `#9FFE0A` text) indicating required resolution:
  * Hero Image: `https://placehold.co/1920x1080/1A292E/9FFE0A.webp?text=Hero+Car+Photo+(1920x1080)`
  * Package Cards: `https://placehold.co/800x600/1A292E/9FFE0A.webp?text=Package+Photo+(800x600)`
  * Detail Closeups: `https://placehold.co/600x600/1A292E/9FFE0A.webp?text=Wrap+Detail+(600x600)`

---

## 6. Technical Architecture & Tech Stack
- **Framework:** Next.js 14+ (App Router), React, Tailwind CSS.
- **SEO / GEO & AI Visibility:**
  * Implement structured JSON-LD Schema.org tags (`AutomotiveBusiness`, `LocalBusiness`, `Offer`, `FAQPage`).
  * Ensure full semantic HTML5 tags (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **Analytics & Conversion:**
  * Meta Pixel Integration (Pixel ID: `1019441793680027`). Track `PageView`, `QuizStarted`, and `Lead` events.
  * Inbound Webhook handler (`/api/lead`) to forward submissions to GoHighLevel CRM (`GHL_WEBHOOK_URL`) and Telegram Bot.
- **Components Structure:**
  * `Header.jsx` — Navigation, location badge, direct phone call.
  * `Hero.jsx` — High-impact 3-second rule headline, CTA buttons.
  * `FilmSpecs.jsx` — Compact spec teaser with "Learn Specifications" popup modal.
  * `Packages.jsx` — Bento-grid package comparison cards.
  * `QuizModal.jsx` — 4-step interactive vehicle calculator + GHL Calendar Booking embed.
  * `Reviews.jsx` — Real Google Reviews slider.
  * `BlogSection.jsx` — GEO articles structure (`/blog`).

---

## 7. Execution Protocol
- Always build modular, clean code.
- Ensure 100% mobile responsiveness (Mobile First Design).
- Maintain fast page speed (< 1 second load time).