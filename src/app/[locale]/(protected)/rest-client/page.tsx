'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  CodeGenPreview,
  RequestPanel,
  RequestSearch,
  ResponseViewer,
  Sidebar,
} from '@/components';
import { useRequestConfig, useRequestExecutor } from '@/hooks';
import { KeyValue } from '@/types';

export default function RestClient() {
  const requestConfig = useRequestConfig({
    method: 'GET',
    url: 'https://pokeapi.co/api/v2/pokemon/',
    body: '',
  });

  const { execute, response, error } = useRequestExecutor();
  const [headers, setHeaders] = useState<KeyValue[]>([
    { id: uuidv4(), key: '', value: '' },
  ]);

  const handleSubmit = () => {
    execute(
      requestConfig.method,
      requestConfig.url,
      headers,
      requestConfig.body
    );
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
            headers={headers}
            onHeadersChange={setHeaders}
          />
          <CodeGenPreview />
          <ResponseViewer
            responseBody={response?.body || ''}
            statusCode={response?.statusCode || 200}
            statusText={response?.statusText || ''}
            headers={response?.headers || []}
            requestMethod={requestConfig.method}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
