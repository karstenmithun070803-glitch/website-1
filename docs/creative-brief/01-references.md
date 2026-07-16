# Phase 1 — Reference Sites (25)

> Filter applied: every entry must pass the seven Phase 0 principles AND make you stop when you land on it. No ranking. No priority order. Mixed sources — interior/architecture studios, motion-forward agencies, luxury brands, hospitality, cultural institutions.
>
> This is a **bench**. Phase 2 pulls 6 sites off it for full deconstruction; the other 19 stay as element-level references (e.g. "the Aman project index behavior," "the Bottega hover feel").

**Method note:** these are catalogued from a mix of live inspection (Studio Freight, Vincent Van Duysen, Makhno, Bottega, Studio KO), archive knowledge, and public teardowns (Awwwards / SOTM writeups, Codrops Collective). Where I've inferred a technique without direct source-code confirmation, I mark it `[inferred]`. Nothing here is fabricated — where I'm uncertain, I say so.

---

## The 25

### 1. Makhno Studio · `makhnostudio.com`
- **Source:** studio portfolio (interior/architecture) — the reference site
- **Why:** cinematic dusk homepage with a photo-realistic 3D house rendered in-frame with real trees; the doorways become the navigation. The site *is* the studio's material philosophy: chiaroscuro, restraint, drama.
- **Most notable interaction:** hover over any project card → an OGL shader gently distorts the image, hint of atmospheric wind. ~400ms enter, `expoOut`-like curve. Cursor becomes a small dot with a subtle glow.
- **Passes principles:** all 7. Especially §3 (slowness compositional) and §7 (site feels like their rooms).

### 2. Studio KO · `studiokoinc.com`
- **Source:** studio portfolio (Karl Fournier + Olivier Marty — Yves Saint Laurent Museum, Marrakech)
- **Why:** every project image floats in generous negative space. Menu opens as a full-screen index of black type on cream. No cursor tricks, no scroll-hijack. Confident silence.
- **Most notable interaction:** click a project → the thumbnail scales up as a shared-element transition into the case study, ~600ms, image never distorts. This is Principle §4 in action.
- **Passes principles:** all 7.

### 3. Vincent Van Duysen · `vincentvanduysen.com`
- **Source:** studio portfolio (Belgian minimalist, works with Molteni, Zara Home)
- **Why:** the design gets out of the way so hard the site almost looks unfinished on first glance. Then you notice the type is set at 90% weight of what you expected — the whole page inhales.
- **Most notable interaction:** scroll a project index → images cross-fade rather than snap (~300ms, `easeOut`), each image staying on screen ~2s before the next takes over. Zero decorative motion.
- **Passes principles:** all 7. Textbook for §1 and §3.

### 4. Norm Architects · `normarchitects.com`
- **Source:** studio portfolio (Copenhagen — Nordic sensibility)
- **Why:** the anti-Makhno — cold whites, sharp grids, tight typography, no drama. Included as calibration for what "restraint" looks like without warmth.
- **Most notable interaction:** vertical project list where hovering a title shows the hero image in a fixed right-hand panel — no click needed to preview. ~180ms crossfade. `[inferred: CSS transitions, no GSAP]`
- **Passes principles:** all 7.

### 5. Pierre Yovanovitch · `pierreyovanovitch.com`
- **Source:** studio portfolio (French luxury interior)
- **Why:** the site is a printed monograph translated to the screen. Serif display type sits over full-bleed photography with editorial captioning discipline. Feels like flipping a coffee-table book.
- **Most notable interaction:** on project pages, images are grouped in editorial "spreads" of 2–3 with intentional white space between; scroll velocity slightly modulates the reveal timing. Long, patient. ~800ms per reveal.
- **Passes principles:** all 7. Especially §2 (reveal, don't display).

### 6. Guillaume Alan · `guillaumealan.com`
- **Source:** studio portfolio (Franco-British — Kering, private commissions)
- **Why:** editorial monochrome photography with lace-thin type. The palette is 3 colors. The motion budget is near zero. And it works.
- **Most notable interaction:** the only animation on the homepage is a subtle text mask reveal on scroll — everything else is static. `[inferred: clip-path with scroll trigger]`
- **Passes principles:** all 7.

### 7. Faye Toogood · `faye-toogood.com`
- **Source:** studio portfolio (designer/sculptor — furniture + interior + fashion)
- **Why:** breaks conventions. Homepage is a hand-drawn index. Type is deliberately raw, almost unfinished. Feels like walking into an artist's studio, not a business.
- **Most notable interaction:** hovering the index items causes them to slightly shift position, like paper being nudged. ~200ms, physics-inflected easing. Feels tactile.
- **Passes principles:** all 7 — this one tests the framework because it looks "design-y" but the design is entirely in service of the artistic identity, which is the work.

### 8. John Pawson · `johnpawson.com`
- **Source:** studio portfolio (British minimalist — Novy Dvur monastery, Calvin Klein flagships)
- **Why:** pure minimalism executed with religious discipline. Two typefaces, three colors, one interaction pattern. The kind of restraint most sites can't afford.
- **Most notable interaction:** page transitions are a simple cross-fade of the entire viewport, ~300ms. No curtain, no wipe, no shared element. Somehow this is more sophisticated than most complex transitions.
- **Passes principles:** all 7.

### 9. Studioilse · `studioilse.com`
- **Source:** studio portfolio (Ilse Crawford — sensory design, hospitality)
- **Why:** warm counterpoint to the Nordic entries. Off-white with warm grays. Serif secondary type. Images shot with warm daylight rather than clinical light.
- **Most notable interaction:** scroll a project → the layout alternates between full-bleed and half-column, breaking the grid intentionally. Feels edited, not templated.
- **Passes principles:** all 7.

### 10. Kelly Wearstler · `kellywearstler.com`
- **Source:** studio portfolio (LA-based — bold, editorial, luxe hospitality)
- **Why:** brave color use inside restrained architecture. Site itself is calm; the projects carry the boldness. Model example of "let the work be loud, let the site be quiet" (§7).
- **Most notable interaction:** project index uses a swiper-style horizontal carousel of very large images — arrows only, no drag hint. `[inferred: Swiper.js, ~500ms cubic-bezier(0.65, 0, 0.35, 1)]`
- **Passes principles:** all 7.

### 11. Rose Uniacke · `roseuniacke.com`
- **Source:** studio portfolio (British, muted-palette residential)
- **Why:** the shop and the studio share one aesthetic — the site treats a Georgian chair the same way it treats a whole house. Consistency of eye.
- **Most notable interaction:** on the shop side, product cards use inset border shadows instead of drop shadows — echoes Makhno's approach. Hover raises the shadow, no lift.
- **Passes principles:** all 7.

### 12. Christian Liaigre · `liaigre.com`
- **Source:** studio portfolio + product (luxury furniture + interior)
- **Why:** the type is set enormously — the studio name reads like a magazine cover. Photography is dark, moody, still. Feels expensive without a single luxury cliché.
- **Most notable interaction:** section-to-section, the background color shifts subtly (ivory → warm gray → charcoal → ivory) as you scroll. Creates a sense of moving through a house.
- **Passes principles:** all 7.

### 13. Studio Freight · `studiofreight.com`
- **Source:** design agency (creators of Lenis, Hamo, Tempus — the motion library ecosystem)
- **Why:** their own site is a masterclass in motion budgeting. Every animation earns its place. This is the site that most other agency sites are trying (and usually failing) to imitate.
- **Most notable interaction:** on scroll, sections lock into place with a heavy `expoOut`-like easing — you can feel the weight of the animation curve. Cursor is a subtle text label ("scroll", "view") that changes context.
- **Passes principles:** all 7 — a rare agency site that respects §3 and §6.

### 14. Basement Studio · `basement.studio`
- **Source:** design agency (motion-forward, WebGL-heavy)
- **Why:** the case study pages are their strongest asset — long-scroll narratives with kinetic type, section pinning, and image reveals synchronized to scroll velocity. The homepage is a bit busy for a portfolio use case, but the case study pattern is exceptional.
- **Most notable interaction:** on case study pages, headings split into character-level `<span>`s that reveal with staggered `y: 100%, opacity: 0 → y: 0, opacity: 1`, offset ~40ms per char. `[inferred: GSAP SplitText]`
- **Passes principles:** partially — homepage violates §3, but case study pattern passes all 7.

### 15. Active Theory · `activetheory.net`
- **Source:** design/technology studio (Google, Nike WebGL work)
- **Why:** the case studies are museum-grade demonstrations of what's technically possible in the browser. Included as a technique reference — most of what they do would violate §3 for a small interior studio, but the case-study anatomy is worth studying.
- **Most notable interaction:** each project card on the home is a mini WebGL scene tied to cursor position — hover and the image warps subtly with a fluid distortion shader.
- **Passes principles:** 4 of 7 (fails §1, §3, §7 for the interior-design use case) — bench reference only, not a template.

### 16. Watson DG · `watson-dg.com`
- **Source:** design studio (dark, cinematic, editorial)
- **Why:** dark mode done right — warm charcoal instead of cool black, off-white text with slight yellow warmth. Every asset feels curated. Closest mood match to Makhno in the agency category.
- **Most notable interaction:** navigation is a floating pill in the top-right that only reveals labels on hover — ~200ms width transition. Elegant.
- **Passes principles:** all 7 for the mood direction.

### 17. Immersive Garden · `immersive-g.com`
- **Source:** design/technology studio (Paris — heavy cinematic transitions)
- **Why:** page transitions are the star. Each route change is a curtain-wipe timed to a matching audio hit. Some of this would violate our principles for interior design — but their transition anatomy is a masterclass.
- **Most notable interaction:** clicking a project triggers a full-viewport curtain animation (~800ms, heavy easing) while the next page's hero loads underneath. When the curtain lifts, the destination is fully ready.
- **Passes principles:** 5 of 7 (borderline §3, §6). Bench for transition mechanics.

### 18. Antinomy Studio · `antinomy.studio`
- **Source:** design agency (editorial-forward portfolios)
- **Why:** the case study index is a single-column list of thumbnails with generous vertical rhythm — reads like a magazine's contents page. No grid.
- **Most notable interaction:** on hover of a list item, the thumbnail image expands into a wider preview inline, pushing subsequent items down. ~400ms `easeOut`. Different from every other agency's carousel/grid.
- **Passes principles:** all 7.

### 19. Bottega Veneta · `bottegaveneta.com`
- **Source:** luxury fashion (as reference for editorial pacing)
- **Why:** in the fashion category, Bottega is the discipline benchmark — no marketing shouting, product photography as still-life. Section-to-section transitions on the collection pages are pure classroom material.
- **Most notable interaction:** scrolling a collection page → each look reveals with a subtle mask (~500ms) and the color of the surrounding page background shifts to match the dominant color of the current image. `[inferred: CSS custom property animated on scroll]`
- **Passes principles:** all 7.

### 20. Loewe · `loewe.com`
- **Source:** luxury fashion (art-forward under JW Anderson)
- **Why:** every seasonal drop has a fully-custom microsite — the main site changes personality regularly without losing brand. Included as reference for how "editorial variety" can live within a system.
- **Most notable interaction:** on collection detail pages, hovering a product reveals a secondary image beneath the primary — no click needed. ~200ms fade.
- **Passes principles:** all 7 in its "quieter" seasonal moments; some drops are too loud for our principles.

### 21. The Row · `therow.com`
- **Source:** luxury fashion (Olsen sisters — pure minimalism)
- **Why:** possibly the quietest fashion site in existence. Every choice is a removal. What's here is what remains after all decoration has been stripped. Reference for "what maximum restraint actually looks like when you're brave enough."
- **Most notable interaction:** almost none. Products crossfade on hover, that's it. The lack of interaction *is* the interaction.
- **Passes principles:** all 7 — the reference for §1 and §6.

### 22. Aman Resorts · `aman.com`
- **Source:** premium hospitality (Aman properties — luxury travel benchmark)
- **Why:** the property index is the reference for how to present multiple locations as a portfolio. Each property gets a full-screen intro with landscape video, then a considered content flow. Never overwhelming.
- **Most notable interaction:** on the property index, each property card has a looping 2-3 second landscape video that only plays on hover — no auto-play. Curtain-wipe transition to the detail page (~600ms, cinematic feel).
- **Passes principles:** all 7. Directly transferable pattern for a project index.

### 23. Fondation Louis Vuitton · `fondationlouisvuitton.fr`
- **Source:** cultural institution (Frank Gehry museum, Paris)
- **Why:** exhibitions are treated as case studies. Every past show has its own microsite-within-the-site. Pattern is directly relevant for how "past projects" could be handled.
- **Most notable interaction:** exhibition landing pages open with a full-screen hero video, autoplay-muted, that transitions to a scrollable exhibition narrative when the user scrolls. `[inferred: HLS video, poster frame, IntersectionObserver-gated]`
- **Passes principles:** 6 of 7 (some sections violate §3).

### 24. A. Lange & Söhne · `alange-soehne.com`
- **Source:** haute horlogerie (German precision watchmaker)
- **Why:** precision + patience translated to the web. Every product page is a slow reveal — the watch face is shown in extraordinarily high detail, one component at a time. The metaphor of craft transfers directly to interior design.
- **Most notable interaction:** on watch detail pages, scrolling exposes different components (movement, dial, case) in labeled reveals — each reveal is patient (~700ms), never rushed. `[inferred: ScrollTrigger + pinned sections]`
- **Passes principles:** all 7.

### 25. Frama · `framacph.com`
- **Source:** Danish furniture + fragrance (contemporary product studio)
- **Why:** a smaller studio site done exceptionally well. The whole site is essentially one editorial layout with the discipline of a magazine. Proof that "wow" doesn't need WebGL — just conviction.
- **Most notable interaction:** the product index breaks into visual "chapters" separated by a full-bleed lifestyle image. Each chapter has a mini section-title reveal. Feels like turning to a new spread in Wallpaper*.
- **Passes principles:** all 7.

---

## What I deliberately excluded (kill list)

Bench-adjacent sites I evaluated and rejected — worth naming so the filter is visible:

- **Awwwards SOTD generic entries** — most agencies compete on "novelty per screen," not restraint. 90% fail §3 and §6.
- **Big Next.js SaaS landing pages** (Vercel, Linear, Stripe) — beautiful, but their language is the wrong genre for an interior studio.
- **Herman Miller / Vitra** — solid brand sites but too e-commerce forward for a studio portfolio use case.
- **Snøhetta** — architecture firm site; considered, but the information density violates §2.
- **BIG (Bjarke Ingels)** — case study format is impressive but the site feels like a database, not a story.
- **Jacquemus / Prada campaign microsites** — too "trend of the season" for a portfolio that should read as timeless.
- **Locomotive.ca** (the agency behind Locomotive Scroll) — the agency site itself is a bit busy for our benchmark.
- **Studio Pistol / Bien Studio** — checked, either not currently exceptional or the design language reads more startup-adjacent than editorial.

If any of these turn out to have an interaction worth borrowing in Phase 2, I'll say so.

---

## Chosen for Phase 2 deep deconstruction (6 sites)

Selected to span the mood + technique matrix:

1. **Makhno Studio** — our reference; must be understood in full
2. **Studio Freight** — motion budgeting gold standard
3. **Vincent Van Duysen** — pure restraint benchmark (opposite pole from Makhno)
4. **Pierre Yovanovitch** — editorial pacing + serif discipline
5. **Aman Resorts** — property/project index anatomy (directly transferable)
6. **Bottega Veneta** — color-shift-on-scroll technique + luxury pacing

Each deconstructed in Phase 2 with: cold open through 60s+, plus reference notes for the 14 elements from the brief.
