import { sanityClient, isSanityConfigured, HOME_PAGE_QUERY } from "./sanity";
import { stubHomePage, type StubHomePage } from "./stubContent";

/**
 * Content orchestrator — the single source of truth for the home page's content.
 *
 * Preference order:
 *  1. Sanity `homePage` document, IF Sanity is configured AND the doc exists
 *  2. `stubContent.ts` fallback (Deliverable 4 copy hard-coded)
 *
 * Every section component reads from the return of this function — they don't
 * know or care whether the data came from Sanity or from the stub.
 *
 * NOTE for M2: we always return the stub shape. When Sanity content lands
 * (M7 or earlier), we'll add a translation layer here that maps the GROQ
 * result to the same StubHomePage shape.
 */
export async function getHomePageContent(): Promise<StubHomePage> {
  if (!isSanityConfigured || !sanityClient) return stubHomePage;

  try {
    const doc = await sanityClient.fetch(HOME_PAGE_QUERY, undefined, {
      next: { revalidate: 60 },
    });
    if (!doc) return stubHomePage;
    // TODO: when Sanity is populated, translate `doc` → StubHomePage shape here.
    return stubHomePage;
  } catch {
    return stubHomePage;
  }
}
