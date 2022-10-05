import { format, parse } from 'date-fns';

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
