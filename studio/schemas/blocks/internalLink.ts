import { defineField, defineType } from 'sanity';

export default defineType({
  title: 'Internal Link',
  name: 'internalLink',
  type: 'object',
  options: {
    modal: {
      type: 'dialog',
    },
  },
  fields: [
    defineField({
      name: 'reference',
      type: 'reference',
      title: 'Reference',
      to: [{ type: 'project' }, { type: 'resume' }],
      // options: {
      //   disableNew: true,
      // },
    }),
  ],
});
