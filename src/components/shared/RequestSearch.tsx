'use client';

import { Dispatch, SetStateAction } from 'react';

import { requestMethods } from '@/services';
import { HttpMethod } from '@/types';
import { cn } from '@/utils';
import { Button, Input, Select, SelectItem } from '@heroui/react';

interface RequestSearchProps {
  className?: string;
  method: HttpMethod;
  url: string;
  setMethod: Dispatch<SetStateAction<HttpMethod>>;
  setUrl: (value: string) => void;
  onSubmit: () => void;
}

export const RequestSearch = ({
  className,
  method,
  url,
  setMethod,
  setUrl,
  onSubmit,
}: RequestSearchProps) => (
  <div className={cn(className)}>
    <div className="flex gap-2 items-center">
      <Select
        aria-label="Select HTTP method"
        className="w-32"
        items={requestMethods}
        selectedKeys={[method]}
        onChange={(e) => setMethod(e.target.value as HttpMethod)}
        disallowEmptySelection
      >
        {requestMethods.map((method) => (
          <SelectItem key={method.value} textValue={method.label}>
            {method.label}
          </SelectItem>
        ))}
      </Select>
      <Input
        aria-label="Request URL"
        placeholder="Enter endpoint URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
      />
      <Button onPress={onSubmit}>Submit</Button>
    </div>
  </div>
);
