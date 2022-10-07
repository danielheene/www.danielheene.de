import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html lang='en' style={{ backgroundColor: 'black' }}>
      <Head>
        <meta charSet='utf-8' />
        <link rel='icon' type='image/png' href='/favicon.png' />
      </Head>
      <body className='bg-black'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
