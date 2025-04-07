import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { REQUEST_CONFIG_KEY } from '@/services';
import { HttpMethod, KeyValue, RequestConfig } from '@/types';

export const useRequestConfig = (initialOverride?: Partial<RequestConfig>) => {
  const loadSavedConfig = (): RequestConfig | null => {
    if (typeof window === 'undefined') return null;
    const savedData = localStorage.getItem(REQUEST_CONFIG_KEY);
    return savedData ? JSON.parse(savedData) : null;
  };

  const savedConfig = loadSavedConfig();

  const initialConfig: RequestConfig = {
    method: 'GET',
    url: '',
    body: '',
    headers: [],
    ...savedConfig,
    ...initialOverride,
  };

  const [config, setConfig] = useState<RequestConfig>(initialConfig);

  useEffect(() => {
    localStorage.setItem(
      REQUEST_CONFIG_KEY,
      JSON.stringify({
        ...config,
        headers: config.headers.filter((header) => header.key.trim() !== ''),
      })
    );
  }, [config]);

  const setMethod: Dispatch<SetStateAction<HttpMethod>> = (method) => {
    setConfig((prev) => ({
      ...prev,
      method: typeof method === 'function' ? method(prev.method) : method,
    }));
  };

  const setUrl: Dispatch<SetStateAction<string>> = (url) => {
    setConfig((prev) => ({
      ...prev,
      url: typeof url === 'function' ? url(prev.url) : url,
    }));
  };

  const setBody: Dispatch<SetStateAction<string>> = (body) => {
    setConfig((prev) => ({
      ...prev,
      body: typeof body === 'function' ? body(prev.body) : body,
    }));
  };

  const setHeaders: Dispatch<SetStateAction<KeyValue[]>> = (headers) => {
    setConfig((prev) => ({
      ...prev,
      headers: typeof headers === 'function' ? headers(prev.headers) : headers,
    }));
  };

  return {
    ...config,
    setMethod,
    setUrl,
    setBody,
    setHeaders,
  };
};
