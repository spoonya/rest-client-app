import { useRequestConfig } from '@/hooks';
import { AppRoutes } from '@/services';
import { HttpMethod, HttpObject, KeyValue, RequestObject } from '@/types';
import { cn } from '@/utils';
import { Link } from '@heroui/react';

interface HistoryProps {
  className?: string;
  list: HttpObject[];
}

export const HistoryList = ({ className, list }: HistoryProps) => {
  const requestConfig = useRequestConfig({
    method: 'GET',
    url: '',
    body: '',
    headers: [],
  });
  const handleClick = ({ method, body, headers, url }: RequestObject) => {
    requestConfig.setBody(body as string);
    requestConfig.setMethod(method as HttpMethod);
    requestConfig.setUrl(url);
    requestConfig.setHeaders(headers as KeyValue[]);
  };

  return (
    <div
      className={cn(
        className,
        'flex flex-col gap-7 p-4 bg-default-50 rounded-xl shadow-sm border-1 border-gray-200 min-w-96 max-w-96'
      )}
    >
      {list.map((item) => {
        return (
          <div key={Object.keys(item)[0]}>
            <Link
              href={AppRoutes.REST}
              onPressUp={() => handleClick(Object.values(item)[0])}
            >
              {Object.values(item)[0].url}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
