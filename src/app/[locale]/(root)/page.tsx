'use client';

import { useTranslations } from 'next-intl';

import { AuthButtons, Menu, PageLayout } from '@/components';
import { useAuth } from '@/hooks';

export default function Home() {
  const t = useTranslations('HomePage');
  const user = useAuth();
  const name = user?.user_metadata.full_name;

  return (
    <PageLayout title={t('title')} userName={name}>
      {user ? (
        <Menu />
      ) : (
        <AuthButtons className="z-0 bg-slate-300 rounded-2xl" />
      )}
    </PageLayout>
  );
}
