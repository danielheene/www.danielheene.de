import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  title: 'Navigation Item',
  name: 'navigationItem',
  type: 'object',
  fields: [
    defineField({
      title: 'Label',
      name: 'label',
      type: 'string',
    }),
    defineField({
      title: 'Target',
      name: 'target',
      type: 'array',
      of: [
        defineArrayMember({ type: 'externalLink' }),
        defineArrayMember({ type: 'internalLink' }),
      ],
    }),
  ],
});
