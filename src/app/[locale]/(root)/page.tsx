'use client';

import { useTranslations } from 'next-intl';

import { PageLayout } from '@/components';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <PageLayout title={t('title')}>
      <p className="max-w-[590px]">{t.rich('description')}</p>
    </PageLayout>
  );
}
