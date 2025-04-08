'use client';
import { getStoredVariables } from '@/lib/getStoredVariables';
import { applyVariables } from '@/lib/applyVariables';

import {
  CodeGenPreview,
  RequestPanel,
  RequestSearch,
  ResponseViewer,
  Sidebar,
} from '@/components';
import { useRequestConfig, useRequestExecutor } from '@/hooks';

export default function RestClient() {
  const lastUrl =
    typeof window !== 'undefined' && localStorage.getItem('lastUsedUrl');

  const requestConfig = useRequestConfig({
    method: 'GET',
    url: lastUrl || 'https://pokeapi.co/api/v2/pokemon/',
    body: '',
    headers: [],
  });

  const { execute, response, error } = useRequestExecutor();

  const handleSubmit = () => {
    localStorage.setItem('lastUsedUrl', requestConfig.url);

    const variables = getStoredVariables();

    const finalUrl = applyVariables(requestConfig.url, variables);

    const finalHeaders = requestConfig.headers
      .filter((header) => header.key.trim() !== '')
      .map((header, index) => ({
        id: `header-${index}`,
        key: applyVariables(header.key, variables),
        value: applyVariables(header.value, variables),
      }));

    const finalBody = applyVariables(requestConfig.body, variables);

    execute(requestConfig.method, finalUrl, finalHeaders, finalBody);
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
