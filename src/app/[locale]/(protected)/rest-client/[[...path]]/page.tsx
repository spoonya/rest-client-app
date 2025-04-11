'use client';

import {
  CodeGenPreview,
  RequestPanel,
  RequestSearch,
  ResponseViewer,
  Sidebar,
} from '@/components';
import { useRequestContext } from '@/context/requestContext';
import {  useRequestExecutor } from '@/hooks';
import { AppRoutes } from '@/services';
import { HttpMethod, KeyValue } from '@/types';
import { buildQueryParams, buildUrl } from '@/utils';
import { useRouter} from 'next/navigation';


export default function RestClient() {
  const router = useRouter()
  // const searchParams = useSearchParams()
 const {method, url, headers, body, setMethod, setBody, setUrl, setHeaders} = useRequestContext()
  // const requestConfig = useRequestConfig({
  //   method: 'GET',
  //   url: 'https://pokeapi.co/api/v2/pokemon/',
  //   body: '',
  //   headers: [],
  // });

  const { execute, response, error } = useRequestExecutor();

  const handleSubmit = () => {
    execute(
      method as HttpMethod,
      url,
      (headers as KeyValue[]).filter((header) => header.key.trim() !== ''),
      body
    );
    const urls = buildUrl(method, body, url);
    const params = buildQueryParams(undefined, headers, method)
    router.replace(`${AppRoutes.REST}/${urls}?${params}`)
  };

  return (
    <div className="w-full flex h-full">
      <Sidebar />
      <div className="w-full py-4 px-4 gap-4 flex flex-col">
        <RequestSearch
        method={method as HttpMethod}
        setMethod={setMethod}
        url={url}
        setUrl={setUrl}
        onSubmit={handleSubmit}
        />
        <div className="flex h-full gap-2">
          <RequestPanel
          body={body}
          onBodyChange={setBody}
          headers={headers}
          onHeadersChange={setHeaders}
          />
          <CodeGenPreview
           method={method as HttpMethod}
           url={url}
           headers={headers}
           body={body}
          />
          <ResponseViewer
            responseBody={response?.body}
            statusCode={response?.statusCode}
            statusText={response?.statusText}
            headers={response?.headers}
            requestMethod={method as HttpMethod}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
