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
      name: 'services',
      title: 'Services',
    },
    {
      name: 'qualifications',
      title: 'Qualifications',
    },
    {
      name: 'customers',
      title: 'Customers',
    },
    {
      title: 'Meta',
      name: 'meta',
    },
  ],
  fields: [
    defineField({
      title: 'Hero Stage',
      name: 'heroStage',
      type: 'object',
      group: 'main',
      fields: [
        defineField({
          title: 'Headline',
          name: 'headline',
          type: 'text',
          rows: 2,
          fieldset: COL_FIELDSET_NAME['6-6'],
        }),
        defineField({
          title: 'Sub Headline',
          name: 'subHeadline',
          type: 'text',
          rows: 2,
          fieldset: COL_FIELDSET_NAME['6-6'],
        }),
        defineField({
          title: 'Portrait',
          name: 'portrait',
          type: 'image',
        }),
      ],
      fieldsets: COL_FIELDSETS,
    }),
    defineField({
      title: 'Services',
      name: 'services',
      type: 'section.services',
      group: 'services',
    }),
    defineField({
      title: 'Qualifications',
      name: 'qualifications',
      type: 'section.qualifications',
      group: 'qualifications',
    }),
    defineField({
      title: 'Logo Cloud',
      name: 'logoCloud',
      type: 'section.logoCloud',
      group: 'customers',
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
