import { defineType, defineField } from "sanity";

/**
 * Home page — SINGLETON. Only one document of this type ever exists.
 * All copy shown on `/` lives here.
 * (Deliverable 4 §7.11.)
 */
export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  // Enforce singleton via a `__type` structure filter in sanity.config.ts.
  fields: [
    // ─── Sec 0 · Intro modal ────────────────────────────────────────────
    defineField({
      name: "intro",
      title: "Intro modal (Sec 0)",
      type: "object",
      fields: [
        defineField({ name: "wordmarkImage", title: "Wordmark image (IMG D2)", type: "image" }),
        defineField({
          name: "tagline",
          title: "Tagline",
          type: "string",
          initialValue: "Interior Design Studio",
        }),
        defineField({
          name: "enterButtonLabel",
          title: "Enter button label",
          type: "string",
          initialValue: "Enter",
        }),
        defineField({
          name: "backgroundImage",
          title: "Background image (IMG D1)",
          type: "image",
        }),
      ],
    }),

    // ─── Sec 1 · Hero ───────────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero (Sec 1)",
      type: "object",
      fields: [
        defineField({
          name: "headline",
          title: "Display headline",
          description: 'e.g. "ROOMS THAT HOLD THE DAY."',
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "subline",
          title: "Sub-line",
          type: "text",
          rows: 2,
          validation: (r) => r.required(),
        }),
        defineField({ name: "heroVideo", title: "Hero video (Video 1)", type: "file" }),
        defineField({ name: "heroVideoPoster", title: "Hero video poster", type: "image" }),
      ],
    }),

    // ─── Sec 2 · Manifesto paragraphs ──────────────────────────────────
    defineField({
      name: "manifesto",
      title: "Manifesto paragraphs (Sec 2)",
      description: "Ordered paragraphs. Each fills with copper-highlighter on scroll.",
      type: "array",
      of: [{ type: "text" }],
      validation: (r) => r.min(1).max(4),
    }),

    // ─── Sec 3 · Transition ─────────────────────────────────────────────
    defineField({
      name: "transitionHeadline",
      title: "Transition headline (Sec 3)",
      description: 'e.g. "BEGIN A HOME WITH US"',
      type: "string",
    }),
    defineField({
      name: "transitionSubline",
      title: "Transition sub-line",
      type: "string",
    }),

    // ─── Sec 4–8 · The 5 phases ─────────────────────────────────────────
    defineField({
      name: "phases",
      title: "Phases (Sec 4–8)",
      type: "array",
      of: [{ type: "phase" }],
      validation: (r) => r.length(5),
    }),

    // ─── Sec 9–10 · Virtual tour ───────────────────────────────────────
    defineField({
      name: "tour",
      title: "Virtual tour (Sec 9–10)",
      type: "object",
      fields: [
        defineField({
          name: "introChip",
          title: "Chip label",
          type: "string",
          initialValue: "TAKE A TOUR",
        }),
        defineField({
          name: "introHeadline",
          title: "Intro headline",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "introBody",
          title: "Intro body",
          type: "text",
          rows: 3,
          validation: (r) => r.required(),
        }),
        defineField({
          name: "aerialImage",
          title: "Aerial image",
          description: "Daytime still — used as the Sec 10 hero.",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "rooms",
          title: "Rooms",
          type: "array",
          of: [{ type: "tourRoom" }],
          validation: (r) => r.length(6),
        }),
      ],
    }),

    // ─── Sec 11 · Contact modal ────────────────────────────────────────
    defineField({
      name: "contactModal",
      title: "Contact modal (Sec 11)",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Begin a conversation.",
        }),
        defineField({
          name: "subline",
          title: "Sub-line",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "confirmationMessage",
          title: "Confirmation message",
          type: "text",
          rows: 2,
          initialValue: "Thank you. We'll be in touch within two working days.",
        }),
        defineField({
          name: "backgroundImage",
          title: "Ambient background (IMG D3)",
          type: "image",
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home page" }),
  },
});
