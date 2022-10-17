import * as process from 'node:process';
import { createCliConfig } from 'sanity/cli';

const sanityConfig = (() => {
  if (!process.env.SANITY_STUDIO_API_TOKEN) {
    throw Error('The API Token is not set. Check your environment variables.');
  }

  return {
    dataset: process.env.SANITY_STUDIO_DATASET || 'development',
    apiVersion: process.env.SANITY_STUDIO_API_VERSION || '2021-10-21',
    projectId: 'ekrchhx4',
    token: process.env.SANITY_STUDIO_API_TOKEN,
    useCdn: process.env.NODE_ENV === 'production',
  };
})();

export default createCliConfig({
  api: {
    ...sanityConfig,
  },
});
