import { RequestOptions, RequestResult } from '@/types';

export const processRequest = async (
  options: RequestOptions
): Promise<RequestResult> => {
  const fetchOptions: RequestInit = {
    method: options.method,
    headers: options.headers,
  };

  if (options.method !== 'GET' && options.body?.trim() !== '') {
    fetchOptions.body = options.body;
  }

  const response = await fetch(options.url, fetchOptions);

  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const contentType = response.headers.get('content-type') || '';
  const rawData = await response.text();

  let data: unknown;
  let parseError: Error | undefined;

  try {
    data = contentType.includes('application/json')
      ? JSON.parse(rawData)
      : rawData;
  } catch (error) {
    data = rawData;
    parseError = error instanceof Error ? error : new Error(String(error));
  }

  return {
    status: response.status,
    headers,
    data,
    rawData,
    contentType,
    parseError,
  };
};
