# DIRECTION — Deliverable A

> The document to react to. What the site *is* and what it *isn't*.
> Read alongside `BUILD-SPEC.md` (the developer document).

---

## 1. Design direction statement

The site is an **editorial monograph in dark warm charcoal** — patient, considered, immersive. It treats the studio's work like a printed volume you'd find in a well-curated bookshop: no shouting, no marketing scaffolding, no decorative interface. The photography carries the emotion; the interface holds space around it. Motion is choreographed to preserve the pacing of walking through one of the studio's rooms — slow, deliberate, with silences that are load-bearing.

## 2. The one-line north star

> **"After 10 seconds, the visitor should feel like they've walked into one of our rooms — quiet, warm, and slightly reverent."**

Every design decision below is defensible against that sentence. If a proposed element does not serve it, cut the element.

---

## 3. Reference collage (what inspired what)

I can't embed screenshots into a markdown file, so each entry lists **where to look on that site** to see the specific pattern we're borrowing. Open the URL, find the moment described, and you'll see the reference exactly.

| Site | What we're taking | Where to look |
|---|---|---|
| **Makhno Studio** (`makhnostudio.com`) | Dark warm palette + subtle OGL image distortion on work-index cards | Homepage — the dusk hero; hover over any of the doorways |
| **Studio Freight** (`studiofreight.com`) | Serif+mono type pairing philosophy; motion budget discipline; simple custom cursor | Homepage scroll — the sparse masonry with serif tagline "Moving Missions Forward" |
| **Vincent Van Duysen** (`vincentvanduysen.com`) | Single-image-per-viewport gallery; near-invisible interface | Homepage — the full-bleed room photographs, minimal chrome |
| **Aman Resorts** (`aman.com`) | Video hero → curtain-wipe transition to detail page; project-index anatomy | Homepage → click any property |
| **Pierre Yovanovitch** (`pierreyovanovitch.com`) | Editorial "spread" case study layout; serif discipline; feature-article pacing | Any project page — the 2–3 image spreads with pull-quotes |
| **Bottega Veneta** (`bottegaveneta.com`) | Section-divider color-shift as signature moment (softened from full bg animation) | Collection page — the way background subtly tints per section |

Print this table and pin it above your screen. When someone asks "why does the site do X?", the answer is here.

---

## 4. Mood axis map

Where the site sits, plotted against 5 competitor reference sites on three axes.

### Axis 1 — Loud ↔ Quiet
```
LOUD ─────────────────────────────────────── QUIET
                                        ●●
Kelly    Makhno   Studio KO    Bottega  Us   VVD
Wearstler                              ↑
```
Our target sits **just quieter than Bottega, louder than Vincent Van Duysen**. Never in the "loud" third.

### Axis 2 — Warm ↔ Cool
```
WARM ─────────────────────────────────────── COOL
      ●
Us   Pierre    Studioilse    Bottega    VVD   Norm
     Yovanovitch                              Architects
```
Our target sits **at the warm end** — warmer than Bottega, in the same territory as Pierre Yovanovitch. Never cool. Cool white surfaces are explicitly banned.

### Axis 3 — Ornate ↔ Spare
```
ORNATE ────────────────────────────────────── SPARE
                            ●
Kelly    Makhno    Us    Pierre    VVD    John
Wearstler          ↑    Yovanovitch      Pawson
```
Our target sits **spare-side of middle** — more considered than Makhno's cinematic drama, less ascetic than John Pawson. Editorial restraint with room for a signature moment.

---

## 5. Anti-patterns (what we are deliberately NOT doing)

These are as important as what we're doing. Each is a temptation we're refusing.

- **No pure black.** Our darks are warm charcoal (`#1A1815`, `#2B2620`) — never `#000`. Pure black is cold, digital, cheap.
- **No cool whites.** Our lights are warm off-white (`#EDE6DA`) — never `#FFF`. Cool white on this site would feel like a hospital.
- **No aurora gradients, glassmorphism, or backdrop blur.** These are 2020–2023 SaaS visual language. They belong nowhere near this site.
- **No AI-startup purple-to-blue gradient text.** Ever.
- **No client-logo marquee strip.** "Trusted by these brands" is not the language of a design studio.
- **No auto-playing sound.** Ever.
- **No cursor-following blobs.** Our cursor is a small dot; occasional mono text labels; that's it.
- **No decorative textures.** No film grain, no noise overlay, no "handmade paper" background, no wood-grain UI panels. Materiality lives in the photography, not the interface.
- **No bento grids.** They are a 2024 cliché.
- **No horizontal scroll gimmicks** (unless it's a genuinely justified case-study module, which is unlikely).
- **No preloader** unless the first-visit brand moment genuinely requires it (video hero over 2s). Preloaders are performance theater.
- **No "trusted by" logo strip, no testimonials carousel, no "why choose us" slab.** This is a portfolio, not a landing page.
- **No above-the-fold contact form.** Users decide to hire after seeing the work, not before.
- **No thumbnails smaller than 400px on desktop.** Small thumbnails disrespect the photography.
- **No feature-length hero copy.** Every top-tier site we studied uses zero-to-minimal overlay text on hero. We follow the pattern.
- **No emoji as icons.** Use SVG (Lucide, Heroicons) if any icon is needed at all.
- **No "we're a design-first collective" wordmark loops.** No manifestos on the homepage.
- **No cluttered footer with 20 links.** Ours is a considered composition — three columns, no more.

---

## 6. Content strategy — what the site actually says

The site says the following, in this order of priority:

1. **The work.** Photography is 80% of the content. Nothing else competes with it.
2. **The studio's name.** Tiny wordmark, always present. Never overpowering.
3. **Where the projects are** (location + year). Set in mono type, feels like a museum label.
4. **How to see more work** (navigation to `/work`). Minimal.
5. **Who the studio is** (`/about`). Available, not pushed.
6. **What the studio offers** (`/services`). Available, not pushed.
7. **How to hire the studio** (`/contact`). The end of the funnel, not the start.

Notably absent from the site's voice:
- Superlatives ("award-winning", "leading", "premier")
- Corporate speak ("solutions", "deliverables", "partnerships")
- Sales language ("get in touch today", "let's build together")
- Every word a top-tier interior designer would never say

---

## 7. The 10-second test

If I land on the homepage and count "one Mississippi... two Mississippi..." to ten, what should I have experienced?

**Second 0–1:** the hero photograph. Full-viewport. Dark, warm, immersive. No overlay text yet.

**Second 1–3:** the tiny wordmark and single line of nav fade in. Nothing else.

**Second 3–7:** I've either started scrolling (in which case I've begun the intentional reveal of work) or I'm still absorbing the hero. Both are fine.

**Second 7–10:** if I've scrolled, I've seen the first project. If I haven't, I've seen nothing but the room in the hero. Both experiences say the same thing: *this studio takes its work seriously and expects you to as well.*

If at second 10 the visitor has been asked to click a CTA, seen a testimonial, or read a manifesto — the site has failed the direction.
