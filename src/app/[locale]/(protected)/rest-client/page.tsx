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
import { HttpMethod, KeyValue } from '@/types';

export default function RestClient() {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState<KeyValue[]>([
    { id: uuidv4(), key: '', value: '' },
  ]);
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    console.log('Submitted:', { method, url });
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
          <ResponseViewer />
        </div>
      </div>
    </div>
  );
}
