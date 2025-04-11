'use client';
import { HistoryList } from '@/components/shared/HistoryList';
import { AppRoutes } from '@/services';
import { HttpObject, RequestObject } from '@/types';
import { cn } from '@/utils';
import { Link } from '@heroui/react';

interface HistoryProps {
  className?: string;
}

export default function History({className}: HistoryProps) {
  const requestKeys = localStorage.getItem('requestKeys')?.split(',') || []; 
  const requestList: HttpObject[] | [] = requestKeys?.map((item) => {
    const request: RequestObject = JSON.parse(localStorage.getItem(item) || '');
   return {[`${Date.parse(item)}`]: request}});
 
  const listSort = requestList?.sort((a, b)=> +(Object.keys(a)[0])-  +(Object.keys(b)[0]));
  return (
    <div className={cn(className, "flex p-4 overflow-hidden")}>
 {!requestKeys.length ? <div>
  You haven&lsquo;t executed any requests. It&lsquo;s empty here. Try:
  <Link href={AppRoutes.REST}>Rest Client</Link>
  </div>: 
            <div className="flex flex-col h-auto justify-between items-center w-full">
              <h2 className="text-lg mb-4 font-semibold text-foreground/80">
                History requests
              </h2>
              <HistoryList list={listSort}/>
              </div>}

    </div>
  );
}
