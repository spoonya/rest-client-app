'use client';

import React from 'react';

import { ResponseTabs } from '@/services';
import { cn } from '@/utils';
import { Tab, Tabs } from '@heroui/react';

import { ResponseBodyTab, ResponseDetailsTab } from './';

interface ResponseViewerProps {
  className?: string;
  language?: string;
  statusCode?: number;
  statusText?: string;
  headers?: Array<{ key: string; value: string }>;
  responseBody?: string;
  requestMethod?: string;
  error?: string;
}

export const ResponseViewer = ({
  className,
  language = 'json',
  statusCode = 200,
  statusText = 'OK',
  headers = [],
  responseBody = '',
  requestMethod = 'GET',
  error = '',
}: Readonly<ResponseViewerProps>) => {
  const [activeTab, setActiveTab] = React.useState<ResponseTabs>(
    ResponseTabs.BODY
  );

  const detailsTabTitle = `${ResponseTabs.DETAILS} ${requestMethod}`;
  const bodyTabTitle = `${ResponseTabs.BODY}${
    statusCode ? ` (${statusCode})` : ''
  }`;

  return (
    <div
      className={cn(
        className,
        'flex flex-col gap-2 p-4 bg-default-50 rounded-xl shadow-sm border-1 border-gray-200 w-full'
      )}
    >
      {error && (
        <div className="bg-red-100 text-red-800 rounded p-2">{error}</div>
      )}

      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as ResponseTabs)}
        variant="light"
      >
        <Tab key={ResponseTabs.DETAILS} title={detailsTabTitle}>
          <ResponseDetailsTab
            statusCode={statusCode}
            statusText={statusText}
            headers={headers}
          />
        </Tab>
        <Tab key={ResponseTabs.BODY} title={bodyTabTitle} className="flex-1">
          <ResponseBodyTab responseBody={responseBody} language={language} />
        </Tab>
      </Tabs>
    </div>
  );
};
