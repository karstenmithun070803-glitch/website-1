# Karst — Build Plan
### How we build the site described in `deliverable-4-site-spec.md`

> **This doc = HOW we build.** For **WHAT** we build, see [`deliverable-4-site-spec.md`](./deliverable-4-site-spec.md). Never duplicate content from that spec here — reference it.
>
> **This doc supersedes `creative-brief/BUILD-SPEC.md`.** The old spec assumed a multi-page portfolio site (Studio KO / VVD tonality). Deliverable 4 replaced that with a single-page scroll journey (NRG-inspired). Old BUILD-SPEC now = **historical reference only**. What carries forward from it is called out in §2.

---

## 1. Scope

- **Routes:** `/` (the scroll journey — the whole product), `/studio` (embedded Sanity Studio, `noindex`), `/privacy` (placeholder), `/terms` (placeholder), `/design-system` (motion-primitive proof page, `noindex`).
- **Intent:** pitch / portfolio demo. Real visual + interactive polish; placeholder ops (Vercel free tier, Sanity free tier, no real Resend routing, placeholder legal copy).
- **Audience:** a high-end interior-design client seeing "can this actually be built?"
- **Not building:** `/work` grid, `/about`, `/services`, real GDPR consent flow, real email delivery. Any of these can be added in a follow-on sprint (~1 week each).

---

## 2. Tech stack — what carries forward, what changes

Carried forward from `creative-brief/BUILD-SPEC.md` §12 unless noted:

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15** (App Router) + **TypeScript** | Carry |
| Package manager | **pnpm** | Carry |
| Styling | **Tailwind CSS v4** + CSS custom properties for design tokens | Carry, tokens per Deliverable 4 §1 |
| CMS | **Sanity v3** (free tier), embedded Studio at `/studio` | Carry. Schemas per Deliverable 4 §7.11 |
| Sanity TS types | **`sanity typegen`** (auto-generates TS types from schemas → `sanity.types.ts`) | **NEW** — prevents manual type drift |
| Image pipeline | **Sanity asset pipeline** (`@sanity/image-url`) — AVIF/WebP negotiated, `srcset` widths 400/800/1200/1600/2400 | Carry |
| Fonts | **`next/font/local`** — self-hosted WOFF2, zero CLS | Carry. Pitch uses free-tier fallbacks: **Instrument Serif** (display) + **Inter** (body) + **Geist Mono** (micro-caps). Swap to paid families (PP Editorial Old + Berkeley Mono) before real launch. |
| Motion | **GSAP** + **ScrollTrigger** + **Lenis** (smooth scroll on desktop only) | **KEY CHANGE** from old spec — we need ScrollTrigger's `scrub` + `pin` for pin-scroll dioramas and video scrubbing |
| Analytics | **`@vercel/analytics`** + **`@vercel/speed-insights`** | Carry. Events per Deliverable 4 §7.10 |
| Form validation | **Zod** | Carry |
| Contact email | Route exists (`/api/contact`), Zod-validates, `console.log`s, returns 200. **No real send** for pitch | Change from real send |
| **Visual regression** | **Playwright** — single screenshot-diff test on `/design-system` | **NEW** — cheap safety net |
| Video encoding | **`scripts/encode-videos.mjs`** — runs `ffmpeg` against `/public/assets/video/raw/` and outputs 1080p + 720p + WebM variants with faststart + short GOPs | **NEW** — automates Deliverable 4 §7.4 encoding requirements |
| Deployment | **Vercel** (free tier). Preview deploys per branch. | Carry |
| Utility | **clsx + tailwind-merge** | Carry |

**Explicitly rejected** (still, per old BUILD-SPEC §12): Framer Motion, Three.js, R3F, Payload CMS, Cloudinary, shadcn/ui, a separate database.

---

## 3. Route architecture

```
/                            →  <HomePage> — the 11-section scroll journey
/studio/[[...tool]]          →  Sanity Studio (embedded via next-sanity)
/design-system               →  Motion primitive proof page (noindex)
/privacy                     →  placeholder MDX
/terms                       →  placeholder MDX
/api/contact                 →  POST endpoint; Zod-validates; console.log; returns 200
/api/sanity/preview          →  Sanity draft mode toggle (dev-only)
```

Everything else is client-side state (modals, tour rooms).

---

## 4. File structure

```
/app
  layout.tsx                 Root layout — fonts, Sanity provider, analytics, Lenis wrapper
  page.tsx                   Home
  privacy/page.tsx
  terms/page.tsx
  design-system/page.tsx     Motion primitive proof page (noindex)
  studio/[[...tool]]/page.tsx
  api/contact/route.ts

/components
  /home                      Section components (Deliverable 4 §5)
    IntroModal.tsx, Hero.tsx, Manifesto.tsx, Transition.tsx,
    PhaseListen.tsx, PhaseSketch.tsx, PhaseRefine.tsx, PhaseBuild.tsx, PhaseLive.tsx,
    TourIntro.tsx, Tour.tsx, HomePage.tsx
  /chrome                    Persistent chrome (Deliverable 4 §4)
    Header.tsx, TopRightPill.tsx, BottomRightCTA.tsx, BottomLeftHint.tsx,
    MenuPanel.tsx, ContactModal.tsx
  /motion                    Motion primitives (§5 below)
    CopperFill.tsx, PinStage.tsx, ScrubbedVideo.tsx, HotspotPill.tsx,
    SplitColumnStory.tsx, HorizontalCards.tsx, TourRoom.tsx,
    RadialCurtain.tsx, CustomCursor.tsx
  /ui                        Dumb primitives (Button, Pill, Icon, DiamondChip, ...)

/lib
  sanity.ts                  Sanity client + helpers
  sanityImage.ts             urlFor(image)
  analytics.ts               track() wrapper
  reducedMotion.ts           useReducedMotion hook
  gsap.ts                    Central GSAP registration
  breakpoints.ts

/sanity
  schemas/                   Per Deliverable 4 §7.11
  sanity.config.ts
  sanity.types.ts            Generated by `sanity typegen` — do not edit

/scripts
  encode-videos.mjs          ffmpeg batch encoder (see §2 Video encoding row)

/tests
  design-system.spec.ts      Playwright screenshot-diff (one file, all primitives)
  playwright.config.ts

/public
  /assets
    /video/raw/              User-dropped originals (gitignored)
    /video/                  Encoded outputs (gitignored — regenerated by script)
    /img/                    Local dev fallback (gitignored)
  /og
    home.jpg                 1200×630 OG image (generated at M7)
  /fonts/                    WOFF2s

/docs                        This folder
```

---

## 5. Motion architecture

### 5.1 Libraries

- **Lenis** — smooth-scroll on desktop only (`matchMedia('(hover: hover) and (pointer: fine)')`, disabled under `prefers-reduced-motion`). Native scroll on touch.
- **GSAP + ScrollTrigger** — pin-scroll, video scrubbing, character fill.
- **IntersectionObserver** — non-scroll-driven triggers (analytics fires, fade-in-on-appear).
- **`requestAnimationFrame`** — custom cursor position in tour rooms.

### 5.2 Motion primitives (in `/components/motion/`)

Each maps 1:1 to a Deliverable 4 §2 motion pattern.

| Primitive | Wraps | Notes |
|---|---|---|
| `<CopperFill text=…>` | Any headline | Per-character span. Interpolates `--gray-faded` → `--copper` → `--ink` from scroll progress. Formula in Deliverable 4 §7.5. Skips to final ink under reduced-motion. |
| `<PinStage minVh={300}>` | Any pinned section | Tall scroll container + sticky inner stage. Exposes progress `p` via context. Reduced-motion degrades to linear. |
| `<ScrubbedVideo src poster>` | Diorama sections | Reads `p` from `PinStage`; sets `video.currentTime = p * duration` via rAF-throttled ScrollTrigger `onUpdate`. Poster fallback if `canplaythrough` doesn't fire within 3s. |
| `<HotspotPill label description image position>` | Diorama hotspots | Positioned absolutely. Hover (desktop) or tap (touch) morphs to card. `<button aria-label>`. |
| `<SplitColumnStory entries>` | Sec 5 Sketch | Sticky right image + scrollable left text. Cross-fade on entry change. |
| `<HorizontalCards cards leftImage>` | Sec 7 Build | Vertical scroll → horizontal `translateX`. Mobile: cards stack vertically. |
| `<TourRoom room onClose>` | Sec 10 rooms | Full-viewport dialog. Radial-curtain enter (500ms). Custom `×` cursor. Click-anywhere to close (400ms reverse). Behavior per Deliverable 4 §7.7. |
| `<RadialCurtain state="opening|open|closing">` | Room transitions | GSAP timeline on a mask `clip-path`. |
| `<CustomCursor variant="close">` | Tour rooms only | Fixed div, `pointer-events: none`, follows via rAF. Hidden on touch. |

### 5.3 Reduced-motion + touch degradation

Every primitive must have a documented fallback per Deliverable 4 §7.2 (reduced-motion) and §7.3 (mobile). **No motion primitive ships without its fallback branch** — this is a build-review rule enforced at every checkpoint.

### 5.4 Video handling

The single hardest thing to build. Full policy in Deliverable 4 §7.4. Automated via `scripts/encode-videos.mjs`:

```
# Called once when new raw videos are added
pnpm encode-videos
# → reads /public/assets/video/raw/
# → outputs 1080p H.264 + 720p H.264 + WebM VP9, each with faststart + GOP 30
```

Playback:
- `<video muted playsinline>` with `<source>` per format.
- `preload` per Deliverable 4 §7.4 preload table.
- Scrubbing: `currentTime` update **inside** a rAF loop, driven by ScrollTrigger `onUpdate`. Never per-scroll-event.
- Fallback: every `<ScrubbedVideo>` has a poster image and a text `aria-label`.

---

## 6. Sanity architecture

Per Deliverable 4 §7.11 — schemas already defined there.

- **Project setup:** `pnpm create sanity@latest` → embed in same repo → mount at `/studio/[[...tool]]`.
- **Types:** `sanity typegen generate` (run automatically in `postinstall` + on schema change) → `sanity/sanity.types.ts`. Components import these types instead of hand-writing them.
- **Studio-first authoring:** Sanity is populated from day M1. All content in the `homePage` singleton + `phases` + `tourRooms`.
- **Local fallback:** if `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset, components read from `/public/assets/` + hard-coded stub copy in `lib/stubContent.ts`. Lets the site render on a fresh clone before Sanity is wired.

---

## 7. Development workflow & quality gates

The single most important section of this doc. **No milestone ships without hitting every gate below.** This is what "extremely organized" looks like in practice.

### 7.1 Git workflow

- **`main`** — always deployable. Auto-deploys to production URL on push.
- **`m0-scaffold`, `m1-sanity`, `m2-skeleton`, … `m7-deploy`** — one branch per milestone. Each is a PR merged to `main` after your checkpoint approval.
- **Commit hygiene:** small, verb-first commit messages ("add PinStage primitive", not "changes"). Squash-merge each PR so `main` stays linear.
- **No force-pushes to `main`.** Ever.

### 7.2 Preview URL per branch

Every push to a milestone branch auto-deploys to a unique Vercel preview URL (`karst-m3-motion-primitives-git-…vercel.app`). You get the URL in the PR description. This means **you can see any milestone's current state at any time** without asking me — I share the URL as soon as the branch is pushed.

### 7.3 The checkpoint pattern (end of every milestone)

Every milestone ends with a `CHECKPOINT.md` file committed to that branch, containing:

1. **What was built** — bullet list, one line per component/primitive.
2. **Preview URL** — the Vercel deploy of this branch.
3. **Screenshots** — desktop + mobile of every affected section.
4. **Screen recording** (M3, M4 only) — my build side-by-side with the reference video for direct visual comparison.
5. **Lighthouse report** — LCP / CLS / INP / weight, mobile 4G-throttled.
6. **Playwright report** (M3 onward) — pass/fail on the design-system screenshot diff.
7. **Deltas from spec** — anything I changed vs Deliverable 4, with rationale. Ideally empty.
8. **Open questions** — anything I need your call on.

**Nothing merges to `main` until you've reviewed the CHECKPOINT and approved.** If you find issues, I iterate on the same branch and update the CHECKPOINT before re-requesting review.

### 7.4 Quality gates enforced at every checkpoint

| Gate | Method | Applies from |
|---|---|---|
| Type-check clean | `pnpm typecheck` (blocks CI if it fails) | M0 |
| Lint clean | `pnpm lint` (biome or eslint) | M0 |
| Lighthouse LCP ≤ 2.5s, CLS < 0.1, INP < 200ms (4G mobile) | Vercel Speed Insights + local `pnpm lh` script | M2 |
| Page weight under budget (per Deliverable 4 §7.12) | Bundle analyzer on every PR | M2 |
| Mobile 375px viewport works | Visual review at checkpoint | M2 (each section, when built) |
| Reduced-motion fallback works | Toggle browser flag + visual review | M3 (each primitive) |
| Keyboard + screen-reader navigable | Manual pass at each checkpoint | M4 |
| Playwright screenshot-diff passes | `pnpm test:visual` | M3 |
| Reference visual parity | Side-by-side screen recording | M3, M4 |

If any gate fails on a milestone, we don't move on — we fix it on the same branch.

### 7.5 Local dev setup (do once)

1. `git clone …`
2. `pnpm install`
3. Copy `.env.example` → `.env.local`. Fill in `NEXT_PUBLIC_SANITY_PROJECT_ID` + `SANITY_API_TOKEN` (from sanity.io/manage).
4. Drop raw generated video files in `public/assets/video/raw/`.
5. Drop image files in `public/assets/img/`.
6. `pnpm encode-videos` — runs the ffmpeg batch (5–10 min depending on file sizes).
7. `pnpm dev` — site at `http://localhost:3000`, studio at `http://localhost:3000/studio`.
8. Open `/studio`, drag assets in, populate `homePage` + phases + rooms.

---

## 8. Milestones (with checkpoints)

Each milestone: **branch name → tasks → deliverable → Definition of Done (DoD) → checkpoint deliverables**.

### M0 — Scaffold  `branch: m0-scaffold`  (~half a day)

- Next.js 15 + TS + Tailwind v4 + all deps installed.
- Design tokens as CSS variables in `globals.css`.
- Fonts loaded via `next/font/local` (Instrument Serif + Inter + Geist Mono).
- Empty routes: `/`, `/studio` (stub), `/privacy`, `/terms`, `/design-system`.
- Root layout with Lenis wrapper (idle for now), analytics wired.
- `scripts/encode-videos.mjs` written and tested against one sample video.
- Playwright + config scaffolded, one test written (empty).

**DoD:** `pnpm dev` renders a cream page with correct fonts + a `karst.` wordmark top-left. Typecheck + lint + Playwright all pass (Playwright test is trivially empty at this stage).

**Checkpoint:** Preview URL + type/lint reports + confirm token colors look right on screen.

---

### M1 — Sanity setup  `branch: m1-sanity`  (~half a day)

- Sanity project created via `pnpm create sanity`, embedded studio wired at `/studio`.
- All schemas from Deliverable 4 §7.11 written.
- `sanity typegen` runs on install and outputs `sanity.types.ts`.
- `homePage` singleton seeded with real copy from Deliverable 4 (I paste it in).
- Fallback `stubContent.ts` written for local dev without env.
- `lib/sanity.ts` client + `lib/sanityImage.ts` helper.

**DoD:** `/studio` loads locally, `homePage` document exists with all fields filled, and a test API route (`/api/health`) reads it via GROQ and returns 200.

**Checkpoint:** Preview URL + `/studio` screenshot showing populated content + a printed GROQ query result.

---

### M2 — Static skeleton  `branch: m2-skeleton`  (~1.5 days)

- All 11 section components render statically with Sanity content (no motion, no interactivity).
- Chrome components (header, top-right pill, footer, bottom hints) placed but static.
- Reads from Sanity in production; falls back to `stubContent.ts` if no env.
- **Every section validated on 375px viewport as it's built** (mobile-first from here on).
- Lighthouse budget baseline established.

**DoD:** Scrolling top-to-bottom on `/` shows every section in the right order with correct copy, images, spacing, and type. Looks like a bad Squarespace draft — but everything is present, mobile + desktop.

**Checkpoint:** Preview URL + desktop + mobile screenshots of all 11 sections + Lighthouse report.

---

### M3 — Motion primitives  `branch: m3-motion-primitives`  (~2 days)

- All 8 primitives from §5.2 built.
- **`/design-system` route** shows each primitive in isolation with a label.
- Lenis wired in root layout with feature-detection (desktop + non-reduced-motion).
- GSAP + ScrollTrigger central registration.
- `useReducedMotion()` hook used by every primitive.
- **Playwright screenshot-diff test** captures `/design-system` and fails on any pixel change.

**DoD:** Each primitive works in isolation and passes its reduced-motion test. `/design-system` is a scrollable proof-page showing every primitive. Playwright test passes.

**Checkpoint:** Preview URL to `/design-system` + a **screen recording** of each primitive playing, next to the reference video moment it emulates (side-by-side, for direct parity review) + Playwright report.

---

### M4 — Section wiring  `branch: m4-sections`  (~2.5 days)

Replace static section components with motion-wired versions. **Build order:**

1. Sec 0 (Intro Modal) + Sec 1 (Hero) — copper fill + hero video slide-up
2. Sec 2 (Manifesto) + Sec 3 (Transition) — long copper fills over pinned video
3. Sec 4 (Listen) — first pin-scroll diorama, the template all others copy
4. Sec 5 (Sketch) — split-column story
5. Sec 6 (Refine) + Sec 8 (Live) — reuse Sec 4 template
6. Sec 7 (Build) — horizontal cards
7. Sec 9 (Tour Intro) + Sec 10 (Tour) — aerial + rooms + radial curtain + custom cursor

Each section is mobile-validated as it's wired.

**DoD:** The site plays end-to-end at desktop AND mobile breakpoints. Every scroll beat table in Deliverable 4 §5 is satisfied. Feels close to the reference.

**Checkpoint:** Preview URL + **full-page screen recording of both desktop and mobile**, alongside the reference video for parity review.

---

### M5 — Chrome + interactions  `branch: m5-chrome`  (~1 day)

- Top-right pill state machine (Deliverable 4 §4).
- Menu panel + Contact modal (Sec 11).
- Bottom-right transient CTAs (`Scroll to Phase N` pill).
- Bottom-left ambient hint fades.
- Contact form POSTs to `/api/contact` (console.log for demo, returns 200 + confirmation state).
- Analytics events wired (Deliverable 4 §7.10).

**DoD:** You can open the menu, jump between phases (menu scrolls to section), open contact, submit the form and see the confirmation state. Analytics events fire.

**Checkpoint:** Preview URL + video of full interaction flow: intro → scroll to Sec 5 → open menu → jump to Sec 8 → open contact → submit → confirmation.

---

### M6 — Responsive + a11y + perf polish  `branch: m6-polish`  (~1 day)

- Full mobile pass — every section validated on 375px, 414px, 768px viewports.
- Reduced-motion pass — every primitive tested with the OS flag.
- Keyboard nav pass — tab through everything, Esc closes modals/rooms.
- Screen-reader pass — VoiceOver on Safari, headings + aria-labels correct.
- Lighthouse LCP ≤ 2.5s / CLS < 0.1 / INP < 200ms on 4G-throttled mobile.
- Contrast pass — all text meets WCAG AA 4.5:1.

**DoD:** All quality gates from §7.4 pass. Lighthouse mobile score ≥ 90.

**Checkpoint:** Preview URL + mobile screenshots + Lighthouse report + a11y audit summary (axe DevTools output).

---

### M7 — Assets migration + prod deploy  `branch: m7-deploy`  (~half a day)

- You upload assets to Sanity Studio (drag-drop in `/studio`).
- Asset manifest switches from local `/public/assets/` to Sanity CDN URLs.
- `.env.production` set with real Sanity IDs.
- Deploy from `main` to Vercel production.
- OG image generated (`/public/og/home.jpg` — a bright still from Video 1 with title overlay).
- SEO metadata verified (title, description, OG, Twitter card).
- `@vercel/analytics` + Speed Insights active in prod.

**DoD:** Production URL loads, is shareable, matches local behavior 1:1. Social preview looks good when pasted into Slack / Twitter.

**Checkpoint:** Production URL + OG preview screenshot + first Speed Insights numbers.

---

**Total: ~9 build days.** Buffer of 1–2 for polish + fixes → **~10–11 days end-to-end.**

---

## 9. Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| Video scrubbing feels janky on Safari or lower-end Android | High | Encode with short GOPs (`-g 30`); rAF-throttle; poster fallback. **Test on real iPhone SE + mid-tier Android at M3, not M6.** |
| Copper Fill per-character reflow at breakpoints causes layout shift | Medium | `ResizeObserver` recompute; `min-height` on the headline container to reserve space. |
| Pin-scroll + Lenis stacked can double-scroll (Lenis virtual scroll + ScrollTrigger pin math conflict) | Medium | Known issue — use Lenis's `ScrollTrigger.scrollerProxy` bridge. Studio Freight docs have reference implementation. |
| AI-generated videos aren't good enough and undermine the pitch | Medium | Deliverable 4 has production-ready prompts. If output is weak, iterate with a second tool (Kling for camera moves, Runway for editorial detail). Poster stills are the fallback. |
| Font families not licensed → shipping with fallbacks that look wrong | Low | Committed to Instrument Serif + Inter + Geist Mono up-front (all free). Paid swap before real launch. |
| Sanity type generation breaks build if a schema changes mid-milestone | Low | `sanity typegen` runs in `postinstall`; also on schema-change via a file watcher in dev. |
| I go "dark" for days and you can't see progress | Low (now, thanks to §7) | §7.2 preview URL per branch + §7.3 checkpoint pattern. You can see any milestone at any time. |

---

## 10. What's intentionally NOT built for the pitch

Documented so nobody's surprised:

- **No `/work` grid.** Only Sec 10 Virtual Tour represents finished work.
- **No `/about`, `/services`, `/contact` pages.** All handled inside `/`.
- **No real email delivery.** Contact form is demo mode (console.log).
- **No real cookie consent banner.** No cookies set beyond Vercel analytics (cookie-less).
- **No content-heavy legal copy.** `/privacy` and `/terms` are placeholder MDX.
- **No sound design.** Old BUILD-SPEC row 10 spec'd an optional soundtrack — not building for pitch.
- **No preloader / cold-open animation.** Intro modal serves that role.
- **No page transitions** — single-page site.
- **No `<Reveal>` / `<SplitTextReveal>` primitives** from old BUILD-SPEC. Replaced by Copper Fill + pin-scroll.
- **No full E2E test suite.** Single Playwright screenshot-diff on `/design-system` only.
- **No error monitoring (Sentry / similar).** Vercel's log stream is enough for pitch.

Any of these can be added post-pitch in ~1 week each if we take this to real launch.
