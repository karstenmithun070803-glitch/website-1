import { defineType, defineField } from "sanity";

/**
 * Sub-scene — one advance of the pin-scroll diorama camera.
 * Each has its own hotspot set + step description.
 * (Deliverable 4 §5 Sec 4/6/8, §7.11.)
 */
export const subScene = defineType({
  name: "subScene",
  title: "Sub-scene",
  type: "object",
  fields: [
    defineField({
      name: "stepLabel",
      title: "Step label",
      description: 'e.g. "STEP 01"',
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "stepDescription",
      title: "Step description",
      description: "1–2 sentence body shown bottom-right of the stage.",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "hotspots",
      title: "Hotspots",
      description: "Floating pill labels for this sub-scene (typically 3).",
      type: "array",
      of: [{ type: "hotspot" }],
      validation: (r) => r.min(1).max(6),
    }),
  ],
  preview: {
    select: { title: "stepLabel", subtitle: "stepDescription" },
  },
});
