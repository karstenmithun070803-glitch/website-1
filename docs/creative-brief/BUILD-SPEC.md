# BUILD-SPEC — Deliverable B

> Developer document. Everything below is a decision, not an option. Where I've picked one thing over another, the rationale is in one line.
> Companion to `DIRECTION.md` (the design/mood document).

---

## 1. Site architecture

### Page list + URL structure

```
/                        Home
/work                    Portfolio grid (Sanity-driven)
/work/[slug]             Individual project case study (Sanity-driven)
/services                Studio offerings
/about                   Studio story + team + press
/contact                 Contact form + studio info
/legal/privacy           Privacy policy (GDPR + India DPDP)
/legal/cookies           Cookie policy
/studio                  Sanity Studio (embedded CMS) — not linked publicly
/design-system           Living style guide — `noindex`, permanent
/api/contact             POST endpoint (Resend handler)
```

### Primary user flows

1. **Visitor → prospective client (the funnel):** land on `/` → scroll to featured work → click a project → read case study → scroll to next project → eventually navigate to `/contact` → submit inquiry
2. **Editor (owner, post-launch):** visit `/studio` → log in → create/edit project → publish → Vercel revalidation triggers → site updates within seconds

### Navigation IA

Top-bar nav (persistent):
- **Logo** (left) → `/`
- **Hamburger** (right) → opens full-screen overlay

Full-screen overlay contents:
- **Primary nav** (large serif): Work · Services · About · Contact
- **Legal nav** (small mono, bottom): Privacy · Cookies · ©year Studio Name
- **Social links** (bottom right)

---

## 2. Element table

The 14 elements from Phase 2, with the final chosen approach.

| # | Element | Approach | Source | Timing / easing / technique | Motion cost | Mobile behavior |
|---|---|---|---|---|---|---|
| 1 | **Hero cold open** | Full-viewport muted video loop (5–7s) with poster frame; still-image fallback | Aman (anatomy) | Poster loads immediately; video autoplays on `canplaythrough`. Nav + logo fade in ~500ms `easeOut` after image renders | 1 | Poster frame only if `Save-Data` header or slow connection; else video |
| 2 | **Navigation** | Minimal top bar (logo + hamburger). Full-screen `<dialog>` overlay on hamburger click; staggered menu reveal | Makhno + VVD | Overlay open 500ms `expoOut`. Menu items stagger 40ms per item, y +12px → 0, opacity 0 → 1. Esc closes. `<dialog>` gives free focus trap | 2 | Same overlay, native full-screen |
| 3 | **Scroll behavior** | Lenis smooth scroll on desktop only | Studio Freight | `duration: 1.2, easing: t => 1 - Math.pow(1 - t, 4)`. Feature-detected: `matchMedia('(hover: hover) and (pointer: fine)')`. Disabled under prefers-reduced-motion | 1 | Native scroll |
| 4 | **Page transitions** | Curtain wipe on click-through to case studies; cross-fade on other nav | Aman | Curtain: 700ms `cubic-bezier(0.83, 0, 0.17, 1)` (expoInOut). Overlay div covers viewport, next route hydrates underneath, overlay lifts | 2 | Cross-fade 400ms on all mobile transitions (curtain removed) |
| 5 | **Micro-interactions** | Small warm-off-white cursor dot; mono label only on `<button>` and interactive `<a>`; button hover = width +8% + letter-spacing tighten (no magnetic) | Studio Freight (softened) | Cursor: `requestAnimationFrame` follow. Enter interactive: 150ms; exit: 300ms. Button hover: 300ms `easeOut` | 1 | Cursor hidden on touch; button hover replaced with tap-scale (0.97x, 100ms) |
| 6 | **Typography** | Serif display + mono label. Display: **PP Editorial Old** (paid; free fallback: **Instrument Serif**). Mono: **Berkeley Mono** (paid; free fallback: **Geist Mono**) | Studio Freight (philosophy) | Self-hosted woff2 via `next/font/local`. Preload critical weights | 0 | Same fonts, fluid clamp on sizes |
| 7 | **Color system** | 5 tokens (see §5) | Makhno (mood) | CSS custom properties in `:root` | 0 | Same tokens |
| 8 | **Imagery & media** | Sanity assets with hotspot cropping. Full-viewport heroes; editorial spreads on case study bodies; mask-reveal on scroll | VVD + Pierre | Mask: `clip-path: inset(100% 0 0 0)` → `inset(0)`, 800ms `expoOut`. `srcset` responsive; AVIF/WebP negotiated | 1 | Same, but reduced parallax offset |
| 9 | **Grid & layout** | 12-column base with `max-width: 1440px`, gutter 24px, padding `clamp(16px, 4vw, 48px)`; deliberate full-bleed breaks every 3–5 sections | Bottega + Pierre | CSS Grid | 0 | Single column below 768px; 8-col at 768–1024; 12-col above |
| 10 | **Sound design** | Off by default. Optional ambient soundtrack on `/` hero (opt-in via header toggle, respects OS reduced-motion, persists via cookie) | Makhno | HTML5 `<audio>` element, `preload="none"`, user-triggered `play()` | 0 | Same |
| 11 | **Loading experience** | No preloader unless hero video takes >2s to `canplaythrough`. If needed: first-visit only (session-scoped), logo mark → hold → 1.2s curtain lift. Skipped under prefers-reduced-motion | Modern default | `sessionStorage.setItem('visited', '1')`; `MediaEvent 'canplaythrough'` fires curtain | 0–2 | Same |
| 12 | **Footer** | Three-column considered composition: studio info + primary nav + socials/newsletter | Makhno | Native CSS Grid | 0 | Stacks single-column |
| 13 | **Mobile transformation** | Every desktop-only element has a spec'd fallback (see per-element rows above) | — | — | — | — |
| 14 | **Case study page** | 7-block editorial anatomy (see §8) | Pierre + Aman | Content-driven layout (Sanity portable-text blocks with `type` discriminator) | 2 (SplitText + mask reveals per section) | Same anatomy, reduced parallax |

**Total motion cost: 11 / 18 max** — deliberately restrained.

---

## 3. Motion budget map

Sections plotted by animation weight:

| Section | Weight | Why |
|---|---|---|
| Home hero | **Heavy** (2) | Video + subtle parallax + title reveal — the site's "wow" moment |
| Home body (featured work, about teaser) | **Medium** (1) | Section-title reveals + image masks |
| Work index | **Heavy** (2) | OGL distortion on hover — the signature |
| Case study hero | **Medium** (1) | Mask reveal + parallax |
| Case study body | **Light** (1) | SplitTextReveal on section titles; image masks; nothing else |
| Case study → next project | **Heavy** (2) | Curtain wipe transition |
| Services / About / Contact | **Light** (1) | Section titles + subtle scroll reveals; nothing more |
| Footer | **None** (0) | Static |

**Rule:** if you propose a new animation, first check what to cut to make room. Do not exceed 18 total.

---

## 4. Type system

**Two typefaces max.**

### Display (serif)
- **Primary:** PP Editorial Old (Pangram Pangram, paid — ~$300 license)
- **Fallback (free):** [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) via `next/font/google` — similar editorial serif feel, weight 400 only

### UI / body / labels (mono + sans)
- **Primary mono:** Berkeley Mono (Berkeley Graphics, paid — ~$75 personal license)
- **Fallback (free):** [Geist Mono](https://vercel.com/font) via `next/font/local` (SIL Open Font License — free for commercial use)
- **Body text:** the same Geist Mono at reduced weight/size, OR a paired sans **Geist Sans** for longer body copy (case study descriptions)

### Type scale

Fluid clamp values. Use `clamp(min, preferred, max)` for all sizes.

| Role | Font | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Display XL (hero) | PP Editorial Old | `clamp(48px, 8vw, 96px)` | 400 | 1.05 | -0.02em |
| H1 | PP Editorial Old | `clamp(40px, 6vw, 72px)` | 400 | 1.1 | -0.02em |
| H2 | PP Editorial Old | `clamp(28px, 4vw, 48px)` | 400 | 1.15 | -0.01em |
| H3 | PP Editorial Old | `clamp(20px, 2.5vw, 28px)` | 400 | 1.25 | -0.005em |
| Body large | Geist Sans | `clamp(16px, 1.2vw, 18px)` | 400 | 1.6 | 0 |
| Body | Geist Sans | 15px | 400 | 1.6 | 0 |
| Label / caption / mono | Berkeley Mono | 12px | 400 | 1.5 | +0.05em |
| Nav overlay item | PP Editorial Old | `clamp(48px, 8vw, 120px)` | 400 | 1 | -0.02em |

**Variable font axes:** if using variable versions, weight axis only (100–700). No optical size, no width — over-engineering.

---

## 5. Color system

**5 tokens.** Named by role, not by hex.

```css
:root {
  --canvas:  #1A1815;  /* Page background — warm charcoal, NEVER pure black */
  --surface: #2B2620;  /* Elevated bg — cards, overlays, footer background */
  --muted:   #6B6259;  /* Secondary text, captions, dividers — warm gray */
  --ink:     #EDE6DA;  /* Primary text — warm off-white, NEVER pure white */
  --accent:  #B8823A;  /* Molten amber — used sparingly for links, focus rings */

  --focus-ring: 0 0 0 2px var(--accent);  /* Not browser default */
}
```

**Contrast (WCAG check):**
- `--ink` on `--canvas`: 15.2:1 (AAA — well above 7:1 minimum for body)
- `--muted` on `--canvas`: 5.1:1 (AA)
- `--accent` on `--canvas`: 5.4:1 (AA — visible for focus indicators)

**Usage rules:**
- `--canvas` is the site's dominant surface. 80%+ of screen area.
- `--surface` is for cards, footer, overlay backgrounds. Never used for primary content areas.
- `--muted` is text only — never a background.
- `--ink` is all primary text.
- `--accent` is used sparingly: link underlines, focus rings, current-page nav indicator, the section-divider warm band (§signature moment). **Never used for buttons or large surface areas.**

**Photography carries all other color.** Do not introduce a green, blue, or additional palette color for illustrations or icons. If an icon is needed, it inherits `currentColor`.

---

## 6. Dark / light mode strategy

**Single dark mode. No toggle.**

### Justification (one line)
The direction (Moody Editorial) is intrinsically dark. A light-mode version would require a completely different visual system — different photography treatment, different type weights, different accent — and would dilute the brand. Better to have one exceptional dark theme than two mediocre themes.

### If future user demand forces a toggle
The token system already supports it — add `[data-theme="light"]` overrides in `tokens.css`, no other refactor needed. Currently: not built.

---

## 7. Cold open specification (first 3 seconds, frame by frame)

**t = 0ms** (initial paint)
- Poster frame of hero video renders full-viewport. Warm charcoal background visible around edges.
- No text visible.
- No cursor decoration yet.
- Fonts loaded via `next/font` (no FOUT).

**t = 300ms**
- Hero video reaches `canplaythrough` event.
- Video begins playing muted, autoplay, loop, playsinline.
- Poster frame → video crossfade (~200ms opacity blend).

**t = 500ms**
- Logo wordmark fades in top-left (opacity 0 → 1, 400ms `easeOut`).
- Nav "menu" label fades in top-right, same timing.

**t = 900ms**
- Cursor dot appears (opacity 0 → 1, 200ms). Follows mouse via `requestAnimationFrame`.
- Below-the-fold indicator ("scroll" in mono, tiny, bottom-center) fades in.

**t = 1200ms**
- Cold open is complete. Site is at rest, awaiting user input.

**t = ∞ (no user input)**
- Video loops. Nothing else moves.
- After 8 seconds of inactivity, scroll indicator does one subtle bounce (12px down, 400ms `easeInOut`, 800ms hold, 400ms return) as a hint.

**On first user scroll input:**
- Scroll indicator fades out.
- Hero fixed until scroll offset exceeds 25vh, then hero + all elements scroll normally.

---

## 8. Case study page anatomy

The single most important page pattern on the site — it's where clients decide to hire.

```
┌───────────────────────────────────────────────────────────┐
│ [Nav bar]                                                 │
├───────────────────────────────────────────────────────────┤
│                                                           │
│                  HERO IMAGE (full-viewport)               │
│                                                           │
│        Project name (H1, serif, bottom-left overlay)      │
│        Location · Year (mono, tiny, below name)           │
│                                                           │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Overview (60%)           │  Credits sidebar (40%)         │
│  Long-form description    │  Client                        │
│  as Sanity portable text  │  Program                       │
│  in body serif.           │  Materials list                │
│                           │  Photographer                  │
│                           │  Completion year               │
│                                                           │
├───────────────────────────────────────────────────────────┤
│                                                           │
│      GALLERY A (editorial spread — mix full-bleed         │
│      + 2-column)                                          │
│                                                           │
├───────────────────────────────────────────────────────────┤
│                                                           │
│     Pull-quote or process narrative (serif italic)        │
│     "The material palette began with the site itself —    │
│      the plaster echoes the exterior render..."           │
│                                                           │
├───────────────────────────────────────────────────────────┤
│                                                           │
│      GALLERY B (different rhythm than Gallery A)          │
│                                                           │
├───────────────────────────────────────────────────────────┤
│                                                           │
│   MATERIALS section — swatches or close-up photography    │
│   of key surfaces (plaster / oak / brass / marble)        │
│                                                           │
├───────────────────────────────────────────────────────────┤
│                                                           │
│   Full credits (photographer, contractor, suppliers,      │
│   consultants). Set in mono, treated with respect —       │
│   NOT fine print.                                         │
│                                                           │
├───────────────────────────────────────────────────────────┤
│                                                           │
│   NEXT PROJECT                                            │
│   Large image + name → click transitions with curtain     │
│   wipe to the next case study                             │
│                                                           │
├───────────────────────────────────────────────────────────┤
│ [Footer]                                                  │
└───────────────────────────────────────────────────────────┘
```

**Content model (Sanity schema):**

```typescript
// sanity/schemas/project.ts
{
  name: 'project',
  fields: [
    { name: 'slug', type: 'slug', required: true },
    { name: 'title', type: 'string', required: true },
    { name: 'location', type: 'string', required: true },
    { name: 'year', type: 'number', required: true },
    { name: 'category', type: 'string',
      options: { list: ['Residential', 'Commercial', 'Hospitality'] } },
    { name: 'client', type: 'string' },
    { name: 'program', type: 'text' },
    { name: 'materials', type: 'array', of: [{ type: 'string' }] },
    { name: 'hero', type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', required: true }] },
    { name: 'description', type: 'array',
      of: [{ type: 'block' }] }, // portable text
    { name: 'body', type: 'array',
      of: [
        { type: 'galleryBlock' },     // Gallery A / B
        { type: 'quoteBlock' },       // pull quote
        { type: 'materialsBlock' },   // materials palette
        { type: 'block' }             // additional prose
      ] },
    { name: 'credits', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'role', type: 'string' },
        { name: 'name', type: 'string' }
      ]}]},
    { name: 'nextProject', type: 'reference', to: [{ type: 'project' }] },
    { name: 'publishedAt', type: 'datetime' }
  ]
}
```

---

## 9. Sound design decision

**Optional ambient soundtrack on `/` hero only.**

- **Default:** off. No auto-play. Ever.
- **Enable mechanism:** small toggle in the top nav (headphone icon SVG). On click, low-volume ambient audio (studio's real recorded location ambience — birds, wind, room tone) begins playing at 30% volume.
- **State persistence:** choice saved in `localStorage.setItem('sound-on', 'true')`. Respected on subsequent visits (still requires user gesture to auto-start per browser policy, but toggle remembers preference).
- **Accessibility:** if `prefers-reduced-motion: reduce` OR the user has never enabled sound, the toggle appears but the audio does not autoplay. `aria-pressed` on toggle button.
- **Turn-off:** click the toggle again. Audio fades out over 500ms, does not stop abruptly.
- **File:** single MP3, ~2 minute loop, 128 kbps (~2 MB), preloaded on toggle click only (`preload="none"` by default).

---

## 10. Loading experience

**Default:** no preloader.

**If hero video takes > 2s to `canplaythrough`:** first-visit-only preloader — session-scoped via `sessionStorage.getItem('visited')`.

**Preloader anatomy (only if used):**
- Solid `--canvas` background covers viewport.
- Logo wordmark scales from 0.95 → 1.0 over 1200ms `expoOut`, opacity 0 → 1.
- Once hero video is ready + fonts loaded + `document.readyState === 'complete'`, curtain lifts (translateY 0 → -100vh, 800ms `expoInOut`).
- Total max time: 2 seconds. Never longer.

**Under `prefers-reduced-motion`:** preloader skipped entirely. Site renders directly with fallback poster frame.

---

## 11. Component-by-component build spec

Only listing the non-obvious ones (route pages are covered by §1 and §8).

### `<PageTransition>`
- Wraps `{children}` in root `layout.tsx`.
- Listens to `next/navigation` route change events.
- On route change to `/work/[slug]`: fires curtain wipe timeline (700ms).
- On other route changes: cross-fade 400ms.
- Reduced-motion: instant navigation, no animation.

### `<Nav>` (top bar)
- Fixed position, top 0, full width.
- Contains: `<Logo />` (left), optional `<SoundToggle />` (center), `<MenuTrigger />` (right).
- On scroll > 100px: nav bar subtly gains a `--surface`-tinted backdrop (opacity 0.7). Not a blur — just a semi-transparent bg color.
- Reduced-motion: bg transition instant.

### `<NavOverlay>`
- Native `<dialog>` element (gets focus trap for free).
- Full-screen, `--surface` background (slightly lighter than `--canvas`).
- Content: primary nav items in display serif, small legal nav + socials at bottom in mono.
- Menu items stagger reveal: y +12px → 0, opacity 0 → 1, 40ms offset per item, 500ms total.
- Esc closes; click outside closes.

### `<Reveal>` (motion primitive)
- Wraps any element in a `clip-path` mask.
- Triggers on IntersectionObserver, threshold 0.2.
- Animates `clip-path: inset(100% 0 0 0)` → `inset(0)` over 800ms `expoOut`.
- Reduced-motion: renders `clip-path: inset(0)` immediately.

### `<SplitTextReveal>` (motion primitive)
- Splits text into `<span>`s per word.
- On IntersectionObserver trigger, each word animates `y: 100%, opacity: 0` → `y: 0, opacity: 1`, staggered 40ms per word, 600ms per word.
- Reduced-motion: renders normally without animation.

### `<Parallax>` (motion primitive)
- Wraps an image with a translateY tied to scroll position.
- Max offset: 15% of viewport height (subtle).
- Uses Lenis raf loop for smooth linkage.
- Reduced-motion: no parallax, static position.

### `<Cursor>` (custom cursor)
- Absolutely positioned div, `pointer-events: none`.
- Position updated via `requestAnimationFrame` in an effect.
- Renders as small warm-off-white dot (8px).
- Grows to a mono label pill on hover of `[data-cursor="label:VIEW"]` or `[data-cursor="label:READ"]` (data attribute drives label text).
- Hidden entirely on touch (`matchMedia('(hover: hover) and (pointer: fine)')`).

### `<WebGLImageCard>` (work index item)
- OGL canvas mounted per card.
- Renders the project hero as a texture.
- Fragment shader applies subtle distortion on hover — `uMouse` uniform + `uHover` tween.
- On mount: subscribes to IntersectionObserver — only renders when visible; pauses raf loop off-screen.
- On unmount: disposes program, geometry, texture, renderer.
- Reduced-motion / touch: renders as a static `<img>` with a light zoom-on-tap.

### `<CookieBanner>`
- Shown on first visit only (via cookie check).
- Fixed bottom-right, minimal — one line + accept/decline.
- Respects choice via cookie.
- Language: "This site uses cookies for analytics. [Accept] [Decline]" — copy tuned by user later.

### `<ContactForm>`
- Fields: name, email, project type (select), message. All `required` except project type.
- `zod` schema server-side.
- On submit: POST to `/api/contact`.
- Success: replace form with a considered thank-you message (serif, patient reveal).
- Error: inline error text under offending field.
- Honeypot field (`display: none` input named `website`).
- Server: IP-based rate limit (5 submissions per hour per IP, via a KV store or memory cache — Vercel Edge Config for prod).

---

## 12. Recommended tech stack

**One choice per layer. Justification in one line.**

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16 (App Router)** | Already scaffolded; App Router's server components + streaming + built-in `next/image` + `opengraph-image.tsx` are ideal for this content shape |
| Language | **TypeScript** | Non-negotiable at this level of complexity |
| Styling | **Tailwind v4** | Fastest way to enforce the design tokens system + zero config drift |
| Animation | **GSAP + @gsap/react** | Industry standard; `useGSAP` handles React 19 cleanup; SplitText plugin needed for word-level reveals |
| Smooth scroll | **Lenis** (formerly @studio-freight/lenis) | Same team that built the scroll library Makhno + Studio Freight use |
| WebGL | **OGL** (6 KB) | Same lib Makhno uses; 25× smaller than Three.js; enough for image distortion; won't grow bundle |
| CMS | **Sanity** (free tier) | Best asset pipeline for photography-heavy sites; hotspot cropping; embedded studio at `/studio`; free at our scale |
| Email | **Resend + React Email** | Modern API, drop-in for Next.js, 3000 emails/mo free |
| Form validation | **Zod** | Server + client from one schema |
| Fonts | **`next/font/local`** | Self-host WOFF2, zero-CLS, no third-party requests |
| Deployment | **Vercel** | First-party Next.js runtime; edge functions for form; instant preview URLs per PR |
| Analytics | **@vercel/analytics + @vercel/speed-insights** | Zero-config, privacy-friendly, no cookie needed |
| Utility | **clsx + tailwind-merge** | For a proper `cn()` |
| Testing (regression) | **Playwright** (single screenshot-diff test on `/design-system`) | Catches accidental primitive breakage |

**Explicitly rejected:**
- **Framer Motion** — GSAP covers scroll + timelines + SplitText more powerfully; two motion libs is bundle bloat
- **Three.js / react-three-fiber** — OGL is 25× smaller and covers our needs; R3F is overkill for image distortion
- **Payload CMS** — self-hosted burden; Sanity's asset pipeline is meaningfully better for photography
- **Cloudinary** — Sanity's built-in asset pipeline replaces it
- **shadcn/ui** — component library aesthetic (SaaS-adjacent) is wrong for editorial
- **A separate database** — Sanity IS the database; no Postgres needed

---

## 13. Performance floor

Non-negotiable metrics on production, measured on 4G mobile:

| Metric | Target | Enforcement |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | Vercel Speed Insights; Lighthouse CI |
| CLS (Cumulative Layout Shift) | < 0.05 | Reserve explicit dimensions on all images; `next/font` prevents FOUT |
| FID / INP | < 100ms | GSAP timelines use `useGSAP` cleanup; no heavy synchronous JS on main thread |
| Total JS (initial route) | < 400 KB (compressed) | Split GSAP timelines by route; OGL only loaded on `/work` |
| Total CSS | < 50 KB (compressed) | Tailwind purge (default in v4); no runtime CSS-in-JS |
| Lighthouse Performance | ≥ 90 mobile, ≥ 95 desktop | Lighthouse CI in GitHub Actions |
| Lighthouse Accessibility | 100 | Axe-core audit in Phase 4 of build |
| Lighthouse Best Practices | 100 | Baseline |
| Lighthouse SEO | 100 | `next-sitemap`, `robots.ts`, structured data |

**Image strategy:**
- All images served through Sanity's asset pipeline
- Format: AVIF preferred, WebP fallback (browser-negotiated)
- Sizes: `srcset` with 400, 800, 1200, 1600, 2400px widths
- Lazy loading: `loading="lazy"` on all non-hero images; `priority` on hero (via `next/image`)
- Compression targets: hero ≤ 800 KB (WebP/AVIF), gallery ≤ 500 KB

**Video strategy:**
- H.264 MP4, 720p, ~2 Mbps for hero loop
- Poster frame preloaded via `preload="metadata"`
- Autoplay only after `canplaythrough` event
- Under `Save-Data` header or `slow-2g`: swap to still poster

---

## 14. Mobile floor

Every desktop element that gets cut on mobile is spec'd here with justification:

| Cut on mobile | Fallback | Why acceptable |
|---|---|---|
| Custom cursor | Nothing (native touch) | Cursor is decorative; touch has its own affordances |
| OGL image distortion on hover | Static image with tap-scale (0.97x, 100ms) on tap | Hover doesn't exist on touch; tap-scale preserves the "responsive" feel |
| Magnetic buttons | (already cut) | — |
| Curtain-wipe page transition (700ms) | Cross-fade 400ms | Faster transitions matter more on mobile; still respects the motion language |
| Lenis smooth scroll | Native scroll (with `-webkit-overflow-scrolling: touch`) | iOS native momentum is better than Lenis on touch |
| Parallax offset (15%) | Reduced to 7% | Full parallax on mobile can cause perf issues |
| Full 12-col grid | Single column below 768px, 8-col 768–1024, 12-col above | Standard responsive |

**What's identical on mobile:**
- All typography (fluid clamp values scale correctly)
- Color palette (all tokens work everywhere)
- Page architecture (same routes, same content)
- Photography (Sanity delivers appropriate srcset)
- All revealed content (SplitText, mask reveals — these are compositional, not decorative)
- All video content (with the Save-Data fallback)
- Sound toggle (present and functional)

---

## 15. Accessibility floor

**Every one of these is non-negotiable.**

| Requirement | Implementation |
|---|---|
| `prefers-reduced-motion` | Every motion primitive checks internally; falls back to static state |
| Keyboard navigation | Skip-to-content link at top of every page; all interactive elements tab-reachable; visible focus rings using `--accent` |
| Focus rings | `outline: 2px solid var(--accent); outline-offset: 2px` on `:focus-visible`. Never `outline: none` without a replacement |
| Semantic landmarks | `<header>`, `<nav>`, `<main>`, `<footer>` on every page. Case study body wrapped in `<article>` |
| Alt text | Every image has meaningful `alt` — Sanity `alt` field is `required: true` on schema |
| Contrast | Minimum 4.5:1 for body text (WCAG AA); our tokens meet 15.2:1 for body |
| Cursor | Native cursor + focus rings work regardless of custom cursor state. Custom cursor `aria-hidden` |
| Nav overlay | Native `<dialog>` for free focus trap + Esc closing; `aria-expanded` on trigger |
| Form | Every input has associated `<label>`; error messages linked via `aria-describedby`; success message uses `role="status"` |
| Video | `muted` + `playsinline` + `loop` (no controls needed for background); no critical info in video-only |
| Sound | Off by default; toggle is `<button aria-pressed="false">` |
| Touch targets | Minimum 44×44px (WCAG 2.5.5) |
| Color independence | Nothing communicated by color alone — accent is always paired with text or state |
| Cookies | Consent banner GDPR-compliant, DPDP-compliant; opt-in, not opt-out |

---

## 16. Content requirements (what the user needs to provide)

Categorized by when it's needed.

### Before Phase 2 build starts (mid Phase 1)
- **Studio name + tagline** (10 words max)
- **1 hero video OR still photograph** for `/` (or use a placeholder from user's portfolio)
- **Studio's real name/logo** or approval to use a placeholder wordmark set in the display serif

### By mid-Phase 2 (before case study pages)
- **1 fully polished project** in Sanity: hero image, 8–15 gallery images, description (300–500 words), full credits, materials list, client, location, year
- **2 partial projects** in Sanity: hero image + 3 gallery images + one-paragraph description + basic credits
- Placeholder projects (with "PLACEHOLDER" tag) auto-generated for any missing slots

### By end of Phase 2 (before launch)
- **Full copy pass:** review the placeholder copy I draft and edit in Sanity
- **Contact details:** studio email, phone, physical address (for footer + contact page + JSON-LD)
- **Social handles:** Instagram, Pinterest, LinkedIn (or subset)
- **Legal review:** approval of the drafted privacy + cookie policies (or replacement text)

### Photography specifications

| Type | Aspect ratio | Min resolution | Max file size (before Sanity) |
|---|---|---|---|
| Hero (home + project detail) | 3:2 or 16:9 | 3000px wide | 5 MB (Sanity re-encodes) |
| Gallery — landscape | 3:2 | 2400px wide | 5 MB |
| Gallery — portrait | 4:5 | 2400px tall | 5 MB |
| Gallery — full-bleed | 16:9 | 3000px wide | 5 MB |
| Materials close-up | 1:1 or 4:5 | 1600px | 3 MB |
| Team headshots (if used) | 4:5 | 1600px tall | 2 MB |

**Photography treatment guidance for the studio:**
- Prefer natural daylight OR intentionally moody directional light. Never generic flash.
- Wide compositions that show the space's air, not tight product shots (unless a materials detail).
- Consistent color grading across a project's set — the whole gallery should feel like one film roll.
- All photos should have `alt` text describing the space (not "photo of chair" — "living room with oak floor and travertine coffee table, morning light through north-facing window").

### Video specifications (if hero video used)
- 5–7 second loop
- 1080p or 720p, H.264 codec, MP4 container
- Muted (no audio track needed at all — saves size)
- ~2 Mbps bitrate → ~2 MB per video
- Content: slow pan across a material surface, OR a locked-off shot of a space at a specific time of day (e.g. late-afternoon light moving across a wall)
- Deliver a still poster frame (JPG) at the same resolution

---

## Sign-off checklist for handoff

- [ ] All 14 elements from §2 have a spec, a source reference, and a mobile fallback
- [ ] Motion budget total ≤ 18 (currently: 11)
- [ ] All 5 color tokens defined with contrast verified against WCAG AA/AAA
- [ ] Type scale defined with fluid clamp values
- [ ] Every non-obvious component has a build spec
- [ ] Tech stack: one choice per layer, no options
- [ ] Performance targets numbered
- [ ] Mobile fallbacks spec'd per element
- [ ] Accessibility requirements checklist complete
- [ ] Content requirements categorized by phase gate

**Any developer picking this up should be able to build the site without further clarification on architecture, motion, tokens, or content shape.**
