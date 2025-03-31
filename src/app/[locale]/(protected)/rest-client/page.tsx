'use client';

import { useState } from 'react';

import {
  CodeGenPreview,
  Editor,
  RequestPanel,
  RequestSearch,
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
      <div className="w-full">
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
          <Editor />
        </div>
      </div>
    </div>
  );
}
