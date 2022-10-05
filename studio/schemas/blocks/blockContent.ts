import { defineArrayMember, defineType } from 'sanity';
import {
  FiExternalLink as ExternalLinkIcon,
  FiLink as LinkIcon,
  FiImage as ImageIcon,
  FiCode as CodeIcon,
} from 'react-icons/all';

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      // lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          { type: 'externalLink', icon: ExternalLinkIcon },
          { type: 'internalLink', icon: LinkIcon },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
    }),
    defineArrayMember({
      type: 'code',
      icon: CodeIcon,
      options: {
        theme: 'github',
        darkTheme: 'github',
        language: 'javascript',
        languageAlternatives: [
          { title: 'Javascript', value: 'javascript', mode: 'javascript' },
          { title: 'Typescript', value: 'typescript', mode: 'typescript' },
          { title: 'HTML', value: 'html', mode: 'html' },
          { title: 'CSS', value: 'css', mode: 'css' },
          { title: 'Rust', value: 'rust', mode: 'rust' },
        ],
      },
    }),
  ],
});
