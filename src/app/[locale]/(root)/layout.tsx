'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Preloader } from '@/components';
import { DefaultLayout } from '@/layouts';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Preloader />
      </div>
    );
  }

  return (
    <DefaultLayout className="flex flex-col justify-between">
      {children}
    </DefaultLayout>
  );
}
