import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import { AppProps } from 'next/app';
import { UIProvider } from '@lib/context';
import { OffCanvas } from '@components/OffCanvas';
import { Background } from '@components/Background';
import { Toasty } from '@components/Toasty';

import 'nprogress/nprogress.css';
import '../styles/globals.css';
import '../styles/font-inter.css';

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    NProgress.configure({
      minimum: 0.3,
      easing: 'ease',
      speed: 800,
      showSpinner: false,
    });

    router.events.on('routeChangeStart', NProgress.start);
    router.events.on('routeChangeComplete', NProgress.done);
    router.events.on('routeChangeError', NProgress.done);
  }, []);

  return (
    <>
      <UIProvider>
        <Component {...pageProps} />
        <Toasty
          audioPath='/toasty/toasty.mp3'
          imagePath='/toasty/toasty.webp'
        />
        <OffCanvas />
        <Background />
      </UIProvider>
    </>
  );
}
