import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta charSet='utf-8' />
        <link rel='icon' type='image/png' href='/favicon.png' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
