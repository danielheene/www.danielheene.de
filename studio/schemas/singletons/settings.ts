import { defineField, defineType } from 'sanity';
import { COL_FIELDSETS } from '../_constants';

export default defineType({
  type: 'document',
  name: 'settings',
  title: 'Settings',
  liveEdit: false,
  fieldsets: [...COL_FIELDSETS],
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      options: {},
    }),
    defineField({
      title: 'Contact Services',
      name: 'contactServices',
      type: 'contactServices',
    }),
  ],
});
