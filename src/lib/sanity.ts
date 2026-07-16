import { createClient } from "next-sanity";

/**
 * Sanity read client.
 * All GROQ queries flow through this. In production it's edge-cached by
 * next-sanity; in dev it fetches fresh on each request.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2025-01-01";

/** `true` if Sanity is configured. When false, callers should use stubContent fallback. */
export const isSanityConfigured = Boolean(projectId && projectId !== "placeholder");

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
    })
  : null;

/** GROQ for the home-page singleton. Extend as sections are wired up. */
export const HOME_PAGE_QUERY = /* groq */ `*[_type == "homePage"][0]{
  intro,
  hero,
  manifesto,
  transitionHeadline,
  transitionSubline,
  phases[]{
    number, name, introBody,
    backgroundVideo{ asset->{ url } },
    backgroundVideoPoster,
    subScenes[]{
      stepLabel, stepDescription,
      hotspots[]{ label, description, cardImage, position }
    },
    endOfPhaseCard
  },
  tour{
    introChip, introHeadline, introBody, aerialImage,
    rooms[]{
      "slug": slug.current,
      name, thumbnail, reveal, description, aerialPosition,
      revealVideo{ asset->{ url } },
      revealImage
    }
  },
  contactModal
}`;
