'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { requestTabs } from '@/services';
import { EditorMode, KeyValue } from '@/types';
import { cn } from '@/utils';
import { Tab, Tabs } from '@heroui/react';

import { RequestBodyTab, RequestHeadersTab } from './parts';

interface RequestPanelProps {
  className?: string;
  body?: string;
  headers?: KeyValue[];
  onBodyChange: (body: string) => void;
  onHeadersChange: (headers: KeyValue[]) => void;
}

export const RequestPanel = ({
  className,
  body = '',
  headers = [],
  onBodyChange,
  onHeadersChange,
}: Readonly<RequestPanelProps>) => {
  const t = useTranslations('RestClient');
  const [activeTab, setActiveTab] = useState<requestTabs>(requestTabs.HEADERS);
  const [bodyFormat, setBodyFormat] = useState<EditorMode>('json');

  return (
    <div
      className={cn(
        className,
        'flex flex-col gap-2 p-4 bg-default-50 rounded-xl shadow-sm border-1 border-gray-200 min-w-[450px] max-w-[450px]'
      )}
    >
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as requestTabs)}
        variant="light"
      >
        <Tab key={requestTabs.HEADERS} title={t('headers')}>
          <RequestHeadersTab headers={headers} setHeaders={onHeadersChange} />
        </Tab>
        <Tab key={requestTabs.BODY} title={t('body')}>
          <RequestBodyTab
            body={body}
            bodyFormat={bodyFormat}
            onBodyChange={onBodyChange}
            onBodyFormatChange={setBodyFormat}
          />
        </Tab>
      </Tabs>
    </div>
  );
};
