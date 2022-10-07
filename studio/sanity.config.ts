import { createConfig } from 'sanity';

import { deskTool } from 'sanity/desk';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { codeInput } from '@sanity/code-input';
import { markdownSchema } from 'sanity-plugin-markdown';
import { visionTool } from '@sanity/vision';

import { schemaTypes } from './schemas';
import './overrides.css';

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

  plugins: [
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
