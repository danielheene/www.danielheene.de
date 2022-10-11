import { NextSeo } from 'next-seo';

// import { useSeoProps } from '@lib/seo';
import React, { ComponentProps, ReactNode } from 'react';
import { OffCanvasButton } from '@components/OffCanvasButton';
import { Navigation } from '@components/Navigation';

interface DefaultLayoutProps {
  children?: ReactNode | ReactNode[];
  seo?: Partial<ComponentProps<typeof NextSeo>>;
}

export function DefaultLayout({ children, seo }: DefaultLayoutProps) {
  // const seoProps = useSeoProps(seo);

  return (
    <>
      {/*<NextSeo {...seoProps} />*/}
      <OffCanvasButton withContainer setBody={<Navigation vertical />} />
      <main className='flex flex-col h-screen max-h-screen overflow-scroll'>
        {children}
      </main>
    </>
  );
}
