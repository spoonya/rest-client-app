import { useState } from 'react';

import { HttpMethod } from '@/types';

export const useRequestConfig = (initialState: {
  method: HttpMethod;
  url: string;
  body: string;
}) => {
  const [method, setMethod] = useState<HttpMethod>(initialState.method);
  const [url, setUrl] = useState(initialState.url);
  const [body, setBody] = useState(initialState.body);

  return {
    method,
    setMethod,
    url,
    setUrl,
    body,
    setBody,
  };
};
