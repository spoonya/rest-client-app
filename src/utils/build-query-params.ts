import { baseHeaders } from '@/data';
import { HttpMethod, KeyValue } from '@/types';

export const buildQueryParams = (
  value: [string, string][][] | undefined,
  headerValue: KeyValue[] | undefined,
  method: string | HttpMethod
) => {
  const params = new URLSearchParams();
  const headers =
    (value?.[0] instanceof Array &&
      value?.map((item) => Object.fromEntries(item))) ||
    (headerValue?.[0].key && headerValue);
  if (headers) {
    headers.forEach((item) =>
      params.set(item.key, encodeURIComponent(item.value))
    );
    return params.toString();
  } else if (!headers && method === 'POST') {
    params.set(baseHeaders.key, encodeURIComponent(baseHeaders.value));
    return params.toString();
  } else {
    return '';
  }
};
