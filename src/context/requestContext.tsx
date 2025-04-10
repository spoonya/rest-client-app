
import { HttpMethod, KeyValue} from '@/types';
import { createContext, useContext} from 'react';

export const DefaultContext = {
  method: 'GET',
  body: '',
  headers: [],
  url: '',
  setMethod: (method: HttpMethod)=> { return method},
  setBody: (body: string ) => {return body },
  setHeaders: (headers: KeyValue[]) => {return headers },
  setUrl: (url: string) => {return url},
  
}

export const RequestContext = createContext(DefaultContext);


export const useRequestContext = () => {
  return useContext(RequestContext);
};