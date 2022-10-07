import { defineField, defineType } from 'sanity';
import { COL_FIELDSET_NAME, COL_FIELDSETS } from '../_constants';

export default defineType({
  type: 'document',
  name: 'resume',
  title: 'Resume',
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
      title: 'Body',
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      title: 'Start Date',
      name: 'startDate',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      fieldset: COL_FIELDSET_NAME['6-6'],
    }),
    defineField({
      title: 'End Date',
      name: 'endDate',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      fieldset: COL_FIELDSET_NAME['6-6'],
    }),
    defineField({
      title: 'Tech',
      name: 'tech',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      title: 'Further Tech',
      name: 'furtherTech',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      title: 'Icon',
      name: 'icon',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'employer',
    },
  },
});
