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
import { processRequest } from '@/services';
import { HttpMethod, KeyValue } from '@/types';

export default function RestClient() {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [responseBody, setResponseBody] = useState<string>('');
  const [responseStatusCode, setResponseStatusCode] = useState<number>(200);
  const [responseStatusText, setResponseStatusText] = useState<string>('OK');
  const [responseHeaders, setResponseHeaders] = useState<
    Array<{ key: string; value: string }>
  >([]);
  const [error, setError] = useState<string>('');
  const [headers, setHeaders] = useState<KeyValue[]>([
    { id: uuidv4(), key: '', value: '' },
  ]);
  const [body, setBody] = useState('');

  const handleSubmit = async () => {
    console.log('Submitted:', { method, url });
    try {
      setError('');

      const requestHeaders = headers.reduce(
        (acc, header) => {
          if (header.key.trim() !== '') {
            acc[header.key] = header.value;
          }
          return acc;
        },
        {} as Record<string, string>
      );

      const requestOptions = {
        method,
        url,
        headers: requestHeaders,
        body,
      };

      const result = await processRequest(requestOptions);

      const formattedData =
        typeof result.data === 'object'
          ? JSON.stringify(result.data, null, 2)
          : String(result.data ?? '');

      setResponseBody(formattedData);
      setResponseStatusCode(result.status);
      setResponseStatusText(result.status === 200 ? 'OK' : 'Error');
      setResponseHeaders([]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unexpected error occurred.');
      }
      setResponseBody('');
    }
  };

  return (
    <div className="w-full flex h-full">
      <Sidebar />
      <div className="w-full py-4 px-4 gap-4 flex flex-col">
        <RequestSearch
          method={method}
          setMethod={setMethod}
          url={url}
          setUrl={setUrl}
          onSubmit={handleSubmit}
        />
        <div className="flex h-full gap-2">
          <RequestPanel
            headers={headers}
            onHeadersChange={setHeaders}
            body={body}
            onBodyChange={setBody}
          />
          <CodeGenPreview />
          <ResponseViewer
            responseBody={responseBody}
            statusCode={responseStatusCode}
            statusText={responseStatusText}
            headers={responseHeaders}
            requestMethod={method}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
