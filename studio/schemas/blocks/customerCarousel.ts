import { defineType } from 'sanity';
import { COL_FIELDSET_NAME, COL_FIELDSETS } from '../_constants';

export default defineType({
  title: 'Customer Carousel',
  name: 'customerCarousel',
  type: 'object',
  options: {
    modal: {
      type: 'dialog',
    },
  },
  fieldsets: [...COL_FIELDSETS],
  fields: [
    {
      title: 'Headline',
      name: 'headline',
      type: 'string',
      fieldset: COL_FIELDSET_NAME['6-6'],
    },
    {
      title: 'Sub-Headline',
      name: 'subHeadline',
      type: 'string',
      fieldset: COL_FIELDSET_NAME['6-6'],
    },
    {
      title: 'Customer',
      name: 'customer',
      type: 'array',
      of: [
        {
          title: 'Logo',
          name: 'logo',
          type: 'image',
          fields: [
            {
              title: 'Name',
              name: 'name',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
});
