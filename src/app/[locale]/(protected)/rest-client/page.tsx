'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getStoredVariables } from '@/lib/getStoredVariables';
import { applyVariables } from '@/lib/applyVariables';
import { encodeRequestToUrl, decodeRequestFromUrl } from '@/utils/urlParams';
import { saveRequestToHistory } from '@/utils/storage';

import {
  CodeGenPreview,
  RequestPanel,
  RequestSearch,
  ResponseViewer,
  Sidebar,
} from '@/components';
import { useRequestConfig, useRequestExecutor } from '@/hooks';

type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS';

export default function RestClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const encodedReq = searchParams.get('req');

  const requestConfig = useRequestConfig({
    method: 'GET',
    url: '',
    body: '',
    headers: [],
  });

  const { execute, response, error } = useRequestExecutor();

  useEffect(() => {
    if (!encodedReq) return;

    const decoded = decodeRequestFromUrl(encodedReq);
    if (decoded) {
      requestConfig.setMethod(decoded.method as HttpMethod);
      requestConfig.setUrl(decoded.url);
      requestConfig.setBody(decoded.body || '');
      requestConfig.setHeaders(
        (decoded.headers || []).map((header, index) => ({
          id: `header-${index}`,
          key: header.key,
          value: header.value,
        }))
      );
    }
  }, [encodedReq]);

  const handleSubmit = () => {
    const trimmedUrl = requestConfig.url.trim();
    if (!trimmedUrl) return;

    const variables = getStoredVariables();
    const finalUrl = applyVariables(trimmedUrl, variables);

    try {
      new URL(finalUrl);
    } catch {
      execute('GET', 'https://httpstat.us/404', [], '');
      return;
    }

    const finalHeaders = requestConfig.headers
      .filter((header) => header.key.trim() !== '')
      .map((header, index) => ({
        id: `header-${index}`,
        key: applyVariables(header.key, variables),
        value: applyVariables(header.value, variables),
      }));

    const finalBody = applyVariables(requestConfig.body, variables);

    const requestToSave = {
      method: requestConfig.method,
      url: requestConfig.url,
      headers: requestConfig.headers,
      body: requestConfig.body,
    };

    saveRequestToHistory(requestToSave);
    const encoded = encodeRequestToUrl(requestToSave);
    router.replace(`/rest-client?req=${encoded}`, { scroll: false });

    execute(requestConfig.method, finalUrl, finalHeaders, finalBody);
  };

  const handleReset = () => {
    requestConfig.setMethod('GET');
    requestConfig.setUrl('');
    requestConfig.setBody('');
    router.replace('/rest-client', { scroll: false });
  };

  return (
    <div className="w-full flex h-full">
      <Sidebar />
      <div className="w-full py-4 px-4 gap-4 flex flex-col">
        <RequestSearch
          method={requestConfig.method}
          setMethod={requestConfig.setMethod}
          url={requestConfig.url}
          setUrl={requestConfig.setUrl}
          onSubmit={handleSubmit}
          onClickReset={handleReset}
        />
        <div className="flex h-full gap-2">
          <RequestPanel
            body={requestConfig.body}
            onBodyChange={requestConfig.setBody}
            headers={requestConfig.headers}
            onHeadersChange={requestConfig.setHeaders}
          />
          <CodeGenPreview
            method={requestConfig.method}
            url={requestConfig.url}
            headers={requestConfig.headers}
            body={requestConfig.body}
          />
          <ResponseViewer
            responseBody={response?.body}
            statusCode={response?.statusCode}
            statusText={response?.statusText}
            headers={response?.headers}
            requestMethod={requestConfig.method}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
