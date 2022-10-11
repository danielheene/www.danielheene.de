import { defineArrayMember, defineField, defineType } from 'sanity';
import { COL_FIELDSET_NAME, COL_FIELDSETS } from '../_constants';
import { deburr, kebabCase } from 'lodash';

export default defineType({
  type: 'document',
  name: 'project',
  title: 'Project',
  fieldsets: [...COL_FIELDSETS],
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      fieldset: COL_FIELDSET_NAME['7-5'],
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: (input) => `/project/` + kebabCase(deburr(input)),
        maxLength: 96,
      },
      fieldset: COL_FIELDSET_NAME['7-5'],
    }),
    defineField({
      title: 'Poster',
      name: 'poster',
      type: 'image',
    }),
    defineField({
      title: 'Resources',
      name: 'resources',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'resource',
          type: 'object',
          fields: [
            defineField({
              title: 'Name',
              name: 'name',
              type: 'string',
            }),
            defineField({
              title: 'URL',
              name: 'url',
              type: 'url',
            }),
          ],
        }),
      ],
    }),
    defineField({
      title: 'Body',
      name: 'body',
      type: 'blockContent',
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
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
});
