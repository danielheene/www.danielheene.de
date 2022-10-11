import { defineArrayMember, defineField, defineType } from 'sanity';
import { COL_FIELDSET_NAME, COL_FIELDSETS } from '../_constants';

export default defineType({
  title: 'Qualification',
  name: 'section.qualifications',
  type: 'object',
  options: {
    modal: {
      type: 'dialog',
    },
  },
  fields: [
    defineField({
      title: 'Section Header',
      name: 'sectionHeader',
      type: 'sectionHeader',
    }),
    defineField({
      title: 'Entries',
      name: 'entries',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Qualification Block',
          name: 'block.qualification',
          type: 'object',
          fieldsets: [...COL_FIELDSETS],
          fields: [
            defineField({
              title: 'Job Title',
              name: 'title',
              type: 'string',
            }),
            defineField({
              title: 'Employer',
              name: 'employer',
              type: 'string',
              fieldset: COL_FIELDSET_NAME['6-6'],
            }),
            defineField({
              title: 'Location',
              name: 'location',
              type: 'string',
              fieldset: COL_FIELDSET_NAME['6-6'],
            }),
            defineField({
              title: 'Start',
              name: 'start',
              type: 'string',
              fieldset: COL_FIELDSET_NAME['6-6'],
            }),
            defineField({
              title: 'End',
              name: 'end',
              type: 'string',
              fieldset: COL_FIELDSET_NAME['6-6'],
            }),
            defineField({
              title: 'Body',
              name: 'body',
              type: 'text',
              rows: 6,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'employer',
            },
          },
        }),
      ],
    }),
  ],
  fieldsets: COL_FIELDSETS,
});
