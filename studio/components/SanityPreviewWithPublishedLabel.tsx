import { Badge, Flex } from '@sanity/ui';
import { SanityPreview } from 'sanity/_unstable';
import React, { forwardRef, Ref } from 'react';

export const SanityPreviewWithPublishedLabel = forwardRef(
  (props: any, ref: Ref<HTMLElement>) => {
    const published = props?.value?.published || false;
    const style = { opacity: published ? 1 : 0.5 };

    return (
      <Flex justify='space-between'>
        <div style={style}>
          <SanityPreview ref={ref} schemaType='image' {...props} />
        </div>
        <Flex align='center' paddingRight={2}>
          <Badge mode='outline' tone={published ? 'positive' : undefined}>
            {published ? 'Published' : 'Hidden'}
          </Badge>
        </Flex>
      </Flex>
    );
  }
);
