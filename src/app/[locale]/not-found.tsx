'use client';

import { useTranslations } from 'next-intl';

import { Header } from '@/components/shared';
import { AppRoutes } from '@/services';
import { Button, Link } from '@heroui/react';

export default function NotFound() {
  const t = useTranslations('404');

  return (
    <main>
      <Header />
      <h2>404</h2>
      <p>{t('description')}</p>
      <Button as={Link} href={AppRoutes.HOME} color="primary">
        {t('button')}
      </Button>
    </main>
  );
}
