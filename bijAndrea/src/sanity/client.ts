import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, // from your .env file
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2023-01-01', // change to today's date or your schema version
  useCdn: true, // use CDN for faster reads
  token: import.meta.env.VITE_SANITY_API_TOKEN, // only if you want to use a token
});
