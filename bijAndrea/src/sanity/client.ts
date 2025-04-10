import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,   // your project ID
  dataset: import.meta.env.VITE_SANITY_DATASET || "production", 
  apiVersion: "2023-01-01",  // use a recent date (YYYY-MM-DD) - matching schema versions
  useCdn: true              // enable CDN for faster, cacheable reads
});
