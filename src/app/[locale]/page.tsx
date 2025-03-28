import { useTranslations } from 'next-intl';
import '@ant-design/v5-patch-for-react-19';
import { LocaleSwitcher } from '@/components/common';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <>
      <h1>{t('title')}</h1>
      <LocaleSwitcher />
    </>
  );
}
