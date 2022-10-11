import { createClient, SanityClient } from 'next-sanity';

const config = (() => {
  if (!process.env.SANITY_STUDIO_PROJECT_ID) {
    throw Error('The Project ID is not set. Check your environment variables.');
  }

  if (!process.env.SANITY_STUDIO_API_TOKEN) {
    throw Error('The API Token is not set. Check your environment variables.');
  }

  return {
    dataset: process.env.SANITY_STUDIO_DATASET || 'development',
    apiVersion: process.env.SANITY_STUDIO_API_VERSION || '2021-10-21',
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    token: process.env.SANITY_STUDIO_API_TOKEN,
    useCdn: process.env.NODE_ENV === 'production',
  };
})();

const defaultClient: SanityClient = createClient(config);
const previewClient: SanityClient = createClient({
  ...config,
  useCdn: false,
});
const getClient = (usePreview: boolean): SanityClient =>
  usePreview ? previewClient : defaultClient;

export default {
  defaultClient,
  previewClient,
  getClient,
};
