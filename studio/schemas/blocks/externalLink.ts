import { defineType } from 'sanity';

export default defineType({
  title: 'External Link',
  name: 'externalLink',
  type: 'object',
  options: {
    modal: {
      type: 'dialog',
    },
  },
  fields: [
    {
      title: 'URL',
      name: 'href',
      type: 'url',
    },
    {
      title: 'New Tab',
      name: 'blank',
      type: 'boolean',
      initialValue: true,
    },
  ],
});
