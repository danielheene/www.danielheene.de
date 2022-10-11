import { defineField, defineType } from 'sanity';
import { COL_FIELDSET_NAME, COL_FIELDSETS } from '../_constants';

export default defineType({
  title: 'Service Item',
  name: 'serviceItem',
  type: 'object',
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
      fieldset: COL_FIELDSET_NAME['8-4'],
    }),
    defineField({
      title: 'Icon',
      name: 'icon',
      type: 'string',
      fieldset: COL_FIELDSET_NAME['4-8'],
    }),
    defineField({
      title: 'Body',
      name: 'body',
      type: 'text',
      rows: 4,
    }),
  ],
  fieldsets: COL_FIELDSETS,
});
