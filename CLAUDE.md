# HAUT Flagship Studio — Project Context

Marketing/lead-gen website for **HAUT Flagship Studio** (Hackensack, NJ) — a manufacturer flagship studio for Paint Protection Film (PPF), Ceramic Coating, and Window Tinting. The site's job is to convert visitors into booked quotes/calls, not just inform.

This file is context to work from, not a checklist to enforce word-for-word — use judgment, and prefer what's actually in the code over what's written here if they ever disagree.

## Brand identity

- **Colors** (Tailwind `haut.*`, see [tailwind.config.ts](tailwind.config.ts)):
  - `haut-green` `#9FFE0A` — primary accent
  - `haut-slate` `#1A292E` — dark backgrounds/text
  - `haut-gray` `#DADADA` — borders/secondary
  - `haut-white` `#FFFFFF` — cards/high contrast
- **Fonts** (via `next/font/google` in [app/layout.tsx](app/layout.tsx)): **Kanit** for headings, **Roboto** for body/UI.
- **Visual motifs**: a green folded-corner "peel" accent on cards, and a subtle "+"-cross precision-grid background (`bg-precision-grid` in [tailwind.config.ts](tailwind.config.ts)) — used throughout to reinforce the "precision digital pattern" positioning.

## Voice

Factual and process-driven rather than superlative — describe what's actually done (precision digital patterns, self-healing topcoat, plotter-cut tint, manufacturer warranty) instead of leaning on generic adjectives like "premium/luxury/best/elite." Don't reuse other PPF shops' taglines. Beyond that, match whatever tone the existing copy in a section already has — the site doesn't have one locked hero line, copy has evolved past the original draft and will keep evolving.

## Business data

Source of truth is [lib/data.ts](lib/data.ts) (`STUDIO`, `PPF_PACKAGES`, pricing, FAQs, blog content) — read from there rather than hardcoding numbers, since pricing/copy change independently of this file. As of now: Hackensack NJ studio, PPF packages from $2,399, Ceramic Coating from $999.

## Tech stack

- Next.js (App Router) + React + TypeScript + Tailwind CSS
- Meta Pixel (`NEXT_PUBLIC_META_PIXEL_ID` in `.env.local`) tracking PageView/lead events
- `/api/lead` forwards form submissions to GoHighLevel CRM + Telegram (see [app/api/lead/route.ts](app/api/lead/route.ts))
- JSON-LD structured data (LocalBusiness/AutomotiveBusiness/FAQPage) lives in [app/layout.tsx](app/layout.tsx) and blog pages

## Structure

- `app/` — route pages: home, `/ppf`, `/ceramic`, `/window-tint`, `/our-process`, `/about`, `/reviews`, `/blog` + `[slug]`, plus `layout.tsx` (metadata, JSON-LD, fonts, Pixel) and `api/lead/`
- `components/` — one file per section/widget (Hero, Header, Footer, Packages, PricingMatrix, QuizModal, CalculatorModal, Reviews, FAQSection, ServicesOverview, RoadHazards(Grid), ProcessBanner, InstallationStandard, LocationMap, GlossMatteSlider, PageHero, TrustBar, LegalModal, QuoteButton, PPFFaq, PPFFinalCTA)
- `lib/` — shared data/content (`data.ts`) and helpers
- `public/assets/` — real product photography (hero, service shots, PPF finishes) — this is genuinely loadable and should be used for new imagery; there's no reason to avoid reading local images.

## Known rough edges

- Several `image:` fields in [lib/data.ts](lib/data.ts) (package cards, blog posts) and the OG image in [app/layout.tsx](app/layout.tsx) still point at `placehold.co` placeholder URLs left over from early scaffolding — these should eventually be swapped for real assets from `public/assets/` now that real photography exists. Don't introduce new external placeholder-service URLs; use a real asset or a plain styled div/inline SVG instead, since external placeholder images can silently fail to load for real visitors.
- `GHL_WEBHOOK_URL` / Telegram credentials in `.env.local` are unset placeholders — lead capture to those channels isn't live yet.
