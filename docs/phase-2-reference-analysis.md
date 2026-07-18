# Phase 2 — Reference Site Analysis

**Source:** `Phase 2 video reference.mov` (18.4s, 60fps screen recording of the NRG Bring-Your-Own-Power reference site scrolling through its Phase 2 "Site Development" section).

**Method:** ffmpeg extracted 46 frames at 2.5fps. Each observation below cites the frame timestamp so you can jump back to the source if needed.

---

## The one-line summary

Phase 2 is **not** a pinned-scrub section. It's a **normal-flow two-column layout** that scrolls with the page. The left column carries text entries; the right column carries the matching photograph for each entry. As the page scrolls, entries and images move up together in lock-step — like reading a long article with an image beside every paragraph. The only "special" motion is a **Copper Fill sweep on each entry's heading** as it enters the viewport.

The previous section's diorama is visible above (peeking down at the top) and the next section's diorama is visible below (peeking up at the bottom) because the whole Phase 2 card sits on the natural page flow with cream background — no pinning, no ScrollTrigger scrub. This is dramatically simpler than what we currently have.

---

## Frame-by-frame walkthrough

### t = 0.0s to ~1.2s — Handoff from Phase 1 (frames 1–3)

- Phase 1's diorama (a green miniature site model with teal wireframe overlay) fills the viewport.
- Top-right pill reads `◆ What is BYOP? | 1 Site Evaluation =`.
- Bottom-right shows a bright green sage pill `[mouse] Scroll to Phase 2` — the phase-transition CTA.
- User begins scrolling down. Phase 1 stays visually static (already at its terminal state); the whole page just moves up.

### t = ~1.6s to ~2.0s — Phase 2 curtain enters (frame 5)

- A **cream / off-white card** slides UP from the bottom of the viewport, covering Phase 1 below it. Phase 1's diorama is still visible above through a shrinking gap.
- Inside the cream card, top-left, a small pill chip appears: `PHASE 2`.
- The giant display headline **`SITE DEVELOPMENT`** materializes below the chip. Copper Fill is mid-sweep — `SI` in black, `TE` in copper/yellow, `DEVELOPMENT` still gray-faded on the second line.
- Top-right pill has already morphed to `2 Site Development =` (green filled) — pill state change happens ahead of the visual reveal, not synchronized with it.

### t = ~2.4s — Intro complete (frame 7)

- Cream card fully covers Phase 1. The card is now the whole viewport.
- Both lines of `SITE DEVELOPMENT` are in full black. Copper Fill has completed.
- Body copy sits to the **right**, mid-height: *"In Phase 2, approvals and agreements are secured to establish grid connection to site."*
- Bottom-left has a small mouse-glyph + micro-caps `Scroll to explore` hint.
- **Vast whitespace** on the left half below the headline — this negative space is intentional; it holds the eye at the phase title.

### t = ~3.2s to ~4.4s — First entry reveals (frames 9–13)

- User keeps scrolling. The `SITE DEVELOPMENT` intro band scrolls up and off the top of the viewport (no pin — it just moves with the page).
- A photograph starts rising in on the **right column** — two miniature-figure architects holding a document, warm cream tones on a blurred green outdoor background.
- On the **left column** (roughly vertically centered against the image), the first entry fades in as a group:
  - A small **yellow rounded-square icon** (~48px) with a simple symbol inside
  - Heading **`Site + Grid Reviews`** — Copper Fill sweeps left-to-right across it (frame 11 catches it mid-sweep with `Site + Grid Revie` in copper, `ws` still gray)
  - One-line body: *"Review site power needs, grid capacity, and potential future upgrades."*
- The image on the right does NOT swap between entries — it stays put beside its entry as the user reads.

### t = ~4.8s to ~7.2s — Entries 2 through 4 (frames 15–24)

Same rhythm repeats. The pattern for each entry:

1. Previous entry's text + image scroll UP together.
2. Next entry's text (icon + heading + body) and its matching image both fade/rise in from below at roughly the same time.
3. Copper Fill sweeps the new heading's characters.
4. Once revealed, the entry sits static and the user continues scrolling.

Entries seen in order (all with text on LEFT, image on RIGHT):

| # | Heading | Image content |
|---|---|---|
| 1 | Site + Grid Reviews | Two figures with document |
| 2 | Load Request to TSP | Figures holding blueprint page (blue) |
| 3 | TSP Agreement + Deposit | Miniature scaffolding/platform model |
| 4 | Long-Lead Orders | Three figures around a stack of pallets |
| 5 | Permitting + Entitlements | Figure with clipboard, blurred outdoor |

Each heading has a slightly different icon (different symbol/shape but same yellow rounded-square container).

### t = ~10.8s — The layout FLIPS (frame 32)

At the sixth entry, the column allocation **swaps**:

- Text moves to the **RIGHT** column
- Image moves to the **LEFT** column

This isn't a subtle shift — the whole spatial rhythm inverts. Same Copper Fill on the heading, same icon+heading+body composition, same photograph-beside-text pattern, just mirrored.

Entries seen in this flipped half (text on RIGHT, image on LEFT):

| # | Heading | Image content |
|---|---|---|
| 6 | BYOP Plan | Hands holding a tablet showing blueprint |
| 7 | BYOP Interconnection Applications | Same tablet, "SEND" button visible |
| 8 | Full Interconnection Study | Tablet showing pylon/transmission tower |
| 9 | BYOP Equipment Orders | Tablet showing 4 substation icons |

The flip likely marks a narrative transition — first half is preparation (reviews, requests, agreements), second half is execution (planning, applications, orders). Visually it's a break from monotony after five identical-side entries.

### t = ~15.6s — End-of-phase card (frames 40, 43)

- After the last entry, the two-column pattern gives way to a **full-width summary card** with a different composition:
  - Left side: large display heading `Bridge Power Solution` (~72px, semibold, black)
  - Right side: body paragraph + dark green sage CTA button `Explore Bridge Power Solutions →`
- This is the "phase result" card — analog to the `endOfPhaseCard` in our stub content.

### t = ~17.2s — Handoff to Phase 3 (frames 44–46)

- User continues scrolling. The cream Phase 2 card slides UP.
- Phase 3's diorama (aerial view of green landscape with drawn white contour lines) is revealed below.
- The Phase 2 top-right pill (`2 Site Development`) remains visible during the transition but starts fading toward Phase 3's pill state as the diorama takes over the viewport.

---

## Critical differences from our current implementation

Our `PhaseSketch.tsx` uses a **pinned split-column with stacked absolute-positioned entries and curtain-wipe transitions**. The reference does none of that:

| Aspect | Reference | Our current |
|---|---|---|
| Pinning | **None.** Section scrolls with page. | Pinned for 500dvh |
| Entry-to-entry transition | **Normal scroll** — previous entry stays visible above as next enters below | Curtain wipe replaces one entry with next |
| Images | **All images visible in stacked flow** — each stays beside its entry | Single image well; images crossfade with curtain wipe |
| Text state after reveal | **Persists** — old entries scroll off the top naturally | Old entry animated away (clipPath) before new one shows |
| Column layout | **Flips halfway** — first half text-left, second half text-right | Constant text-left, image-right |
| End-of-phase card | Full-width, own scroll region | Overlay that appears on top of the split view |
| Copper Fill | Runs on each heading as it enters viewport | Runs only on the intro headline |
| Intro state | Full-screen `SITE DEVELOPMENT` display headline, then scrolls off | Intro copy visible only briefly, then hidden |

## Why the reference feels lighter

- **No ScrollTrigger pin.** No paint contention, no scroll-hijacking, no `will-change` layers stacking.
- **No image swaps.** Every image is loaded once and stays in place — no crossfade cost, no curtain wipe.
- **Copper Fill runs per-entry, not per-section.** Each fill sweep is ~6 characters wide over ~0.4s of scroll — small local work, spread across the whole phase's scroll length rather than concentrated at the intro.
- **The whole section is HTML flow.** GSAP is only touched for the Copper Fill sweep on each heading as it enters. Everything else is browser default scroll.

## What to consider before rebuilding

1. **Do you want to keep the pinned split-column feel** (dramatic, cinematic, six entries all replacing each other in one sticky view) — **or move to the reference's normal-flow scroll** (calmer, simpler, more like an article)? These are two different design philosophies; the reference chose the calmer one.
2. **Do you want the mid-phase column flip**? It's a great punctuation device but requires the design to have a natural narrative break to sit on.
3. **Do you want per-entry Copper Fill**? This is easy to add regardless of which layout you choose — just wire a ScrollTrigger to each heading's viewport entry.
4. **Bridge / end-of-phase card**: reference gives it its own full-viewport section rather than overlaying the split view. Cleaner separation.

---

## Extracted frame sample (for reference)

All 46 frames are in `scratchpad/p2frames/f_001.jpg` through `f_046.jpg` at 1080px wide. Timeline positions (seconds ≈ frame_number × 0.4):

- f_001–f_003 (0.0–0.8s): Phase 1 terminal, "Scroll to Phase 2" CTA
- f_005 (1.6s): Phase 2 cream card mid-entry, Copper Fill on SITE
- f_007 (2.4s): Intro fully revealed
- f_011 (4.0s): Entry 1 Copper Fill mid-sweep
- f_015 (5.6s): Entry 2 starting to appear
- f_017 (6.4s): Entry 2 centered
- f_021 (8.0s): Entry 3 with Copper Fill
- f_024 (9.2s): Entry 4 centered
- f_028 (10.8s): Entry 5 (last left-side)
- f_032 (12.4s): **Column flip** — entries 6 & 7 on right
- f_034–f_037 (13.2–14.4s): Right-side entries continue
- f_040 (15.6s): End-of-phase "Bridge Power Solution" card
- f_043 (17.2s): Phase 3 diorama peeking from below
- f_046 (18.4s): Phase 2 card mostly gone, Phase 3 taking over
