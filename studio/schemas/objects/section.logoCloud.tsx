import { defineArrayMember, defineField, defineType } from 'sanity';
import { COL_FIELDSETS } from '../_constants';
import byteSize from 'byte-size';
import { SanityPreviewWithPublishedLabel } from '../../components';

export default defineType({
  title: 'Logo Cloud',
  name: 'section.logoCloud',
  type: 'object',
  options: {
    modal: {
      type: 'dialog',
    },
  },
  fieldsets: [...COL_FIELDSETS],
  fields: [
    defineField({
      title: 'Section Header',
      name: 'header',
      type: 'sectionHeader',
    }),
    defineField({
      title: 'Entries',
      name: 'entries',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'block.logoCloudItem',
          type: 'object',
          fields: [
            defineField({
              title: 'Published',
              name: 'published',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              title: 'Name',
              name: 'name',
              type: 'string',
              initialValue: '',
            }),
            defineField({
              title: 'Logo',
              name: 'image',
              type: 'image',
            }),
          ],
          components: {
            preview: SanityPreviewWithPublishedLabel,
          },
          preview: {
            select: {
              name: 'name',
              imageUrl: 'image.asset.url',
              dimensions: 'image.asset.metadata.dimensions',
              fileSize: 'image.asset.size',
              published: 'published',
            },
            prepare({ name, imageUrl, published, dimensions, fileSize }) {
              const pixels = !!dimensions
                ? `${dimensions.width}x${dimensions.height}`
                : '';
              const size = !!fileSize ? byteSize(fileSize) : '';

              return {
                title: name,
                subtitle: !!pixels && !!size ? `${pixels} • ${size}` : '',
                media: (
                  <img src={imageUrl} style={{ background: 'white' }} alt='' />
                ),
                published,
              };
            },
          },
        }),
      ],
    }),
  ],
});
