import { createConfig } from 'sanity';

import { deskTool } from 'sanity/desk';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { codeInput } from '@sanity/code-input';
import { markdownSchema } from 'sanity-plugin-markdown';
import { visionTool } from '@sanity/vision';
// import { vercelWidget } from 'sanity-plugin-dashboard-widget-vercel';
// import { dashboardTool } from '@sanity/dashboard';

import { schemaTypes } from './schemas';
import './overrides.css';
import * as process from 'process';

export default createConfig({
  name: 'default',
  title: 'daniel.heene.io',

  /* TODO:
    logo?: React.ComponentType
    icon?: React.ComponentType
  */

  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  basePath: import.meta.env.SANITY_STUDIO_PROJECT_BASEPATH,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,

  document: {
    productionUrl: async (prev, context) => {
      const { client, dataset, document } = context;

      if (document._type === 'post') {
        // you can now use async/await 🎉
        const slug = await client.fetch(
          `*[_type == 'routeInfo' && post._ref == $postId][0].slug.current`,
          { postId: document._id }
        );

        const params = new URLSearchParams();
        params.set('preview', 'true');
        params.set('dataset', dataset);

        return `${process.env.BASE_URL}/posts/${slug}?${params}`;
      }

      return prev;
    },
  },

  plugins: [
    // dashboardTool({
    //   widgets: [vercelWidget()],
    // }),
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home')
              .child(S.document().schemaType('home').documentId('home')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !['home', 'settings'].includes(listItem.getId() as string)
            ),
            S.divider(),
            S.listItem()
              .title('Settings')
              .child(
                S.document().schemaType('settings').documentId('settings')
              ),
          ]),
    }),
    unsplashImageAsset(),
    markdownSchema(),
    codeInput(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
