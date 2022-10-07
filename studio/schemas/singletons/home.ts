import { defineField, defineType } from 'sanity';
import { COL_FIELDSET_NAME, COL_FIELDSETS } from '../_constants';

export default defineType({
  type: 'document',
  name: 'home',
  title: 'home',
  fieldsets: [...COL_FIELDSETS],
  fields: [
    defineField({
      title: 'Intro Line',
      name: 'introLine',
      type: 'text',
      rows: 2,
      fieldset: COL_FIELDSET_NAME['6-6'],
    }),
    defineField({
      title: 'Job Title',
      name: 'jobTitle',
      type: 'text',
      rows: 2,
      fieldset: COL_FIELDSET_NAME['6-6'],
    }),
    defineField({
      title: 'Customers',
      name: 'customers',
      type: 'customerCarousel',
    }),
  ],
});
