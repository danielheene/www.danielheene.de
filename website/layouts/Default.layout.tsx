import { NextSeo } from 'next-seo';
import React, { ComponentProps, ReactNode } from 'react';
import { Header } from '@components/Header';

interface DefaultLayoutProps {
  children?: ReactNode | ReactNode[];
  seo?: Partial<ComponentProps<typeof NextSeo>>;
}

export function DefaultLayout({ children, seo }: DefaultLayoutProps) {
  // const seoProps = useSeoProps(seo);

  return (
    <>
      <Header />
      <main className='flex flex-col h-screen max-h-screen overflow-scroll'>
        {children}
      </main>
    </>
  );
}
