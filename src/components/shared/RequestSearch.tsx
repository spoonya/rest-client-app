'use client';

// import { Dispatch, SetStateAction } from 'react';

import { requestMethods } from '@/services';
import { HttpMethod } from '@/types';
import { cn } from '@/utils';
import { Button, Input, Select, SelectItem } from '@heroui/react';
import { useTranslations } from 'next-intl';

interface RequestSearchProps {
  className?: string;
  method: HttpMethod;
  url: string;
  setMethod: (value: HttpMethod)=> void,
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
}: Readonly<RequestSearchProps>) => {
  const t = useTranslations('RestClient');

  return (
    <div className={cn(className)}>
      <div className="flex gap-2 items-center">
        <Select
          classNames={{ trigger: 'bg-default-50 border-1 border-gray-200' }}
          aria-label="Select HTTP method"
          className="w-40"
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
          classNames={{
            inputWrapper: 'bg-default-50 border-1 border-gray-200',
          }}
          aria-label="Request URL"
          placeholder="Enter endpoint URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
        />
        <Button color="primary" onPress={onSubmit}>
          {t('submit')}
        </Button>
      </div>
    </div>
  );
};
