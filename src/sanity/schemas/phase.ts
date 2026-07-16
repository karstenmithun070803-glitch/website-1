import { defineType, defineField } from "sanity";

/**
 * Phase — one of the 5 process phases (Listen, Sketch, Refine, Build, Live).
 * Also used for Virtual Tour intro (phase 6, no diorama).
 * (Deliverable 4 §5, §7.11.)
 */
export const phase = defineType({
  name: "phase",
  title: "Phase",
  type: "object",
  fields: [
    defineField({
      name: "number",
      title: "Phase number",
      type: "number",
      validation: (r) => r.required().min(1).max(6),
    }),
    defineField({
      name: "name",
      title: "Name",
      description: 'e.g. "Listen", "Sketch"',
      type: "string",
      validation: (r) => r.required().max(20),
    }),
    defineField({
      name: "introBody",
      title: "Intro body",
      description: "Bottom-right body copy on the phase intro sub-scene.",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "backgroundVideo",
      title: "Background video",
      description: "Scrubbed by scroll. Only for diorama phases (1, 3, 5).",
      type: "file",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "backgroundVideoPoster",
      title: "Background poster",
      description: "Fallback still if the video fails or under reduced-motion.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "subScenes",
      title: "Sub-scenes",
      description: "Ordered list of camera positions the scroll advances through.",
      type: "array",
      of: [{ type: "subScene" }],
    }),
    defineField({
      name: "endOfPhaseCard",
      title: "End-of-phase card",
      description: "Optional overlay card that appears at end of the phase.",
      type: "object",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "body", type: "text", rows: 3 }),
        defineField({ name: "ctaLabel", type: "string" }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "introBody", num: "number" },
    prepare: ({ title, subtitle, num }) => ({
      title: `${num}. ${title}`,
      subtitle,
    }),
  },
});
