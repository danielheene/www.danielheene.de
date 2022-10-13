import { defineField, defineType } from 'sanity';
import { COL_FIELDSET_NAME, COL_FIELDSETS } from '../_constants';

export default defineType({
  title: 'Settings',
  name: 'settings',
  type: 'document',
  liveEdit: false,
  initialValue: () => ({
    pageTitle: '',
    hireMe: false,
    contactServices: {
      github: '',
      whatsapp: '',
      instagram: '',
      discord: '',
      mail: '',
      phone: '',
      linkedin: '',
      xing: '',
    },
    resume: null,
    publicKey: null,
  }),
  groups: [
    {
      title: 'Meta',
      name: 'meta',
    },
  ],
  fields: [
    defineField({
      title: 'Page Title',
      name: 'pageTitle',
      type: 'string',
    }),
    defineField({
      title: 'hireMe',
      name: 'hireMe',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      title: 'Contact Services',
      name: 'contactServices',
      type: 'contactServices',
    }),
    defineField({
      title: 'Resume / CV',
      name: 'resume',
      type: 'file',
      fieldset: COL_FIELDSET_NAME['6-6'],
    }),
    defineField({
      title: 'Public Signature / GPG Key',
      name: 'publicKey',
      type: 'file',
      fieldset: COL_FIELDSET_NAME['6-6'],
    }),
    defineField({
      title: 'Meta',
      name: 'metaDefault',
      type: 'meta.defaults',
      group: 'meta',
    }),
  ],
  fieldsets: [...COL_FIELDSETS],
});
