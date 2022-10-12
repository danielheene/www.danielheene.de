import { defineArrayMember, defineField, defineType } from 'sanity';
import { COL_FIELDSET_NAME, COL_FIELDSETS } from '../_constants';

export default defineType({
  title: 'Navigation Item',
  name: 'navigationItem',
  type: 'object',
  fields: [
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      initialValue: 'internal',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          {
            title: 'External Link',
            value: 'external',
          },
          {
            title: 'Internal Link',
            value: 'internal',
          },
          {
            title: 'File Link',
            value: 'file',
          },
        ],
      },
    }),

    defineField({
      title: 'Label',
      name: 'label',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      title: 'Open in new Tab',
      name: 'blank',
      type: 'boolean',
      initialValue: true,
      options: {
        layout: 'checkbox',
      },
      fieldset: COL_FIELDSET_NAME['6-6'],
    }),
    defineField({
      title: 'Link Variant',
      name: 'variant',
      type: 'string',
      initialValue: 'default',
      options: {
        layout: 'radio',
        direction: 'vertical',
        list: [
          {
            title: 'Default',
            value: 'default',
          },
          {
            title: 'Primary',
            value: 'primary',
          },
        ],
      },
      fieldset: COL_FIELDSET_NAME['6-6'],
    }),
    defineField({
      title: 'External URL',
      name: 'url',
      type: 'url',
      hidden: ({ parent }) => parent?.type !== 'external',
    }),
    defineField({
      title: 'Internal Link',
      name: 'ref',
      type: 'reference',
      initialValue: {},
      to: [{ type: 'home' }, { type: 'project' }],
      hidden: ({ parent }) => parent?.type !== 'internal',
      options: {
        disableNew: true,
      } as any, // TODO: fix later - current options typing requires filter config
    }),
    defineField({
      title: 'File Link',
      name: 'fileRef',
      type: 'file',
      initialValue: {},
      hidden: ({ parent }) => parent?.type !== 'file',
    }),
    defineField({
      title: 'Force Download',
      name: 'forceDownload',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.type !== 'file',
    }),
  ],
  fieldsets: COL_FIELDSETS,
});
