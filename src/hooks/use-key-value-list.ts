import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { KeyValue } from '@/types';

export const useKeyValueList = (initialItems: KeyValue[] = []) => {
  const [items, setItems] = useState<KeyValue[]>(initialItems);

  const addItem = () => {
    setItems([...items, { id: uuidv4(), key: '', value: '' }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, key: string, value: string) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, key, value } : item))
    );
  };

  const setItemsWithId = (newItems: KeyValue[]) => {
    const itemsWithId = newItems.map((item) => ({
      ...item,
      id: item.id || uuidv4(),
    }));
    setItems(itemsWithId);
  };

  return {
    items,
    addItem,
    removeItem,
    updateItem,
    setItems: setItemsWithId,
  };
};
