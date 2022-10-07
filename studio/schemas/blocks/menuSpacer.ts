import { defineType } from 'sanity';

export default defineType({
  title: 'Spacer',
  name: 'menuSpacer',
  type: 'object',
  fields: [{ name: 'spacer', type: 'boolean' }],
});
