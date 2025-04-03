'use client';

import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  title: ReactNode;
  userName: string;
};

export function PageLayout({ children, title, userName }: Props) {
  return (
    <div className="relative min-h-screen flex items-center grow flex-col bg-slate-200 py-10">
      <div className="container relative flex items-center flex-col px-4">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          {title}
        </h1>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          {userName}
        </h1>
      </div>
      <div className="mt-6 text-gray-400 md:text-lg">{children}</div>
    </div>
  );
}
