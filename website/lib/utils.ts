import { format, parse } from 'date-fns';
import React from 'react';

export const sortDateAscending = (a, b) => {
  return +new Date(a) - +new Date(b);
};

export const sortDateDescending = (a, b) => {
  return +new Date(b) - +new Date(a);
};

export const formatDate = (dateString: string, formatString: string) =>
  !!dateString
    ? format(parse(dateString, 'yyyy-MM-dd', new Date()), formatString)
    : null;

export function isBrowser() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

export function mergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
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
