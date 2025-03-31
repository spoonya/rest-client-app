import { useTranslations } from 'next-intl';
import '@/styles/globals.css';
import PageLayout from '@/components/common/PageLayout/PageLayout';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <PageLayout title={t('title')}>
      <p className="max-w-[590px]">
        {t.rich('description')}
      </p>
    </PageLayout>
  );
}
