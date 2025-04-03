'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Footer, Header } from '@/components';
import { supabase } from '@/lib/supabase';
import { AppRoutes } from '@/services';
import { cn } from '@/utils';

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
      <main className="flex justify-center items-center h-screen">
        <Image
          src="/loaders/Loader1.svg"
          alt="Loading..."
          width={100}
          height={100}
        />
      </main>
    );
  }

  return (
    <main className={cn('min-h-screen h-screen', 'page')}>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
