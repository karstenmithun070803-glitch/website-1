import { NextResponse } from "next/server";
import { sanityClient, isSanityConfigured, HOME_PAGE_QUERY } from "@/lib/sanity";

/**
 * `GET /api/health` — M1 DoD check.
 * Returns Sanity connectivity status + whether the homePage singleton exists.
 * Falls back gracefully if Sanity is not configured.
 */
export async function GET() {
  if (!isSanityConfigured || !sanityClient) {
    return NextResponse.json({
      status: "unconfigured",
      message:
        "Sanity project ID not set. Site is running on stub content. Add NEXT_PUBLIC_SANITY_PROJECT_ID to .env.local to enable the CMS.",
    });
  }

  try {
    const homePage = await sanityClient.fetch(HOME_PAGE_QUERY);
    return NextResponse.json({
      status: "ok",
      sanity: { configured: true, homePageExists: Boolean(homePage) },
    });
  } catch (err) {
    return NextResponse.json(
      {
        status: "error",
        message: err instanceof Error ? err.message : "Unknown Sanity error.",
      },
      { status: 500 },
    );
  }
}
