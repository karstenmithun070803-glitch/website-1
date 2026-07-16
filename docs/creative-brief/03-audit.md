# Phase 3 + 3.5 — Cohesion Test + Hostile Audit

> Where I stress-test the Phase 2 picks before writing the final deliverables.
> Direction locked at Gate 2: **Moody Editorial** — dark warm charcoal canvas + editorial pacing + serif/mono type pair + Aman/Bottega-level restraint (not full Makhno cinematic drama).

---

## Part I — Cohesion Test

### Tonal consistency (temperature check)

Every proposed element must share an emotional register. Registers I'll use:
- **Sacred** (Aman, Vincent Van Duysen — reverent, considered, patient)
- **Editorial** (Pierre Yovanovitch, Bottega — magazine-like, curated, luxe)
- **Cinematic** (Makhno, Studio KO — dramatic, chiaroscuro, dark)
- **Technical** (Studio Freight, Active Theory — precise, engineered, motion-forward)

**Our direction target = Editorial + Cinematic** (with a whisper of Sacred). Elements must fit within this triangle.

**Cross-check on Phase 2 element picks:**

| Element | Source | Register | Fits target? |
|---|---|---|---|
| Full-viewport hero video/image | Aman + Vincent | Sacred + Editorial | ✅ |
| Serif display + mono labels | Studio Freight | Editorial + Technical | ✅ |
| Custom cursor with mono labels | Studio Freight | Technical | ⚠️ borderline — needs softening |
| OGL image distortion on hover | Makhno | Cinematic | ✅ |
| Curtain wipe transitions (700ms, quintInOut) | Aman | Cinematic | ✅ |
| Case study 7-block anatomy | Pierre + Aman | Editorial | ✅ |
| Color-shift-on-scroll bg | Bottega | Editorial | ✅ (as signature moment) |
| Full-screen overlay nav | Makhno + VVD | Cinematic + Sacred | ✅ |

**Verdict:** the cursor is the only element that reads "Technical" alone — needs to be softened to Editorial (warm off-white color, patient easing, mono label optional, not always visible).

### Motion budget scoring (0–3 per element, cumulative check)

| Element | Motion cost |
|---|---|
| Preloader (first visit) | 2 |
| Home hero video loop | 1 |
| SplitTextReveal on section titles | 1 |
| Mask reveal on gallery images | 1 |
| Parallax on hero + full-bleed | 1 |
| Custom cursor | 1 |
| Magnetic buttons | 1 |
| Marquee for logos/tags | 1 |
| Page transitions (curtain wipe) | 2 |
| OGL distortion on work-index hover | 2 |
| Color-shift-on-scroll (Bottega) | 1 |
| **Total** | **14 / max reasonable 18** |

**Verdict:** within budget. The site should breathe, not overwhelm. Any addition beyond 18 requires cutting something else first.

### Density gradient

Where the site is dense (information-rich) vs. spacious (breath):

- **Dense:** work index (many projects visible), case study credits, footer, contact form
- **Balanced:** service pages, about page, individual case study body
- **Spacious:** home hero, case study hero, full-bleed gallery images, page transitions

**Verdict:** gradient is coherent. The site opens spacious, allows density in list-like sections, returns to spaciousness for immersion.

### Hierarchy per screen

Every screen should have one #1 attention target. Cross-check:
- Home hero: the photograph. ✅
- Work index: the current hovered project. ✅
- Case study hero: the project image, then the name. ✅
- About: the studio story (headline → body). ✅
- Contact: the form. ✅

No screen has two competing #1s.

### Cognitive load per interaction

Users can learn one unusual thing at a time. Our unusual things:
- Custom cursor with contextual labels (Studio Freight)
- Curtain-wipe page transitions
- Color-shift-on-scroll background (Bottega)
- Full-screen overlay nav

**Risk:** four "unusual things" is too many if introduced at once. **Mitigation:**
- Cursor is present from the start (small, subtle) but only shows labels on hover — learned by osmosis
- Curtain wipe happens only on clicking a project — deliberate, not surprising
- Color-shift is subtle enough to be felt, not consciously noticed
- Overlay nav is a familiar hamburger pattern — the twist is only that the overlay is full-screen

**Verdict:** each unusual thing has a familiar handle. Not overloaded.

### The remove test (kill your darlings)

For each element I proposed, ask: if removed, would the site suffer?

- **Custom cursor with labels** — remove: users lose visual context on hover states. Suffers moderately. **Keep, but soften.**
- **OGL image distortion on hover** — remove: work-index hovers become flat, losing the signature "materiality" feel. Suffers significantly. **Keep.**
- **Color-shift-on-scroll bg** — remove: no user notices consciously. But it makes the site feel *alive* rather than static, especially on long-scroll case studies. Suffers subtly. **Keep as case-study-only signature.**
- **Preloader on first visit** — remove: honest question. If our hero loads in <1s, no preloader is needed. **Cut unless we're delivering a video hero that takes >2s.**
- **Marquee for logos/tags** — remove: what marquee? We don't have a "trusted by" logo strip; interior studios don't do that. **Cut entirely.** [Removes 1 from motion budget → 13/18]
- **Magnetic buttons** — remove: subtle, users won't miss it. But it's a genuine luxury touch on the primary CTA. **Keep only on the primary CTA (contact/inquire), not everywhere.**

**Motion budget after cuts:** ~13/18 — even more room to breathe.

### Cross-pollination rule audit

Borrowing per source site (cap: 3, else 1):
- **Aman:** hero pattern, curtain-wipe transitions, project-index anatomy. **3 elements — at the cap, need articulation.** Justification: Aman is the clearest transferable pattern for portfolio/property. Elements are complementary (they form a coherent hospitality-inspired flow). Combined result does not feel like a clone because our color palette + type are entirely different.
- **Studio Freight:** cursor pattern, serif+mono type philosophy, restrained motion budget. **3 elements — at the cap.** Justification: these are engineering/craft patterns, not visual signatures. The look will be entirely different.
- **Makhno:** OGL image distortion, dark warm palette direction. **2 elements.** ✅
- **Bottega:** color-shift-on-scroll. **1 element.** ✅
- **Vincent Van Duysen:** editorial restraint philosophy, single-image-per-viewport pattern. **2 elements.** ✅
- **Pierre Yovanovitch:** case study "spread" layout, editorial serif discipline. **2 elements.** ✅

**Verdict:** two sources are at the cap; both borrowings are engineering/pattern rather than visual signature. Combined, the site will not feel derivative of any single source.

---

### Combination I reject and why

**Rejected combination: Makhno's OGL distortion + Studio Freight's text-label cursor + Bottega's color-shift-on-scroll + Aman's curtain wipe — all active simultaneously on the work-index page.**

Why reject: individually all four are strong. Together on one page they violate cognitive-load discipline. Users would encounter four unusual interactions on one screen — distortion under cursor, text label following cursor, background shifting as they scroll, curtain wipe on click. The eye can't process that many novel behaviors at once.

**Revised approach:** on the work index, ONLY the OGL distortion is active. The cursor becomes a simple dot (no label there). Color-shift-on-scroll is reserved for individual case study pages. Curtain wipe fires only on click-to-detail (users have already stopped exploring the index).

---

## Part II — Hostile Audit (Phase 3.5)

Role-playing a jaded senior designer reviewing the spec. Answering honestly.

### What is the weakest choice?

**Bottega's color-shift-on-scroll background.** I love it in theory. In practice: (a) it requires JS to run smoothly, so it fails a no-JS baseline (§HARD CONSTRAINT). (b) On a dark warm charcoal canvas, the range of "matching" background colors is narrow — you can only shift within `#1A1815` → `#2B2620` without breaking legibility. So the effect will be subtle to the point of being invisible.

**Revision:** cut it as a signature. Consider replacing with a much subtler version — the section divider between case-study "chapters" uses a warm shift (e.g. a horizontal band that briefly warms to amber when a materials section is in view). Delivers the "site feels alive" without the technical fragility.

### What is derivative?

**The Aman hero pattern** (poster-frame → autoplay muted video with cinematic curtain wipe) is recognizably Aman's move. If we do it identically, our site reads as "Aman clone for interior design."

**Revision:** we take the *anatomy* (video hero, patient reveal, muted, curtain wipe) but the *content* is not landscape — it's interior detail. Not a dawn shot of a pool; a slow pan across a material surface (plaster texture, wood grain in raking light). Different subject, same rhythm.

### What is decoration masquerading as design?

**The magnetic button on the contact CTA.** I said "keep on primary CTA only" — but ask honestly: what does the magnet communicate? Nothing. It's ornament with a physics wrapper. Even on one button, it's a decorative flourish, not a functional signal.

**Revision:** cut magnetic buttons entirely. Replace with a considered hover state — the button slightly widens (+8% width) with a `expoOut` easing, and the label letter-spacing tightens. Reads as focus, not physics.

### Which animations would fail if killed?

Testing each animation by imagining it gone:

- Preloader — already cut. Passes.
- Home hero video — if we swap to a still photograph, does the site suffer? Slightly. Video is more atmospheric but still is more restrained. **Marginal keep.**
- SplitTextReveal on section titles — if we swap to a simple opacity fade, does anyone notice? On editorial serif type, the word-by-word cascade adds genuine reading rhythm. **Keep.**
- Mask reveal on gallery images — if we swap to opacity fade, does the site suffer? Yes — the mask reveal gives a sense of "unveiling" that's compositionally correct for interior design (spaces revealed sequentially). **Keep.**
- Parallax on hero — if we cut, does anyone notice? Only if you're specifically looking. But parallax on a hero image is now so associated with premium sites that its absence reads as cheap. **Keep, but very subtle (max 15% offset).**
- Custom cursor — if we cut, users get a native cursor. Site becomes 15% less distinctive. But it's also 15% more accessible. **Contested.** Decision: keep, but only visible on desktop non-touch, and label text only appears on interactive elements (not always on).
- OGL distortion — if we cut, the work index becomes ordinary. **Keep, definitely.**
- Marquee — already cut.
- Curtain wipe on route change — if we cut, transitions feel abrupt. **Keep.**
- Color-shift-on-scroll — already softened to a section-divider warm band.

**Casualties from audit:** magnetic buttons cut. Preloader cut (unless perf demands it). Full Bottega color-shift softened to a section-divider band. Total motion budget now ~11/18. **Substantially more restrained than the original proposal.**

### What will feel dated in 18 months?

- **The custom cursor with text labels.** Studio Freight popularized this in 2022. By 2027, it will be recognizable-as-vintage. **Mitigation:** keep the cursor simple (small dot), only show labels on true interactive elements — don't add mono labels to every hover state.
- **OGL image distortion.** Was fresh in 2020–2022. Approaching cliché. **Mitigation:** use sparingly — only on the work-index cards, never on hero or case study body. And use a *very* subtle distortion (small amplitude, slow response) — not the dramatic ripple Makhno uses.
- **Curtain-wipe page transitions.** Modern-classic; probably won't date badly if easing is patient and the wipe is a single color, not decorative. Passes.

### What breaks on mobile?

- **Custom cursor** — irrelevant on touch. Falls back to no cursor. ✅
- **OGL distortion on hover** — no hover on touch. **Fallback:** on tap, image scales up briefly (~200ms) then navigates. Or: on scroll into view, image reveals with mask. Either preserves the "materiality" cue without the desktop mechanic.
- **Parallax** — works on mobile, but can cause performance issues. **Fallback:** reduce offset by 50% on touch.
- **Curtain-wipe transitions** — works on mobile but adds 700ms to every navigation. **Fallback:** simpler cross-fade on mobile (400ms). Still respects motion budget, faster.
- **Section-divider color-shift** — works on mobile natively (CSS-driven).
- **Full-screen overlay nav** — native full-screen on mobile is standard.

**Acceptable losses:** hover-only effects. Everything critical to the identity of the site survives mobile.

### Where am I choosing what looks cool over what serves the interior design work?

- **OGL distortion.** Honestly: it's flashy. Interior design doesn't need it. Vincent Van Duysen and Pierre Yovanovitch don't have it. **But:** for a studio wanting "wow factor above all" (per the brief), it's a defensible signature moment — as long as it's restrained. **Keeping, with the restraint clause.**
- **Custom cursor.** Honestly: could go either way. Vincent Van Duysen uses no cursor. Makhno uses a subtle dot. **Compromise:** small warm-off-white dot always, mono label only on `<button>` and `<a>` in specific interactive zones. Doesn't cross the "cool vs serving" line.
- **Curtain wipe transitions.** These serve the work — they preserve the "considered pacing" of interior design (§3 slowness). Not chosen for cool. **Keep.**

### Revisions summary — what changed from the pre-audit proposal

| Element | Pre-audit | Post-audit |
|---|---|---|
| Bottega color-shift bg | Full page bg animation on scroll | Section-divider warm band only |
| Preloader | Yes (first visit) | Cut unless perf-required |
| Marquee | Logo strip | Cut entirely |
| Magnetic buttons | On primary CTA | Cut; replaced with subtle width+letter-spacing hover |
| OGL distortion | On all project cards, medium intensity | On work-index cards only, very subtle intensity |
| Cursor labels | On all interactive hover | Only on `<button>` and specific `<a>` |
| Home hero | Video (5s loop) | Video preferred; still photo acceptable if perf demands |
| Motion budget total | 14/18 | ~11/18 |

---

## What we take into Deliverables A + B

- **Direction:** Moody Editorial (dark warm charcoal + editorial pacing + serif/mono type + Aman-style restraint)
- **Elements confirmed:** hero video with fallback, section-title SplitTextReveal, image mask reveals, subtle parallax (15% max), simple custom cursor with rare label, OGL distortion on work-index cards (very subtle), curtain-wipe route transitions (700ms desktop / 400ms mobile cross-fade), section-divider color-shift as signature, editorial 7-block case study anatomy, considered composed footer, mono+serif type pair, 5-token color palette
- **Elements cut:** magnetic buttons, marquee, full Bottega color-shift, preloader (unless needed), cursor label on every interactive
- **Motion budget:** 11/18 (well below max — deliberately restrained)
- **Cross-pollination:** 3 borrowings each from Aman + Studio Freight (both engineering/pattern, not visual signature) — cross-pollination rule respected

Ready for Deliverable A (DIRECTION.md) and Deliverable B (BUILD-SPEC.md).
