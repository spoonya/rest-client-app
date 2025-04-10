'use client'

import { useRequestContext } from "@/context/requestContext";
import { AppRoutes } from "@/services";
import { HttpMethod, HttpObject, KeyValue, RequestObject } from "@/types";
import {  buildQueryParams, buildUrl, cn } from "@/utils"
import { Link } from "@heroui/react";

interface HistoryProps {
  className?: string;
  list: HttpObject[];
}

export const HistoryList = ({className, list}: HistoryProps) => {
const {setMethod, setBody, setUrl, setHeaders} = useRequestContext();
  const handleClick = ({method, body, headers, url }: RequestObject) => {
    const header = headers?.map((item)=>  Object.fromEntries(item))
    // console.log(header)
    // const urls = buildUrl(method, body, url);
    // console.log(urls)
    setBody(body as string)
    setMethod(method as HttpMethod)
   setUrl(url);
   setHeaders(header as unknown as KeyValue[])
  }

  return (
    <div
          className={cn(
            className,
            'flex flex-col gap-7 overflow-scroll p-4 bg-default-50 rounded-xl shadow-sm border-1 border-gray-200 min-w-96 max-w-96'
          )}
        >{list.map((item)=> {console.log(item); const [keys, value] = Object.entries(item)[0]; console.log(keys, value); return <div key={keys} >
            <Link href={AppRoutes.REST + buildUrl(value.method, value.body, value.url) + '?' + buildQueryParams(value.headers || undefined, undefined,  value.method)} onPress={(()=> handleClick(value))}>{`${value.method}, ${value.url}`}</Link>
          </div>})}
            </div>
  )
}
