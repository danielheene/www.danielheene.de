import { createCliConfig } from 'sanity/cli';

export default createCliConfig({
  api: {
    projectId: 'ekrchhx4',
    dataset: process.env.SANITY_STUDIO_DATASET || 'development',
  },
});
