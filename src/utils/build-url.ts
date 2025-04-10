import { HttpMethod } from '@/types';

export const buildUrl = (
  method: HttpMethod | string,
  body: string | undefined,
  url: string
) => {
  const urlEncoded = window.btoa(url);
  const bodyEncoded = body && window.btoa(body);
  const stringUrl = `/${method}/${urlEncoded}/${bodyEncoded}`;
  console.log(stringUrl);
  return stringUrl;
};
