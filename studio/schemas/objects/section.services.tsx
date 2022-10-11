import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  title: 'Services',
  name: 'section.services',
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
          title: 'Service Feature',
          name: 'serviceFeature',
          type: 'serviceFeature',
        }),
      ],
    }),
  ],
});
