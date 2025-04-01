'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { requestTabs } from '@/services';
import { KeyValue } from '@/types';
import { cn } from '@/utils';
import { Button } from '@heroui/react';

import { BodyEditor } from './BodyEditor';
import { RequestKeyValueItem } from './RequestKeyValueItem';

interface RequestPanelProps {
  className?: string;
  body?: string;
  headers?: KeyValue[];
  onBodyChange?: (body: string) => void;
  onHeadersChange?: (headers: KeyValue[]) => void;
}

export const RequestPanel = ({
  className,
  body = '',
  headers: externalHeaders,
  onBodyChange,
  onHeadersChange,
}: RequestPanelProps) => {
  const [activeTab, setActiveTab] = useState<requestTabs>(requestTabs.HEADERS);
  const [internalHeaders, setInternalHeaders] = useState<KeyValue[]>([
    { id: uuidv4(), key: '', value: '' },
  ]);

  const headers = externalHeaders || internalHeaders;
  const setHeaders = onHeadersChange || setInternalHeaders;

  const addItem = () => {
    const newItem = { id: uuidv4(), key: '', value: '' };
    if (activeTab === requestTabs.HEADERS) {
      setHeaders([...headers, newItem]);
    }
  };

  const updateItem = (id: string, field: 'key' | 'value', newValue: string) => {
    if (activeTab === requestTabs.HEADERS) {
      setHeaders(
        headers.map((item) =>
          item.id === id ? { ...item, [field]: newValue } : item
        )
      );
    }
  };

  const removeItem = (id: string) => {
    if (activeTab === requestTabs.HEADERS) {
      setHeaders(headers.filter((item) => item.id !== id));
    }
  };

  const renderHeadersTab = () => (
    <div className="flex flex-col gap-3 rounded-medium bg-content1 p-3 shadow-sm">
      <div className="flex justify-between items-center px-1">
        <span className="text-sm font-semibold text-foreground/80">
          {activeTab}
        </span>
        <Button
          size="sm"
          color="primary"
          variant="flat"
          startContent={<Plus size={16} className="text-current" />}
          className="hover:bg-primary/20"
          onPress={addItem}
        >
          Add {activeTab}
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {headers.length === 0 ? (
          <div className="flex-center h-24 text-foreground/40 text-sm">
            No {activeTab.toLowerCase()} added
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {headers.map((item, index) => (
              <RequestKeyValueItem
                key={item.id}
                item={item}
                index={index}
                updateItem={updateItem}
                removeItem={removeItem}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderBodyTab = () => (
    <div className="h-[500px] rounded-medium bg-content1 shadow-sm overflow-hidden">
      <BodyEditor
        className="pr-5 pt-5 pb-5"
        value={body}
        onChange={onBodyChange}
      />
    </div>
  );

  return (
    <div
      className={cn(
        className,
        'flex flex-col gap-4 p-4 bg-default-50 rounded-xl shadow-sm border-1 border-gray-200 min-w-[500px]'
      )}
    >
      <div className="flex gap-2 border-b border-divider pb-2">
        {Object.values(requestTabs).map((tab) => (
          <Button
            key={tab}
            variant="light"
            className={cn(
              'rounded-medium px-4 py-2 text-sm font-medium transition-colors',
              activeTab === tab
                ? 'bg-primary/20 text-primary shadow-sm'
                : 'text-foreground/60 hover:bg-default-100'
            )}
            onPress={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-4">
        {activeTab === requestTabs.BODY ? renderBodyTab() : renderHeadersTab()}
      </div>
    </div>
  );
};
