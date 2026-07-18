# CHECKPOINT — M2 (Static + motion pass on all 11 sections)

> **Branch:** `main`
> **Status:** ready for your review. All 11 sections + persistent chrome are wired and running end-to-end from stub content.

---

## To see it running

```
npm run dev
```

Then open **http://localhost:3000/** — the intro modal opens, click Enter, and scroll the entire 11-section experience.

---

## What was built — M2

### Sections (0 → 10)

| # | Section | Component | Notes |
|---|---|---|---|
| 0 | Intro modal | `IntroModal.tsx` | Full-viewport arch overlay, dismissed by Enter; fires `karst:enter` event. |
| 1 | Hero | `HeroSequence.tsx` (Act A) | Scroll-scrubbed video walking through hallway; per-word rise + blur reveal. |
| 2 | Manifesto | `HeroSequence.tsx` (Act B) | Word-by-word breath-in; hero exits with lift + blur. |
| 3 | Transition | `HeroSequence.tsx` (Act C) | "BEGIN A HOME WITH US" reveal + dim deepens for phase handoff. |
| 4 | Phase 1: Listen | `PhaseDiorama.tsx` | Pinned diorama; scroll-scrubbed Video 2; Copper Fill headline; hotspot Overlay Reveal. |
| 5 | Phase 2: Sketch | `PhaseSketch.tsx` | Split-column; **cream curtain wipe** (scaleY) between 6 images; text clipPath unfold. |
| 6 | Phase 3: Refine | `PhaseDiorama.tsx` | Same diorama primitive; scrub video 3. |
| 7 | Phase 4: Build | `PhaseBuild.tsx` | Stacked cards with per-element choreography — chip springs in, line draws, heading + body clipPath unfold, vertical curtain wipe (scaleX) between cards. |
| 8 | Phase 5: Live | `PhaseDiorama.tsx` | Same diorama primitive; scrub video 4. |
| 9 | Tour intro | `TourIntro.tsx` | Cream card, Copper Fill "STEP INSIDE A KARST HOME", sage CTA. |
| 10 | Virtual Tour | `VirtualTour.tsx` | Full-bleed aerial with 6 clickable hotspot pills; **radial curtain reveal** (500ms open / 400ms close); custom × cursor desktop, close chip mobile; Ken-Burns push for stills. |

### Chrome (persistent)

- **`TopRightPill.tsx`** — IntersectionObserver state machine: `Menu =` (white) → compound `[◆ Our approach] [N] Phase =` on phase sections → sage `☎ Get in Touch =` on the tour.
- **`MenuPanel.tsx`** — 340px cream card, copper-numbered circles for each phase, dashed dividers, smooth slide-down, Esc + backdrop close.
- **`ContactModal.tsx`** — Centered 640px sheet, sage top band, defocused `IMG D3` background, 3-field form, copper `◆` confirmation state on submit.
- **`BottomHints.tsx`** — Bottom-left `↓ SCROLL TO EXPLORE` in first 20% of phases; bottom-right sage-outlined `Scroll to Phase N` in last 30%.
- **`ChromeShell.tsx`** — Client wrapper holding modal open state.
- **`Header.tsx`** (from M0) — Top-left Karst wordmark.

### Motion primitives established

- **Copper Fill** — character-by-character color transition gray-faded → copper → ink, scroll-driven. Used on every phase headline.
- **Cream curtain wipe (vertical)** — scaleY + origin flip for Sketch image transitions.
- **Cream curtain wipe (horizontal)** — scaleX + origin flip for Build card transitions.
- **ClipPath text reveal** — `inset(0 0 100% 0)` → `inset(0 0 0% 0)` unfolds text top-down; reverse for exits.
- **Radial curtain** — clip-path circle expand/contract from click point for Tour room enter/exit.
- **Video scrub remapping** — during phase intro (30% scroll) video holds nearly still (0-5%); remaining 95% scrubs during sub-scenes.

---

## Validation

- ✅ **TypeScript** — `npm run typecheck` passes with 0 errors.
- ✅ **Production build** — `npm run build` succeeds. Static prerender for `/`, `/design-system`, `/privacy`, `/terms`.
- ✅ **ESLint** on `src/` — 0 errors, 9 warnings (all `next/image` reminders for video posters + tour thumbnails, plus one unused var). Non-blocking.
- ⚠️ **Playwright** — first-run baseline written for `/design-system`. No baseline for the home page yet; homepage is motion-heavy so snapshot testing is intentionally deferred until M3.
- ✅ **Runtime** — no console errors on full-scroll pass through all sections; menu, contact modal, and tour room reveal all round-trip cleanly.

## Lighthouse baseline

**Not run this milestone.** Lighthouse against local `next dev` is misleading — Turbopack HMR, source maps, and unminified React all skew perf scores. The meaningful baseline needs `next build && next start`; deferring to M2·H completion once the branch is deployed to a Vercel preview (or run against `next start` locally). The prod-build passing is the pre-Lighthouse gate.

---

## Known follow-ups (out of scope for M2)

- Replace `<img>` tags with `next/image` on video posters + tour thumbnails (M3 perf pass).
- Extract shared Copper Fill logic — currently duplicated across 4 components. Refactor when a 5th consumer would be added.
- Some phase sections still hold sub-scene text position on exit — polish pass in M4.
- HeroSequence still has one unused destructured var (`bandEnd` in PhaseSketch) — trivial cleanup.

---

## What's next — M3

Real content integration: replace `stubContent.ts` with a live Sanity fetch guarded by the fallback shape, add loading skeleton for the initial hero video, and add Playwright coverage for the home page's key scroll states.
