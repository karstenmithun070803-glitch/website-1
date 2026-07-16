# Reference Website Breakdown — NRG "Build Your Data Center"
### Reframed for an Elevated Interior Design Studio

> **Source:** `Actual website reference.mov` — 2940×1664 @ 60fps, 3:12 duration, 96 sampled frames + targeted deep-dive extractions
> **Interaction model:** Scroll-driven page journey with click-driven hotspots inside the "Virtual Tour" section. Uses the browser's system cursor (no custom cursor glyph).
> **Positioning brief:** Elevated, editorial, quietly confident interior design studio — timeless materials, fresh curation, high-end residential + hospitality caliber.

---

## Table of Contents
1. [Global Visual Language](#1-global-visual-language)
2. [Section Map (11 sections)](#2-section-map)
3. **DELIVERABLE 1 — Video Generation Prompts** (7 videos)
4. **DELIVERABLE 2 — Image Generation Prompts** (~28 images)
5. **DELIVERABLE 3 — Frame-by-Frame Scroll Walkthrough**

---

## 1. Global Visual Language

### Color palette (reference site → studio adaptation)
| Role | Reference (NRG) | Interior studio adaptation |
|---|---|---|
| Page background | `#F5F3EA` warm off-white | `#F1EDE4` "unbleached linen" |
| Ink / body text | `#1E1E1E` near-black | `#181613` deep espresso |
| Intro modal bg | `#231C21` desaturated aubergine | `#1A1614` roasted oak |
| Primary accent | `#F0B12F` construction-safety yellow | `#B87333` aged copper / raw brass |
| Secondary accent | `#43C56B` construction-green (progress pills) | `#3E4A3F` deep sage (progress pills) |
| Cool highlight | `#4EE0D6` cyan (overlays on diorama) | `#7A9E9F` washed teal (overlays) |
| Muted UI | `#B9B4A7` warm gray (faded text) | `#B0A99A` warm gray |

Keep the *structural* two-tone system (dark ink + one warm accent), but swap yellow → aged copper/brass so it reads "atelier" instead of "site foreman."

### Typography (reference → studio)
- **Display headline** — heavy sans, all-caps, condensed weight (~110-160px on desktop): `DATA DRIVES OUR WORLD.` → keep the same weight/scale rhythm but switch family to something more editorial. Suggestions: *Söhne Breit*, *National 2 Condensed Bold*, or *Reckless Neue Heavy* (mix a display serif for even more atelier feel).
- **Body sans** — geometric humanist, ~18-20px, +0.005em tracking: keep as-is (Inter / Söhne / Neue Haas Grotesk).
- **UI micro-caps** — 11px, +0.06em tracking, all-caps: `EXPLORE`, `TAKE A TOUR`, `PHASE 1`, `STEP 01` badges.
- **Hotspot label** — pill-shaped chip, ~13px medium, warm-ink on cream fill.

### Layout / spacing
- Content max-width ≈ 1440px, breathes into full-bleed for diorama sections.
- **Two-tone grid**: hero + phase-intro + "explore" sections are single-column full-width; the "Site Development" section is split 50/50 (text left, tall image column right); "Power Ramp-up" is a horizontal-scroll 5-card carousel.
- Vertical rhythm is generous — sections are 100vh minimum, some are 2-3× viewport tall for scroll storytelling.
- Every diorama section has **sticky pin-scroll**: the 3D scene stays fixed while text/callouts animate through it.

### Motion character (measured from the recording)
- **Section title yellow-fill** — signature animation. As you scroll into a section, the section headline fills character-by-character from left to right: starts as pale gray, passes through yellow at the "wet leading edge," lands as dark ink. Estimated linear-ish spread over ~40% of a viewport's scroll (~600-900ms if scroll is smooth). Feels like a highlighter being drawn across the word. `cubic-bezier(0.65, 0, 0.35, 1)`.
- **Hotspot pill hover → open** — pill morphs to rounded rectangle card, image inside fades in from soft blur, ~350ms `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Hero video slide-up** — the video card enters from below hero copy, rises + scales to full-bleed as user scrolls (`transform: scale(1 → 1.02) translateY(20% → 0)`), roughly 700-900ms of scroll.
- **Diorama camera moves** — the 3D scene has 4-6 discrete "camera positions" per phase; scroll advances between them with a smooth crossfade/dolly (~1.2s equivalent), not a hard cut. The rendering is pre-baked video, not runtime 3D.
- **Overlay reveal on diorama** — cyan wireframe / infrastructure overlays fade in over the base render at ~50% opacity, then labels pop with a soft `scale(0.85 → 1)` + fade-in stagger of ~80ms per label.
- **"Scroll to Phase N" button** — starts as a small outlined pill bottom-right; on hover it fills green and expands right to reveal the mouse-icon; ~200ms.
- **Menu open** — top-right "Menu =" pill click opens a floating panel (~340px wide) with 6 phase items + a "Get in Touch" button; slides down + fades from the pill origin, ~250ms.
- **Modal (Contact form)** — full-screen dim underlay + centered white sheet with a green top-border accent; slides up from 40px below with a fade, ~300ms `cubic-bezier(0.22, 1, 0.36, 1)`.

### Persistent chrome
- **Top-left** — `nrg.` wordmark + small confetti-dot cluster + tagline `Build Your Data Center`. (Studio version: `[studio wordmark]` + tagline like `Interior Design Studio` or the studio's positioning line.)
- **Top-right** — pill button. Changes state through the scroll:
  - Initial: `Menu =`
  - After hero: `[phase-badge] [Section Name] =` where the phase-badge is a small colored dot with the phase number
  - Late in page: `[phone-icon] Get in Touch =` (green filled state)
- **Bottom-right transient buttons** — the "Scroll to Phase N" indicator that appears at the end of each phase.
- **Bottom-left** — `[mouse icon] Scroll to explore` micro-copy that fades in on new sections.

---

## 2. Section Map

| # | Section | ~Time | Interaction | Purpose in adapted studio site |
|---|---|---|---|---|
| 0 | Intro modal ("Enter Site") | 0-2s | Click | Brand splash; sets the mood |
| 1 | Hero — "DATA DRIVES OUR WORLD." + hero video | 2-14s | Scroll | Manifesto + hero film |
| 2 | Manifesto text over hero video (yellow-fill) | 14-24s | Scroll | Positioning statement |
| 3 | "START BUILDING WITH US" transition | 24-30s | Scroll | Ushering into the process |
| 4 | Phase 1 — "SITE EVALUATION" (3D diorama) | 30-58s | Scroll + hotspot click | Discovery / consultation phase |
| 5 | Phase 2 — "SITE DEVELOPMENT" (split editorial) | 58-98s | Scroll | Design development phase |
| 6 | Phase 3 — "CONSTRUCTION" (top-down diorama) | 98-124s | Scroll + hotspot click | Build / execution phase |
| 7 | Phase 4 — "POWER RAMP-UP" (horizontal cards) | 124-140s | Scroll (H) | Handover / soft-open phase |
| 8 | Phase 5 — "FULLY OPERATIONAL" (glowing diorama) | 140-152s | Scroll | Finished project |
| 9 | Virtual Tour — "EXPLORE YOUR DATA CENTER" | 152-176s | Click hotspots | Interactive project walkthrough |
| 10 | Global Menu + Contact modal | 176-192s | Click | Nav + lead capture |

For the interior studio adaptation these become the studio's **process journey** — from first site visit → concept → detailed design → construction admin → styling → completed project → virtual walkthrough of a finished home.

---

# DELIVERABLE 1 — Video Generation Prompts

Seven video assets are required. All prompts are **tool-agnostic** (Sora, Runway Gen-3/4, Veo 3, Kling, Luma Dream Machine, Pika). Style anchors: cinematic, editorial, quiet, elevated — think a Vincent Van Duysen documentary shot on Arri Alexa, not a real-estate walkthrough.

**Global style DNA to prepend/append to every prompt:**
> Shot on Arri Alexa 65 with anamorphic lenses, shallow depth of field, 24fps cinematic motion, natural window light with warm 3200K practicals, dust-motes visible in shafts of sunlight, subtle film grain, muted "quiet luxury" color grade — desaturated warm neutrals (linen, oat, plaster, oak, aged brass, deep espresso), no oversaturated colors, no lens flares, no CGI-look, feels like a documentary short about craft. Aspect ratio 16:9, seamless loop-friendly.

---

### VIDEO 1 — Hero film (site's centerpiece film)
**Reference role:** The full-bleed dark server-room dolly that anchors the hero and hosts the manifesto text overlay.
**Duration:** 10-12 seconds, loop-friendly.
**Aspect:** 16:9.

> A slow, meditative dolly-in through a beautifully proportioned residential hallway at golden hour. Warm cream lime-washed walls on both sides, wide-plank white oak flooring underfoot, honeycomb of soft ceiling coves overhead washing indirect light down the corridor. At the far end, a single tall arched window admits a slab of dust-flecked amber sunlight that falls across the floor. Along the hallway: a sculptural console table with a hand-thrown ceramic vessel, a single overscale ficus branch in a raw brass vase, and a large abstract linen canvas hung at gallery height. Camera moves with the slow, exact patience of a Sofia Coppola tracking shot — approximately 1 meter per second forward, no shake, no swivel. As the camera nears the window the frame darkens slightly around the edges and the arched window blooms. Reads as reverent, quiet, expensive. No people. No text. No branding. 10 seconds.

---

### VIDEO 2 — Phase 1 diorama ("Discovery / Site Visit")
**Reference role:** The green miniature landscape with contour lines, aerial camera moves, cyan wireframe infrastructure overlays.
**Duration:** 8-second seamless loop.

> A high-angle "tilt-shift miniature" scene of a lush residential plot, rendered as if a hand-crafted architectural model. The plot is a manicured coastal lawn with olive trees, a low limestone garden wall, a natural pool cut into the terrain, and mown paths in concentric contour lines. Materials read like felted paper and cast plaster — landscape architects' model, not photoreal. The camera performs a slow orbit-right of about 15 degrees around the plot's center over 8 seconds — buttery, no jitter — while a soft translucent teal "site boundary" polygon breathes gently over the plot at 30% opacity (barely visible, like an architect's overlay). Faint white "GPS pin" markers glow softly at three points (kitchen, master suite, garden pavilion) with a slow inhale-exhale. Lighting: overcast Mediterranean morning, cool but warm-tinted, no harsh shadows. No text, no UI, no people. Loops seamlessly.

---

### VIDEO 3 — Phase 3 diorama ("Construction / Build")
**Reference role:** The overhead top-down aerial of the miniature construction site with tiny cranes, materials stacks, foundation excavations.
**Duration:** 10-second loop.

> A slow top-down "table-top diorama" of a residential build in progress, styled like an architectural firm's presentation model. The site is a compacted-earth pad the color of terracotta, dotted with tiny hand-made model elements: neat stacks of miniature oak floorboards, coiled brass conduit, marble slabs on pallets, a scaffolded pool cavity lined with a chalky underlayer, a small yellow tower crane, and three or four white-clay figurine workers frozen mid-task. Around the pad, a lawn of felted moss and lichen-clumps stands in for planting. Camera performs a gentle top-down descent from 200% to 105% zoom over 10 seconds, so more detail is revealed as the frame fills. Warm afternoon light rakes in from camera-left casting long soft shadows. Feels like a Wes-Anderson-meets-Herzog & de Meuron model shoot. No text, no UI. Loops.

---

### VIDEO 4 — Phase 5 diorama ("Fully Operational / Home Alive")
**Reference role:** The finished data center with cyan holographic "power flowing" overlays and glowing building blocks.
**Duration:** 8-second loop.

> The same residential diorama from Video 3 but now complete and inhabited at civil twilight. Warm interior lights glow from windows and skylights of the miniature house, throwing soft amber squares onto the surrounding lawn. A gentle teal-white shimmer flows along garden pathways (like a "life-in-the-home" heat map) at 25% opacity, drifting slowly from front-door to kitchen to master bedroom to pool. The sky above the diorama is a dusk gradient from petrol-blue to warm peach. Camera is a slow static-orbit-right of about 8 degrees over 8 seconds. Rendered in the same crafted model style — plaster and felted textures — with the subtle glow layer keyed on top. No people, no text. Loops seamlessly.

---

### VIDEO 5 — Virtual Tour room #1 ("Living Room" — replaces Control Room)
**Reference role:** The interior "control room" scene with beige clay figurine + gauge-covered walls, used as the first tour hotspot.
**Duration:** 12-second slow reveal.

> Interior of a serene modern-heirloom living room at magazine-cover moment. Wide-plank oak floors, low limewash walls in bone-white, a sculptural boucle sofa in oat, a fluted stone coffee table, one Isamu Noguchi Akari lantern glowing at low warmth, a Pierre Jeanneret rope-chair in the corner, a large tan abstract painting above a smoked-oak console, and a single tall ficus by an arched window admitting late-afternoon light. Room styled by an obsessive editor — nothing extra, every object placed with intent. Camera starts on a tight detail of the coffee table (a hand-thrown ceramic bowl catching light) then pulls back and rises over 12 seconds to a wide 3/4 revealing the full room. Motion is dolly-and-boom, smooth and slow. Dust motes drift through the light shaft. No people. No text.

---

### VIDEO 6 — Virtual Tour room #2 ("Kitchen" — replaces HVAC / Cooling Systems)
**Reference role:** The miniature diorama of cooling systems with rows of AC units, used as the second tour hotspot.
**Duration:** 10-second loop.

> Interior of a chef's kitchen — dark, moody, sculptural. Book-matched Calacatta Viola marble island (2.4m long) that glows under two brass pendant lights, hand-plastered black-brown walls, brushed brass tap over an integrated single-basin sink, a row of open shelves in smoked walnut holding earthenware, and a fluted glass cabinet at the far end backlit warmly. A single bunch of dark cherries sits on the marble. Late afternoon light rakes in through a tall picture window camera-right. Camera performs a slow lateral truck from left to right over 10 seconds, revealing the island's full length. Materials read expensive but restrained — no bling, no chrome. Reads as "quietly ambitious." No people, no text, seamless loop.

---

### VIDEO 7 — Virtual Tour room #3 ("Bedroom Suite" — replaces Server Hall)
**Reference role:** The long tracking shot through the illuminated server-hall aisle, used as another tour hotspot.
**Duration:** 12-second dolly.

> A slow forward dolly through a Belgian-modernist bedroom suite at first light. Camera pushes down the axis from the hallway threshold into the room. Wide flush-mounted white oak doors at frame-right, a large linen-upholstered platform bed with rumpled ivory sheets ahead, a single pendant lamp with a paper drum shade hanging from a raw beam, floor-to-ceiling limewashed walls, a monk's-cloth curtain half-drawn across a full-height window flooding cool morning light onto the oak floor. On the bedside: one book, one clay mug, a small ceramic lamp glowing. Camera moves with millimetric slowness — approximately 30cm per second — with tremendous depth of field early that resolves to sharp as the camera reaches the foot of the bed. Feels sacred, hushed, sunday-morning. No people, no text. 12 seconds.

---

# DELIVERABLE 2 — Image Generation Prompts

The reference site uses images in **three distinct visual modes** — I'm keeping the modes and translating the subject matter to interior design.

**Global style DNA to prepend/append to every image prompt:**
> Editorial interior photography in the style of Frédéric Ducout / François Halard / Simon Watson — natural window light, muted "quiet luxury" palette (linen, oat, plaster, walnut, aged brass, deep espresso), shot on medium format film-look, subtle grain, deep true blacks, no oversaturation, feels like an unretouched *Cabana Magazine* / *Apartamento* / *T Magazine* interiors story. No people unless specified. 16:9 landscape unless noted.

### MODE A — Editorial "still-life with ceramic figurine" (replaces the porcelain-worker photos from Phase 2)

These sit in a two-column layout, portrait 3:4 orientation, alongside body copy. Six images total in this mode.

#### IMG A1 — "Consultation" (replaces the two clay figurines with tablet in park)
> A tight vignette on a linen-covered console: two hand-cast unglazed white porcelain figurines (about 15cm tall, faceless in the Giacometti vein, mid-gesture as if in conversation), between them a rolled architectural drawing tied with jute twine, a graphite pencil, and a raw brass folding rule. Shot from a low 3/4 angle. Background: warmly out-of-focus interior — a suggestion of a sunlit window and a tall potted olive tree at the edge of the frame. Soft golden-hour light rakes across the objects. 3:4 portrait.

#### IMG A2 — "Blueprints" (replaces the blueprint-in-hands photo)
> The same white porcelain figurines holding open a large architectural blueprint printed on ivory paper (a floor plan visible: living room, kitchen, bedrooms, faintly). One figurine holds the top corners, the other the bottom. The blueprint has soft creases, drawn in a fine warm-terracotta line rather than blue. Background out-of-focus with a suggestion of an outdoor garden pavilion. Sunlight from behind, backlighting the paper so the plan reads translucent. 3:4 portrait.

#### IMG A3 — "Material palette" (replaces the stacked pallets close-up)
> Close-up macro of a hand-arranged material board on a lime-plastered table: layered rectangles of natural stone (a slice of travertine, one of Calacatta Viola marble, one of green Verde Guatemala), draped over them a swatch of oatmeal linen, a swatch of raw walnut veneer, a small hand-thrown bisque ceramic tile, and a fingertip-sized ingot of aged brass. Everything catalogued as if by a curator. Warm side-light from a north-facing window. Shallow DOF, top swatches slightly out of focus. 3:4 portrait.

#### IMG A4 — "Model handover" (replaces the "worker with plans + model" photo)
> Two white porcelain figurines standing at a low workbench. On the bench sits a beautiful architectural model of a home — pale basswood walls, tiny frosted acrylic windows, a felted moss garden. One figurine leans over the model with a fine brush, the other holds a tiny magnifier. Very shallow DOF on the model. Green blurred garden foliage in the far background. Studio light through a translucent scrim, slightly cool morning. 3:4 portrait.

#### IMG A5 — "Blueprint detail on tablet" (replaces the tablet-with-blueprint photo)
> Extreme close-up of a small tablet held in porcelain figurine hands. On the tablet screen: a beautifully drawn elevation of a doorway with millimetric dimensions in a fine warm gray. Around the tablet on the surface: sample chips (a bronze door pull, an unlacquered brass cabinet knob, a small square of Belgian bluestone). Softly out-of-focus interior room in background. 3:4 portrait.

#### IMG A6 — "Furniture reference" (replaces the "worker installing panel" photo)
> A white porcelain figurine bending over a low table on which sit three miniature 1:20-scale furniture models: a boucle armchair, a marble side table, and a floor lamp. The figurine appears to be arranging them into a small room composition. Warm plaster wall in the background, slightly out of focus. 3:4 portrait.

---

### MODE B — Full-bleed diorama stills (the 3D miniature landscape / building scenes)

The reference site's dioramas are pre-rendered 3D video, but if you want static poster stills for social/OG/preview cards or for the diorama fallback state, generate these:

#### IMG B1 — Phase 1 diorama still ("The Plot")
> A tilt-shift aerial photograph of a hand-crafted architectural model of a residential plot. Manicured lawn in felted moss and lichen, contour lines cut into the terrain with a fine scalpel, three olive tree models, a natural-pool cavity, a low limestone garden wall. Backdrop of miniature trees fading into soft focus. Warm morning light from camera-left casting long soft shadows. Feels like a museum-quality model, not a render. 16:9, top-down 45° angle.

#### IMG B2 — Phase 3 diorama still ("The Build")
> Top-down architectural model of a home mid-construction. Warm compacted-earth pad, stacks of miniature oak flooring, marble slabs on pallets, a scaffolded pool cavity, one small tower crane, three white clay figurine workers, coiled brass conduit. Grass and trees around the perimeter. Rendered as museum-model, felted textures, matte surfaces. 16:9, straight top-down.

#### IMG B3 — Phase 5 diorama still ("The Home Complete")
> Same residential architectural model at civil twilight. Warm interior lights glowing from tiny windows, a serene pool lit from below, soft teal-white "life-flow" traces along garden paths at low opacity. Twilight sky gradient above. Model detailing crisp — plaster, felt, basswood, brass. 16:9, 30° aerial.

---

### MODE C — Virtual-tour room stills / hotspot preview thumbnails

Small square (1:1) or 4:3 tiles used inside the hotspot cards. Six needed:

#### IMG C1 — Living Room thumbnail (replaces Control Room)
> Editorial interior photograph of a serene modern-heirloom living room. Boucle oat sofa, fluted stone coffee table with hand-thrown ceramic bowl, single Noguchi Akari lantern, tan abstract painting above a smoked-oak console, tall ficus by an arched window. Late-afternoon light. Cabana-magazine mood. Square 1:1.

#### IMG C2 — Kitchen thumbnail (replaces HVAC / Cooling Systems)
> Editorial interior photograph of a Calacatta Viola marble island in a moody chef's kitchen, brass pendant lights, hand-plastered dark walls, brushed brass tap, smoked walnut open shelves. Cherries on the marble. Late-afternoon rake light from window. 1:1.

#### IMG C3 — Bedroom thumbnail (replaces Server Hall)
> Editorial interior photograph of a Belgian-modernist bedroom suite. Linen-upholstered platform bed with ivory sheets, paper-drum pendant, limewashed walls, oak floor, monk's-cloth curtain. First-light. 1:1.

#### IMG C4 — Powder Room thumbnail (replaces Security / Data Center)
> A small jewel-box bathroom. One large slab of book-matched green marble as the counter, unlacquered brass tap, small circular fluted mirror, a single beeswax pillar candle burning. Wall lit by a single ribbed-glass sconce. 1:1.

#### IMG C5 — Garden Terrace thumbnail (replaces Sustainability / Water Processing)
> An outdoor stone terrace with a raw travertine dining table, four bentwood chairs, a linen umbrella half-open, terracotta olive-tree pots. Late afternoon Mediterranean light. 1:1.

#### IMG C6 — Wine Cellar / Cellar Bar thumbnail (replaces Battery Systems)
> A dim intimate wine cellar with vaulted brick-arched ceiling, warm brass sconces, rack of vintage bottles, a small marble tasting counter with two crystal coupes. Amber warmth. 1:1.

---

### MODE D — Special / one-off assets

#### IMG D1 — Intro modal background (subtle noise/texture)
> A very dark, warmly toned near-black canvas with the barest suggestion of hand-plastered wall texture. Slight vignette. No subject. Feels like the wall of a Vincent Van Duysen entryway before you step in. 16:9.

#### IMG D2 — Studio wordmark / logotype icon (replaces `nrg.` confetti dot cluster)
> A minimal geometric mark: 6 small warm-copper squares of varying sizes arranged in a loose diamond cluster, feels handmade like typesetter's confetti. Transparent background. Vector-ready. 200×200.

#### IMG D3 — Contact-modal ambient background image
> An out-of-focus interior scene: warm cream wall, a suggestion of a bronze pendant lamp, a bough of eucalyptus in a stone vase. Extremely shallow DOF, dreamlike, low contrast. 16:9.

---

# DELIVERABLE 3 — Frame-by-Frame Scroll Walkthrough

> Every element, every animation, every timing. Read this and you can rebuild the scroll journey.

## 00:00-00:02 · INTRO MODAL

**Layout:** Full viewport, background `#231C21` (near-black warm aubergine). Centered horizontally in the upper-middle third of the screen:
- **Logo unit** (~78% down the vertical center): `nrg.` in white, ~44px heavy sans, followed by a small 6-dot confetti cluster (pink/purple/green pixels), and to its right the tagline `Build Your Data Center` in white ~28px medium — vertically stacked as two lines *"Build Your"* / *"Data Center"*.
- **Enter Site button** (30px below): pill-shaped, ~140×48px, filled saturated safety yellow `#F0B12F`, label `Enter Site` in near-black `~15px` medium.
- **Footer** (bottom right, tiny ~11px, warm gray): `Privacy Rights & Requests · Legal · Energy Policy · Code of Conduct · Suppliers` + `©2026 NRG Energy, Inc. All Rights Reserved`.
- **Cursor** — small default arrow visible, no custom cursor.

**Motion:** Static until click. At ~00:02 the cursor moves onto `Enter Site`; on click the button briefly darkens to `#7A5C1A` (pressed state), the modal fades opacity 100 → 0 over ~200ms as the page below slides into view (the cream-white body page reveals from below as the dark modal fades). Behind the fade, a horizontal division line is visible where the modal's bottom edge sits above the beginning of the light page — this hints the "modal" is actually a full-viewport section pinned above the body content.

---

## 00:02-00:14 · HERO — "DATA DRIVES OUR WORLD."

**Layout:** Cream `#F5F3EA` background. Header bar top:
- **Top-left**: same `nrg.✳` mark + `Build Your Data Center` tagline, but at ~24px (scaled down and pinned).
- **Top-right**: white pill button ~110×40px reading `Menu =` (an equals-sign hamburger).

**Hero headline** (top-left content area, ~120px from top):
- Two-line all-caps display sans, weight ~900, ~140px, tight leading (~0.95), color `#181613`:
  ```
  DATA DRIVES
  OUR WORLD.
  ```
- The final period `.` is followed by nothing else on the line.

**Right column mid-hero** (~44% down from top): a body paragraph in warm dark gray, 2 lines, ~20px medium:
> *"We're powering the data centers that support a brighter tomorrow."*

**Bottom-left transient**: small mouse-glyph icon + micro-caps `Scroll to explore` (~11px, positive tracking).

**Hero video card** (starts around ~00:07 in the recording): a full-bleed dark rectangular video appears sliding up from below the fold — a dolly through a server aisle (dark, blue-toned, warm ceiling lights, receding perspective). It enters the viewport and, as scroll continues, expands to fill the width and takes over the viewport.

**Key sub-animation — the headline yellow-fill**: at frame ~04 in the deep-dive (~00:04.75), the word `WORLD.` is caught mid-morph: the last three letters `RLD` are *filled yellow*, while the letters before them are already ink-dark and letters after fade to gray. This is the site's signature — a scroll-linked color sweep that moves left-to-right across the headline word as you approach it. Duration equivalent ≈ 500-700ms of smooth scroll. Easing: near-linear with a soft in-out (~`cubic-bezier(0.65, 0, 0.35, 1)`).

---

## 00:14-00:24 · MANIFESTO OVER HERO VIDEO

The hero video is now full-viewport. It stays sticky (pin-scrolls) while text animates over it.

**Left column** (persistent, dark-friendly): micro-caps stack `Explore Our` / `Build Process` in a subdued dim-white ~13px, positive tracking.

**Right column** (the manifesto — the yellow-fill happens here in slow motion):
- First paragraph (large, all-caps mixed with mixed-case, ~48px medium, near-white):
  > *"◆ Bring Your Own Power (BYOP) for data centers with NRG — built to deliver speed, reliability, and predictable costs at scale."*
  Prefix `◆` is a small diamond in yellow.
- Second paragraph (~40px, appears below as you scroll further):
  > *"From land to ramp-up and backup power to retail supply, NRG powers every step."*

**The yellow fill on both paragraphs** — every character starts as ~30% opacity light-gray, passes through saturated yellow at the leading edge of the scroll position, then lands white. The fill is character-word-line based. At any scroll position you see three zones simultaneously: **ahead** (gray/faded), **at** (yellow), **past** (white/dark ink). This gives the whole passage a "highlighter" reading feel.

The word `BYOP` (in parens) and later punctuation tokens (`—`) all remain white after the pass. `speed`, `reliability`, `predictable costs`, and `ramp-up`, `backup power`, `retail` catch the yellow leading edge at different scroll depths — reads as an emphasis system.

---

## 00:24-00:30 · "START BUILDING WITH US" TRANSITION

Hero video is still pinned, now with the transitional headline overlaid center-left:
- Massive display all-caps, three lines, ~140px, near-white on dark video:
  ```
  START
  BUILDING
  WITH US
  ```
- The final word `US` has the same yellow-morph: `U` is already ink, `S` is yellow — the fill is passing through in real time. The letter `g` of `BUILDING` and the letter `U` of `US` are captured at slightly different fill states across frames.

**Bottom-left**: micro `See our strategy come together in five simple phases.` — ~18px light-white.

**Bottom-right** (new transient CTA): a green pill button `[mouse-icon] Scroll to Phase 1` ~230×50px, background `#43C56B`, near-black text. Sits pinned bottom-right during this section.

---

## 00:30-00:58 · PHASE 1 — "SITE EVALUATION" (Green Diorama)

**Phase intro moment (frames 9, 95-96):**
Full-viewport pre-rendered aerial video of a lush green *architectural model of a landscape* — visible contour lines cut into the terrain, a river bend, model trees (little cauliflower-looking topiary clumps), all rendered in the felted paper / plaster / foam-core style. Camera is doing a slow orbit-right.

Overlay UI:
- Small `PHASE 1` micro-caps chip top-left in the content area (~90px in from left).
- Massive white display headline `SITE` / `EVALUATION` — but `EVALUATION` is captured mid-fill: only the letters `E` `V` at start have appeared, the rest are faded gray. As scroll advances, `EVALUATION` fills in left-to-right the same way — this same signature yellow-highlighter fill.
- Body copy bottom-right (~4 lines, ~22px white, dim):
  > *"In Phase 1, NRG and a data center partner review land options, existing grid access infrastructure, and environmental factors to confirm site readiness."*
- Top-right pill has now updated to `[✳ What is BYOP?]  [1] Site Evaluation =` — a *two-pill compound*: the yellow diamond "What is BYOP?" pill sits left of the green-badge phase-name pill.

**Phase 1 body scroll (frames 10-15):**
The diorama camera zooms/dolls to show the plot outlined with a soft cyan glowing polygon (site boundary). Then the camera advances closer and cyan wireframe overlays of buildings/infrastructure appear over the landscape (30-50% opacity). Three floating pill labels fade in with a soft scale bounce, staggered ~80ms:
- `[◆] Natural Gas Supply` (top-left area of the site)
- `[◆] Fiber Connection` (center)
- `[◆] Water Supply` (bottom-right)

Right side of viewport: a vertical progress-dots indicator (`|` `.` `.` — meaning "you're on section 1 of ~3 within this phase").

Bottom-right corner text `STEP 01` + step description body:
> *"Confirm essential site resources — fiber, water, and natural gas — are available."*

**Hover-to-open card (frames 13-15):** as the user hovers over `Natural Gas Supply` pill, it lifts and expands into a soft rounded-corner card (`~440×280`), white-cream fill, with:
- The chip label at top-left of the card in bold ink.
- One line of ink body copy: *"Verify reliable natural gas supply to keep data center powered."*
- Below that, an inset image showing a close-up macro of natural gas pipeline conduit stacks (miniature model style).

The card animates open with a slight opacity 0 → 1 + scale 0.95 → 1 over ~350ms. Cursor hovering off collapses it back to the pill.

Then `Fiber Connection` card opens (same treatment, image is a top-down of miniature fiber-optic pathways glowing).
Then `Water Supply` card opens (image lost to a modal transition mid-frame — user is scrolling faster).

**Phase 1 sub-scene 2 (frame 17-18):** The diorama has moved on — camera has advanced deeper, the cyan is more saturated, the whole infrastructure lit up. Labels have moved to new positions matching a further-in camera view. This is section 2 of Phase 1.

**Phase 1 sub-scene 3 (frames 19-24):** New sub-diorama, now showing the site with more building infrastructure sketched in wireframe cyan. Labels shift again:
- `[◆] Application Materials Review` (top)
- `[◆] Load Ramp Plan` (right)
- `[◆] Turbine Reservation` (center-bottom)
- `[◆] TSP & ISO Engagement` (left)

Right column: `STEP 02` + *"Start early coordination, applications, and agreements related to power needs."* Same hover-card behavior.

**Phase 1 sub-scene 4 (frames 25-29):** third sub-diorama — top-down of the site now enclosed in a wireframe cube (representing environmental / permitting review). Labels:
- `Air Permitting` / `Lower-Carbon Options` / `CCS Studies` / `Community Alignment` / `Land + Environmental Evaluation`
- Right column: `STEP 03` + *"Review land use, environmental, and community factors for site readiness."*

**End of Phase 1** (~frame 29): a "Scroll to Phase 2" green button appears bottom-right.

---

## 00:58-01:36 · PHASE 2 — "SITE DEVELOPMENT" (Editorial Split-Column)

**Phase intro (frame 30):** Full cream page. Same header. Small `PHASE 2` chip top-left, then a massive two-line black display headline:
```
SITE
DEVELOPMENT
```
The word `DEVELOPMENT` again captured mid-yellow-fill: `DEVELOPM` is dark, `ENT` is yellow/fading. Body copy bottom-right:
> *"In Phase 2, approvals and agreements are secured to establish grid connection to site."*

Top-right pill now shows `[2] Site Development =` (green badge with 2).

**Two-column scroll storytelling (frames 31-36):**

This is a *totally different* layout from the diorama phases. It's a **split-viewport pin-scroll**: the **left column** is a text well (~440px wide, holds small icon + heading + 3-line body copy) that fades one item in as you scroll. The **right column** is a full-height tall image well (~54% of viewport width, extends past the fold both directions) that transitions one photograph at a time as you scroll.

The photographs are stunning: **matte-white life-size ceramic figurines** posed like workers in a very shallow-focus green outdoor setting. Every image reads like an art object.

Left-column entries scroll in order:
1. **[icon-diamond] Site + Grid Reviews** — *"Review site power needs, grid capacity, and potential future upgrades."* — right image: **two white figurines in white shirts, one wearing a hat, both looking off-frame right, out-of-focus green foliage behind them.**
2. **[icon-stack] Load Request to TSP** — *"Submit official request with Transmission Service Provider (TSP) to connect data center to grid, including electrical drawings, MW quantities, site plans, load ramps, and proof of land access."* — right image: **two figurines holding open a large blueprint printed in cyan-blue ink** (a very well-composed hand-blueprint shot).
3. **[icon-stack] TSP Agreement + Deposit** — long body — right image: **a stack of thin blueprint sheets folded neatly on top of a lattice grille (structural model), figurine's blurred body visible behind.**
4. **[icon-stack] Long-Lead Orders** — *"NRG may pre-order long-lead equipment through TSP to prevent project delays."* — right image: **three figurines standing behind a large stack of blueprint sheets, at a workbench.**
5. **[icon-stack] Permitting + Entitlements** — heading appears faded gray (upcoming, not yet reached), body already visible.
6. **[icon-battery] BYOP Plan** — *"NRG works with data center to customize BYOP plan."* — right image: **a hand holding a small physical model card printed with a technical drawing of turbine equipment, extreme shallow DOF, image dark and moody.**
7. **[icon-battery] Full Interconnection Study** — long body — right image: **a hand holding a tablet showing a very clean line-drawing of a power tower** (the same aesthetic — matte white figurine hand cradling the device).
8. Below: **BYOP Interconnection Applications** and **BYOP Equipment Orders** headings visible faded ahead of scroll.

The **left column each entry** has: icon square (~48×48, warm-yellow filled `#F0B12F`), bold ink heading below (~28px), then 3-4 lines of warm-gray body. As you scroll, the *currently active* entry fills to ink; entries above are already ink; entries below are faded gray. Yellow appears on the currently-being-read heading (same yellow-fill signature).

**End of Phase 2 — "Bridge Power Solution" wide card (frame 37):** A full-width horizontal band cream card overlaid on top of the beginning of the Phase 3 diorama:
- Left: heading `Bridge Power Solution` (~48px black).
- Right: 3-line body *"NRG brings speed to power for data centers using a phased deployment strategy that leverages third-party bridge power solutions when grid power or necessary equipment is unavailable."* + a small dark-green pill button `Explore Bridge Power Solutions [→]`.

Below the card, the top edge of the Phase 3 diorama's earth landscape peeks in.

Bottom-right transient: green `[mouse] Scroll to Phase 3` pill button.

---

## 01:36-02:04 · PHASE 3 — "CONSTRUCTION" (Top-Down Diorama)

**Phase intro (frame 39):** Full-bleed top-down aerial of the site model with the terracotta-colored graded construction pad visible, materials stacks, one small crane. Headline overlaid center-left:
- `PHASE 3` chip.
- Display headline `CONSTRUCTION` — mid-yellow-fill visible (only faint `CONSTRUCTION` outline showing, most letters not yet filled).
- Body copy bottom-right: *"In Phase 3, data center buildings and BYOP are constructed and connected to supporting infrastructure."*

**Construction step 1 (frames 41-42):** Camera has zoomed slightly in on the diorama. Overlay labels:
- `[◆] Site Mobilization`
- `[◆] Data Hall Construction`
- `[◆] Natural Gas Infrastructure`
- `[◆] Equipment Delivery`
- `[◆] Shell Construction + Facilities`
- Body copy right-bottom: `STEP 01` + *"Coordinate interconnection, track timelines, and manage delivery of major equipment and BYOP."*

**Hover card (frame 42):** hovering `Site Mobilization` opens a card with an actual video/still preview of full-size construction cranes at a real gas turbine plant (this is the *only* place the reference site uses a real photograph inside a diorama card — the miniature model gives way to actual site footage).

**Construction step 2 (frames 43-49):** The diorama has progressed — camera pulls slightly wider and the model shows the site further along construction: more buildings, materials laid out, foundation completed. Same hotspot label array, all pill labels persist through the scroll. Then the diorama fades to the "finished" model view (frame 48-49) with all buildings complete but not yet lit — warm morning light, no glow.

Bottom-right transient: `Scroll to Phase 4` pill.

---

## 02:04-02:20 · PHASE 4 — "POWER RAMP-UP" (Horizontal Card Carousel)

**Phase intro (frame 51):** Full cream page. Headline:
```
POWER
RAMP-UP
```
No yellow fill visible in this frame — the fill has fully passed. Body copy right column:
> *"In Phase 4, grid interconnection and BYOP support load ramping as servers are installed and tested."*

**Card 01 reveal (frame 52):** Left half of viewport is a sticky full-height image well showing the beige clay figurine of an operator in a hardhat working at a wall of ceramic gauges (like a mid-century power plant control room), warm sepia lighting. Right half: introductory column with heading `01` in yellow circle, then heading `Grid Interconnection Live` and 3-line body.

**Horizontal-card carousel (frames 53-58):** The right column has become a **horizontally-scrolling series of 5 vertical cards**, each 300px wide with a thin dashed vertical divider between them. As you scroll (vertically or via horizontal transform driven by scroll), the cards translate leftward, revealing each in turn:
- `01 Grid Interconnection Live` — *"NRG, data center, and TSP coordinate grid interconnection, enabling data center to draw power directly from grid."*
- `02 Bridge Power Online (Optional)` — *"If required, NRG brings bridge power online before BYOP or full grid interconnection to maintain operations until permanent power is available."* (yellow-fill highlighter passes as it becomes active)
- `03 Phased Power Delivery and Ramp` — *"Developer installs servers, runs tests, and gradually increases power use as equipment comes online."*
- `04 Full-Capacity Ramp` — *"Developer continues adding servers and scaling up until data center reaches full capacity, enabled by BYOP."*
- `05 CCGT Supplement` — *"NRG supplements and complements grid power with Combined-Cycle Gas Turbine (CCGT) generation."*

Each card has: small numbered chip (`01`, `02`...) as a filled orange-yellow circle at top when active (else faded), bold heading below, small body copy. Only the *active* card is full ink; adjacent cards are faded gray. As user scrolls the active card transitions.

The **left image** stays sticky through the carousel — same operator at gauges shot. In frames 58-59 the left image transitions to a **new sticky image**: the finished plant model from an aerial angle (foreshadowing the next section). Bottom-right transient: `Scroll to Power Up`.

---

## 02:20-02:36 · PHASE 5 — "FULLY OPERATIONAL" (Glowing Diorama)

**Frame 60-61:** Full-bleed diorama of the *finished* site — all buildings constructed, and now with an **animated cyan-teal glowing overlay** — specific buildings (server halls, cooling towers, chimneys) light up with a soft translucent teal glow representing "power flowing." Water in the pool glows aquamarine.

Top-right pill has updated to `[5] Fully Operational =`.

Overlay labels:
- `[◆] Retail Power + Support`
- `[◆] Lower-Carbon Options`
- `[◆] BYOP Operations` (appearing next as scroll continues)

Bottom-right body: `STEP 01` + *"Deliver reliable power, optimize operations, and advance low-carbon performance."*

The labels stagger-fade in.

---

## 02:36-02:56 · SECTION — "EXPLORE YOUR DATA CENTER" (Virtual Tour)

**Frame 65:** Full cream card overlaid on background diorama:
- Chip top-left: `TAKE A TOUR`.
- Display headline (~130px, near-black):
  ```
  EXPLORE YOUR
  DATA CENTER
  ```
- Body copy bottom-left (~3 lines): *"The data center is fully operational. Step inside to see how everything comes together — from servers and cooling to power, people, and sustainability."*
- Bottom-right: green pill `[mouse] Scroll to take a tour`. When cursor arrives (frame 66), the pill fills bright green and the label becomes fully ink.

Top-right pill: `[6] Virtual Tour =`.

---

## 02:56-03:04 · VIRTUAL TOUR — Interactive Diorama

**Frame 66-67:** Full-bleed of the *finished, styled* diorama at daylight — no glow this time, this is the "handoff." Multiple hotspots overlaid as pill labels with small circular thumbnail images (unique to this section — hotspots have preview thumbnails inside the pill):
- `[img] Cooling + Climate`
- `[img] Security + Data` (dark circular thumbnail)
- `[img] Sustainability + Water`
- `[img] Power + Connectivity`
- Also visible on right side: `Retail Power + Support` (faded)

Top-right pill has now morphed into a phone-call green button: `[phone-icon] Get in Touch =`.

**Hotspot click flow (frames 68-84):**
User clicks the `Security + Data` pill (frame 68) → **transitions to a full-screen close-up video** of a data-hall server aisle:
- The scene is a dolly through a warm-lit corridor of server racks, low-light warm ambient, with tiny yellow status LEDs.
- A small `×` close-button appears center-top of the viewport.
- Bottom-right: a stacked hotspot info card:
  - Top pill (active, yellow): `Security ⋯ ⋯` + 3-line body *"Layered security measures — badges, biometrics, cameras — protect both physical and digital assets inside the facility."*
  - Bottom pill (next, faded): `Data Hall Operations ✚`
- User can click the `×` to return to the diorama, OR click the next pill to advance the scene (`Data Hall Operations` opens a different scene — a corridor of textured wall panels).

**Hotspot #2 — Cooling + Climate (frame 72-73):** transitions to a diorama close-up of the HVAC section of the model (rows of miniature model cooling units on a rooftop, tilt-shift focus). Same corner UI: `HVAC + Airflow` and `Cooling Systems` stacked pills, with descriptions.

**Hotspot #3 — Battery + Balance (frames 75-77):** transitions to a diorama close-up of tiny model battery-storage containers with glowing green LEDs. Cards: `Battery Systems` / `Power Management`.

**Hotspot #4 — Sustainability + Water (frames 82-83):** transitions to a diorama close-up of the water-processing installation and pool. Cards: `Sustainability` / `Water Processing`.

**Between hotspots**, the user returns to the base "map" view (frames 74, 78, 84) — the diorama returns to its full aerial view. The user can click the next hotspot from there.

**Hotspot #5 — Onsite Staff (frame 68 was actually this one showing a control room):** the interior of a "control room" — clay figurine of an operator at a bank of tiny screens and dials, warm sepia lighting. `Onsite Staff` / `Control Room` stacked pills.

---

## 03:04-03:12 · MENU OPEN + CONTACT MODAL

**Frame 85-86:** Top-right pill clicked (Menu). A **floating panel drops down** from the pill:
- Width ~340px, cream-white fill, subtle shadow.
- Contents:
  ```
  1  Site Evaluation
  2  Site Development
  3  Construction
  4  Power Ramp-up
  5  Fully Operational
  6  Virtual Tour
  ```
  Each item is a row with a small numbered circle (yellow-outlined) + label (~18px medium ink). Rows separated by thin dashed dividers.
- Below the list: a full-width **green pill button** `[phone-icon] Get in Touch` (~46px tall).
- Top-right of panel: small `×` close button.

Hovering row highlights it with cursor.

**Frame 87-89 — Contact modal:** User clicks `Get in Touch`. Full-viewport dim underlay (background dims to ~30% brightness). Centered modal:
- Width ~640px, background white, top border a bright green ~4px band `#43C56B`.
- Heading (~40px black semibold): `Ready to talk to an energy expert?`
- Sub-line (~15px medium): *"Whatever you need, we'll help you get it done."*
- Form fields stacked (each label micro-caps small, then input outlined ~48px tall, cream fill):
  - `NAME` (input)
  - `COMPANY NAME` (input)
  - `PHONE` (input)
  - `ZIP CODE` (input)
  - `EMAIL` (input — visible scrolling further down)
- Bottom-right of visible modal: green pill button `Talk To An Expert [→]`.
- Top-right of modal: small circular `×` close.

Modal slides up ~40px from below with opacity fade over ~300ms.

**Frame 90 — Menu re-opens** (user browses back). The last frames are just returning to the top of the site (Phase 1 title), and frame 96 shows the macOS screen-recording chrome (`○ ▭ ▢ ⃝ Options v [Capture]`) as the recorder is stopped — confirming the entire journey was a **user-driven scroll + click recording**, not autoplay.

---

## Universal patterns / rules extracted

1. **Every section title uses the yellow scroll-fill.** Always two-line, always heavy display, always fills left-to-right.
2. **Every diorama phase has 2-4 "sub-scenes"** — the camera advances discretely with each sub-step; label positions and text change per sub-scene.
3. **Every hotspot pill can expand into a card with a preview image + description.** Cards use the same rounded-corner cream style.
4. **The top-right pill always tells you where you are.** It updates continuously as you scroll into new sections.
5. **Bottom-right "Scroll to next phase" pill** appears at the *end* of each phase — hover fills it bright green.
6. **Bottom-left has a persistent `Scroll to explore` mouse-glyph hint** on phase intros; disappears once inside a phase.
7. **Progress dots on the right side** of viewport indicate sub-scene position within a phase.
8. **The intro modal and contact modal use the only two very-saturated colors** (yellow button + green border) — the rest of the site is intentionally desaturated.

---

## For the interior studio adaptation — key structural translations

| Reference (NRG) | Studio adaptation |
|---|---|
| "Data Drives Our World." | *"Home shapes how we live."* or similar manifesto — same weight, same yellow-fill |
| "Bring Your Own Power" | The studio's positioning line (e.g. *"Every home we make is a slow reveal."*) |
| Phase 1 — Site Evaluation | **Phase 1 — Discovery** (first site visit, brief, mood) |
| Phase 2 — Site Development | **Phase 2 — Design Development** (concept → schematic → detailed) |
| Phase 3 — Construction | **Phase 3 — Build & Craft** (construction admin, site visits) |
| Phase 4 — Power Ramp-up | **Phase 4 — Styling** (furniture, art, soft finishes) |
| Phase 5 — Fully Operational | **Phase 5 — Reveal** (finished home photographed) |
| Virtual Tour of data center | **Virtual Tour of a completed home** (living, kitchen, bedroom, powder, terrace, cellar) |
| "Talk to an energy expert" | *"Book a consultation"* or *"Speak with the studio"* |
