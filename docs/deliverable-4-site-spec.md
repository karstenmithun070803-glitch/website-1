# Karst — Website Build Specification

**A scroll-driven interior-design studio site.** This document is the single source of truth for building the site. It is self-contained: every color, type, easing, timing, asset, and interaction needed is defined here. There are no external references to chase.

> **Brand:** `Karst` — Interior Design Studio
> **Voice:** Warm-professional. Considered. About-page quality — full sentences, no jargon, no fragments.
> **Process:** `Listen → Sketch → Refine → Build → Live` (5 phases)
> **Signature motion:** an aged-copper "highlighter fill" that sweeps across display headlines (and manifesto text) as you scroll into them.

---

## 0. How to read this spec

This site is **scroll-position driven, not time driven.** Nothing autoplays on a clock. Every reveal, camera move, and text fill is a function of *where the user has scrolled*. Read the whole document with that mental model:

- **There are no seconds or frame numbers anywhere in this spec.** Where the source analysis said "00:30–00:58," that was just how long one person happened to scroll during a screen recording — it carries no build meaning. It has been replaced with **scroll progress**.
- **Pinned scroll-story sections** work like this: the section is a tall scroll container (e.g. `height: 300vh`). Inside it sits a **sticky stage** (`position: sticky; top: 0; height: 100vh`). As the user scrolls the 300vh, the stage stays fixed and a **scroll progress value `p` (0 → 1)** is computed from how far through the container they are. That `p` drives everything: the background video's `currentTime`, headline fill, hotspot stagger, camera advance. Each pinned section below has a **beat table** mapping ranges of `p` to what is happening on screen.
- **Recommended scroll length** (given per section in `vh`) is a starting point for pacing — tune to taste. It does **not** change any content or behavior.
- **Millisecond durations** appear only for **discrete UI transitions** — hover, click, modal open/close. Those are real element transitions, not scroll-linked. Scroll-linked animation has no fixed duration; its speed is whatever the user's scroll speed is.
- **Background videos in pinned sections are scrubbed by scroll** (`video.currentTime = p * video.duration`), not played. They are pre-rendered "camera moves." Loop-only ambient videos (hero, tour rooms) may play normally.

---

## 1. Design tokens

### Color

| Token | Hex | Use |
|---|---|---|
| `--page` | `#F1EDE4` | Page background ("unbleached linen") |
| `--ink` | `#181613` | Body + display text ("deep espresso") |
| `--modal-bg` | `#1A1614` | Intro modal background ("roasted oak") |
| `--copper` | `#B87333` | **Primary accent** — aged copper / raw brass. The highlighter-fill color, diamond chips, active outlines. |
| `--sage` | `#3E4A3F` | **Secondary accent** — deep sage. Progress pills, CTAs, contact-modal top band. |
| `--teal` | `#7A9E9F` | Cool highlight — washed-teal overlays on diorama scenes. |
| `--gray-faded` | `#7A7261` | Warm gray — faded / not-yet-read text, dividers. (Contrast-compliant on `--page`, 4.6:1.) |

Two-tone discipline: the site is intentionally desaturated. The **only** saturated moments are the copper accent and the sage CTAs. Everything else is neutral.

### Typography

- **Display headline** — heavy sans, all-caps, weight ~900, desktop size ~110–160px, tight leading ~0.95. Recommended family: `Söhne Breit`, `National 2 Condensed Bold`, or `Reckless Neue Heavy` (a display serif adds atelier feel). This is the type the copper-fill runs on.
- **Body** — geometric-humanist sans, ~18–20px, letter-spacing +0.005em. Recommended: `Inter`, `Söhne`, or `Neue Haas Grotesk`.
- **UI micro-caps** — 11px, all-caps, letter-spacing +0.06em. Used for `PHASE 1`, `STEP 01`, `SCROLL TO EXPLORE`, `TAKE A TOUR`.
- **Hotspot pill label** — ~13px medium, ink on cream fill.

### Layout & spacing

- Content max-width ~1440px; diorama sections break to full-bleed.
- Sections are ≥100vh. Scroll-story sections are 2–3× viewport tall.
- Grid modes: hero / phase-intro / tour-intro are single-column full-width; **Sketch (Sec 5)** is split 50/50 (text left, tall image right); **Build (Sec 7)** is a horizontal 5-card carousel.
- Every diorama section uses the sticky pin-scroll pattern from §0.

---

## 2. Global motion language

Every animation on the site is one of these. Sections below refer to them by name.

### The signature — **Copper Fill**

As a display headline (or manifesto paragraph) enters view, its text fills **character-by-character, left to right**: each glyph begins pale gray `--gray-faded` at ~30% opacity, passes through a **copper leading edge** `--copper`, and lands at deep-espresso ink `--ink`. At any moment three zones are visible at once — ahead (pale), at (copper), past (ink) — so it reads like a highlighter being drawn across the words.

- **Driver:** scroll progress. The fill spreads across roughly the first ~40% of the section's scroll.
- **Easing:** `cubic-bezier(0.65, 0, 0.35, 1)` (near-linear, soft in/out).
- **Implementation:** wrap each character in a span; interpolate its color from the section's scroll progress with a per-character offset. (A moving `background-clip: text` gradient stop is an acceptable alternative for single-line headlines.)

### Hero Video Slide-Up

The hero film card enters from below the hero copy and rises + scales to full-bleed as the user scrolls: `transform: scale(1 → 1.02) translateY(20% → 0)`, driven across ~700–900ms-equivalent of scroll.

### Diorama Camera Advance

Pinned diorama sections have 4–6 discrete "camera positions." Scroll scrubs a pre-rendered video between them — smooth dolly/crossfade, never a hard cut. (`video.currentTime = p * video.duration`.)

### Overlay Reveal

On diorama scenes, teal wireframe / boundary overlays fade in over the base render to ~50% opacity, then floating hotspot labels pop in with `scale(0.85 → 1) + fade`, staggered ~80ms per label.

### Hotspot Pill → Card

On hover, a hotspot pill morphs into a rounded-corner cream card; its inset image fades in from soft blur. `opacity 0 → 1 + scale 0.95 → 1`, **~350ms**, `cubic-bezier(0.22, 1, 0.36, 1)`. Hovering off collapses it back to the pill.

### Split-Column Crossfade (Sketch only)

As the user scrolls, the left-column active entry heading fills to ink while the right-column image crossfades to the next photograph. **~500ms**, `cubic-bezier(0.65, 0, 0.35, 1)`.

### Horizontal Card Translation (Build only)

Vertical scroll drives horizontal translation of the 5 cards leftward. Active card is full ink; neighbors are faded gray; fine dashed dividers sit between cards.

### Scroll-to-Phase Pill

Bottom-right transient CTA. Rests as a sage-outlined pill; on hover it **fills bright sage and expands right** to reveal a mouse-glyph. **~200ms**.

### Menu Panel

Top-right pill click opens a ~340px floating panel that **slides down + fades from the pill origin**. **~250ms**, `cubic-bezier(0.22, 1, 0.36, 1)`.

### Contact Modal

Full-viewport dim underlay + centered white sheet with a sage top-border band. **Slides up ~40px from below + fades.** **~300ms**, `cubic-bezier(0.22, 1, 0.36, 1)`.

### Intro Modal Exit

On `Enter` click: button darkens (pressed state) **~200ms**, then the whole modal fades `opacity 1 → 0` over **~300ms**, revealing the already-loaded cream page beneath. `cubic-bezier(0.22, 1, 0.36, 1)`.

### Tour Room Enter / Exit (Sec 10) — added §7.7

On hotspot click, a **500ms radial curtain** contracts around the room center as the video fades up. Inside the room, the pointer becomes a custom `×` close cursor; a click anywhere reverses the curtain (400ms) and returns to the aerial. Full behavior in §7.7.

---

## 3. Asset manifest

All assets are referenced below by **ID** (`Video 1`, `IMG A1`, …). This table maps each ID to a file path, orientation, and what it depicts. **If your real filenames differ, edit only this table** — nothing else in the spec hard-codes a path.

**Path convention:** `/public/assets/video/…` and `/public/assets/img/…`

### Videos — `16:9 landscape`, loop-friendly

| ID | Path | Depicts | Used in |
|---|---|---|---|
| Video 1 | `/public/assets/video/01-hero-hallway.mp4` | Slow dolly-in through a golden-hour residential hallway (oak floor, arched window blooming). | Sec 1, 2, 3 |
| Video 2 | `/public/assets/video/02-phase1-plot.mp4` | Tilt-shift miniature coastal plot, olive trees, contour paths; slow orbit-right; teal site-boundary overlay. | Sec 4 |
| Video 3 | `/public/assets/video/03-phase3-build.mp4` | Top-down diorama of a residential build in progress (material stacks, tiny crane, clay figurine workers); slow descent zoom. | Sec 6, Sec 7 (portrait crop) |
| Video 4 | `/public/assets/video/04-phase5-twilight.mp4` | Finished residential diorama at twilight, warm window glow, teal life-flow traces; slow orbit-right. | Sec 8, Sec 7 (late cards), Sec 9 (dim bg), Sec 10 (aerial still source) |
| Video 5 | `/public/assets/video/05-tour-living-room.mp4` | Living room reveal — pulls from a coffee-table detail out to the full room. | Sec 10 · Living Room |
| Video 6 | `/public/assets/video/06-tour-kitchen.mp4` | Lateral truck along the Calacatta Viola kitchen island. | Sec 10 · Kitchen & Dining |
| Video 7 | `/public/assets/video/07-tour-bedroom.mp4` | Slow forward dolly through the bedroom suite at first light. | Sec 10 · Bedroom Suite |

### Images

| ID | Path | Aspect | Depicts | Used in |
|---|---|---|---|---|
| IMG A1 | `/public/assets/img/a1-consultation.jpg` | 3:4 | Porcelain figurines + rolled drawing on a linen console. | Sec 5 · Entry 1 |
| IMG A2 | `/public/assets/img/a2-blueprints.jpg` | 3:4 | Figurines holding an open terracotta-line floor plan. | Sec 5 · Entry 2 |
| IMG A3 | `/public/assets/img/a3-material-palette.jpg` | 3:4 | Layered material board (travertine, marble, linen, walnut, brass). | Sec 5 · Entry 3 |
| IMG A4 | `/public/assets/img/a4-model.jpg` | 3:4 | Figurines at a basswood architectural model of the home. | Sec 5 · Entry 4 |
| IMG A5 | `/public/assets/img/a5-detail-tablet.jpg` | 3:4 | Porcelain hands holding a tablet with a doorway elevation + sample chips. | Sec 5 · Entry 5 |
| IMG A6 | `/public/assets/img/a6-furniture.jpg` | 3:4 | Figurine arranging 1:20 furniture models on a low table. | Sec 5 · Entry 6 |
| IMG B1 | `/public/assets/img/b1-plot.jpg` | 16:9 | Phase-1 plot diorama still (poster + hotspot-card crops). | Sec 4 (poster / card crops) |
| IMG B2 | `/public/assets/img/b2-build.jpg` | 16:9 | Phase-3 build diorama still (poster). | Sec 6 (poster) |
| IMG B3 | `/public/assets/img/b3-home-complete.jpg` | 16:9 | Finished home diorama still. | Sec 8 (poster), Sec 10 (aerial hero) |
| IMG C1 | `/public/assets/img/c1-living.jpg` | 1:1 | Living room. | Sec 10 hotspot thumb |
| IMG C2 | `/public/assets/img/c2-kitchen.jpg` | 1:1 | Kitchen. | Sec 10 hotspot thumb |
| IMG C3 | `/public/assets/img/c3-bedroom.jpg` | 1:1 | Bedroom suite. | Sec 10 hotspot thumb |
| IMG C4 | `/public/assets/img/c4-powder.jpg` | 1:1 | Powder room (green marble jewel-box). | Sec 10 hotspot thumb + Ken-Burns still |
| IMG C5 | `/public/assets/img/c5-terrace.jpg` | 1:1 | Garden terrace (travertine table). | Sec 10 hotspot thumb + Ken-Burns still |
| IMG C6 | `/public/assets/img/c6-cellar.jpg` | 1:1 | Wine cellar (vaulted brick, brass sconces). | Sec 10 hotspot thumb + Ken-Burns still |
| IMG D1 | `/public/assets/img/d1-modal-bg.jpg` | 16:9 | Dark hand-plastered wall texture. | Sec 0 background |
| IMG D2 | `/public/assets/img/d2-wordmark.svg` | 200×200, transparent | Six aged-copper squares in a loose diamond cluster. | Sec 0 + persistent header |
| IMG D3 | `/public/assets/img/d3-contact-bg.jpg` | 16:9 | Defocused warm interior (bronze pendant, eucalyptus). | Sec 11 modal ambient bg |

**Crop notes.** The source videos are all 16:9. Where a portrait framing is required (Sec 7 sticky-left uses Video 3 then Video 4 in a portrait well), place the 16:9 video in a portrait container with `object-fit: cover` centered. The Sec 10 aerial hero is a **daytime still** — use a bright frame from Video 4 or `IMG B3` (raise exposure so the sky reads day, not twilight).

---

## 4. Persistent chrome

### Header (top-left, all sections)

`IMG D2` copper cluster + wordmark **`Karst`** + tagline `Interior Design Studio` (warm gray). ~24px wordmark in-page (larger on the intro modal — see Sec 0).

### Top-right pill — state machine

The pill always tells the user where they are. It updates continuously through scroll.

| Section | Pill label | Style |
|---|---|---|
| 0 (intro modal) | `Menu =` | white pill |
| 1–3 (hero + manifesto + transition) | `Menu =` | white pill |
| 4 (Listen) | `[◆ Our approach] [1] Listen =` | compound: copper diamond chip + sage phase-badge |
| 5 (Sketch) | `[◆ Our approach] [2] Sketch =` | as above |
| 6 (Refine) | `[◆ Our approach] [3] Refine =` | as above |
| 7 (Build) | `[◆ Our approach] [4] Build =` | as above |
| 8 (Live) | `[◆ Our approach] [5] Live =` | as above |
| 9 (Tour intro) | `[◆ Our approach] [6] Virtual Tour =` | as above |
| 10 (Tour) | `[phone-icon] Get in Touch =` | sage-filled pill |

The compound pill = a small **copper diamond `◆`** chip reading `Our approach` sitting left of a **sage phase-badge** carrying the phase number + name.

### Bottom-right transient CTAs

Appear at the **end** of each phase, disappear once scrolled past. Each is a **Scroll-to-Phase Pill** (§2), ~230×50px, sage-outlined resting → filled sage on hover.

- End of Sec 3 → `[mouse] Scroll to Phase 1`
- End of Sec 4 → `[mouse] Scroll to Phase 2`
- End of Sec 5 → `[mouse] Scroll to Phase 3`
- End of Sec 6 → `[mouse] Scroll to Phase 4`
- End of Sec 7 → `[mouse] Scroll to Phase 5`
- End of Sec 8 → `[mouse] Scroll to enter tour`

### Bottom-left ambient hint

Small mouse-glyph + micro-caps `SCROLL TO EXPLORE` fades in at the **start** of each phase, fades out once the user is inside the phase content.

---

## 5. Section-by-section build

Each section lists: **Type · Recommended scroll length · Pill state · Assets · Layout · Copy (verbatim) · Scroll beats · Interactions.**

---

### Section 0 — Intro Modal

- **Type:** full-viewport overlay, dismissed by click (no scroll).
- **Pill state:** `Menu =` (white).
- **Assets:** `IMG D1` (background), `IMG D2` (logo cluster).

**Layout.** Full viewport, background `IMG D1` (warm near-black plaster). Content centered horizontally, slightly above vertical center.

**Copy & elements.**

- **Logo unit** — `IMG D2` copper cluster, then wordmark **`Karst`** in white, ~44px heavy sans. To the right, tagline on two lines: `Interior Design` / `Studio`, white ~28px medium.
- **Enter button** — 30px below the logo. Pill ~140×48px, filled copper `--copper`, label **`Enter`** in near-black ~15px medium.
- **Footer** — bottom-right, ~11px warm gray, tracking +0.05em: `Terms · Privacy · Press · Careers · Contact`, and a second line: `©2026 Karst. All rights reserved.`

**Interaction.** On `Enter` click → **Intro Modal Exit** (§2): button darkens ~200ms, modal fades out ~300ms, cream page revealed beneath.

---

### Section 1 — Hero

- **Type:** standard → transitions into pinned. **Recommended scroll length:** ~200vh.
- **Pill state:** `Menu =`.
- **Assets:** `Video 1`.

**Layout.** Cream page `--page`. Header per §4. Top-right `Menu =` white pill.

**Copy.**

- **Display headline** (top-left, ~120px from top), two lines, all-caps, weight ~900, ~140px, tight leading, `--ink`:
  ```
  ROOMS THAT
  HOLD THE DAY.
  ```
- **Right column, mid-hero (~44% down),** body ~20px medium `--ink`:
  > "We design homes for the people who actually live in them — thoughtfully, materially, and with no visible seams."
- **Bottom-left transient:** mouse-glyph + micro-caps `SCROLL TO EXPLORE`.

**Scroll beats.**

| Progress `p` | What happens |
|---|---|
| 0.00 → 0.45 | **Copper Fill** sweeps `HOLD THE DAY.` left→right (pale → copper edge → ink). |
| 0.45 → 1.00 | `Video 1` card enters from below the fold as a rounded rectangle and performs **Hero Video Slide-Up** (§2), scaling up to take over the viewport by `p = 1`. |

---

### Section 2 — Manifesto Over Hero Film

- **Type:** pinned scroll-story. **Recommended scroll length:** ~250vh.
- **Pill state:** `Menu =`.
- **Assets:** `Video 1` (now full-viewport, pinned/sticky, darkened).

**Layout.** `Video 1` fills the sticky stage, dimmed. Text overlays the right two-thirds. Left column persistent: micro-caps stack `HOW WE WORK` / `OUR PROCESS`, dim white ~13px, tracking +0.08em.

**Copy — the manifesto (this is where Copper Fill runs on body text).**

Paragraph 1 (~44px medium, near-white on the darkened video), prefix `◆` in copper:

> "◆ Every project begins with a room's own logic — how light enters, where people gather, which corners deserve the good chair. We start there, not with a mood board."

Paragraph 2 (appears below as scroll continues, same treatment):

> "From that first honest brief through the last curated object, Karst designs residences and quiet commercial spaces that reward the time you spend in them."

**Scroll beats.**

| Progress `p` | What happens |
|---|---|
| 0.00 → 0.55 | Paragraph 1 fills character-by-character (**Copper Fill**). Words that should land on the copper leading edge at natural scroll pace: `light`, `people gather`, `good chair`. |
| 0.45 → 1.00 | Paragraph 2 fades in below and fills. Copper-edge words: `honest brief`, `curated object`, `reward the time`. |

---

### Section 3 — "Begin a Home With Us" Transition

- **Type:** pinned continuation of Sec 2. **Recommended scroll length:** ~120vh.
- **Pill state:** `Menu =` (has **not** yet switched to a phase — that happens on the Sec 4 intro).
- **Assets:** `Video 1` still pinned.

**Layout.** Massive display headline overlaid center-left, three lines, all-caps, near-white, ~140px:

```
BEGIN
A HOME
WITH US
```

**Copy.**

- **Bottom-left:** "Every home we design moves through five phases — each measured, each deliberate." (~18px light white).
- **Bottom-right transient CTA:** sage pill `[mouse] Scroll to Phase 1`, ~230×50px, pinned bottom-right this section.

**Scroll beats.**

| Progress `p` | What happens |
|---|---|
| 0.00 → 0.70 | Headline **Copper Fill** runs; the final word `US` is where the copper edge lands last (`U` inks first, `S` catches copper). |
| 0.70 → 1.00 | Bottom-right `Scroll to Phase 1` pill is present. |

---

### Section 4 — Phase 1: LISTEN

- **Type:** pinned diorama scroll-story, 3 sub-scenes. **Recommended scroll length:** ~350vh.
- **Pill state:** transitions to `[◆ Our approach] [1] Listen =`.
- **Assets:** `Video 2` (scrubbed by scroll), `IMG B1` (poster + hotspot-card crops).

**Purpose.** The discovery phase — first site visit, reading the plot, understanding the client. Establishes that Karst begins by observing.

**Sub-scene 1 — Phase intro.** Full-bleed `Video 2`. Overlay:

- `PHASE 1` micro-caps chip top-left.
- Display headline **`LISTEN`** (runs **Copper Fill** on scroll).
- Body bottom-right, ~22px:
  > "We spend the first weeks not designing anything at all. We walk the site at different hours, meet everyone who'll live there, and note the small things — where the light lands at four in the afternoon, which door already gets left open."

**Sub-scene 2 — Site conditions (3 hotspots).** `Video 2` has advanced (scroll-scrubbed). A teal wireframe "site boundary" polygon breathes over the plot. Three floating pills fade in via **Overlay Reveal** (~80ms stagger). Right side: vertical progress dots (`| · ·` — you're on 1 of 3). Bottom-right: `STEP 01`.

- **`[◆] Orientation & Light`** → card: "North-south axis, how each room receives the sun through the year, where shade needs to be built." *(Card image: `IMG B1` cropped to a top-down macro with directional light arrows.)*
- **`[◆] Landscape & Terrain`** → card: "Existing trees to preserve, sight-lines to protect, the topography we design with instead of against." *(Card image: `IMG B1` crop of contour lines + one olive tree.)*
- **`[◆] Neighborhood Grain`** → card: "What the surrounding architecture already speaks. Our work continues a conversation — never interrupts one." *(Card image: `IMG B1` crop, wider setting.)*

**Sub-scene 3 — Brief & priorities.** `Video 2` advances further; previous pills fade out, new set fades in. Progress dots now `· · |`. Right column: `STEP 02` + "We translate lived detail into design intent — a working brief you can hold in your hand."

- **`[◆] The Client's Real Day`** → "How you actually spend a Sunday, where the kids drop their bags, which rooms will hold guests, which are only for you."
- **`[◆] Objects You Already Love`** → "The paintings, the books, the chair from your grandmother — they usually tell us more about the room than a mood board can."
- **`[◆] Rhythm of the House`** → "When does the house need to be loud, when quiet, when open, when closed. This shapes every plan we draw next."

**Scroll beats.**

| Progress `p` | What happens |
|---|---|
| 0.00 → 0.30 | Sub-scene 1: `Video 2` at its opening framing; `LISTEN` runs **Copper Fill**; intro body visible. |
| 0.30 → 0.65 | Sub-scene 2: video scrubs to the closer framing; boundary polygon + first 3 hotspots **Overlay Reveal**; progress dots = 1/3; `STEP 01`. |
| 0.65 → 1.00 | Sub-scene 3: video scrubs on; first pills fade out, second 3 fade in; progress dots = 2/3 → 3/3; `STEP 02`. At `p → 1`, bottom-right `Scroll to Phase 2` pill appears. |

**Interactions.** Hotspot **Pill → Card** on hover (§2).

---

### Section 5 — Phase 2: SKETCH

- **Type:** split-column pin-scroll (editorial), 6 entries. **Recommended scroll length:** ~500vh (the longest section — this is where craft comes across).
- **Pill state:** `[◆ Our approach] [2] Sketch =`.
- **Assets:** `IMG A1`–`IMG A6` (right image well). No video.

**Layout.** Left column = text well (~440px). Right column = full-height image well (~54% of viewport width) that crossfades one photograph at a time via **Split-Column Crossfade** (§2). Cream page, same header.

**Intro.** Display headline **`SKETCH`** (runs **Copper Fill**). Right-column intro body:

> "We begin drawing by hand. Concepts before computers, in soft pencil on tracing paper, so nothing gets committed too early. Every idea we bring you at this stage has been argued for."

**Entries** — each: copper icon square (~48×48) + heading (~28px black) + 3-line body (warm gray → inks as reached). Right image crossfades to the paired photograph.

1. **First Concepts** *(pencil glyph)* — "Three or four honest directions on the table, each pursued far enough to be judged, not just seen. We show you what we ruled out and why." → **`IMG A1`**
2. **The Plan** *(stacked-sheets glyph)* — "Once one direction earns its place, we develop the plan drawings — where every wall, opening, and threshold sits. This is the document the whole rest of the project will refer back to." → **`IMG A2`**
3. **Material Palette** *(three-layer glyph)* — "Every project's material story is decided on a single table. Stone against wood against linen against brass — how they age together, how they meet at every edge." → **`IMG A3`**
4. **Models & Elevations** *(cube glyph)* — "A physical model at 1:50, and hand-drawn elevations of every important wall. Rooms are three-dimensional propositions — we test them that way before we commit anyone to build them." → **`IMG A4`**
5. **Detail Studies** *(ruler glyph)* — "How a stair meets a floor, how a door pull sits in the hand, how a shadow line runs behind a kitchen counter. These are the small decisions that separate a good room from a great one." → **`IMG A5`**
6. **Furniture & Composition** *(armchair glyph)* — "We compose rooms with model furniture at scale before a single piece is sourced. It tells us where the good chair really wants to sit, and how much room the good chair really needs to breathe." → **`IMG A6`**

**End-of-phase card.** A full-width horizontal cream band overlapping the top edge of the Sec 6 diorama:

- **Left:** heading `The Result of Sketch.` (~48px black).
- **Right:** "A full concept package: floor plans, elevations, physical model, material palette, and a fixed budget the whole build will honor."
- **Pill button below body:** sage-filled `See a past project [→]`.

**Scroll beats.** Divide the scroll length into 7 equal bands: band 0 = intro (`SKETCH` Copper Fill + intro body, right image = `IMG A1`); bands 1–6 = entries 1–6, each fading its left heading to ink and crossfading the right image to the paired photo; the final tail reveals the end-of-phase card and the `Scroll to Phase 3` pill.

---

### Section 6 — Phase 3: REFINE

- **Type:** pinned diorama scroll-story, 3 sub-scenes. **Recommended scroll length:** ~350vh.
- **Pill state:** `[◆ Our approach] [3] Refine =`.
- **Assets:** `Video 3` (scrubbed), `IMG B2` (poster).

**Purpose.** Detailed design development — the model becomes a specification. Every material chosen, every measurement fixed, every drawing produced for the builders.

**Sub-scene 1 — Phase intro.** Full-bleed `Video 3`. `PHASE 3` chip. Display headline **`REFINE`** (**Copper Fill**). Body bottom-right:

> "Refinement is what protects the concept from erosion during construction. Every line on every drawing carries a decision behind it — and a reason we can defend."

**Sub-scene 2 — Working documents (3 hotspots).** `Video 3` scrubs closer/tilted. Right: `STEP 01` + "Every drawing package we hand to the builders has been reviewed by the entire studio."

- **`[◆] Construction Drawings`** → "Full working drawings for the builders. Dimensioned floor plans, reflected ceiling plans, elevations of every joinery run, and details for every non-standard condition."
- **`[◆] Joinery & Millwork`** → "Custom joinery drawn and modeled to millimeter tolerance. Every cabinet, every closet, every built-in — designed to sit exactly right, made by a workshop we know by name."
- **`[◆] Lighting Design`** → "A room is only as good as its light at 4pm and again at 10pm. We design the lighting layer separately, with photometrics, so the room reads correctly in every hour of the day."

**Sub-scene 3 — Material specifications (3 hotspots).** `Video 3` scrubs again; new labels. Right: `STEP 02` + "Specification schedules go into the contract. Nothing is left to the builder's interpretation."

- **`[◆] Stone & Timber`** → "Every stone slab selected in person at the yard, every timber batch signed off. No substitutions, no surprises on delivery day."
- **`[◆] Metals & Fittings`** → "Solid unlacquered brass, blackened steel, hand-cast bronze. Fittings and hardware chosen to develop a patina, not to be replaced."
- **`[◆] Fabric & Upholstery`** → "Belgian linens, un-dyed wools, monk's cloth, boucle. We favor materials that ask to be lived on."

**Scroll beats.**

| Progress `p` | What happens |
|---|---|
| 0.00 → 0.30 | Sub-scene 1: `REFINE` **Copper Fill**; intro body. |
| 0.30 → 0.65 | Sub-scene 2: video scrubs; first 3 hotspots **Overlay Reveal**; `STEP 01`. |
| 0.65 → 1.00 | Sub-scene 3: video scrubs; second 3 hotspots; `STEP 02`. At `p → 1`, `Scroll to Phase 4` pill appears. |

---

### Section 7 — Phase 4: BUILD

- **Type:** horizontal card carousel with sticky left image. **Recommended scroll length:** ~350vh.
- **Pill state:** `[◆ Our approach] [4] Build =`.
- **Assets:** `Video 3` (portrait crop, cards 01–03), `Video 4` (portrait crop, cards 04–05).

**Layout.** Left half of viewport = full-height **sticky image well**. Right half = 5 vertical cards separated by fine dashed dividers. Vertical scroll drives **Horizontal Card Translation** (§2): cards move leftward, the active card sits at the left of the right column, full ink; neighbors faded gray.

**Sticky-left image behavior:** `Video 3` (portrait crop — the site under construction) through cards 01–03, then crossfades to `Video 4` (portrait crop — the finished home glowing at twilight, foreshadowing Sec 8) during cards 04–05.

**Intro.** Display headline **`BUILD`** (**Copper Fill**). Right-column intro body:

> "During construction, Karst remains on site weekly. We meet the trades, review every finish sample against the specification, and protect the project from the small drifts that would compromise it."

**Cards** — each: small copper number circle chip, heading (~26px black semibold), body (~15px).

- **01 · Site Mobilization** — "Contractors mobilize on site, protections go in, and the first phase of demolition or excavation begins. Karst is present the day the work starts."
- **02 · Structure & Envelope** — "Framing, walls, roofing, windows, and the sealing of the building envelope. The house's bones are set — and we visit twice a week to confirm every wall lands where the drawings say it does."
- **03 · Finishes First-Fix** — "Plastering, screeds, joinery carcasses installed, wet trades completed. This is when materials arrive on site in volume, and every delivery is checked against the specification schedule."
- **04 · Finishes Second-Fix** — "Cabinetry doors, hardware, sanitaryware, lighting fixtures, floor finishes laid. The house begins to look like the drawings — and this is when we're on site the most, protecting every finish transition."
- **05 · Commissioning & Snagging** — "Systems tested, defects logged and resolved, cleaning through. We hand over a house that meets the standard we agreed to — no gray-area punch list, no lingering items."

**Scroll beats.** Intro band first (`BUILD` Copper Fill, sticky-left = Video 3 portrait). Then 5 equal bands advance the active card 01 → 05 via horizontal translation. During the 04 band the sticky-left crossfades from Video 3 to Video 4. At the tail, `Scroll to Phase 5` pill appears.

---

### Section 8 — Phase 5: LIVE

- **Type:** pinned diorama scroll-story, 2 sub-scenes. **Recommended scroll length:** ~250vh.
- **Pill state:** `[◆ Our approach] [5] Live =`.
- **Assets:** `Video 4` (scrubbed), `IMG B3` (poster).

**Purpose.** The house is finished, styled, photographed — the last phase Karst is involved in before it becomes the client's alone.

**Sub-scene 1 — Phase intro.** Full-bleed `Video 4`. `PHASE 5` chip. Display headline **`LIVE`** (**Copper Fill**). Body bottom-right:

> "The last two weeks are the ones that separate a completed house from a home. Styling, objects, and the first quiet evening before the client moves in."

**Sub-scene 2 — Handoff (3 hotspots).** `Video 4` scrubs; a soft teal glow drifts along garden paths, tracing how the house will live. Right column: `STEP 01` + "When we hand over the keys, the house is complete — not almost complete."

- **`[◆] Styling & Curation`** → "We install every piece of furniture, every art work, every object — often over three or four days — until the house has the composed calm we designed for."
- **`[◆] The Handover Book`** → "A bound document detailing every material, every fixture, every supplier — with care and warranty information — for you to keep."
- **`[◆] Aftercare, One Year`** → "For twelve months after handover we return quarterly to check every finish, resolve any question, and re-adjust any door that needs it. The relationship isn't over on move-in day."

**Scroll beats.**

| Progress `p` | What happens |
|---|---|
| 0.00 → 0.45 | Sub-scene 1: `LIVE` **Copper Fill**; intro body; `Video 4` opening framing. |
| 0.45 → 1.00 | Sub-scene 2: video scrubs; teal path-glow drifts; 3 hotspots **Overlay Reveal**; `STEP 01`. At `p → 1`, `Scroll to enter tour` pill appears. |

---

### Section 9 — Virtual Tour Intro

- **Type:** cream card over dim `Video 4`. **Recommended scroll length:** ~120vh.
- **Pill state:** transitions to `[◆ Our approach] [6] Virtual Tour =`.
- **Assets:** `Video 4` (dim, playing underneath).

**Layout & copy.** Full cream card over the dim video.

- Chip top-left: `TAKE A TOUR`.
- Display headline (~130px, near-black):
  ```
  STEP INSIDE
  A KARST HOME
  ```
- Body bottom-left:
  > "This is a home we completed for a family of four on the coast. Every room shown was styled, photographed, and lived in for six months before we returned to capture it."
- Bottom-right CTA: sage pill `[mouse] Scroll to enter`. On hover, fills bright, label darkens to full ink.

**Scroll beats.** Headline runs **Copper Fill** across the first ~0.6 of `p`; the `Scroll to enter` CTA is present through the tail.

---

### Section 10 — Virtual Tour: The Finished Home

- **Type:** **click-driven interactive** (not scroll-length dependent). Sticky 100vh stage.
- **Pill state:** morphs to sage phone button `[phone-icon] Get in Touch =`.
- **Assets:** aerial hero = daytime still (bright frame of `Video 4` or `IMG B3`); room reveals = `Video 5`, `Video 6`, `Video 7`; stills = `IMG C4`, `IMG C5`, `IMG C6`; thumbnails = `IMG C1`–`IMG C6`.

**Layout.** Full-bleed daytime aerial of the finished home at a ~30° angle. Six clickable hotspot pills float over the plan; **each pill contains a small circular thumbnail** of its room.

| Pill | Thumbnail | Positioned over |
|---|---|---|
| `Living Room` | `IMG C1` | great-room area |
| `Kitchen & Dining` | `IMG C2` | kitchen wing |
| `Bedroom Suite` | `IMG C3` | primary suite |
| `Powder Room` | `IMG C4` | smaller bathroom |
| `Garden Terrace` | `IMG C5` | outdoor terrace |
| `Wine Cellar` | `IMG C6` | cellar level |

**Click flow (per §7.7).** Clicking a pill triggers a **500ms radial curtain** that contracts around the room center as the room video fades up. **Inside the room, the pointer becomes a custom `×` close cursor** (a small circle with a copper × inside, ~40×40px, following the pointer). A **click anywhere** on the room stage reverses the curtain (400ms) and returns to the aerial. Video plays once and **holds on its final frame** — user is in control of when to exit. `Esc` also returns to aerial.

**Rooms and their reveals:**

- **Living Room** → plays **`Video 5`**. Copy overlay bottom-left (dim white ~18px, fades in ~2s in): "Boucle sofa in oat, fluted stone table, a single Noguchi Akari, and an abstract painting we sourced specifically for this wall. The room the family gathers in every evening."
- **Kitchen & Dining** → plays **`Video 6`**. Copy: "The island is one book-matched slab of Calacatta Viola marble, 2.4m long, resting on hand-plastered black-brown volumes. Brass pendant lights we co-designed with a workshop in Antwerp."
- **Bedroom Suite** → plays **`Video 7`**. Copy: "A Belgian-modernist bedroom in limewashed white and pale oak. Every element chosen to soften first light — from the monk's-cloth curtain to the paper drum pendant."
- **Powder Room** → **`IMG C4`** as a letterboxed still with a subtle **Ken-Burns push-in** (~10s, holds when done). Copy: "A jewel-box: one slab of book-matched green marble, an unlacquered brass tap, a ribbed-glass sconce, a candle always burning."
- **Garden Terrace** → **`IMG C5`** Ken-Burns (~10s). Copy: "A raw travertine table, bentwood chairs, and a linen umbrella. The client eats here from May to October."
- **Wine Cellar** → **`IMG C6`** Ken-Burns (~10s). Copy: "A quiet room below the kitchen: vaulted brick, brass sconces, two coupes on a marble tasting counter."

Note: unlike the reference site, there is **no "next room" pill** inside a room view. Every click exits. To visit another room, the user returns to the aerial and clicks that hotspot.

---

### Section 11 — Global Menu + Contact Modal

- **Type:** click-triggered overlays.
- **Assets:** `IMG D3` (contact-modal ambient background).

**Global menu** — opens from the top-right pill via **Menu Panel** (§2). 340px wide, cream-white fill, subtle shadow. Rows (each: copper-outlined numbered circle + label ~18px medium ink, thin dashed dividers, soft warm-gray hover fill):

```
1  Listen
2  Sketch
3  Refine
4  Build
5  Live
6  Virtual Tour
```

Below the list: full-width sage pill `[phone-icon] Get in Touch` (~46px tall). Top-right of the panel: circular `×` close.

**Contact modal** — opens on `Get in Touch`. Full-viewport dim underlay (page → ~30% brightness) with `IMG D3` as the defocused ambient background. Centered modal ~640px wide, white, top border a ~4px sage band. Opens via **Contact Modal** transition (§2).

- **Heading (~40px black semibold):** `Begin a conversation.`
- **Sub-line (~15px warm gray):** "Tell us about the space and the way you want to live in it. We read every note."
- **Fields** (each: micro-caps label ~11px +0.06em, then outlined input ~48px, cream fill):
  - `YOUR NAME` (input)
  - `EMAIL` (input)
  - `PHONE` (input, optional)
  - `LOCATION OF PROJECT` (input)
  - `PROJECT TYPE` (select: `Full home` / `Single room` / `Commercial space` / `Not sure yet`)
  - `TIMELINE` (select: `Actively planning` / `Within 6 months` / `Within a year` / `Exploring`)
  - `A FEW LINES ABOUT THE SPACE` (textarea, ~120px)
- **Submit** bottom-right: sage pill `Send note [→]`. Top-right: circular `×` close.
- **On submit:** contents replace with a quiet confirmation: "Thank you. We'll be in touch within two working days." plus a copper-underlined link `Return to Karst →` that closes the modal.

---

## 6. Build assumptions to confirm

These are choices I made so the spec is complete and buildable with zero blanks. Change any by editing the one place noted.

1. **Asset paths** are the `/public/assets/…` convention in §3. If your generated files are named differently, edit **only the §3 manifest** — the rest of the spec references IDs.
2. **Scroll lengths** (per section, in `vh`) are pacing starting points, not content. Tune freely.
3. **Wordmark** is `Karst` (title case, no period) everywhere. To switch to `karst.` or `KARST`, it's a global find-and-replace on the wordmark string.
4. **Copper Fill implementation** is left to the builder (per-character spans recommended; `background-clip: text` acceptable for single lines). Behavior and easing are fixed in §2 and edge cases in §7.5.
5. **Sec 10 aerial** needs a *daytime* still; if the brightest Video 4 frame still reads twilight, generate a daytime variant of `IMG B3`.
6. **The showcase home is fictional** — all Sec 10 copy is production-ready as written; no real project needs to be substituted.

---

## 7. Non-visual concerns (build-ready)

This section closes the gaps not covered above — accessibility, mobile, video loading, performance, tour cursor, URL state, SEO, CMS, and where this spec sits in the wider project.

Where the parent spec `docs/creative-brief/BUILD-SPEC.md` already answers a concern (Sanity, analytics, image pipeline, font strategy, deployment, base a11y contract, performance floor), this section **defers to it by section number** rather than duplicating.

### 7.1 Scope note — where this spec sits in the larger project

`docs/creative-brief/BUILD-SPEC.md` describes the wider studio site (multi-page: `/`, `/work`, `/work/[slug]`, `/services`, `/about`, `/contact`, `/studio`) with an editorial motion vocabulary of mask reveals, SplitTextReveal, curtain wipes, and a small warm-off-white cursor dot — a Vincent Van Duysen / Studio KO tonality.

**This spec (Sections 0–11 above) is a self-contained home-page experience** — an immersive 11-section scroll journey inspired by the NRG reference. Its motion vocabulary (copper-fill highlighter, pin-scroll dioramas, scrubbed-by-scroll videos, hotspot pills) is **different from BUILD-SPEC's**.

Two possible resolutions — the client will pick:

**Option A — This spec is the entire site.** No `/work`, `/services`, `/about` routes. The 11 sections *are* the site. Case studies live inside Sec 10's tour concept (each project = a tour). Simpler, more cinematic, harder to update with new work.

**Option B — This spec is only the home page (`/`).** `/work`, `/about`, `/services` continue per BUILD-SPEC. The home page's motion vocabulary (copper-fill, dioramas) is used **only** on `/`; the rest of the site retains BUILD-SPEC's mask-reveal / SplitText editorial motion. Two vocabularies coexisting is a real risk — needs a bridge (e.g. the intro modal + hero use BUILD-SPEC's serif type on inner pages).

**Recommendation:** Option B, and I'd lean into unifying the type system across both — use BUILD-SPEC's PP Editorial Old serif for the home-page's copper-fill headlines (a display serif with a copper fill reads more atelier than a heavy sans). But this needs a client call, not my call.

### 7.2 Reduced-motion fallbacks (`prefers-reduced-motion: reduce`)

Copper-fill, scroll-scrubbed videos, and pin-scroll are all motion-heavy. Under reduced-motion:

| Feature | Reduced-motion fallback |
|---|---|
| Copper Fill (headline + manifesto) | Text renders in final `--ink` color immediately. No character-by-character reveal. |
| Scroll-scrubbed dioramas (Video 2/3/4) | Video does not play. Show the corresponding poster still (IMG B1/B2/B3) full-bleed. Hotspots still appear (via IntersectionObserver crossings, no stagger). |
| Pin-scroll sticky sections | Section becomes linear — content flows top-to-bottom at natural height. No sticky stage. |
| Hero Video Slide-Up (Sec 1) | Video appears in final position (full-bleed) with no scale/translate — cross-fades in over 200ms. |
| Hotspot Pill → Card | Instant swap (no opacity/scale transition). |
| Split-Column Crossfade (Sec 5) | Image swap is instant. |
| Horizontal Card Translation (Sec 7) | Cards stack vertically, one per screen. |
| Tour Room Enter / Exit (Sec 10) | No radial curtain — direct cross-fade 200ms. Custom cursor replaced with a top-right `×` chip. |
| Ken-Burns push on tour stills | Static — no push. |
| Menu Panel / Contact Modal / Intro Modal | Fade only, no slide. 150ms. |

All CSS/JS motion primitives must be wrapped in `@media (prefers-reduced-motion: no-preference) { ... }` or the JS equivalent (`matchMedia('(prefers-reduced-motion: reduce)').matches`). Defers to BUILD-SPEC §14 for the broader a11y contract.

### 7.3 Mobile transformations (≤ 768px)

| Section | Desktop | Mobile |
|---|---|---|
| Sec 1 Hero | Two-column (headline left, body right) | Single-column stacked — headline top, body below, hero video enters full-width beneath |
| Sec 2 Manifesto | Text overlaid on full-bleed video | Text on cream page with video pinned below as a shorter aspect band; Copper Fill still runs but headline scale drops to ~64px |
| Sec 4 / 6 / 8 Dioramas | Pin-scroll with hover-to-open hotspots | Pin-scroll retained. Hotspots become **tap-to-open** — only one card open at a time; tap the video to dismiss |
| Sec 5 Sketch (split-column) | Left text well + sticky right image | Stacked — each entry becomes its own viewport (text card, then paired photograph full-width below). Vertical scroll advances entries one at a time |
| Sec 7 Build (horizontal cards) | Vertical scroll drives horizontal card translation | Cards stack vertically — one card per viewport. Sticky left image becomes a full-width top image band per card group |
| Sec 10 Virtual Tour | Aerial + 6 hotspots + full-viewport room reveals | Aerial fills viewport; hotspots stack as a bottom-sheet list of 6 rooms. Tap a row to enter that room's video, which fills the viewport |
| Sec 11 Contact Modal | Centered ~640px sheet | Full-viewport bottom sheet, slides up from bottom edge |

All videos: `muted playsinline autoplay` attributes for iOS/Safari. Custom cursor (Sec 10) hidden on touch devices — replaced with a top-right `×` chip. Defers to BUILD-SPEC §2 row 13 for the broader mobile transformation policy.

### 7.4 Video loading strategy

Four pin-scroll videos, one hero, three tour videos — bandwidth-sensitive.

| Video | Preload | Poster fallback |
|---|---|---|
| Video 1 (hero) | `preload="auto"` — must be ready by end of Sec 1 | LQIP + a dark cinematic still (extract from Video 1 frame 0) |
| Video 2 (Sec 4 diorama) | `preload="metadata"` initially; upgrade to `preload="auto"` when Sec 3 enters viewport | `IMG B1` |
| Video 3 (Sec 6/7 diorama) | `preload="metadata"` initially; upgrade when Sec 5 enters viewport | `IMG B2` |
| Video 4 (Sec 8 diorama) | `preload="metadata"` initially; upgrade when Sec 7 enters viewport | `IMG B3` |
| Video 5 / 6 / 7 (tour) | `preload="none"` — load on hotspot click | `IMG C1 / C2 / C3` respectively (also shown during the enter-curtain) |

**Encoding.** Each video ships in two variants — 1080p H.264 (target ≤ 4 MB) and 720p (target ≤ 2 MB). Under `navigator.connection.effectiveType === '3g'` or `saveData`, serve 720p. Under `2g` or `navigator.connection.saveData === true`, skip video entirely — show poster still with a light Ken-Burns push.

**Scrubbed videos need frame-precise seeking** — ship as MP4 with `moov` atom at the front (`faststart`) and short GOPs (keyframe interval ≤ 30 frames):

```
ffmpeg -i in.mov -c:v libx264 -crf 22 -preset slow -g 30 -movflags +faststart out.mp4
```

If a video fails to load: show its poster still + text description via `aria-label`. Skip that section's motion; treat it as if reduced-motion is on.

### 7.5 Copper Fill implementation notes

Per-character spans are the reference implementation. Edge cases:

- **Multi-line headlines:** the fill sweeps continuously across all lines. Character `n`'s fill progress = `clamp(0, (p × totalChars − n) / fillWidth, 1)` where `fillWidth` is a constant (~6 characters) that controls the width of the copper leading edge.
- **Wrap at different viewport widths:** recalculate character offsets on `resize` via a `ResizeObserver` on the headline container.
- **Long manifesto paragraphs (Sec 2):** each paragraph is its own fill target with its own `p` range. Paragraph 1 fills over `p 0.00–0.55`, paragraph 2 over `p 0.45–1.00` (10% overlap — as one nears completion, the next begins).
- **Selectable text:** each character span uses `color: transparent` + inner element for the reveal so native `::selection` still works.
- **`background-clip: text` alternative** is acceptable for single-line short headlines only (Sec 1 `HOLD THE DAY.` — the shorter final line). Not for multi-line manifesto copy.
- **SSR / progressive enhancement:** without JS, headlines render in final ink color. Copper fill enhances on hydration.

### 7.6 Section-to-section seams

Default: sections abut without a visual seam. Two intentional overlaps:

1. **End of Sec 5 → start of Sec 6:** the "Result of Sketch" cream card overlaps the top edge of the Sec 6 diorama by ~8vh. Implement: Sec 5's end-card has `position: relative; z-index: 2; margin-bottom: -8vh;` and Sec 6's diorama sits behind with `z-index: 1`.
2. **Sec 9 → Sec 10:** Sec 9's cream card sits over the dim playing `Video 4`; the transition to Sec 10 replaces the video with the daytime aerial (`IMG B3`) — cross-fade 400ms.

All other section boundaries are hard cuts on scroll — no visual seam.

### 7.7 Virtual Tour cursor + interaction (per client direction)

Precise behavior — this replaces any "×" close button described elsewhere in Sec 10:

1. **On aerial:** default cursor. Hovering a hotspot pill changes cursor to `pointer`. Click enters that room.
2. **Room enter transition:** a **500ms radial curtain** — a soft dark overlay contracts inward from the viewport edges toward the room center as the room video fades up. GSAP timeline: video opacity `0 → 1` and a masked overlay `clip-path` contracts from full-viewport to point-center. Poster still (from `IMG C1/C2/C3`) shows during the ~200ms until the video reaches `canplaythrough`.
3. **Inside a room:** the cursor becomes a custom **`×` close cursor** — a small circle with a copper × inside, ~40×40px, following the pointer via `requestAnimationFrame`. Default cursor hidden (`cursor: none` on the room stage). The intent is unambiguous: *anywhere you click, you leave.*
4. **Click anywhere in the room stage:** returns to the aerial. 400ms reverse curtain (video fades to 0, aerial fades in beneath).
5. **Videos play once, do not loop.** When Video 5/6/7 reaches its final frame, it holds there (`onEnded` calls `.pause()`). No timeout, no auto-return — user is in control.
6. **Ken-Burns stills (Powder / Terrace / Cellar):** same behavior as videos — the image pushes in over 10s, then holds. Click anywhere returns to aerial.
7. **Keyboard:** `Esc` also returns to aerial. `Tab` moves focus between the 6 hotspot pills on the aerial. `Enter` opens the focused room.
8. **Touch:** custom cursor is not shown. A small floating `×` close-chip sits top-right of the room view. Tap-anywhere still returns.
9. **Screen readers:** each hotspot pill has `aria-label="Enter [Room name]"`. The room stage is `role="dialog"` with `aria-modal="true"` and `aria-label="[Room name] tour view"`. Focus moves to the room stage on enter and returns to the triggering hotspot on close.

### 7.8 URL / state persistence

- **Main scroll journey:** no URL routing; refresh returns to top of page (standard).
- **Contact modal:** opens on `/?contact=1`, closable via `×` returns to `/`. Shareable link works.
- **Virtual Tour rooms:** each room opens on a hash — `#tour/living`, `#tour/kitchen`, `#tour/bedroom`, `#tour/powder`, `#tour/terrace`, `#tour/cellar`. Shareable. Closing removes the hash.
- **Menu panel:** ephemeral, no URL state.

### 7.9 SEO / metadata

- `<title>` — `Karst — Interior Design Studio`
- `<meta name="description">` — the manifesto sub-line: *"We design homes for the people who actually live in them — thoughtfully, materially, and with no visible seams."*
- `og:image` — a bright frame of `Video 1` (the hallway with the arched window), 1200×630. Store as `/public/og/home.jpg`.
- `twitter:card` = `summary_large_image`, `twitter:image` = same as OG.
- JSON-LD: `Organization` schema with name, url, logo (`IMG D2` as PNG), address per BUILD-SPEC §14 Deliverables.
- Sitemap includes `/` with priority 1.0; the tour-room hashes are NOT in the sitemap (client-side state, not routes).

### 7.10 Analytics

Per BUILD-SPEC §12: **`@vercel/analytics` + `@vercel/speed-insights`** (zero-config, no cookie needed).

Custom events for this page:

| Event | When | Props |
|---|---|---|
| `home_hero_reached` | Sec 1 enters view | — |
| `manifesto_reached` | Sec 2 enters view | — |
| `phase_reached` | Each Sec 4–8 enters view | `phase_name` |
| `hotspot_opened` | Any hotspot pill expands to card | `hotspot_name`, `phase_name` |
| `tour_room_opened` | User enters a tour room | `room_name` |
| `tour_room_duration_ms` | On tour room close | `room_name`, `duration_ms` |
| `menu_opened` | Menu panel click | — |
| `contact_modal_opened` | Contact CTA click | `source` (menu / tour / phase) |
| `contact_form_submitted` | On successful submit | `project_type`, `timeline` |

All events via `@vercel/analytics`'s `track()` — no PII, no free-text content.

### 7.11 CMS — Sanity content model for the home page

Per BUILD-SPEC §12: **Sanity** (free tier), assets pipeline for images, embedded Studio at `/studio`.

Home-page-specific documents:

```typescript
// sanity/schemas/homePage.ts — singleton
{
  name: 'homePage', type: 'document',
  fields: [
    { name: 'intro', type: 'object', fields: [
      { name: 'wordmarkImage', type: 'image' },         // IMG D2
      { name: 'tagline', type: 'string' },              // "Interior Design Studio"
      { name: 'enterButtonLabel', type: 'string' },     // "Enter"
      { name: 'backgroundImage', type: 'image' },       // IMG D1
    ]},
    { name: 'hero', type: 'object', fields: [
      { name: 'headline', type: 'string' },             // "ROOMS THAT HOLD THE DAY."
      { name: 'subline', type: 'text' },                // 20px body copy
      { name: 'heroVideo', type: 'file' },              // Video 1 (mp4 + webm)
      { name: 'heroVideoPoster', type: 'image' },
    ]},
    { name: 'manifesto', type: 'array', of: [{ type: 'text' }] }, // ordered paragraphs
    { name: 'transitionHeadline', type: 'string' },     // "BEGIN A HOME WITH US"
    { name: 'transitionSubline', type: 'string' },
    { name: 'phases', type: 'array', of: [{ type: 'phase' }], validation: r => r.length(5) },
    { name: 'tour', type: 'object', fields: [
      { name: 'introChip', type: 'string' },            // "TAKE A TOUR"
      { name: 'introHeadline', type: 'string' },
      { name: 'introBody', type: 'text' },
      { name: 'aerialImage', type: 'image' },           // daytime hero, IMG B3 daytime variant
      { name: 'rooms', type: 'array', of: [{ type: 'tourRoom' }], validation: r => r.length(6) },
    ]},
    { name: 'contactModal', type: 'object', fields: [
      { name: 'heading', type: 'string' },
      { name: 'subline', type: 'text' },
      { name: 'confirmationMessage', type: 'text' },
      { name: 'backgroundImage', type: 'image' },       // IMG D3
    ]},
  ],
}

// sanity/schemas/phase.ts
{
  name: 'phase',
  fields: [
    { name: 'number', type: 'number', validation: r => r.min(1).max(5) },
    { name: 'name', type: 'string' },                   // "Listen", "Sketch", ...
    { name: 'introBody', type: 'text' },
    { name: 'backgroundVideo', type: 'file' },          // Video 2/3/4 (dioramas only)
    { name: 'backgroundVideoPoster', type: 'image' },   // IMG B1/B2/B3
    { name: 'subScenes', type: 'array', of: [{ type: 'subScene' }] },
    { name: 'endOfPhaseCard', type: 'object', optional: true, fields: [
      { name: 'heading', type: 'string' },
      { name: 'body', type: 'text' },
      { name: 'ctaLabel', type: 'string' },
      { name: 'ctaLinkedProject', type: 'reference', to: [{ type: 'project' }] },
    ]},
  ],
}

// sanity/schemas/subScene.ts
{
  name: 'subScene',
  fields: [
    { name: 'stepLabel', type: 'string' },              // "STEP 01"
    { name: 'stepDescription', type: 'text' },
    { name: 'hotspots', type: 'array', of: [{ type: 'hotspot' }] },
  ],
}

// sanity/schemas/hotspot.ts
{
  name: 'hotspot',
  fields: [
    { name: 'label', type: 'string' },                  // "Orientation & Light"
    { name: 'description', type: 'text' },
    { name: 'cardImage', type: 'image' },               // crop of IMG B1
    { name: 'position', type: 'object', fields: [
      { name: 'xPct', type: 'number' },                 // 0–100
      { name: 'yPct', type: 'number' },                 // 0–100
    ]},
  ],
}

// sanity/schemas/tourRoom.ts
{
  name: 'tourRoom',
  fields: [
    { name: 'slug', type: 'slug' },                     // "living", "kitchen"...
    { name: 'name', type: 'string' },                   // "Living Room"
    { name: 'thumbnail', type: 'image' },               // IMG C1–C6
    { name: 'reveal', type: 'string', options: {
        list: ['video', 'kenBurnsStill']
    }},
    { name: 'revealVideo', type: 'file', hidden: ({ parent }) => parent?.reveal !== 'video' },
    { name: 'revealImage', type: 'image', hidden: ({ parent }) => parent?.reveal !== 'kenBurnsStill' },
    { name: 'description', type: 'text' },
    { name: 'aerialPosition', type: 'object', fields: [
      { name: 'xPct', type: 'number' },
      { name: 'yPct', type: 'number' },
    ]},
  ],
}
```

All strings and body copy live in Sanity — the client can update wording without a developer. Motion tokens, section layout, and typography scale remain in code.

### 7.12 Performance floor

Per BUILD-SPEC §13 (4G-mobile targets):

- **LCP** ≤ 2.5s (measured against the hero video poster, not the video itself)
- **CLS** < 0.1
- **INP** < 200ms
- **Initial page weight** (above-fold + Sec 1) ≤ 2.5 MB
- **Whole-page weight** (Video 1 loaded eagerly; Video 2/3/4 as metadata-only; Video 5/6/7 not loaded) ≤ 6 MB

Enforcement:

- Every video preloaded per §7.4 schedule.
- Sections 4–10 code-split; hydrated on IntersectionObserver.
- Sanity images: AVIF with WebP fallback, `srcset` widths 400/800/1200/1600/2400, `loading="lazy"` on everything below Sec 1.
- Font strategy per BUILD-SPEC §2 row 6 (`next/font/local`, subset, preload display + body).

### 7.13 Accessibility summary

Per BUILD-SPEC §14 (WCAG AA baseline). Home-page-specific additions:

- Every hotspot pill: `<button aria-label="Open [hotspot name] details">`.
- Every phase intro heading uses `<h2>`; sub-scene headings `<h3>`.
- Copper Fill: text is fully readable to screen readers regardless of visual state (per-character spans are NOT `aria-hidden`).
- Skip link at top of body: `<a href="#main-content" class="sr-only">Skip to main content</a>`.
- Video captions: none required (no dialogue), but each background video has an `aria-label` describing what's shown.
- Contact modal: native `<dialog>` for free focus trap + Esc dismissal.
- Contrast: **`--gray-faded` has been darkened to `#7A7261`** (from the earlier `#B0A99A`) so the "not-yet-read" text meets WCAG AA 4.5:1 on `--page`. Copper leading edge and final ink already pass.
