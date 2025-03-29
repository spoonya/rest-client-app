import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/components/common';
import '@/styles/globals.css';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <>
      <h1>{t('title')}</h1>
      <LocaleSwitcher />
    </>
  );
}
