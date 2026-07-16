---
name: makhno-reference-design
description: Design system skill for makhno-reference. Activate when building UI components, pages, or any visual elements. Provides exact color tokens, typography scale, spacing grid, component patterns, and craft rules. Read references/DESIGN.md before writing any CSS or JSX.
---

# makhno-reference Design System

You are building UI for **makhno-reference**. Light-themed, warm palette, sans-serif typography (swiper-icons), standard density on a 8px grid, expressive motion.

## Visual Reference

**IMPORTANT**: Study ALL screenshots below before writing any UI. Match colors, typography, spacing, layout, and motion exactly as shown.

### Homepage

![makhno-reference Homepage](screenshots/homepage.png)

> Read `references/DESIGN.md` for full token details.

## Design Philosophy

- **Layered depth** — use shadow tokens to create a sense of physical layering. Each elevation level has a specific shadow.
- **Gradient accents** — gradients are used thoughtfully for emphasis, not decoration.
- **Type pairing** — swiper-icons for body/UI text, Inter for headings/display. Never introduce a third typeface.
- **standard density** — 8px base grid. Every dimension is a multiple of 8.
- **warm palette** — the color temperature runs warm, matching the sans-serif typography.
- **Restrained accent** — `#ff6900` is the only pop of color. Used exclusively for CTAs, links, focus rings, and active states.
- **Expressive motion** — animations are an integral part of the experience. Use spring physics and layout animations.

## Color System

### Core Palette

| Role | Token | Hex | Use |
|------|-------|-----|-----|
| Background | `--background` | `#ffffff` | Page/app background |
| Surface | `--surface` | `#ece4e1` | Cards, panels, modals |
| Text Primary | `--text-primary` | `#000000` | Headings, body text |
| Text Muted | `--text-muted` | `#7c7976` | Captions, placeholders |
| Accent | `--accent` | `#ff6900` | CTAs, links, focus rings |
| Border | `--border` | `#353535` | Dividers, card borders |

### Status Colors

| Status | Hex | Use |
|--------|-----|-----|
| Success | `#7bdcb5` | Confirmations, positive trends |
| Warning | `#fcb900` | Caution states, pending items |
| Danger | `#dc4343` | Errors, destructive actions |

### Extended Palette

- `#988d83`
- `#afa49a`
- `#2e2721`
- **tile-color:** `#da532c` — Warm accent — hover glow or decorative highlight
- **swiper-theme-color:** `#007aff`
- **wp--preset--color--cyan-bluish-gray:** `#abb8c3`
- **wp--preset--color--pale-pink:** `#f78da7`
- **wp--preset--color--vivid-red:** `#cf2e2e` — Warm accent — hover glow or decorative highlight

### CSS Variable Tokens

```css
--accent: $color-pearl-bush;
--background: $color-mine-shaft;
--accent: $color-pearl-bush;
--background: $color-mine-shaft;
--accent: $color-pearl-bush;
--background: $color-mine-shaft;
--accent: $color-pearl-bush;
--background: $color-mine-shaft;
--accent: $color-pearl-bush;
--background: $color-mine-shaft;
```

## Typography

### Font Stack

- **swiper-icons** — Heading 1, Heading 2, Heading 3
- **Inter** — Body, Caption

### Font Sources

```css
@font-face {
  font-family: "Inter";
  src: url("fonts/Inter-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Inter";
  src: url("fonts/Inter-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "swiper-icons";
  src: url("data:application/font-woff;charset=utf-8;base64, d09GRgABAAAAAAZgABAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAGRAAAABoAAAAci6qHkUdERUYAAAWgAAAAIwAAACQAYABXR1BPUwAABhQAAAAuAAAANuAY7+xHU1VCAAAFxAAAAFAAAABm2fPczU9TLzIAAAHcAAAASgAAAGBP9V5RY21hcAAAAkQAAACIAAABYt6F0cBjdnQgAAACzAAAAAQAAAAEABEBRGdhc3AAAAWYAAAACAAAAAj//wADZ2x5ZgAAAywAAADMAAAD2MHtryVoZWFkAAABbAAAADAAAAA2E2+eoWhoZWEAAAGcAAAAHwAAACQC9gDzaG10eAAAAigAAAAZAAAArgJkABFsb2NhAAAC0AAAAFoAAABaFQAUGG1heHAAAAG8AAAAHwAAACAAcABAbmFtZQAAA/gAAAE5AAACXvFdBwlwb3N0AAAFNAAAAGIAAACE5s74hXjaY2BkYGAAYpf5Hu/j+W2+MnAzMYDAzaX6QjD6/4//Bxj5GA8AuRwMYGkAPywL13jaY2BkYGA88P8Agx4j+/8fQDYfA1AEBWgDAIB2BOoAeNpjYGRgYNBh4GdgYgABEMnIABJzYNADCQAACWgAsQB42mNgYfzCOIGBlYGB0YcxjYGBwR1Kf2WQZGhhYGBiYGVmgAFGBiQQkOaawtDAoMBQxXjg/wEGPcYDDA4wNUA2CCgwsAAAO4EL6gAAeNpj2M0gyAACqxgGNWBkZ2D4/wMA+xkDdgAAAHjaY2BgYGaAYBkGRgYQiAHyGMF8FgYHIM3DwMHABGQrMOgyWDLEM1T9/w8UBfEMgLzE////P/5//f/V/xv+r4eaAAeMbAxwIUYmIMHEgKYAYjUcsDAwsLKxc3BycfPw8jEQA/gZBASFhEVExcQlJKWkZWTl5BUUlZRVVNXUNTQZBgMAAMR+E+gAEQFEAAAAKgAqACoANAA+AEgAUgBcAGYAcAB6AIQAjgCYAKIArAC2AMAAygDUAN4A6ADyAPwBBgEQARoBJAEuATgBQgFMAVYBYAFqAXQBfgGIAZIBnAGmAbIBzgHsAAB42u2NMQ6CUAyGW568x9AneYYgm4MJbhKFaExIOAVX8ApewSt4Bic4AfeAid3VOBixDxfPYEza5O+Xfi04YADggiUIULCuEJK8VhO4bSvpdnktHI5QCYtdi2sl8ZnXaHlqUrNKzdKcT8cjlq+rwZSvIVczNiezsfnP/uznmfPFBNODM2K7MTQ45YEAZqGP81AmGGcF3iPqOop0r1SPTaTbVkfUe4HXj97wYE+yNwWYxwWu4v1ugWHgo3S1XdZEVqWM7ET0cfnLGxWfkgR42o2PvWrDMBSFj/IHLaF0zKjRgdiVMwScNRAoWUoH78Y2icB/yIY09An6AH2Bdu/UB+yxopYshQiEvnvu0dURgDt8QeC8PDw7Fpji3fEA4z/PEJ6YOB5hKh4dj3EvXhxPqH/SKUY3rJ7srZ4FZnh1PMAtPhwP6fl2PMJMPDgeQ4rY8YT6Gzao0eAEA409DuggmTnFnOcSCiEiLMgxCiTI6Cq5DZUd3Qmp10vO0LaLTd2cjN4fOumlc7lUYbSQcZFkutRG7g6JKZKy0RmdLY680CDnEJ+UMkpFFe1RN7nxdVpXrC4aTtnaurOnYercZg2YVmLN/d/gczfEimrE/fs/bOuq29Zmn8tloORaXgZgGa78yO9/cnXm2BpaGvq25Dv9S4E9+5SIc9PqupJKhYFSSl47+Qcr1mYNAAAAeNptw0cKwkAAAMDZJA8Q7OUJvkLsPfZ6zFVERPy8qHh2YER+3i/BP83vIBLLySsoKimrqKqpa2hp6+jq6RsYGhmbmJqZSy0sraxtbO3sHRydnEMU4uR6yx7JJXveP7WrDycAAAAAAAH//wACeNpjYGRgYOABYhkgZgJCZgZNBkYGLQZtIJsFLMYAAAw3ALgAeNolizEKgDAQBCchRbC2sFER0YD6qVQiBCv/H9ezGI6Z5XBAw8CBK/m5iQQVauVbXLnOrMZv2oLdKFa8Pjuru2hJzGabmOSLzNMzvutpB3N42mNgZGBg4GKQYzBhYMxJLMlj4GBgAYow/P/PAJJhLM6sSoWKfWCAAwDAjgbRAAB42mNgYGBkAIIbCZo5IPrmUn0hGA0AO8EFTQAA") format("woff");
  font-weight: 400;
}
```

### Type Scale

| Role | Family | Size | Weight |
|------|--------|------|--------|
| Heading 1 | swiper-icons | 5rem | 700 |
| Heading 2 | swiper-icons | 4rem | 700 |
| Heading 3 | swiper-icons | 3.4rem | 700 |
| Body | Inter | 1.3rem | 400 |
| Caption | Inter | 1.4rem | 400 |

### Typography Rules

- Body/UI: **swiper-icons**, Headings: **Inter** — these are the only display fonts
- Max 3-4 font sizes per screen
- Headings: weight 600-700, body: weight 400
- Use color and opacity for text hierarchy, not additional font sizes
- Line height: 1.5 for body, 1.2 for headings

## Spacing & Layout

### Base Grid: 8px

Every dimension (margin, padding, gap, width, height) must be a multiple of **8px**.

### Spacing Scale

`4, 8, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80` px

### Spacing as Meaning

| Spacing | Use |
|---------|-----|
| 4-8px | Tight: related items within a group |
| 16px | Medium: between groups |
| 24-32px | Wide: between sections |
| 48px+ | Vast: major section breaks |

### Border Radius

Scale: `.2rem, .3rem, 1rem, 8%, 10px, 10em`
Default: `8%`

### Container

Max-width: `1023px`, centered with auto margins.

### Breakpoints

| Name | Value |
|------|-------|
| sm | 520px |
| md | 767px |
| md | 768px |
| lg | 1023px |
| lg | 1024px |
| xl | 1279px |
| xl | 1280px |
| 2xl | 1440px |
| 2xl | 1920px |

Mobile-first: design for small screens, layer on responsive overrides.

## Component Patterns

### Card

```css
.card {
  background: #ece4e1;
  border: 1px solid #353535;
  border-radius: 8%;
  padding: 32px;
  box-shadow: inset 0 0 0 .1rem currentColor;
}
```

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>
```

### Button

```css
/* Primary */
.btn-primary {
  background: #ff6900;
  color: #000000;
  border-radius: 8%;
  padding: 16px 32px;
  font-weight: 500;
  transition: opacity 150ms ease;
}
.btn-primary:hover { opacity: 0.9; }

/* Ghost */
.btn-ghost {
  background: transparent;
  border: 1px solid #353535;
  color: #000000;
  border-radius: 8%;
  padding: 16px 32px;
}
```

```html
<button class="btn-primary">Get Started</button>
<button class="btn-ghost">Learn More</button>
```

### Input

```css
.input {
  background: #ffffff;
  border: 1px solid #353535;
  border-radius: 8%;
  padding: 16px 24px;
  color: #000000;
  font-size: 14px;
}
.input:focus { border-color: #ff6900; outline: none; }
```

```html
<input class="input" type="text" placeholder="Search..." />
```

### Badge / Chip

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: #ece4e1;
  color: #7c7976;
}
```

```html
<span class="badge">New</span>
<span class="badge">Beta</span>
```

### Modal / Dialog

```css
.modal-backdrop { background: rgba(0, 0, 0, 0.6); }
.modal {
  background: #ece4e1;
  border: 1px solid #353535;
  border-radius: 10em;
  padding: 32px;
  max-width: 480px;
  width: 90vw;
  box-shadow: inset 0 0 0 .1rem currentColor;
}
```

```html
<div class="modal-backdrop">
  <div class="modal">
    <h2>Dialog Title</h2>
    <p>Dialog content.</p>
    <button class="btn-primary">Confirm</button>
    <button class="btn-ghost">Cancel</button>
  </div>
</div>
```

### Table

```css
.table { width: 100%; border-collapse: collapse; }
.table th {
  text-align: left;
  padding: 16px 24px;
  font-weight: 500;
  font-size: 12px;
  color: #7c7976;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #353535;
}
.table td {
  padding: 24px;
  border-bottom: 1px solid #353535;
}
```

```html
<table class="table">
  <thead><tr><th>Name</th><th>Status</th><th>Date</th></tr></thead>
  <tbody>
    <tr><td>Item One</td><td>Active</td><td>Jan 1</td></tr>
    <tr><td>Item Two</td><td>Pending</td><td>Jan 2</td></tr>
  </tbody>
</table>
```

### Navigation

```css
.nav {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 32px;
  border-bottom: 1px solid #353535;
}
.nav-link {
  color: #7c7976;
  padding: 16px 24px;
  border-radius: 8%;
  transition: color 150ms;
}
.nav-link:hover { color: #000000; }
.nav-link.active { color: #ff6900; }
```

```html
<nav class="nav">
  <a href="/" class="nav-link active">Home</a>
  <a href="/about" class="nav-link">About</a>
  <a href="/pricing" class="nav-link">Pricing</a>
  <button class="btn-primary" style="margin-left: auto">Get Started</button>
</nav>
```

### Extracted Components

These components were found in the codebase:

**Button** (`html`)

**Navigation** (`html`)

## Page Structure

The following page sections were detected:

- **Navigation** — Top navigation bar (4 items)
- **Hero** — Hero section (detected from heading structure)
- **Cards** — Grid of 3 card elements (3 items)
- **Footer** — Page footer with links and info (14 items)

When building pages, follow this section order and structure.

## Animation & Motion

This project uses **expressive motion**. Animations are part of the design language.

### CSS Animations

- `title-underline`
- `title-underline-reverse`
- `crawling-line`
- `button-underline`
- `button-icon-movement`

### Motion Tokens

- **Duration scale:** `0ms`, `.3s`, `.5s`, `1.5s`, `50ms`, `100ms`, `200ms`, `250ms`, `300ms`, `350ms`, `400ms`, `450ms`, `500ms`, `600ms`, `700ms`, `750ms`, `800ms`, `1000ms`, `50000000ms`
- **Easing functions:** `cubic-bezier(.4,0,0,1)`, `cubic-bezier(.15,.85,.45,1)`, `ease-in-out`, `ease`, `ease-out`, `linear`, `cubic-bezier(.165,.84,.44,1)`
- **Animated properties:** `opacity`

### Motion Guidelines

- **Duration:** Use values from the duration scale above. Short (0ms) for micro-interactions, long (50000000ms) for page transitions
- **Easing:** Use `cubic-bezier(.4,0,0,1)` as the default easing curve
- **Direction:** Elements enter from bottom/right, exit to top/left
- **Reduced motion:** Always respect `prefers-reduced-motion` — disable animations when set

## Depth & Elevation

### Shadow Tokens

- Subtle: `inset 0 0 0 2px #353535`
- Raised (cards, buttons): `inset 0 0 0 .1rem currentColor`

### Z-Index Scale

`1, 2, 3, 4, 6, 7, 8, 9, 10, 100, 999, 1000, 9999999`

Use these exact values — never invent z-index values.

## Anti-Patterns (Never Do)

- **No blur effects** — no backdrop-blur, no filter: blur()
- **No zebra striping** — tables and lists use borders for separation
- **No invented colors** — every hex value must come from the palette above
- **No arbitrary spacing** — every dimension is a multiple of 8px
- **No extra fonts** — only swiper-icons and Inter are allowed
- **No arbitrary border-radius** — use the scale: .2rem, .3rem, 1rem, 10px, 10em
- **No opacity for disabled states** — use muted colors instead

## Workflow

1. **Read** `references/DESIGN.md` before writing any UI code
2. **Pick colors** from the Color System section — never invent new ones
3. **Set typography** — swiper-icons, Inter only, using the type scale
4. **Build layout** on the 8px grid — check every margin, padding, gap
5. **Match components** to patterns above before creating new ones
6. **Apply elevation** — use shadow tokens
7. **Validate** — every value traces back to a design token. No magic numbers.

## Brand Spec

- **Favicon:** `/wp-content/uploads/fbrfg/apple-touch-icon.png`
- **Site URL:** `https://makhnostudio.com`
- **Brand color:** `#ff6900`
- **Brand typeface:** swiper-icons

## Quick Reference

```
Background:     #ffffff
Surface:        #ece4e1
Text:           #000000 / #7c7976
Accent:         #ff6900
Border:         #353535
Font:           swiper-icons
Spacing:        8px grid
Radius:         8%
Components:     7 detected
```

## When to Trigger

Activate this skill when:
- Creating new components, pages, or visual elements for makhno-reference
- Writing CSS, Tailwind classes, styled-components, or inline styles
- Building page layouts, templates, or responsive designs
- Reviewing UI code for design consistency
- The user mentions "makhno-reference" design, style, UI, or theme
- Generating mockups, wireframes, or visual prototypes

---

# Full Reference Files

> Every output file is embedded below. Claude has full design system context from /skills alone.

## Design System Tokens (DESIGN.md)

# makhno-reference DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 20 · Fonts: 2 · Components: 7
> Icon library: not detected · State: not detected
> Primary theme: light · Dark mode toggle: no · Motion: expressive

## Visual Reference

**Match this design exactly** — study colors, fonts, spacing, and component shapes before writing any UI code.

![makhno-reference Homepage](../screenshots/homepage.png)

---

## 1. Visual Theme & Atmosphere

This is a **light-themed** interface with a warm, approachable feel. The light background emphasizes content clarity. Typography pairs **Inter** for display/headings with **swiper-icons** for body text, creating clear visual hierarchy through type contrast. Spacing follows a **8px base grid** (standard density), with scale: 4, 8, 16, 20, 24, 32, 40, 48px. The accent color **#ff6900** anchors interactive elements (buttons, links, focus rings). Motion is expressive — spring physics, layout animations, and staggered reveals are part of the visual language.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| theme-color | `#ffffff` | background | Page background, darkest surface |
| surface | `#ece4e1` | surface | Card and panel backgrounds |
| wp--preset--color--black | `#000000` | text-primary | Headings and body text |
| text-muted | `#7c7976` | text-muted | Captions, placeholders, secondary info |
| border | `#353535` | border | Dividers, card borders, outlines |
| wp--preset--color--luminous-vivid-orange | `#ff6900` | accent | CTAs, links, focus rings, active states |
| danger | `#dc4343` | danger | Error states, destructive actions |
| wp--preset--color--light-green-cyan | `#7bdcb5` | success | Success states, positive indicators |
| wp--preset--color--luminous-vivid-amber | `#fcb900` | warning | Warning states, caution indicators |
| swiper-theme-color | `#007aff` | info | Informational highlights |
| unknown | `#988d83` | unknown | Palette color |
| unknown | `#afa49a` | unknown | Palette color |
| unknown | `#2e2721` | unknown | Palette color |
| tile-color | `#da532c` | unknown | Palette color |
| wp--preset--color--cyan-bluish-gray | `#abb8c3` | unknown | Palette color |
| wp--preset--color--pale-pink | `#f78da7` | unknown | Palette color |
| wp--preset--color--vivid-red | `#cf2e2e` | unknown | Palette color |
| wp--preset--color--vivid-green-cyan | `#00d084` | unknown | Palette color |
| wp--preset--color--pale-cyan-blue | `#8ed1fc` | unknown | Palette color |
| wp--preset--color--vivid-cyan-blue | `#0693e3` | unknown | Palette color |

### CSS Variable Tokens

```css
--accent: $color-pearl-bush;
--background: $color-mine-shaft;
--accent: $color-pearl-bush;
--background: $color-mine-shaft;
--accent: $color-pearl-bush;
--background: $color-mine-shaft;
--accent: $color-pearl-bush;
--background: $color-mine-shaft;
--accent: $color-pearl-bush;
--background: $color-mine-shaft;
```


---

## 3. Typography Rules

**Font Stack:**
- **swiper-icons** — Heading 1, Heading 2, Heading 3
- **Inter** — Body, Caption

**Font Sources:**

```css
@font-face {
  font-family: "Inter";
  src: url("fonts/Inter-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Inter";
  src: url("fonts/Inter-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "swiper-icons";
  src: url("data:application/font-woff;charset=utf-8;base64, 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") format("woff");
  font-weight: 400;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | swiper-icons | 5rem | 700 |
| Heading 2 | swiper-icons | 4rem | 700 |
| Heading 3 | swiper-icons | 3.4rem | 700 |
| Body | Inter | 1.3rem | 400 |
| Caption | Inter | 1.4rem | 400 |

**Typographic Rules:**
- Limit to 2 font families max per screen
- Use **swiper-icons** for body/UI text, **Inter** for display/headings
- Maintain consistent hierarchy: no more than 3-4 font sizes per screen
- Headings use bold (600-700), body uses regular (400)
- Line height: 1.5 for body text, 1.2 for headings
- Use color and opacity for secondary hierarchy, not additional font sizes


---

## 4. Component Stylings

### Layout (1)

**Footer** — `html`

### Navigation (1)

**Navigation** — `html`

### Data Display (1)

**List** — `html`

### Data Input (2)

**Button** — `html`
- Animation: 

**Input** — `html`
- State: :focus, :placeholder

### Media (2)

**Image** — `html`

**Icon** — `html`



---

## 5. Layout Principles

- **Base spacing unit:** 8px
- **Spacing scale:** 4, 8, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80
- **Border radius:** .2rem, .3rem, 1rem, 8%, 10px, 10em
- **Max content width:** 1023px

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 4-8px | Tight: related items within a group |
| 16px | Medium: between groups |
| 24-32px | Wide: between sections |
| 48px+ | Vast: major section breaks |


---

## 6. Depth & Elevation

### Flat — subtle depth hints

- `inset 0 0 0 2px #353535`

### Raised — cards, buttons, interactive elements

- `inset 0 0 0 .1rem currentColor`

### Z-Index Scale

`1, 2, 3, 4, 6, 7, 8, 9, 10, 100, 999, 1000, 9999999`



---

## 7. Animation & Motion

This project uses **expressive motion**. Animations are an integral part of the experience.

### CSS Animations

- `@keyframes title-underline`
- `@keyframes title-underline-reverse`
- `@keyframes crawling-line`
- `@keyframes button-underline`
- `@keyframes button-icon-movement`
- `@keyframes button-icon-movement-reverse`

### Animated Components

- **Button**: 

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Use `#ff6900` for interactive elements (buttons, links, focus rings)
- Use `#ffffff` as the primary page background
- Pair **swiper-icons** (body) with **Inter** (display) — these are the only allowed fonts
- Follow the **8px** spacing grid for all margins, padding, and gaps
- Use the defined shadow tokens for elevation — see Section 6
- Use border-radius from the scale: .2rem, .3rem, 1rem, 8%, 10px
- Reuse existing components from Section 4 before creating new ones

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't introduce additional font families beyond swiper-icons and Inter
- Don't use arbitrary spacing values — stick to multiples of 8px
- Don't create custom box-shadow values outside the system tokens
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't duplicate component patterns — check Section 4 first
- Don't use backdrop-blur or blur effects

### Anti-Patterns (detected from codebase)

- No blur or backdrop-blur effects
- No zebra striping on tables/lists


---

## 9. Responsive Behavior

| Name | Value | Source |
|---|---|---|
| sm | 520px | css |
| md | 767px | css |
| md | 768px | css |
| lg | 1023px | css |
| lg | 1024px | css |
| xl | 1279px | css |
| xl | 1280px | css |
| 2xl | 1440px | css |
| 2xl | 1920px | css |

**Approach:** Use `@media (min-width: ...)` queries matching the breakpoints above.


---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #ece4e1
Border: 1px solid #353535
Radius: 8%
Padding: 32px
Font: swiper-icons
Use shadow tokens from Section 6.
```

### Build a Button

```
Primary: bg #ff6900, text white
Ghost: bg transparent, border #353535
Padding: 16px 32px
Radius: 8%
Hover: opacity 0.9 or lighter shade
Focus: ring with #ff6900
```

### Build a Page Layout

```
Background: #ffffff
Max-width: 1023px, centered
Grid: 8px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #ece4e1
Label: #7c7976 (muted, 12px, uppercase)
Value: #000000 (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #ffffff
Input border: 1px solid #353535
Focus: border-color #ff6900
Label: #7c7976 12px
Spacing: 32px between fields
Radius: 8%
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: swiper-icons, type scale from Section 3
4. Spacing: 8px grid
5. Components: match patterns from Section 4
6. Elevation: shadow tokens
```

## Bundled Fonts (fonts/)

The following font files are bundled in the `fonts/` directory:

- `fonts/Inter-Black.ttf`
- `fonts/Inter-Bold.ttf`
- `fonts/Inter-ExtraBold.ttf`
- `fonts/Inter-ExtraLight.ttf`
- `fonts/Inter-Light.ttf`
- `fonts/Inter-Medium.ttf`
- `fonts/Inter-Regular.ttf`
- `fonts/Inter-SemiBold.ttf`
- `fonts/Inter-Thin.ttf`

Use these local font files in `@font-face` declarations instead of fetching from Google Fonts.

## Homepage Screenshots (screenshots/)

![homepage.png](screenshots/homepage.png)

