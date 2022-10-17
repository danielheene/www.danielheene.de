import React from 'react';
import { AppProps } from 'next/app';
import { OffCanvas } from '@components/OffCanvas';
import { Toasty } from '@components/Toasty';

import '../styles/globals.css';
import '../styles/font-inter.css';
import '../styles/font-inter-tight.css';
import '../styles/font-recursive.css';
import '../styles/font-space-grotesk.css';
import '../styles/font-space-mono.css';
import '../styles/font-syne.css';

import { GradientBackground } from '@components/GradientBackground';

export default function App({ Component, pageProps, router }: AppProps) {
  // useEffect(() => {
  //   NProgress.configure({
  //     minimum: 0.3,
  //     easing: 'ease',
  //     speed: 800,
  //     showSpinner: false,
  //   });
  //
  //   router.events.on('routeChangeStart', NProgress.start);
  //   router.events.on('routeChangeComplete', NProgress.done);
  //   router.events.on('routeChangeError', NProgress.done);
  // }, []);

  return (
    <>
      <Component {...pageProps} />
      <Toasty audioPath='/toasty/toasty.mp3' imagePath='/toasty/toasty.webp' />
      <OffCanvas />
      <GradientBackground darkenTop={true} />
    </>
  );
}
