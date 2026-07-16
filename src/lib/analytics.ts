import { track as vercelTrack } from "@vercel/analytics";

/**
 * `track` — thin wrapper around Vercel Analytics.
 * Every custom event on the site funnels through here so we can log,
 * batch, or replace the underlying provider later without touching callers.
 *
 * Event names + props: see deliverable-4-site-spec.md §7.10.
 */
export type AnalyticsProps = Record<string, string | number | boolean | null>;

export function track(event: string, props?: AnalyticsProps) {
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, props);
  }
  vercelTrack(event, props);
}
