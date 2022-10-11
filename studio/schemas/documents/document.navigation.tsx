import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  title: 'Navigation',
  name: 'navigation',
  type: 'document',
  // icon: GrNavigate,
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Navigation Id',
      name: 'navId',
      type: 'slug',
    }),
    defineField({
      title: 'Entries',
      name: 'entries',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'navigationItem',
        }),
      ],
    }),
  ],
});
