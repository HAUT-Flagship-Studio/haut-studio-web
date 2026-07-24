# HAUT Flagship Studio — Next.js Web Application

Official website for **HAUT Flagship Studio** (Hackensack, NJ) — specializing in Paint Protection Film (PPF), Ceramic Coatings, and Window Tinting.

## Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
  layout.tsx         # Root layout — metadata, JSON-LD, Meta Pixel
  page.tsx           # Home page
  globals.css        # Brand design system
  api/
    lead/route.ts    # Lead capture API → GHL + Telegram
  blog/
    page.tsx         # Blog index
    [slug]/page.tsx  # Dynamic blog post

components/
  Header.tsx         # Sticky nav, logo, CTA
  Hero.tsx           # Full-screen hero, H1, CTAs
  FilmSpecs.tsx      # Spec cards + modal popup
  Packages.tsx       # Bento-grid package cards
  QuizModal.tsx      # 4-step vehicle calculator
  Reviews.tsx        # Auto-scroll review slider
  BlogSection.tsx    # GEO article cards
  Footer.tsx         # CTA banner, contact info, links
```

## Environment Variables

See `.env.local`:
- `NEXT_PUBLIC_META_PIXEL_ID` — Meta Pixel ID (already set)
- `GHL_WEBHOOK_URL` — GoHighLevel CRM webhook endpoint
- `TELEGRAM_BOT_TOKEN` — Telegram bot token for notifications
- `TELEGRAM_CHAT_ID` — Telegram chat ID for notifications

## Brand Colors
| Name | Hex |
|------|-----|
| Primary Green | `#9FFE0A` |
| Dark Slate | `#1A292E` |
| Light Gray | `#DADADA` |
| White | `#FFFFFF` |
