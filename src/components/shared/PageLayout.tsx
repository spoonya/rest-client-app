'use client';

import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  title: ReactNode;
};

export function PageLayout({ children, title }: Props) {
  return (
    <div className="relative h-full flex items-center justify-between grow flex-col bg-slate-200 py-10">
      {/* <div className="container relative flex grow flex-col px-4"> */}
        <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          {title}
        </h1>
        <div className="mt-6 text-gray-400 md:text-lg">{children}</div>
      {/* </div> */}
    </div>
  );
}
