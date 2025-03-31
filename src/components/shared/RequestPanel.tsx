'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { requestTabs } from '@/services';
import { KeyValue } from '@/types';
import { cn } from '@/utils';
import { Button } from '@heroui/react';

import { RequestKeyValueItem } from './RequestKeyValueItem';

interface RequestPanelProps {
  className?: string;
}

export const RequestPanel = ({ className }: RequestPanelProps) => {
  const [activeTab, setActiveTab] = useState<requestTabs>(requestTabs.HEADERS);
  const [headers, setHeaders] = useState<KeyValue[]>([
    { id: uuidv4(), key: '', value: '' },
  ]);

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

  const renderItems = () => {
    const items = activeTab === requestTabs.HEADERS ? headers : [];
    return items.map((item, index) => (
      <RequestKeyValueItem
        key={item.id}
        item={item}
        index={index}
        updateItem={updateItem}
        removeItem={removeItem}
      />
    ));
  };

  return (
    <div className={cn(className, 'flex flex-col gap-4 p-4 w-full')}>
      <div className="flex gap-2">
        {Object.values(requestTabs).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'solid' : 'light'}
            onPress={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="flex justify-end">
        <Button size="sm" startContent={<Plus size={16} />} onPress={addItem}>
          Add {activeTab.slice(0, -1)}
        </Button>
      </div>

      <div className="flex flex-col gap-2">{renderItems()}</div>
    </div>
  );
};
