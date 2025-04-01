'use client';

import { useState } from 'react';

import {
  CodeGenPreview,
  RequestPanel,
  RequestSearch,
  ResponseViewer,
  Sidebar,
} from '@/components';
import { HttpMethod } from '@/types';

export default function RestClient() {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState('');

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
        <div className="flex h-full">
          <RequestPanel />
          <CodeGenPreview />
          <ResponseViewer />
        </div>
      </div>
    </div>
  );
}
