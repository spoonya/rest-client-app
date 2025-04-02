'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { editorModes, requestTabs } from '@/services';
import { EditorMode, KeyValue } from '@/types';
import { cn } from '@/utils';
import { Button, Select, SelectItem, Tab, Tabs } from '@heroui/react';

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
  const [internalBody, setInternalBody] = useState(body);
  const effectiveBody = onBodyChange ? body : internalBody;
  const handleBodyChange = onBodyChange || setInternalBody;
  const [bodyFormat, setBodyFormat] = useState<EditorMode>('json');

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

  const handleBodyFormatChange = (value: string) => {
    setBodyFormat(value as EditorMode);
  };

  return (
    <div
      className={cn(
        className,
        'flex flex-col gap-2 p-4 bg-default-50 rounded-xl shadow-sm border-1 border-gray-200 min-w-[500px]'
      )}
    >
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as requestTabs)}
        variant="light"
      >
        <Tab key={requestTabs.HEADERS} title={requestTabs.HEADERS}>
          <div className="flex flex-col gap-3 rounded-medium bg-content1 p-3 shadow-sm">
            <div className="flex justify-between items-center">
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
        </Tab>
        <Tab key={requestTabs.BODY} title={requestTabs.BODY}>
          <div className="flex flex-col gap-3 rounded-medium bg-content1 shadow-sm overflow-hidden">
            <div className="flex justify-between items-center px-4 pt-3">
              <Select
                aria-label="Select body format"
                size="sm"
                className="w-32"
                selectedKeys={[bodyFormat]}
                onChange={(e) => handleBodyFormatChange(e.target.value)}
                disallowEmptySelection
              >
                {editorModes.map((mode) => (
                  <SelectItem key={mode.value} textValue={mode.label}>
                    {mode.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="h-[500px]">
              <BodyEditor
                className="pr-5 pt-5 pb-5"
                value={effectiveBody}
                onChange={handleBodyChange}
                language={bodyFormat}
              />
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
