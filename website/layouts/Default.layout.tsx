import { NextSeo } from 'next-seo';

import Background from '@components/Background';
import { Navbar } from '@components/Navbar';
import { useSeoProps } from '@lib/seo';
import React, { ComponentProps, ReactNode } from 'react';

interface DefaultLayoutProps {
  children?: ReactNode | ReactNode[];
  seo?: Partial<ComponentProps<typeof NextSeo>>;
}

export function DefaultLayout({ children, seo }: DefaultLayoutProps) {
  const seoProps = useSeoProps(seo);

  return (
    <>
      <NextSeo {...seoProps} />
      <Navbar.Standard />
      <main className='flex flex-col h-screen max-h-screen overflow-scroll'>
        {children}
      </main>
      <Background />
    </>
  );
}
