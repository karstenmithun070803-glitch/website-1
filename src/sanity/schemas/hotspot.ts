import { defineType, defineField } from "sanity";

/**
 * Hotspot — a floating pill label on a diorama sub-scene.
 * On hover, expands into a card with description + image.
 * (Deliverable 4 §5 Sec 4, §7.11.)
 */
export const hotspot = defineType({
  name: "hotspot",
  title: "Hotspot",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      description: 'Short pill text, e.g. "Orientation & Light"',
      type: "string",
      validation: (r) => r.required().max(50),
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Body copy shown when the card is open (1–3 sentences).",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cardImage",
      title: "Card image",
      description: "Image shown inside the expanded card. Typically a crop of the diorama poster.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "position",
      title: "Position on stage (percent)",
      description: "Where the pill sits over the sticky diorama. 0–100 for each axis.",
      type: "object",
      fields: [
        defineField({ name: "xPct", type: "number", validation: (r) => r.min(0).max(100) }),
        defineField({ name: "yPct", type: "number", validation: (r) => r.min(0).max(100) }),
      ],
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "description" },
  },
});
