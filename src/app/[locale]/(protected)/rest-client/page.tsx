'use client';

import {
  CodeGenPreview,
  RequestPanel,
  RequestSearch,
  ResponseViewer,
  Sidebar,
} from '@/components';
import { useRequestConfig, useRequestExecutor } from '@/hooks';

export default function RestClient() {
  const initialConfig = {};

  const requestConfig = useRequestConfig(initialConfig);

  const { execute, response, error } = useRequestExecutor();

  const handleSubmit = () => {
    execute(
      requestConfig.method,
      requestConfig.url,
      requestConfig.headers.filter((header) => header.key.trim() !== ''),
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
