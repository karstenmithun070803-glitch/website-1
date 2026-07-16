import type { SchemaTypeDefinition } from "sanity";
import { homePage } from "./homePage";
import { phase } from "./phase";
import { subScene } from "./subScene";
import { hotspot } from "./hotspot";
import { tourRoom } from "./tourRoom";

/**
 * Every schema the Studio knows about.
 * `homePage` is a singleton (see sanity.config.ts structure).
 * The rest are `object` types used inline; they don't appear in the Studio nav.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  homePage,
  phase,
  subScene,
  hotspot,
  tourRoom,
];
