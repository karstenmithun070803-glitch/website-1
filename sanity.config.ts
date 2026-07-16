import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/**
 * Sanity Studio config — mounted at /studio via src/app/studio/[[...tool]]/page.tsx.
 *
 * The `homePage` singleton appears once in the desk; every other type is an
 * inline `object` so it doesn't clutter the sidebar.
 */
export default defineConfig({
  name: "karst",
  title: "Karst",
  projectId,
  dataset,
  basePath: "/studio",
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton: Home page
            S.listItem()
              .title("Home page")
              .id("homePage")
              .child(
                S.document()
                  .schemaType("homePage")
                  .documentId("homePage"),
              ),
          ]),
    }),
    visionTool(),
  ],
});
