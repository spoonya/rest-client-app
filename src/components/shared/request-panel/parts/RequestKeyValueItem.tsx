'use client';

import { Trash2 } from 'lucide-react';
import { ChangeEvent } from 'react';

import { KeyValue } from '@/types';
import { Button, Input } from '@heroui/react';

interface RequestKeyValueItemProps {
  item: KeyValue;
  index: number;
  updateItem: (id: string, key: string, value: string) => void;
  removeItem: (id: string) => void;
}

export const RequestKeyValueItem = ({
  item,
  index,
  updateItem,
  removeItem,
}: RequestKeyValueItemProps) => {
  const handleKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateItem(item.id, e.target.value, item.value);
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateItem(item.id, item.key, e.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        aria-label={`Header key ${index + 1}`}
        placeholder="Key"
        value={item.key}
        onChange={handleKeyChange}
        classNames={{
          input: 'text-sm',
        }}
      />

      <Input
        aria-label={`Header value ${index + 1}`}
        placeholder="Value"
        value={item.value}
        onChange={handleValueChange}
        classNames={{
          input: 'text-sm',
        }}
      />

      <Button
        isIconOnly
        size="sm"
        variant="light"
        aria-label={`Remove header ${index + 1}`}
        onPress={() => removeItem(item.id)}
      >
        <Trash2 size={16} className="text-danger" />
      </Button>
    </div>
  );
};
