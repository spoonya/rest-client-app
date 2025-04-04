import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { KeyValue } from '@/types';

export const useKeyValueList = (initialItems: KeyValue[] = []) => {
  const [items, setItems] = useState<KeyValue[]>(
    initialItems.map((item) => ({
      ...item,
      id: item.id || uuidv4(),
    }))
  );

  const addItem = () => {
    setItems((prev) => [...prev, { id: uuidv4(), key: '', value: '' }]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, key: string, value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, key, value } : item))
    );
  };

  return {
    items,
    addItem,
    removeItem,
    updateItem,
    setItems: (newItems: KeyValue[]) => {
      setItems(
        newItems.map((item) => ({
          ...item,
          id: item.id || uuidv4(),
        }))
      );
    },
  };
};
