import { defineType, defineField } from "sanity";

/**
 * Tour room — one of 6 rooms shown as clickable hotspots on Sec 10.
 * Reveal is either a full video (Living, Kitchen, Bedroom) or a Ken-Burns still.
 * (Deliverable 4 §5 Sec 10, §7.7, §7.11.)
 */
export const tourRoom = defineType({
  name: "tourRoom",
  title: "Tour room",
  type: "object",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      description: 'URL hash for shareable links, e.g. "living" → #tour/living',
      type: "slug",
      options: { source: "name", maxLength: 30 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "name",
      title: "Room name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      description: "Small circular image shown inside the hotspot pill on the aerial.",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "reveal",
      title: "Reveal type",
      type: "string",
      options: {
        list: [
          { title: "Video (plays once, holds on final frame)", value: "video" },
          { title: "Still (~10s Ken-Burns push, then holds)", value: "kenBurnsStill" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "revealVideo",
      title: "Reveal video",
      type: "file",
      options: { accept: "video/*" },
      hidden: ({ parent }) => parent?.reveal !== "video",
    }),
    defineField({
      name: "revealImage",
      title: "Reveal image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.reveal !== "kenBurnsStill",
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Overlay copy shown bottom-left inside the room view.",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "aerialPosition",
      title: "Aerial position (percent)",
      description: "Where the hotspot pill sits over the aerial view. 0–100 for each axis.",
      type: "object",
      fields: [
        defineField({ name: "xPct", type: "number", validation: (r) => r.min(0).max(100) }),
        defineField({ name: "yPct", type: "number", validation: (r) => r.min(0).max(100) }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "description", media: "thumbnail" },
  },
});
