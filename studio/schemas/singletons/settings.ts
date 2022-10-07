import { defineField, defineType } from 'sanity';
import { COL_FIELDSET_NAME, COL_FIELDSETS } from '../_constants';

export default defineType({
  type: 'document',
  name: 'settings',
  title: 'Settings',
  liveEdit: false,
  fieldsets: [...COL_FIELDSETS],
  fields: [
    defineField({
      title: 'Main Navigation',
      name: 'mainNavigation',
      type: 'array',
      of: [
        { type: 'externalLink' },
        { type: 'menuSpacer' },
        { type: 'internalLink' },
      ],
    }),
    defineField({
      title: 'Contact Services',
      name: 'contactServices',
      type: 'contactServices',
    }),
    defineField({
      title: 'Resume / CV',
      name: 'resume',
      type: 'file',
      fieldset: COL_FIELDSET_NAME['6-6'],
    }),
    defineField({
      title: 'Public Signature / GPG Key',
      name: 'publicKey',
      type: 'file',
      fieldset: COL_FIELDSET_NAME['6-6'],
    }),
  ],
});
