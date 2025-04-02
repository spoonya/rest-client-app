'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Footer, Header, Menu } from '@/components';
import { cn } from '@/utils';
import Image from 'next/image';

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
        router.replace('/sign-in');
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
    <main className={cn('min-h-screen', 'page')}>
      <Header />
      <Menu />
      {children}
      <Footer />
    </main>
  );
}
