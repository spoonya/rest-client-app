'use client';

import { Trash2 } from 'lucide-react';

import { KeyValue } from '@/types';
import { cn } from '@/utils';
import { Button, Input } from '@heroui/react';

interface RequestKeyValueItemProps {
  className?: string;
  item: KeyValue;
  index: number;
  updateItem: (id: string, field: 'key' | 'value', newValue: string) => void;
  removeItem: (id: string) => void;
}

export const RequestKeyValueItem = ({
  className,
  item,
  index,
  updateItem,
  removeItem,
}: RequestKeyValueItemProps) => (
  <div className={cn('flex gap-2 items-center', className)}>
    <Input
      aria-label={`Item key ${index + 1}`}
      placeholder="Key"
      value={item.key}
      onChange={(e) => updateItem(item.id, 'key', e.target.value)}
      className="flex-1"
    />
    <Input
      aria-label={`Item value ${index + 1}`}
      placeholder="Value"
      value={item.value}
      onChange={(e) => updateItem(item.id, 'value', e.target.value)}
      className="flex-1"
    />
    <Button
      isIconOnly
      variant="light"
      size="sm"
      onPress={() => removeItem(item.id)}
    >
      <Trash2 size={16} className="text-danger" />
    </Button>
  </div>
);
