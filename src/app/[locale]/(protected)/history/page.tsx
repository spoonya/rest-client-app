
'use client'
import { HistoryList } from "@/components/shared/HistoryList";
import { HttpObject, RequestObject } from "@/types";
import { cn } from "@/utils"

interface HistoryProps {
  className?: string;
}

export default function History({className}: HistoryProps) {
  const requestKeys = localStorage.getItem('requestKeys')?.split(',') || []; 
  const requestList: HttpObject[] | [] = requestKeys?.map((item) => {const request: RequestObject = JSON.parse(localStorage.getItem(item) || ''); return {[`${Date.parse(item)}`]: request}});
  const listSort = requestList?.sort((a, b)=> +(Object.keys(a)[0])-  +(Object.keys(b)[0]))
 
  return (
    <div className="w-full flex h-full p-4">
 <div
            className={cn(
              className,
              'flex flex-col gap-7 p-4 bg-default-50 rounded-xl shadow-sm border-1 border-gray-200 min-w-96 max-w-96'
            )}
          >
            <div className="flex flex-col justify-between items-center">
              <h2 className="text-lg mb-4 font-semibold text-foreground/80">
                History requests
              </h2>
              <HistoryList list={listSort}/>
              </div>
              </div>
    </div>
 );
}
