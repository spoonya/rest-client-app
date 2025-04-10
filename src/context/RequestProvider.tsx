import { HttpMethod, KeyValue } from "@/types";
import { useState, useMemo } from "react";
import { DefaultContext, RequestContext } from "./requestContext";

export const RequestContextProvider = ({ children }: { children: React.ReactNode }) => {
const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState<string>('');
  const [body, setBody] = useState('');
  const [headers, setHeaders] = useState<KeyValue[] | []>(
    []
  );

  const context = useMemo(()=> ({method, setMethod, body, url, headers, setBody, setUrl, setHeaders} as typeof DefaultContext),[method, body, url, headers])

 return <RequestContext.Provider value={context}>{children}</RequestContext.Provider>

}