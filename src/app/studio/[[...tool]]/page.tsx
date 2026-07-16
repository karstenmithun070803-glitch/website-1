"use client";

/**
 * Sanity Studio — mounted at /studio.
 * Route uses Next's catch-all so Studio's own client-side routing works.
 * Config lives in sanity.config.ts at repo root.
 *
 * Must be a Client Component: the config contains function references
 * (validation rules, structure builders) that can't cross the RSC boundary.
 * Studio route metadata is exported by src/app/studio/layout.tsx instead.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
