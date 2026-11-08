# Rio Sun Massage Therapy — website

Creative direction: **Griffara Studio** · Concept: **Cinematic Contrast**
Languages: **EN-GB** (default, `/en/`) and **PT-BR** (`/pt-br/`)

## Stack (and why)

| Choice | Why |
|---|---|
| Next.js 15 (App Router) + static export | Every page pre-rendered to HTML: fastest possible LCP, zero server cost, hosts anywhere (Vercel). |
| TypeScript | Catalogue, translations and assets are typed, so a missing PT translation or asset id fails the build. |
| Tailwind CSS 4 | Design tokens in `src/app/globals.css` (`@theme`), no runtime CSS. |
| GSAP + ScrollTrigger (lazy) | Loaded only after first paint and never with `prefers-reduced-motion`. |
| Self-hosted fonts | Bodoni Moda (display) + Hanken Grotesk (text), no Google Fonts request. |
| No booking backend | Booking via official Fresha / Treatwell links (widgets can be added in BUILD 03). |

## Structure

```
src/
  app/[locale]/…            pages (home, treatments, treatments/[slug], our-story, journal, contact, booking, legal/[doc])
  app/(root)/page.tsx       "/" → remembered or browser language
  content/
    catalogue.ts            ★ single source for treatments, prices, durations, booking platforms
    site.ts                 business facts, links, ratings, hours (with conflicts flagged)
    people-reviews.ts       team facts, verbatim reviews, FAQ
    assets.ts               ★ asset manifest: every photo/video slot (id, ratio, mobile ratio, brief)
    legal.ts                legal page drafts
  i18n/dictionaries/        en.ts (source of truth) + pt-br.ts (typed against en)
  components/               Header, Footer, Media (placeholder ↔ real asset), Bands, cards…
  motion/                   MotionProvider + scenes (BUILD 02 choreography plugs in here)
public/brand/               official logo artwork (gold extracted from the approved emblem)
```

## Replacing a placeholder

1. Put the file in `public/media/` (e.g. `hero-desktop.mp4`).
2. In `src/content/assets.ts`, fill `src` (and `srcMobile` / `poster`) for that id.
3. Done. Layout, ratio, masks and motion already work with the placeholder.

## Updating a price

Edit the treatment in `src/content/catalogue.ts`. Home cards, Treatments page, detail page and booking buttons all update.

## Review mode

The small "Build 01 · Review mode" pill (bottom left) outlines every item that still needs confirmation
(price conflicts, draft copy, missing data). It is preview-only and will be removed before launch.

## Motion hooks (for BUILD 02)

- `data-bands="intro|transition|connection|outro"` — gold band moments
- `data-chapter="01".."07"` — homepage chapters
- `data-reveal="fade|mask|mask-x"` — reveals (CSS now, GSAP later, same markup)
- `data-parallax="0.1"` — moderate parallax (disabled on phones / low-power devices)
- `data-header="dark|light"` — header adapts to the section underneath

## Commands

```
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```
