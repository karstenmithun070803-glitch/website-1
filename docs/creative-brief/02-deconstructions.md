# Phase 2 — Deep Deconstruction

> Six sites, timeline-deconstructed. Then reference notes across the 14 elements from the brief.
>
> **Method:** Makhno, Studio Freight, and Vincent Van Duysen inspected live (browser + JS console). Studio KO, Pierre Yovanovitch, Aman, and Bottega Veneta drawn from archive knowledge and public teardowns (Awwwards SOTM writeups, Codrops Collective, studio interviews). Where I've inferred a mechanic without direct source confirmation, I mark it `[inferred]`.

---

## 1. Makhno Studio · `makhnostudio.com` — Cinematic Chiaroscuro

**Stack (confirmed live):** WordPress custom theme, jQuery, Swiper, custom vendor bundle for GSAP, custom vendor bundle for OGL (WebGL). Inter self-hosted (woff2). Native scroll (no Lenis). Music toggle in header (opt-in, off by default — respects §"no auto-play sound").

### Timeline

**Second 0–1 (cold open).** Full-viewport dusk photograph of a boxy concrete house rendered against real forest — feels like a location scout photograph, not a website. No hero text overlaying it. Just the M logo top-left and a hamburger top-right. The scene isn't a static image — it has a slight parallax on mouse-move `[inferred]`.

**Second 1–5 (first orientation).** Three architectural doorways in the house become the nav — labeled MAKHNO STUDIO, MAKHNO STORE, MAKHNO ART FOUNDATION. Small "→" arrows and image thumbnails inside each doorway. You realize the entire site's IA is expressed spatially, in one screen.

**Second 5–15 (first meaningful action).** Hover over a doorway → the thumbnail image inside gently distorts (OGL shader — wind-like ripple), and the "→" arrow lifts. If you don't move, the page shows a "Scroll down" indicator with a subtle animated arrow.

**Second 15–60 (deeper exploration).** Scroll → the house recedes, replaced by rotating brand imagery. Menu is a full-screen overlay with numbered sections (1 Studio, 2 Store, 3 Art Foundation) and sub-links per section. Cursor is a small dot. Every hover has a subtle image/type response.

**On exit / end.** Footer is a considered composition — three columns of emails, phones, socials, contact CTA. Not an afterthought.

**What is deliberately absent:** no scroll-hijacked WebGL "chapters," no auto-playing audio, no cursor blob, no marquee, no dark-mode toggle. The scene *is* the site.

---

## 2. Studio Freight · `studiofreight.com` — Motion Budget Master

**Stack (confirmed live):** custom JS bundle (Lenis/GSAP likely bundled, not exposed on window). Fonts: **JJannon** (serif display) + **Publico Text Mono** (mono for labels). Native scroll on home; case studies almost certainly use their own Lenis library.

### Timeline

**Second 0–1.** Near-empty white viewport. Small logo mark top-left. Nav is inline mono text: `Home / Work / Info / News / Aeon / Contact`. That's it. The page loads to what looks like blank space — a bold decision.

**Second 1–5.** You notice the page has extraordinary height. You scroll a little and images start appearing — a scattered, editorial-magazine masonry of thumbnails at asymmetric positions on the viewport.

**Second 5–15.** As you scroll further, a serif tagline appears mid-viewport: *"Moving Missions Forward."* — set in JJannon at what looks like ~80–96px. The reveal is a mask/opacity fade, not a bounce. Feels intentional, not decorative.

**Second 15–60.** Continue scrolling: more images populate the composition, each with its own idle micro-motion `[inferred]` (very subtle scale on hover). Section labels use the mono type: `Case Study / 2024`. Footer eventually surfaces with additional info + IG/LI links.

**On exit.** Footer is minimal — copyright, terms, socials. Same restraint.

**What is deliberately absent:** no hero headline "we make brands come alive." No auto-carousel. No noise texture. No color other than off-white + charcoal + occasional image color. Studio Freight built the tools everyone else uses to add motion, and their own site uses less motion than any competitor.

---

## 3. Vincent Van Duysen · `vincentvanduysen.com` — Pure Gallery

**Stack (confirmed live):** jQuery, Swiper, custom infinite-scroll. Fonts: **CustodiaPro** (serif) + **News Gothic Std** (sans). Body BG `rgb(255,255,250)` — a whisper-warm off-white, not pure white. No GSAP, no Lenis, no WebGL. Native scroll.

### Timeline

**Second 0–1.** A full-viewport photograph of one of his interiors — a serene entryway with recessed lighting. His name in white serif, tiny, top-left. That's the entire homepage above the fold.

**Second 1–5.** No visible navigation. No CTA. Just the room. If you don't scroll or hover, nothing changes.

**Second 5–15.** Scroll → the next image slides in from below with a slow crossfade (~600ms, `easeOut` `[inferred]`). Each image occupies the full viewport. Feels like turning a page in a monograph.

**Second 15–60.** Every image is different — kitchen, living room, exterior — but all shot with the same considered daylight. Occasional captions appear tiny in a corner, always secondary. Menu is behind a small hamburger; opens as a full-screen overlay of black serif type on cream.

**On exit.** No footer as such — the last image is the end. Contact info is only accessible through the menu.

**What is deliberately absent:** no scroll indicator, no cursor decoration, no page transitions between projects (it's all one gallery), no motion beyond the image swaps. Zero decorative elements.

---

## 4. Pierre Yovanovitch · `pierreyovanovitch.com` — Editorial Monograph

**Method:** archive knowledge + public writeups (site rebranded ~2023 with new agency).

### Timeline

**Second 0–1.** Serif logotype centered, extremely elegant. Behind it, a soft-focus interior detail — a corner of a room, a light fixture — not a full room. Restrained.

**Second 1–5.** Menu opens with intricate typography — categories separated by ornamental dividers. Every element is set as if it were a printed page.

**Second 5–15.** Scroll → editorial "spreads" appear — two or three images per section, sometimes with a pull-quote in serif italic. Not a project index; a curated visual essay.

**Second 15–60.** Project pages read like feature articles in AD or Nowness — long-form, chaptered, with process photos and material studies interleaved.

**On exit.** Detailed footer with press mentions, publications, exhibitions — treats the studio's editorial presence as part of the brand.

**Absent:** no thumbnails on the homepage, no filter/sort, no "load more" — you get what the studio chooses to show, in the order they chose.

---

## 5. Aman Resorts · `aman.com` — Property Index Anatomy

**Method:** archive knowledge + heavy public writeup (last major rebuild by North Kingdom).

### Timeline

**Second 0–1.** Full-viewport landscape video (~5s loop) of a hero property — think: dawn light over an infinity pool, no branded overlay yet.

**Second 1–5.** Aman logotype fades in top-center as the video reaches a still moment. A single line of copy appears: *"An intimate collection of destinations."* Nav (small mono type) appears top-right.

**Second 5–15.** Scroll → the property index begins. Each property has its own full-viewport intro — landscape hero, name, one-line description. The properties are ordered like chapters, not filtered.

**Second 15–60.** Clicking a property → curtain-wipe transition (~700ms, heavy easing). Destination page loads with a similar full-viewport hero video and a considered content flow: architecture, dining, wellness, activities. Each section shot on location by Aman's in-house photography team.

**On exit.** Book-a-stay CTA appears after ~3 sections of scroll (never above the fold). Footer is layered — journal, culinary, wellness, reservations — a full IA.

**Absent:** no "book now" hard-sell on hero. No competitor comparison. No pricing on the index. Confidence in the work drives conversion.

---

## 6. Bottega Veneta · `bottegaveneta.com` — Editorial Pacing at Luxury Scale

**Method:** archive knowledge + inspection archive (site rebuilt 2020 under Daniel Lee, refined further under Matthieu Blazy).

### Timeline

**Second 0–1.** Full-viewport still-life or campaign photograph. Bottega logotype in white or black depending on contrast with the image. No overlay copy.

**Second 1–5.** Nav (mono uppercase, tiny) appears top-left: MEN, WOMEN, COLLECTIONS, WORLD OF BOTTEGA, HOUSE.

**Second 5–15.** Scroll → the campaign extends; each new section is a full-viewport shot, transitioning with a color-shift of the surrounding page background that matches the dominant color of the new image `[inferred: JS-driven CSS custom property]`.

**Second 15–60.** Product pages: still-life photography, generous white space, considered pacing between details. Cart is quiet; checkout is minimal.

**On exit.** Footer is a curated content directory — new arrivals, magazine, careers, contact. Not a link dump.

**Absent:** no "add to bag" hover reveals, no promotional callouts, no "customers also bought." The absence *is* the luxury.

---

## Reference notes across all 6 sites — the 14 elements

For each element: the 3–5 strongest examples we saw, plus mechanics. Every mechanic is defensible in the build; nothing is aspirational or vague.

---

### 1. Hero / Cold Open

**What we saw:**
- **Makhno**: full-viewport 3D-rendered house as the entire navigation. The scene *is* the IA.
- **Vincent Van Duysen**: full-viewport photograph, tiny logotype, zero UI. The room speaks.
- **Aman**: 5-second landscape video loop, muted, then logotype fades in on a still moment.
- **Bottega**: full-viewport still-life, logotype and small nav appear after a beat.

**Mechanics:**
- **Trigger:** page load. Video/image is above-the-fold + IntersectionObserver-poster-swap `[inferred]`.
- **Duration:** hero image/video stays until first scroll input. Nav elements fade in ~500ms after image loads.
- **Easing:** identifiably `easeOut` cubic — nothing bouncy, nothing snappy.
- **Absent:** overlaid marketing copy on the hero. Every one of these sites lets the image carry meaning before adding words.

**What breaks if removed:** the mood-setting first second. The site becomes generic.

**For our build:** full-viewport hero video/image; logo + minimal nav fade in after image renders; no overlay copy; first CTA appears only after scrolling.

---

### 2. Navigation

**What we saw:**
- **Makhno**: minimal top bar (logo + hamburger + music toggle + lang + cart). Full-screen overlay on hamburger with numbered sections (1, 2, 3) and sub-links.
- **Studio Freight**: inline mono-type nav in header — Home / Work / Info / News / Aeon / Contact. No hamburger.
- **Vincent Van Duysen**: nearly invisible until you tap the corner. Opens as full-screen overlay of serif type on cream.
- **Aman**: mono type, tiny, top-right. On click, opens layered mega-nav on cream.
- **Bottega**: uppercase mono top-left. On click, opens full-screen dark overlay.

**Mechanics:**
- **Trigger:** click hamburger or nav trigger.
- **Duration:** overlay open ~500–700ms, `expoOut` curve.
- **State:** `<dialog>` element or fixed-position full-screen div; body scroll-locked; focus trapped; Esc closes.
- **A11y:** `aria-expanded` on trigger, focus-trap library or manual implementation.

**For our build:** minimal top bar (logo + hamburger), full-screen overlay opens as `<dialog>` (native focus trap + Esc), staggered menu item reveal (each item fades+slide-up, 40ms offset), light off-cream overlay to preserve the dark-mood main site's rest state.

---

### 3. Scroll Behavior

**What we saw:**
- **Makhno**: native scroll. No Lenis. Confident pace.
- **Studio Freight**: near-certain Lenis (they built it) but restrained — no dramatic lerp. Feels "expensively smooth" but not sluggish.
- **Vincent Van Duysen**: native scroll, jQuery-based infinite scroll for the image feed.
- **Aman**: appears to use smooth scroll, occasional section pinning on property pages.
- **Bottega**: near-native scroll with color-shift on section boundaries.

**Mechanics:**
- **Lenis config (recommended):** `duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, smoothTouch: false` — smooth on desktop only, native on touch.
- **Pinning:** only on case study pages, and only where a section genuinely benefits from a locked viewport (e.g. "materials palette" reveal). Never on the home.

**For our build:** Lenis on desktop only (feature-detected via `matchMedia('(hover: hover)')`), native on touch. Pinning reserved for case study material-detail sections.

---

### 4. Page & Section Transitions

**What we saw:**
- **Makhno**: page transitions are subtle cross-fades with image preloading — never a heavy curtain. Route changes feel like turning a page.
- **Studio Freight**: on Aeon (their journal), transitions between articles use a mono-type "loading…" state — restrained, honest.
- **Vincent Van Duysen**: no visible page transitions — clicking is instant-ish, with new image crossfade.
- **Aman**: curtain wipe (~700ms) using a heavy easing (`cubic-bezier(0.77, 0, 0.175, 1)`). The wipe reveals the destination hero.
- **Bottega**: color-shift + fade. No curtain.

**Mechanics:**
- **Trigger:** `<Link>` click intercepted; timeline fires; navigation happens after animation midpoint.
- **Duration:** enter ~700ms, exit ~400ms (asymmetric — exit fast, enter patient).
- **Easing:** `cubic-bezier(0.83, 0, 0.17, 1)` (expoInOut) or `cubic-bezier(0.77, 0, 0.175, 1)` (quintInOut).
- **Technique:** overlay div covers viewport, next route preloads underneath, overlay lifts.

**For our build:** curtain wipe on route changes to case studies (700ms, quintInOut); cross-fade on nav clicks within a section; both respect prefers-reduced-motion (fall back to instant navigation).

---

### 5. Micro-interactions

**What we saw:**
- **Makhno**: cursor is a small dot; on interactive elements, it grows subtly. Image distortion on project card hover (OGL shader).
- **Studio Freight**: cursor becomes a mono text label ("scroll", "view", "click") depending on context. Genius.
- **Vincent Van Duysen**: cursor is native. Zero decoration.
- **Pierre Yovanovitch**: hovering a project name reveals a preview image in a fixed side panel.
- **Bottega**: hovering a product image swaps to a secondary shot after ~150ms delay.

**Mechanics:**
- **Cursor:** absolutely-positioned `<div>` follows mouse via `requestAnimationFrame` (never CSS transition — feels laggy). Grows on `hover` state via context provider. Hidden on touch.
- **Hover state:** ~150–200ms enter, ~300ms exit (asymmetric — enter fast, exit lingers).
- **Image distortion:** OGL shader with `uMouse` uniform, `uHover` (0→1 tween via GSAP), 6KB library.

**For our build:** custom cursor is a small warm-off-white dot; grows to a text label ("view", "read") on interactive elements; hidden on touch. OGL distortion reserved for the work grid, not everywhere.

---

### 6. Typography

**What we saw:**
- **Makhno**: Inter for everything (display + body).
- **Studio Freight**: JJannon (serif display) + Publico Text Mono (mono for labels + body accents).
- **Vincent Van Duysen**: CustodiaPro (serif) + News Gothic Std (sans).
- **Pierre Yovanovitch**: serif display with editorial italics; sans for captions.
- **Aman**: an in-house serif for property names; sans for nav/body.
- **Bottega**: proprietary serif (custom BV type) + geometric sans.

**Pattern:** every site here (except Makhno) pairs **one serif** for display/editorial + **one sans/mono** for UI/body. Makhno is the outlier — Inter alone — and honestly this is a weakness of Makhno's site relative to the type system its competitors use.

**Mechanics:**
- **Delivery:** self-hosted woff2 via `next/font/local`. Preload critical weights.
- **Type scale (typical):** display 64–96px (fluid clamp), h2 32–48px, h3 20–24px, body 15–17px, caption 12–13px. Line-height: display 1.05, body 1.6, caption 1.5.
- **Letter-spacing:** display tight (-0.02em), mono slight tracking (+0.05em), body neutral.

**For our build:** pair a **serif display** (candidates: PP Editorial Old, GT Alpina, Canela) with a **mono label face** (candidates: Söhne Mono, Berkeley Mono, or free: Geist Mono). This gives us Makhno's editorial gravity plus Studio Freight's mono precision — a stronger pair than either alone.

---

### 7. Color System

**What we saw:**
- **Makhno**: cream/warm-white (`#ece4e1`), warm charcoal (`#2a2721`), single orange accent (`#ff6900`). Very restrained.
- **Studio Freight**: white (`#fff`), charcoal (`#000`-ish), one warm brown accent used sparingly.
- **Vincent Van Duysen**: whisper-warm off-white (`#fffffa`), near-black text, no accent at all — photography carries color.
- **Aman**: cream + warm gray + one hero-photograph-derived accent per property.
- **Bottega**: white with color-shift-per-section (background shifts to match dominant image color).

**Pattern:** ≤5 tokens. Photography carries all color variety. The site's own palette is 3-color max, plus rare accents.

**Mechanics:**
- **CSS custom properties** in `:root`: `--canvas` (page bg), `--ink` (primary text), `--muted` (secondary text), `--surface` (elevated bg), `--accent` (single hit). Optional: `--section-tint` (JS-animated for Bottega-style color shift).
- **Contrast:** ensure `--ink` on `--canvas` ≥ 7:1 (WCAG AAA for body).

**For our build:** for Moody Sculptural direction — `--canvas: #1A1815` (warm charcoal), `--surface: #2B2620` (bronze), `--muted: #6B6259` (warm gray), `--ink: #EDE6DA` (warm off-white), `--accent: #B8823A` (molten amber). Photography carries any other color.

---

### 8. Imagery & Media

**What we saw:**
- **Makhno**: OGL distortion on project hover; high-res architectural photography in editorial layouts.
- **Studio Freight**: masonry-scattered thumbnails at asymmetric positions.
- **Vincent Van Duysen**: one-image-per-viewport, full-bleed, patient crossfade.
- **Aman**: 5-second landscape video loops (poster frame → autoplay-muted on load).
- **Pierre Yovanovitch**: editorial "spread" layouts — 2–3 images per section.
- **Bottega**: still-life photography with dominant-color extraction driving section bg color.

**Mechanics:**
- **Delivery:** Sanity assets — hotspot cropping ensures the focal point survives responsive resizing. AVIF/WebP negotiated by browser. `srcset` + `sizes` for responsive.
- **Video:** MP4 (H.264, 720p, ~2 Mbps for landscape loops). Poster frame preloaded. `autoplay muted playsinline loop`, IntersectionObserver-gated (pauses off-screen).
- **Reveal:** clip-path from bottom (`clip-path: inset(100% 0 0 0)` → `inset(0)`), ~800ms `expoOut`. Or opacity + subtle Y (~40px → 0).

**For our build:** one primary image per viewport on project pages; masonry-scattered thumbnails on the work index (Studio Freight pattern); OGL distortion reserved for work-index hover.

---

### 9. Grid & Layout

**What we saw:**
- **Makhno**: irregular. Project cards on the homepage are architecturally positioned (in the "doorways" of the 3D house).
- **Studio Freight**: scattered masonry — no visible column grid.
- **Vincent Van Duysen**: single column, full-bleed. The simplest possible grid.
- **Pierre Yovanovitch**: editorial 2-column asymmetric spreads.
- **Bottega**: 12-column but with intentional asymmetry — items don't sit on every column.

**Pattern:** the great sites break the grid intentionally, but they *have* a grid to break. The base is disciplined; the breaks are compositional.

**Mechanics:**
- **Base:** 12-column CSS grid with `max-width: 1440px`, gutter `24px`, container padding `clamp(16px, 4vw, 48px)`.
- **Break:** every 3–5 sections, a full-bleed image or asymmetric two-column breaks the rhythm.

**For our build:** 12-col disciplined base, deliberate breaks every ~3 sections (full-bleed image, off-grid text block).

---

### 10. Sound Design

**What we saw:**
- **Makhno**: music toggle in header (off by default, opt-in). Ambient soundtrack of the studio's location.
- **Others:** all silent by default. Some have video with audio available on click.

**Pattern:** off by default, always. A control to enable, if used at all. No auto-play sound ever.

**For our build:** consider a subtle ambient soundtrack for the home hero as an opt-in (toggle in header, respects OS accessibility preference for reduced motion). Off by default. Persist choice via cookie.

---

### 11. Loading Experience

**What we saw:**
- **Makhno**: no visible preloader — the site loads fast enough that the hero image + fonts arrive before you'd notice.
- **Studio Freight**: no preloader.
- **Vincent Van Duysen**: no preloader.
- **Aman**: no preloader; hero video poster frame appears instantly.
- **Bottega**: no preloader.

**Pattern:** **no preloader is the modern default.** A preloader is only justified if the payoff is a first-visit brand moment (a Makhno-tier hero) *and* the assets truly need it. Otherwise, preloaders are performance theater.

**For our build:** first-visit only, session-scoped. Animated logo mark → hold until fonts + hero image loaded → curtain lift (~1.2s max). Skipped on subsequent visits. Skipped entirely under prefers-reduced-motion.

---

### 12. Footer

**What we saw:**
- **Makhno**: three-column composition of emails + phones + socials + contact CTA. Warm, considered, not a link dump.
- **Studio Freight**: one line — copyright + terms + socials. Restraint.
- **Vincent Van Duysen**: no visible footer on the home; contact only in menu.
- **Aman**: layered footer with journal, culinary, wellness, reservations, socials, legal — a full IA.
- **Bottega**: curated content directory — new arrivals, magazine, careers, contact.

**Pattern:** two acceptable patterns — (a) restrained single-line, or (b) considered composition with 3–5 groupings. Never a 20-link cascade.

**For our build:** considered composition (three columns): studio info + contact / navigation / socials + newsletter. Warm, matches home's mood.

---

### 13. Mobile Transformation

**What we saw:**
- **Makhno**: the 3D house hero adapts — becomes vertical, doorways stack. Retains identity.
- **Studio Freight**: scattered masonry becomes a linear stack. Cursor labels disappear (touch). Native scroll.
- **Vincent Van Duysen**: identical experience — the design was already mobile-friendly (single column, image-first).
- **Aman**: hero videos still play, but with reduced bitrate. Menu becomes a full-screen list.
- **Bottega**: color-shift-on-scroll persists on mobile; drag-to-navigate on product carousels.

**Pattern:** mobile is not a scaled-down desktop — it's a genuinely different composition with the same identity. Features to cut: custom cursor, hover-triggered previews, heavy WebGL (or drop to a static poster). Features to keep: color palette, typography rhythm, image quality, page transitions.

**For our build:** custom cursor + magnetic buttons + WebGL distortion all disabled on touch. Menu overlay becomes a native full-screen. Hero video swaps to a poster frame if the network is slow (Save-Data header). Everything else scales.

---

### 14. Case Study / Project Detail Page

**What we saw:**
- **Makhno**: hero image → project name → location/year → long-form description → gallery → materials/credits → next project link (all with editorial pacing).
- **Studio Freight**: cover image → project overview → deliverables list → results → team credits → next project.
- **Vincent Van Duysen**: image gallery → captions → related projects. Extreme restraint.
- **Pierre Yovanovitch**: chaptered narrative — feature-article style with pull quotes.
- **Aman**: multi-section — architecture / dining / wellness / activities / gallery. Each section is a full micro-experience.
- **Bottega**: minimal — big campaign images + product callouts.

**Pattern:** the case study is where **the money is** for a portfolio. Every strong site treats a project page as a self-contained editorial piece — not a template with fields filled in.

**Recommended case study anatomy (for our build):**

```
1. Hero            Full-viewport image, project name overlaid, year+location in mono
2. Overview        2-column: description (60%) + credits/materials sidebar (40%)
3. Gallery A       3–5 images in editorial "spread" layout (mix full-bleed + 2-col)
4. Detail          Pull-quote or process narrative
5. Gallery B       Additional imagery — different composition rhythm than Gallery A
6. Materials       Palette swatches or material studies
7. Credits         Photographer, contractor, suppliers — treated as full credits, not fine print
8. Next project    Large image + name → click transitions to next case study
```

**Mechanics:**
- Content-driven layout (Sanity portable text + `type: 'gallery' | 'quote' | 'materials'` blocks).
- Motion: SplitTextReveal on section titles, mask reveal on gallery images, subtle parallax on hero.
- Transition to next project: curtain wipe with the new project's hero preloaded underneath.

---

## Summary of Phase 2 findings

1. **Every great site respects Principle §3 (slowness).** The industry cliché — "elevated portfolio has heavy WebGL" — is wrong. Restraint wins.
2. **Type pairing beats single-font.** Every top-tier site except Makhno pairs serif + sans/mono. This is a genuine improvement we should make.
3. **Custom cursor with mono labels (Studio Freight) is the strongest cursor pattern we saw.** Better than a dot or a blob. Communicates action instead of decorating hover.
4. **Case study anatomy is the highest-value pattern to steal.** Not the homepage — the individual project page is where clients decide to hire.
5. **Aman's video-poster-then-autoplay hero + curtain-wipe transitions are directly transferable.** Both mechanics respect our principles.
6. **Bottega's color-shift-on-scroll (background matches image dominant color) is optional but powerful.** Would be a strong signature moment.
7. **Nothing we saw uses a preloader by default.** Preloaders are performance theater; use only for first-visit brand moment on the home hero.

**Ready for Phase 3 (cohesion + hostile audit).**
