import { KeyValue } from '@/types';

export const buildArrayFromObj = (value: KeyValue[]) => {
  const arr: [string, string][][] = value.map((item) => Object.entries(item));

  return arr;
};
