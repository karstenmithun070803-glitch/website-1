import { sanityClient, isSanityConfigured, HOME_PAGE_QUERY } from "./sanity";
import { urlFor } from "./sanityImage";
import { stubHomePage, type StubHomePage } from "./stubContent";
import type { Image } from "sanity";

/**
 * Content orchestrator — the single source of truth for the home page's content.
 *
 * Preference order:
 *  1. Sanity `homePage` document, IF Sanity is configured AND the doc exists
 *  2. `stubContent.ts` fallback (Deliverable 4 copy hard-coded)
 *
 * Every section component reads from the return of this function — they don't
 * know or care whether the data came from Sanity or from the stub.
 */
export async function getHomePageContent(): Promise<StubHomePage> {
  if (!isSanityConfigured || !sanityClient) return stubHomePage;

  try {
    const doc = await sanityClient.fetch(HOME_PAGE_QUERY, undefined, {
      next: { revalidate: 60 },
    });
    if (!doc) return stubHomePage;
    return translateDoc(doc);
  } catch {
    return stubHomePage;
  }
}

// ---------------------------------------------------------------------------
// Sanity doc → StubHomePage mapper
// ---------------------------------------------------------------------------

function imgUrl(source: Image | undefined | null): string | undefined {
  if (!source) return undefined;
  try {
    return urlFor(source).auto("format").width(1600).url();
  } catch {
    return undefined;
  }
}

function imgUrlForTexture(source: Image | undefined | null): string | undefined {
  if (!source) return undefined;
  try {
    return urlFor(source).format("jpg").width(2048).quality(80).url();
  } catch {
    return undefined;
  }
}


function fileUrl(field: { asset?: { url?: string } } | undefined | null): string | undefined {
  return field?.asset?.url ?? undefined;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function translateDoc(doc: any): StubHomePage {
  const s = stubHomePage;

  return {
    intro: {
      tagline: doc.intro?.tagline ?? s.intro.tagline,
      enterButtonLabel: doc.intro?.enterButtonLabel ?? s.intro.enterButtonLabel,
      backgroundImagePath: imgUrl(doc.intro?.backgroundImage) ?? s.intro.backgroundImagePath,
      wordmarkImagePath: imgUrl(doc.intro?.wordmarkImage) ?? s.intro.wordmarkImagePath,
    },
    hero: {
      headline: doc.hero?.headline ?? s.hero.headline,
      subline: doc.hero?.subline ?? s.hero.subline,
      heroVideoPath: fileUrl(doc.hero?.heroVideo) ?? s.hero.heroVideoPath,
      heroVideoPoster: imgUrl(doc.hero?.heroVideoPoster) ?? s.hero.heroVideoPoster,
    },
    manifesto: Array.isArray(doc.manifesto) && doc.manifesto.length > 0
      ? doc.manifesto
      : s.manifesto,
    transitionHeadline: doc.transitionHeadline ?? s.transitionHeadline,
    transitionSubline: doc.transitionSubline ?? s.transitionSubline,
    phases: Array.isArray(doc.phases) && doc.phases.length > 0
      ? doc.phases.map((p: any, i: number) => translatePhase(p, s.phases[i]))
      : s.phases,
    tour: translateTour(doc.tour, s.tour),
    contactModal: {
      heading: doc.contactModal?.heading ?? s.contactModal.heading,
      subline: doc.contactModal?.subline ?? s.contactModal.subline,
      confirmationMessage: doc.contactModal?.confirmationMessage ?? s.contactModal.confirmationMessage,
      backgroundImagePath: imgUrl(doc.contactModal?.backgroundImage) ?? s.contactModal.backgroundImagePath,
    },
  };
}

function translatePhase(p: any, fallback?: StubHomePage["phases"][number]): StubHomePage["phases"][number] {
  const fb = fallback ?? stubHomePage.phases[0];
  return {
    number: p.number ?? fb.number,
    name: p.name ?? fb.name,
    introBody: p.introBody ?? fb.introBody,
    backgroundVideoPath: fileUrl(p.backgroundVideo) ?? fb.backgroundVideoPath,
    backgroundVideoPoster: imgUrl(p.backgroundVideoPoster) ?? fb.backgroundVideoPoster,
    subScenes: Array.isArray(p.subScenes)
      ? p.subScenes.map((ss: any) => ({
          stepLabel: ss.stepLabel ?? "",
          stepDescription: ss.stepDescription ?? "",
          hotspots: Array.isArray(ss.hotspots)
            ? ss.hotspots.map((h: any) => ({
                label: h.label ?? "",
                description: h.description ?? "",
                cardImagePath: imgUrl(h.cardImage),
              }))
            : [],
        }))
      : fb.subScenes,
    cards: Array.isArray(p.cards) && p.cards.length > 0
      ? p.cards.map((c: any) => ({
          number: c.number ?? "",
          heading: c.heading ?? "",
          body: c.body ?? "",
        }))
      : fb.cards,
    endOfPhaseCard: p.endOfPhaseCard
      ? {
          heading: p.endOfPhaseCard.heading ?? "",
          body: p.endOfPhaseCard.body ?? "",
          ctaLabel: p.endOfPhaseCard.ctaLabel ?? "",
        }
      : fb.endOfPhaseCard,
  };
}

function translateTour(tour: any, fallback: StubHomePage["tour"]): StubHomePage["tour"] {
  if (!tour) return fallback;
  return {
    introChip: tour.introChip ?? fallback.introChip,
    introHeadline: tour.introHeadline ?? fallback.introHeadline,
    introBody: tour.introBody ?? fallback.introBody,
    introVideoPath: fallback.introVideoPath,
    aerialImagePath: imgUrlForTexture(tour.aerialImage) ?? fallback.aerialImagePath,
    rooms: Array.isArray(tour.rooms) && tour.rooms.length > 0
      ? tour.rooms.map((r: any, i: number) => {
          const fb = fallback.rooms[i] ?? fallback.rooms[0];
          return {
            slug: r.slug ?? fb.slug,
            name: r.name ?? fb.name,
            thumbnailPath: imgUrl(r.thumbnail) ?? fb.thumbnailPath,
            reveal: r.reveal ?? fb.reveal,
            revealVideoPath: fileUrl(r.revealVideo) ?? fb.revealVideoPath,
            revealImagePath: imgUrl(r.revealImage) ?? fb.revealImagePath,
            description: r.description ?? fb.description,
            aerialPosition: r.aerialPosition ?? fb.aerialPosition,
          };
        })
      : fallback.rooms,
  };
}
