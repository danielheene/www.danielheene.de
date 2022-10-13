import { defineField, defineType } from 'sanity';
import { COL_FIELDSET_NAME, COL_FIELDSETS } from '../_constants';

export default defineType({
  title: 'Home',
  name: 'home',
  type: 'document',
  groups: [
    {
      name: 'main',
      title: 'Main',
      default: true,
    },
    {
      name: 'customers',
      title: 'Customers',
    },
    {
      name: 'qualifications',
      title: 'Qualifications',
    },
    {
      title: 'Meta',
      name: 'meta',
    },
  ],
  fields: [
    defineField({
      title: 'Intro Line',
      name: 'introLine',
      type: 'text',
      rows: 2,
      fieldset: COL_FIELDSET_NAME['6-6'],
      group: 'main',
    }),
    defineField({
      title: 'Job Title',
      name: 'jobTitle',
      type: 'text',
      rows: 2,
      fieldset: COL_FIELDSET_NAME['6-6'],
      group: 'main',
    }),
    defineField({
      title: 'Portrait',
      name: 'portrait',
      type: 'image',
      group: 'main',
    }),
    defineField({
      title: 'Logo Cloud',
      name: 'logoCloud',
      type: 'section.logoCloud',
      group: 'customers',
    }),
    defineField({
      title: 'Qualifications',
      name: 'qualifications',
      type: 'section.qualifications',
      group: 'qualifications',
    }),
    defineField({
      title: 'Meta',
      name: 'metaDefault',
      type: 'meta.defaults',
      group: 'meta',
    }),
  ],
  fieldsets: COL_FIELDSETS,
  preview: {
    prepare() {
      return {
        title: 'Home',
      };
    },
  },
});
