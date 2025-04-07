'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { DefaultLayout } from '@/layouts';
import { supabase } from '@/lib/supabase';
import { AppRoutes } from '@/services';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace(AppRoutes.SIGN_IN);
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image
          src="/loaders/Loader1.svg"
          alt="Loading..."
          width={100}
          height={100}
        />
      </div>
    );
  }

  return (
    <DefaultLayout className="max-h-screen h-screen flex flex-col justify-between">
      {children}
    </DefaultLayout>
  );
}
