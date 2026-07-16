import { getHomePageContent } from "@/lib/getContent";
import { HomePage } from "@/components/home/HomePage";

/**
 * Home route — composes the 11-section scroll journey.
 * Content comes from Sanity (via `getHomePageContent`) with a stub fallback,
 * so this page always renders.
 */
export default async function Home() {
  const content = await getHomePageContent();
  return <HomePage content={content} />;
}
