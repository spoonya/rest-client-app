'use client';

import { useRouter } from 'next/navigation';

import { HeroUIProvider } from '@heroui/react';
import { RequestContextProvider } from '@/context/RequestProvider';


declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return <HeroUIProvider navigate={router.push}><RequestContextProvider>{children}</RequestContextProvider></HeroUIProvider>;
}
