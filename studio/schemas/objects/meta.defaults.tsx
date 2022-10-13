import { defineField, defineType } from 'sanity';
import { COL_FIELDSETS } from '../_constants';
import { deburr, kebabCase } from 'lodash';

export default defineType({
  title: 'SEO',
  name: 'meta.defaults',
  type: 'object',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      initialValue: '',
      hidden: ({ document }) => document?._type.includes('settings'),
    }),
    defineField({
      title: 'Title Template',
      name: 'titleTemplate',
      type: 'string',
      initialValue: '',
      hidden: ({ document }) => !document?._type.includes('settings'),
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      initialValue: {
        current: '',
      },
      options: {
        source: 'title',
        slugify: (input) => `/project/` + kebabCase(deburr(input)),
        maxLength: 96,
      },
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      title: 'Keywords',
      name: 'keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      title: 'Meta Tags',
      name: 'metaTags',
      type: 'array',
      of: [
        {
          title: 'Entry',
          name: 'tag',
          type: 'object',
          fields: [
            {
              title: 'Type',
              name: 'type',
              type: 'string',
              initialValue: 'name',
              options: {
                layout: 'dropdown',
                list: [
                  {
                    title: 'name',
                    value: 'name',
                  },
                  {
                    title: 'property',
                    value: 'property',
                  },
                  {
                    title: 'httpEquiv',
                    value: 'httpEquiv',
                  },
                ],
              },
            },
            {
              title: 'Type Value',
              name: 'value',
              type: 'string',
              initialValue: '',
            },
            {
              title: 'Content Value',
              name: 'content',
              type: 'string',
              initialValue: '',
            },
          ],
        },
      ],
    }),
  ],
  fieldsets: COL_FIELDSETS,
});
