'use client';

import { useTranslations } from 'next-intl';

import { AuthButtons, Menu, PageLayout } from '@/components';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const t = useTranslations('HomePage');
  const user = useAuth();
  const name = user?.user_metadata.full_name;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      supabase.auth.getUser().finally(() => setIsLoading(false));
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
    <PageLayout title={t('title')} userName={name}>
      <div className="w-full shadow-lg flex items-center justify-around py-10">
        {user ? (
          <Menu />
        ) : (
          <AuthButtons className="z-0 rounded-2xl text-blue-800" />
        )}
      </div>
    </PageLayout>
  );
}
