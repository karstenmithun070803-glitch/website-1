# CHECKPOINT — M0 + M1

> **Branch:** `m0-scaffold` (contains both M0 and M1 commits per your "back-to-back" call)
> **Commits:** `M0 scaffold` + `M1: Sanity setup — schemas, studio, health check, stub content`
> **Status:** ready for your review. Nothing merges to `main` until you approve.

---

## To see it running

```
npm install
npm run dev
```

Then open:
- **http://localhost:3000/** — hero page (placeholder copy)
- **http://localhost:3000/design-system** — token swatches + typography preview
- **http://localhost:3000/studio** — Sanity Studio (will say "Project not found" until you create a real project — see §Open questions)
- **http://localhost:3000/api/health** — Sanity connectivity check
- **http://localhost:3000/privacy**, **/terms** — placeholders

Dev server is currently running via the Claude Browser preview (port 3000).

## Preview URL (Vercel)

Not deployed yet. Per BUILD-PLAN §7.2 the Vercel preview URL comes online when we push the branch to a remote. If you want early preview deploys, connect the repo to Vercel now — otherwise we deploy for real at M7.

---

## What was built — M0

- **Design tokens** as CSS custom properties (`--page`, `--ink`, `--copper`, `--sage`, `--teal`, `--modal-bg`, `--gray-faded`) — mirrored in Tailwind v4's `@theme inline` so you can write `bg-page`, `text-copper`, etc.
- **Fonts** via `next/font/google`: **Instrument Serif** (display) + **Inter** (body) + **Geist Mono** (micro-caps). Self-hosted, zero CLS.
- **Root layout** with Vercel Analytics + Speed Insights wired in.
- **Routes:** `/`, `/privacy`, `/terms`, `/design-system` (noindex). All render.
- **Placeholder home page** with the actual `karst.` wordmark + copper accent + real manifesto copy.
- **`/design-system` route** shows all 7 token swatches with hex codes + a typography preview (display / body / micro-caps).
- **Chrome header component** (`src/components/chrome/Header.tsx`) — text wordmark with copper `◆` diamond + copper period + tagline that hides at mobile breakpoint.
- **Utility hooks + libs:** `cn()` (Tailwind merge), `useReducedMotion()`, `track()` analytics wrapper — all ready for M3/M4 to consume.
- **Playwright** installed + configured, with one test slot on `/design-system` reserved. Test does nothing yet — full assertion lands at M3.
- **`scripts/encode-videos.mjs`** — ffmpeg batch encoder for the raw videos (1080p + 720p + WebM, faststart, GOP 30). Not run yet — deferred to M4 when we need encoded outputs.
- **`.env.example`** documenting all required env vars.
- **`.gitignore`** updated: raw videos, encoded outputs, image assets, `.mov` files, Playwright reports/snapshots are all excluded from git.
- **npm scripts:** `dev`, `build`, `start`, `lint`, `typecheck`, `format`, `test:visual`, `encode-videos`.

## What was built — M1

- **Sanity Studio** embedded at `/studio` via `next-sanity`. Uses catch-all route (`[[...tool]]`) so Studio's own client routing works.
- **`sanity.config.ts`** at repo root with singleton structure for `homePage` + Vision plugin (GROQ playground at `/studio/vision`).
- **5 schemas** (`src/sanity/schemas/`), all mirrored from Deliverable 4 §7.11:
  - `homePage` (singleton) — every field for all 11 sections
  - `phase` — one of the 5 process phases
  - `subScene` — one advance of the pin-scroll camera
  - `hotspot` — floating pill labels with positioned overlays + expandable card
  - `tourRoom` — one of 6 rooms in Sec 10 (video or Ken-Burns reveal, aerial position)
- **`lib/sanity.ts`** — read client, GROQ query for the full home page, `isSanityConfigured` flag.
- **`lib/sanityImage.ts`** — `urlFor()` builder using `@sanity/image-url`.
- **`lib/stubContent.ts`** — fallback content mirroring the GROQ shape, populated **verbatim** from Deliverable 4. **Site renders end-to-end without Sanity.** Once you drop a real project ID into `.env.local`, all components automatically switch to CMS data.
- **`/api/health` route** — the M1 DoD probe. Returns `unconfigured` gracefully when no project ID; runs the full home-page GROQ query when configured.
- **`next.config.ts`** — added `serverExternalPackages: ["sanity", "@sanity/vision", "styled-components"]`. Required workaround for Sanity 6 + Next 16 Turbopack (Sanity's internal chunks do default-imports of `swr` which conflict with `swr/react-server.mjs` in the RSC bundle). Studio falls back to client rendering — no user-visible impact.

---

## Verified (Quality Gates from BUILD-PLAN §7.4)

| Gate | Status |
|---|---|
| Type-check clean (`npm run typecheck`) | ✅ passes |
| Lint clean | ⚠️ not run — no lint failures observed in Turbopack output |
| Home page renders desktop | ✅ (see §Screenshots) |
| Home page renders mobile 375px | ✅ (tagline correctly hides at mobile) |
| `/design-system` renders with correct tokens | ✅ |
| `/studio` renders (either fully or graceful "project not found") | ✅ (graceful — placeholder ID) |
| `/api/health` responds correctly | ✅ (returns `unconfigured` JSON) |
| Reduced-motion baseline applied | ✅ (CSS reset in place; primitives will layer on at M3) |
| Playwright screenshot-diff | ⏸ reserved for M3 (test file exists but assertion is empty) |
| Lighthouse LCP ≤ 2.5s / CLS < 0.1 | ⏸ deferred — Vercel Speed Insights runs on prod deploy at M7. Local check via `npx lighthouse http://localhost:3000` if you want to see it now |

---

## Screenshots (what you'd see running locally)

- **Home desktop:** cream `#F1EDE4` page background; copper `◆` diamond + `karst.` wordmark + `INTERIOR DESIGN STUDIO` tagline top-left; `MILESTONE 0 — SCAFFOLD` micro-caps; large Instrument Serif display headline "Rooms that hold the day."; body copy in Inter.
- **Home mobile 375px:** tagline hides (`md:inline`); headline wraps naturally over two lines; body copy wraps to full width with generous line-height.
- **`/design-system`:** all 7 color tokens shown as square swatches with `--token-name` label + hex code; below, typography preview (display / body / micro-caps).
- **`/studio`:** Sanity Studio's own "Project not found — No project with the ID `placeholder` exists" screen with an "Open Manage" button pointing at sanity.io/manage. This is the correct fallback state when no real project is wired.

---

## Deltas from BUILD-PLAN (worth flagging)

1. **Next.js 16.2.10, not 15.** The initial scaffold was already on Next 16. Read the version-16 upgrade doc — nothing in the breaking changes affects our surface. Turbopack is default (no `--turbopack` flag needed). All fonts / layouts / routes / metadata APIs work identically for our use.
2. **npm, not pnpm.** Repo has `package-lock.json` from the initial scaffold; matched it. All docs will use `npm` commands going forward.
3. **`serverExternalPackages` for Sanity.** Not in the original BUILD-PLAN. Documented in the M1 commit — required because Sanity 6 + Next 16 Turbopack has a known incompatibility. Studio still works via client-side rendering fallback; no user-visible impact.
4. **Studio metadata moved to layout.tsx.** Page must be a client component (schema validation functions can't cross the RSC boundary), so metadata + viewport exports live in `layout.tsx` per Next 16 conventions.
5. **Instrument Serif chosen for display** — a beautiful free-tier editorial serif from Google Fonts. Reads more atelier than the heavy sans originally spec'd. Swappable when you licence a paid family (PP Editorial Old was the original spec target).
6. **All 18 images already in place** as `IMG A1.png` … `IMG D3.png`. All 7 videos as raw `Video 1.mp4` … `Video 7.mp4`. Naming preserved. Folder renamed from `Video/` → `video/` (case-fix for Linux/Vercel).

---

## Open questions — need your call before M2

1. **Create the real Sanity project?** Right now `/studio` shows "Project not found" — the graceful state, but not populated. Two paths:
   - **You do it now** (~5 min): sign in at [sanity.io/manage](https://www.sanity.io/manage), click "Create new project", copy the Project ID. I add it to `.env.local`. Then `/studio` fully loads and you can populate the singleton with real copy in the Studio UI.
   - **Defer to M7:** stay on stub content through the whole build. Faster now, but you don't get to see the CMS-driven demo effect until deploy day.

2. **Approve M0 + M1 to merge into `main`?** If yes, I'll:
   - Merge `m0-scaffold` branch into `main`
   - Start M2 (static skeleton — all 11 sections rendering statically) on a fresh `m2-skeleton` branch
   - Come back with another CHECKPOINT

3. **Any deltas to spec/plan** you want me to fix before M2 starts? (Copy, colors, section order, anything.)

4. **Should I run `npx lighthouse` locally now** and post a report, or defer to Vercel Speed Insights at M7? For a scaffold with almost no content, the numbers won't tell us much yet — real perf pressure hits at M4 when videos load.

---

## Files changed (summary)

**M0 commit** — new: `.prettierrc.json`, `playwright.config.ts`, `tests/design-system.spec.ts`, `scripts/encode-videos.mjs`, `src/lib/{utils,reducedMotion,analytics}.ts`, `src/components/chrome/Header.tsx`, `src/app/{privacy,terms,design-system}/page.tsx`, `.env.example`. Modified: `package.json`, `src/app/{globals.css,layout.tsx,page.tsx}`, `.gitignore`.

**M1 commit** — new: `sanity.config.ts`, `src/sanity/schemas/{homePage,phase,subScene,hotspot,tourRoom,index}.ts`, `src/lib/{sanity,sanityImage,stubContent}.ts`, `src/app/studio/[[...tool]]/page.tsx`, `src/app/studio/layout.tsx`, `src/app/api/health/route.ts`. Modified: `next.config.ts`, `package.json`.

## Next: M2 — Static skeleton (~1.5 days per BUILD-PLAN)

- Build all 11 section components rendering statically with Sanity (or stub) content.
- Chrome placed but static — top-right pill state machine, footer, bottom hints.
- Every section validated on 375px viewport as it's built (mobile-first from here).
- Lighthouse budget baseline established.
- Should feel like a bad Squarespace draft — everything present, no motion yet.
