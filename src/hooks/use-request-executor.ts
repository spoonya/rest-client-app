import { useState } from 'react';

import { processRequest } from '@/services';
import { HttpMethod, KeyValue } from '@/types';
import { buildHeadersObject, getRequestStatusText } from '@/utils';

export const useRequestExecutor = () => {
  const [response, setResponse] = useState<{
    body: string;
    statusCode: number;
    statusText: string;
    headers: Array<{ key: string; value: string }>;
  } | null>(null);
  const [error, setError] = useState<string>('');

  const execute = async (
    method: HttpMethod,
    url: string,
    headers: KeyValue[],
    body: string
  ) => {
    try {
      setError('');
      const requestHeaders = buildHeadersObject(headers);

      const result = await processRequest({
        method,
        url,
        headers: requestHeaders,
        body,
      });

      const formattedData = result.data
        ? typeof result.data === 'object'
          ? JSON.stringify(result.data, null, 2)
          : String(result.data)
        : '';

      setResponse({
        body: formattedData,
        statusCode: result.status,
        statusText: getRequestStatusText(result.status),
        headers: Object.entries(result.headers || {}).map(([key, value]) => ({
          key,
          value: Array.isArray(value) ? value.join(', ') : String(value),
        })),
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unexpected error occurred.'
      );
      setResponse(null);
    }
  };

  return { execute, response, error };
};
