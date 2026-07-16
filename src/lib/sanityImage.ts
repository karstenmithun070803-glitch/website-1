import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { projectId, dataset } from "./sanity";

/**
 * `urlFor(image)` → chainable URL builder for Sanity images.
 * Handles AVIF/WebP negotiation, hotspot cropping, and srcset widths.
 *
 * Usage:
 *   <img src={urlFor(image).width(800).auto('format').url()} />
 */
const builder =
  projectId && projectId !== "placeholder"
    ? createImageUrlBuilder({ projectId, dataset })
    : null;

export function urlFor(source: Image) {
  if (!builder) throw new Error("Sanity not configured — cannot build image URL.");
  return builder.image(source);
}
