// export const isBrowser = typeof window !== 'undefined';

import React from 'react';

export function isBrowser() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

export const useIsomorphicLayoutEffect = isBrowser()
  ? React.useLayoutEffect
  : React.useEffect;

export const replaceNewlinesWithBr = (
  message: string = '',
  replacer: string = '<br />'
) =>
  message
    .trimStart()
    .trimEnd()
    .replace(/(\r\n|\n\r|\r|\n){2}(\r\n|\n\r|\r|\n)+/g, replacer + replacer)
    .replace(/(\r\n|\n\r|\r|\n)/g, replacer)
    .replace(/\s\s+/g, ' ');

export const removeSpecialChars = (message: string = '') =>
  message
    .trimStart()
    .trimEnd()
    .replace('<br>', ' ')
    .replace('<br />', ' ')
    .replace(/\s\s+/g, ' ');
